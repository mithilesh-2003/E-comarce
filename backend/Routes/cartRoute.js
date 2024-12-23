import express from "express";
import { addtoCart, deleteCart, showCart, updateCart } from "../Controller/cartController.js";

const route = express.Router()

route.post('/addtocart', addtoCart)
route.post('/showcart', showCart)
route.post('/updatecart', updateCart)
route.post('/updatecart', updateCart)
route.post('/deletecart', deleteCart)

export default route;