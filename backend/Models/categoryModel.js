import mongoose from "mongoose";

const {Schema} = mongoose

const categorySchema = new Schema({
    catname: {
        type: String,
        required: true
    },
    image:{
        url: {type: String, required: true},
        public_id: { type: String, required: true } 
    },
    stocks:{
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

const categoryModel = mongoose.model('Category', categorySchema)

export default categoryModel;