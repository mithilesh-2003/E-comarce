import productModel from "../Models/productModel.js";
import fs from 'fs';
import path from 'path';
import cloudinary from "../utils/cloudinaryConfig.js";
import { fileURLToPath } from 'url';

// Define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const addProduct = async(req,res)=>{
    try {
        const {title,description,originalprice,sellingprice,discount,category,brandname,weight,type} = req.body

        const images = [];

        for(const file of req.files){
            try {
                const result = await cloudinary.uploader.upload(file.path,{folder: 'products'})
                images.push({
                    url: result.secure_url,
                    public_id: result.public_id
                })
                fs.unlinkSync(path.join(__dirname, '../uploads/products', file.filename))
            } catch (error) {
                console.log('Error uploading file:', file.filename, error)
            }
        }


        const newProduct = new productModel({title,images,description,originalprice,sellingprice,discount,category,brandname,weight,type})
        await newProduct.save()
        res.status(200).json({message:"New prodect added", newProduct})
    } catch (error) {
        res.status(500).json({message: "Product is not added"})
        console.log(error)
    }
}

export const allProducts = async(req,res)=>{
    try {
        const allproducts = await productModel.find();
        res.status(200).json({message: "All product fetched", products: allproducts})
        // console.log(allproducts)
    } catch (error) {
        res.status(500).json({message: "Products fetching problem"})
    }
}

export const singleProduct = async(req,res)=>{
    const { id } = req.params;
    // const {id} = req.query;
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //     return res.status(400).json({ message: "Invalid product ID format" });
    // }
    try {
        const singleProduct = await productModel.findOne({_id: id})
        res.status(200).json({message: "Single product fetched", singleProduct: singleProduct})
    } catch (error) {
        res.status(500).json({message: "Single products fetching problem"})
    }
}

export const deleteProduct = async(req,res)=>{
    const {id} = req.params;

    try {
        const product = await productModel.findOne({_id: id})
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        const images = product.images;

        for(const image of images){
            try {
                await cloudinary.uploader.destroy(image.public_id)
                console.log(`Deleted image from Cloudinary: ${image.public_id}`);
            } catch (error) {
                console.log(`Error deleting image from Cloudinary: ${image.public_id}`, error);
            }
        }

        // images.forEach((image)=>{
        //     const filePath = path.join(process.cwd(), 'uploads/products', image);
        //     fs.unlink(filePath, (err) => {
        //         if (err) console.log(`Error deleting image: ${image}`, err);
        //       });
        // })
        await productModel.deleteOne({_id: id})
        res.status(200).json({message: "Product deleted successfully"})
    } catch (error) {
        res.status(500).json({message: "Problem in delete product"})
    }
}


// export default {addProduct, allProducts};