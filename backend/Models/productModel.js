import mongoose from "mongoose";
const { Schema } = mongoose;

const ProductSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    images: [
        {
            url: {type: String, required: true},
            public_id: {type: String, required: true}
        }
    ],
    description: {
        type: String,
        required: true
    },
    originalprice:{
        type: Number,
        required: true
    },
    sellingprice:{
        type: Number,
        required: true
    },
    discount:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    brandname:{
        type: String,
        required: true
    },
    weight:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    }
},{
    timestamps: true
})

const productModel = mongoose.model('Product', ProductSchema)

export default productModel;