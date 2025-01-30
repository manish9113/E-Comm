import express from 'express'

import {getProductsSlider,getProductById} from '../controllers/productController.js'
import setSignup from '../controllers/signupController.js'
import setSingin from '../controllers/signinController.js'
import {checkout, PaymentVerification,getapikey} from '../controllers/paymentController.js'



const router=express.Router()




router.post('/signup',setSignup)
router.post('/signin',setSingin)
router.get('/products',getProductsSlider)
router.get('/products/:id',getProductById)
router.post('/checkout',checkout);
router.post('/paymentverification',PaymentVerification)
router.get('/getapikey',getapikey)


export default router