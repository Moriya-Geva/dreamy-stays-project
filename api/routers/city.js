import express from 'express'
import {
    create,
    getAll 
} from '../controllers/city.js'

const router = express.Router()

// Get all cities
router.get('', getAll)

// Create new city
router.post('', create)

export default router
