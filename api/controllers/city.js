import City from "../models/city.js";

// Get all cities
export const getAll = (req, res) => {
  City.find()
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send({ error: err.message }));
};

// Create a new city
export const create = (req, res) => {
  const { nameC, apartmentArr } = req.body;

  const newCity = new City({
    nameC,
    apartmentArr,
  });

  newCity
    .save()
    .then((city) => res.status(200).send(city))
    .catch((err) => res.status(500).send({ error: err.message }));
};
