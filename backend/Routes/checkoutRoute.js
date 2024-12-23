import express from 'express'
import { createOrder, showOrder, startPayment } from '../Controller/checkoutController.js'

const route = express.Router()


route.post('/createorder', createOrder);
route.get('/showorder/:orderId', showOrder);
route.post('/startpayment', startPayment);


export default route;
