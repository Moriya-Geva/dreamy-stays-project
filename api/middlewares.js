import Advertiser from "./models/advertiser.js";
import jwt from 'jsonwebtoken';

// Middleware to check if email already exists in DB before registration
export const checkEmail = (req, res, next) => {
    const email = req.body.email;

    Advertiser.findOne({ email: email }) // Search for user by email
        .then(user => {
            if (user) {
                // Email already exists - send error response
                return res.status(400).send({ error: 'Email already exists' });
            }
            // Email not found - proceed to next middleware or controller
            next();
        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });
};

// Middleware to verify JWT token for protected routes
export const checkAuth = (req, res, next) => {
    if (!req.headers.authorization) {
        // No Authorization header present
        return res.status(401).send({ error: 'Authorization failed!' });
    }
    const arr = req.headers.authorization.split(' ');

    if (arr.length === 1) {
        // Authorization header malformed
        return res.status(401).send({ error: 'Authorization failed!' });
    }

    const [scheme, token] = arr;
    const secret = process.env.SECRET;

    // Verify the JWT token
    jwt.verify(token, secret, (error, decoded) => {
        if (error || !decoded) {
            console.log(error.message);
            return res.status(401).send({ error: error.message });
        }

        // Save user ID from token into request object for later use
        req.id = decoded.id;

        // Continue to next middleware or controller
        next();
    });
};
