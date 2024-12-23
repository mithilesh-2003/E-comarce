import express from "express";
import { addCategory, allCategory, deleteCategory } from "../Controller/categoryController.js";
import uploadCategory from '../utils/uploadCategory.js'

const route = express.Router()

route.post('/addcategory', uploadCategory.single('image'),addCategory)
route.get('/allcategory', allCategory)
route.get('/categorydelete/:id', deleteCategory)

export default route;