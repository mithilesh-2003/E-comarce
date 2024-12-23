import mongoose from 'mongoose'

const { Schema } = mongoose

const orderSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId , ref: 'Product'},
            quantity: { type: Number, min: 1 }
        }
    ],
    totalAmount: {
        type: Number,
        min: 0
    },
    paymentId: {
        type: String
    },
    receipt: {
        type: String
    },
    status: {
        type: String,
        enum: ['created', 'failed', 'paid'],
        default: 'created'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const orderModel = mongoose.model('Order', orderSchema)

export default orderModel