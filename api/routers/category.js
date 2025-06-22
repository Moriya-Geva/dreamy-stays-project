import express from 'express'
import {
    create,
    getAll
} from '../controllers/category.js'

const router = express.Router()

// Get all categories
router.get('', getAll)

// Create new category
router.post('/', create)

export default router
