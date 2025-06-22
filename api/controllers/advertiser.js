import Advertiser from "../models/advertiser.js";
import jwt from "jsonwebtoken";

// Get all advertisers
export const getAll = (req, res) => {
  Advertiser.find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({ error: err.message });
    });
};

// Login advertiser and issue JWT token
export const login = (req, res) => {
  const { email, password } = req.body;

  Advertiser.find({ email })
    .then((users) => {
      if (users.length === 0) {
        return res.status(404).send({ error: "User not found!" });
      }

      const user = users[0];

      // Note: You should hash & compare passwords securely (e.g., bcrypt)
      if (user.password !== password) {
        return res.status(404).send({ error: "User not found!" });
      }

      // Create JWT token with expiry
      const token = jwt.sign(
        { id: user.id, phone: user.phone, email: user.email },
        process.env.SECRET,
        {
          expiresIn: "1h",
        }
      );

      res.status(200).send({ user, token });
    })
    .catch((err) => {
      res.status(500).send({ error: err.message });
    });
};

// Register new advertiser
export const register = (req, res) => {
  const { email, password, phone, morePhone, apartmentArr } = req.body;

  // Check if email exists already
  Advertiser.find({ email })
    .then((existing) => {
      if (existing.length > 0) {
        return res.status(400).send({ error: "Email already exists" });
      }

      // Create new advertiser
      const newAdvertiser = new Advertiser({
        email,
        password,
        phone,
        morePhone,
        apartmentArr,
      });

      newAdvertiser
        .save()
        .then((savedAdvertiser) => {
          const token = jwt.sign(
            { id: savedAdvertiser.id, phone: savedAdvertiser.phone, email: savedAdvertiser.email },
            process.env.SECRET,
            { expiresIn: "1h" }
          );
          res.status(201).send({ newAdvertiser: savedAdvertiser, token });
        })
        .catch((err) => {
          res.status(500).send({ error: err.message });
        });
    })
    .catch((err) => {
      res.status(500).send({ error: err.message });
    });
};
