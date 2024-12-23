import categoryModel from "../Models/categoryModel.js";
import fs from "fs";
import path from "path";
import cloudinary from "../utils/cloudinaryConfig.js";
import { fileURLToPath } from "url";

// Define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const addCategory = async (req, res) => {
  try {
    const { catname, stocks, description } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    // image upload on cloudinary
    const imageUploaded = await cloudinary.uploader.upload(req.file.path, {
      folder: "categories",
    });
    const image = {
      url: imageUploaded.secure_url,
      public_id: imageUploaded.public_id,
    };

    // sava data on database
    const newCategory = new categoryModel({
      catname,
      image,
      stocks,
      description,
    });
    await newCategory.save();

    // delete image from local server
    fs.unlink(
      path.join(__dirname, "../uploads/categories", req.file.filename),
      (err) => {
        if (err) {
          console.error("Error deleting local file:", err);
        } else {
          console.log("Local file deleted successfully");
        }
      }
    );
    res.status(200).json({ message: "New category added", newCategory });
  } catch (error) {
    res.status(500).json({ message: "Category not added", error });
  }
};

export const allCategory = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    res.status(200).json({ message: "Category fetched", categories });
  } catch (error) {
    res.status(500).json({ message: "Category not fetched", error });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await categoryModel.findOne({ _id: id });
    const image = category.image;
    await cloudinary.uploader.destroy(image.public_id);
    await categoryModel.deleteOne({ _id: id });
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Problem in delete category" });
  }
};
