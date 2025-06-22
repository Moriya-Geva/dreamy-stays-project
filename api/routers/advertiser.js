import express from 'express'
import {
    getAll,
    login,
    register
} from '../controllers/advertiser.js'
import { checkEmail } from '../middlewares.js'

const router = express.Router()

// Register new advertiser with email validation middleware
router.post('/register', checkEmail, register)

// Login route for advertiser
router.post('/login', login)

// Get all advertisers (open endpoint)
router.get('', getAll)

export default router
