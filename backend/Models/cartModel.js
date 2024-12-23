import mongoose from "mongoose";

const { Schema } = mongoose;

const cartSchema = new Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const cartModel = mongoose.model("Cart", cartSchema);
export default cartModel;
