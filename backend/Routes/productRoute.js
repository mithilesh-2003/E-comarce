import express from "express";

const route = express.Router()

import {addProduct,allProducts, deleteProduct, singleProduct} from "../Controller/productController.js";
import upload from "../utils/upload.js";

route.post('/addproduct', upload.array('images', 5), addProduct)
route.get('/allproducts', allProducts)
route.get('/singleproduct/:id', singleProduct)
route.get('/productdelete/:id', deleteProduct)

export default route;