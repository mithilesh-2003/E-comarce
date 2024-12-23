import mongoose from 'mongoose'

const { Schema } = mongoose

const userSchema = new Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    address: {
        country: {
            type: String
        },
        street_address: {
            type: String
        },
        city: {
            type: String
        },
        state: {
            type: String
        },
        zip_code: {
            type: Number
        },
        phone: {
            type: String
        }
    },
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    order: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }]
}, { timestamps: true })

const userModel = mongoose.model('User', userSchema);

export default userModel;