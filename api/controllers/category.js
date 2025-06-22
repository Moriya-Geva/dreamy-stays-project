import Category from "../models/category.js";

// Get all categories
export const getAll = (req, res) => {
  Category.find()
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send({ error: err.message }));
};

// Create a new category
export const create = (req, res) => {
  const { nameC, apartmentArr } = req.body;

  const newCategory = new Category({
    nameC,
    apartmentArr,
  });

  newCategory
    .save()
    .then((category) => res.status(200).send(category))
    .catch((err) => res.status(500).send({ error: err.message }));
};
