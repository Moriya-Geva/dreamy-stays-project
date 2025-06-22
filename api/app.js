import express from 'express'
import mongoose from 'mongoose'
import categoryRouter from './routers/category.js'
import cityRouter from "./routers/city.js";
import advertiserRouter from "./routers/advertiser.js";
import apartmentRouter from "./routers/apartment.js";
import dotenv from 'dotenv';
import path from 'path'; 
import bodyParser from "body-parser";
import cors from 'cors';

const app = express()
const port = 3001

app.use(cors()) // Enable CORS for all origins
app.use(bodyParser.json()) // Parse JSON body from requests

dotenv.config({ path: path.resolve('.env') }) // Load environment variables from .env file

// Connect to MongoDB database
mongoose.connect(`mongodb://localhost:27017/VApartment`)
.then(() => {
    console.log('connect to mongodb')
})
.catch(err => {
    console.error({ error: err.message })
})

// Register routers for different routes
app.use('/category', categoryRouter)
app.use('/city', cityRouter)
app.use('/advertiser', advertiserRouter)
app.use('/apartment', apartmentRouter)

// Start server and listen on port
app.listen(port, () => {
    console.log(`my application is running on http://localhost:${port}`);
})
