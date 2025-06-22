import express from 'express'
import {
    create,
    getAll,
    getById,
    getByCategoryId,
    update,
    remove,
    getByCityId1,
    getByNumBeds,
    getByPrice,
    getByAdvertiser,
    getByFilters
} from '../controllers/apartment.js'
import { checkAuth } from '../middlewares.js'

const router = express.Router()

// Create apartment - protected route, requires authentication
router.post('', checkAuth, create)

// Get all apartments - open route
router.get('', getAll)

// Get apartment by its ID
router.get('/getById/:id', getById)

// Get apartments by category ID
router.get('/getByCategoryId/:id', getByCategoryId)

// Get apartments by city ID
router.get('/getByCityId/:id', getByCityId1)

// Get apartments by price (note: your controller expects body, but route uses param, fix needed)
router.get('/getByPrice/:id', getByPrice)

// Get apartments by advertiser - protected route, user must be authenticated
router.get('/getByAdvertiser/', checkAuth, getByAdvertiser)

// Update apartment by ID
router.put('/:id', update)

// Delete apartment by ID - protected route
router.delete('/:id', checkAuth, remove)

// Get apartments by number of beds
router.get('/getByNumBeds/:id', getByNumBeds)

// Get apartments filtered by various criteria (query params)
router.get('/getByFilters/', getByFilters)

export default router
