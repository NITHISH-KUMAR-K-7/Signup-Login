import express from 'express'
import { signup,login,profile } from '../controllers/controller.js'
import { verifyToken } from '../middlewares/middleware.js'

const router = express.Router()

router.post('/signup',signup)
router.post('/login',login)

router.get('/profile',verifyToken,profile)

export default router;
