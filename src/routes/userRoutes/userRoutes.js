import express from 'express'
import { getAvailableProducts } from '../../controllers/userControllers/userController.js';



const router = express.Router()
router.get('/products/getProducts', getAvailableProducts)



export default router;