import express from 'express'
import { login, signup} from '../../controllers/adminControllers/adminAuthController.js';
import authenticateJWT from '../../middlewares/adminAuth.js';
import { addProduct, deleteProduct, editProduct, getProducts } from '../../controllers/adminControllers/adminController.js';


const router = express.Router()

router.post('/login', login)
router.post('/signup',signup)
router.post('/product/addProduct', authenticateJWT,addProduct)
router.get('/products/getProducts', authenticateJWT, getProducts)
router.put('/product/editProduct/:id', authenticateJWT,editProduct)
router.delete('/product/deleteProduct/:id', authenticateJWT, deleteProduct)


// router.put('/preference/:id', editPreference)





export default router;