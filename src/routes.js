import express from "express"

import multer from "multer";
import multerConfig from './config/multer.js'

import userController from "./app/controllers/userController.js";
import sessionController from "./app/controllers/SessionController.js";
import {productsController, productsAll, productsUpdate }from "./app/controllers/ProductController.js";
import { categoryController, categoryAll, categoryUpdate } from "./app/controllers/CategoryController.js";
import {OrderController,  OrdersAll, UpdateOrder } from "./app/controllers/OrderController.js";

import CreatePaymentController from "./app/controllers/stripe/CreatePaymentController.js";

import authMiddleware from "./app/middlewares/auth.js";


//import crypto from "node:crypto"

const router = express.Router();

const upload = multer(multerConfig);

router.post('/users', userController);
router.post('/session', sessionController);


router.use(authMiddleware); //todas as rotas abaixo desse middleware vão precisar de autenticação

router.post('/products',upload.single('file'), productsController);
router.get('/products', productsAll);
router.put('/products/:id',upload.single('file'), productsUpdate);

router.post('/categories',upload.single('file'), categoryController);
router.get('/categories', categoryAll);
router.put('/categories/:id',upload.single('file'), categoryUpdate);

router.post('/orders', OrderController);
router.get('/orders', OrdersAll);
router.put('/orders/:id', UpdateOrder);

router.post("/create-payment-intent", CreatePaymentController);

export default router

//request => middleware => controller=> model=> database =>response