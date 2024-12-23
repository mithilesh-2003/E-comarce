import express from "express";
import { loginUser, signupUser, userAddress, userDetails, userUpdate } from "../Controller/userController.js";

const route = express.Router()

route.post('/signup', signupUser)
route.post('/login', loginUser)
route.get('/userdetails', userDetails)
route.post('/userupdate', userUpdate)
route.post('/useraddress', userAddress)

export default route;