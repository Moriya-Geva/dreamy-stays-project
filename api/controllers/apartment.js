import Advertiser from "../models/advertiser.js";
import Apartment from "../models/apartment.js";
import Category from "../models/category.js";
import City from "../models/city.js";

// Get all apartments with populated references
export const getAll = (req, res) => {
  Apartment.find()
    .populate({ path: "category", select: "-__v -_id" })
    .populate({ path: "city", select: "-__v -_id" })
    .populate({ path: "advertiser", select: "-__v -_id" })
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send({ error: err.message }));
};

// Get apartment by ID with populated refs
export const getById = async (req, res) => {
  try {
    const apartment = await Apartment.findById(req.params.id)
      .populate({ path: "category", select: "-__v -_id" })
      .populate({ path: "city", select: "-__v -_id" })
      .populate({ path: "advertiser", select: "-__v -_id" });

    if (!apartment) {
      return res.status(404).send({ error: "Apartment not found!" });
    }

    res.status(200).send(apartment);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// Get apartments by category ID
export const getByCategoryId = (req, res) => {
  Category.findById(req.params.id)
    .select("apartmentArr")
    .populate({ path: "apartmentArr", select: "-__v -_id" })
    .then((category) => {
      if (!category) {
        return res.status(404).send({ error: "Category not found!" });
      }
      res.status(200).send(category.apartmentArr);
    })
    .catch((err) => res.status(500).send({ error: err.message }));
};

// Get apartments by city ID (directly from Apartment collection)
export const getByCityId = (req, res) => {
  Apartment.find({ city: req.params.city })
    .populate({ path: "category", select: "-__v -_id" })
    .populate({ path: "city", select: "nameC" })
    .populate({ path: "advertiser", select: "-__v -_id" })
    .then((apartments) => {
      if (!apartments || apartments.length === 0) {
        return res.status(404).send({ error: "Apartments not found!" });
      }
      res.status(200).send(apartments);
    })
    .catch((err) => res.status(500).send({ error: err.message }));
};

// Get apartments by city ID from City collection
export const getByCityId1 = (req, res) => {
  City.findById(req.params.id)
    .then((city) => {
      if (!city) {
        return res.status(404).send({ error: "City not found!" });
      }
      res.status(200).send(city.apartmentArr);
    })
    .catch((err) => res.status(500).send({ error: err.message }));
};

// Get apartments by number of beds with conditions: greater than, less than, equal
export const getByNumBeds = (req, res) => {
  const { numBeds, condition } = req.body;
  const bedsNum = parseInt(numBeds, 10);

  let query = {};

  switch (condition) {
    case "gt":
      query.numBeds = { $gt: bedsNum };
      break;
    case "lt":
      query.numBeds = { $lt: bedsNum };
      break;
    default:
      query.numBeds = { $eq: bedsNum };
  }

  Apartment.find(query)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send({ error: err.message }));
};

// Get apartments by price with conditions: greater than, less than, equal
export const getByPrice = (req, res) => {
  const { price, condition } = req.body;

  let query = {};

  switch (condition) {
    case "gt":
      query.price = { $gt: price };
      break;
    case "lt":
      query.price = { $lt: price };
      break;
    case "eq":
      query.price = { $eq: price };
      break;
  }

  Apartment.find(query)
    .populate({ path: "category", select: "nameC" })
    .populate({ path: "city", select: "nameC" })
    .populate({ path: "advertiser", select: "email phone morePhone" })
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send({ error: err.message }));
};

// Get apartments with multiple filters (city, minBeds, maxPrice, category)
export const getByFilters = (req, res) => {
  const { cityId, minBeds, maxPrice, categoryId } = req.query;

  let query = {};

  if (cityId) query.city = cityId;
  if (minBeds) query.numBeds = { $gte: Number(minBeds) };
  if (maxPrice) query.price = { $lte: Number(maxPrice) };
  if (categoryId) query.category = categoryId;

  Apartment.find(query)
    .populate({ path: "category", select: "nameC" })
    .populate({ path: "city", select: "nameC" })
    .populate({ path: "advertiser", select: "email phone morePhone" })
    .then((apartments) => res.status(200).send(apartments))
    .catch((err) => res.status(500).send({ error: err.message }));
};

// Get apartments posted by the current logged-in advertiser
export const getByAdvertiser = (req, res) => {
  const advertiserId = req.id; // Assuming req.id is set from auth middleware
  Advertiser.findById(advertiserId)
    .populate("apartmentArr")
    .then((data) => res.status(200).send(data.apartmentArr))
    .catch((err) => res.status(500).send({ error: err.message }));
};

// Create a new apartment
export const create = (req, res) => {
  const { name, description, img, category, city, address, numBeds, price, additives } = req.body;

  const newApartment = new Apartment({
    name,
    description,
    img,
    category,
    city,
    address,
    numBeds,
    price,
    additives,
    advertiser: req.id,
  });

  newApartment
    .save()
    .then(async (apartment) => {
      // Push apartment id to related collections
      await City.findByIdAndUpdate(city, { $push: { apartmentArr: apartment._id } });
      await Category.findByIdAndUpdate(category, { $push: { apartmentArr: apartment._id } });
      await Advertiser.findByIdAndUpdate(req.id, { $push: { apartmentArr: apartment._id } });

      res.status(200).send(apartment);
    })
    .catch((err) => res.status(500).send({ error: err.message }));
};

// Update an apartment by ID
export const update = async (req, res) => {
  const { id } = req.params;
  try {
    const apartment = await Apartment.findByIdAndUpdate(id, req.body, { new: true });
    if (!apartment) return res.status(404).send("Apartment not found");

    const { category, advertiser, city } = req.body;

    // Update references if changed
    if (category) {
      await Category.findByIdAndUpdate(category, { $push: { apartmentArr: apartment._id } });
      await Category.findByIdAndUpdate(apartment.category, { $pull: { apartmentArr: apartment._id } });
    }
    if (advertiser) {
      await Advertiser.findByIdAndUpdate(advertiser, { $push: { apartmentArr: apartment._id } });
      await Advertiser.findByIdAndUpdate(apartment.advertiser, { $pull: { apartmentArr: apartment._id } });
    }
    if (city) {
      await City.findByIdAndUpdate(city, { $push: { apartmentArr: apartment._id } });
      await City.findByIdAndUpdate(apartment.city, { $pull: { apartmentArr: apartment._id } });
    }

    res.status(200).json(apartment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete apartment by ID
export const remove = (req, res) => {
  Apartment.findById(req.params.id)
    .then(async (apartment) => {
      if (!apartment) {
        return res.status(404).send({ error: "Apartment not found!" });
      }

      await apartment.deleteOne();

      // Remove apartment id from related collections
      await Category.findByIdAndUpdate(req.params.category, { $pull: { apartmentArr: apartment._id } });
      await Advertiser.findByIdAndUpdate(req.params.advertiser, { $pull: { apartmentArr: apartment._id } });
      await City.findByIdAndUpdate(req.params.city, { $pull: { apartmentArr: apartment._id } });

      res.status(200).send({ message: `Deleted apartment ${apartment._id} successfully!` });
    })
    .catch((err) => res.status(500).send({ error: err.message }));
};
