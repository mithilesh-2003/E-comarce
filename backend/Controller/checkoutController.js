import Razorpay from "razorpay";
import orderModel from "../Models/orderModel.js";
import userModel from "../Models/userModel.js";

const razorpayInstance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});


export const createOrder = async (req, res) => {

  const { userId, items, totalAmount } = req.body

  try {
    const newOrder = new orderModel({ userId, items, totalAmount })
    const user = await userModel.findOne({_id: userId})
    user.order.push(newOrder._id)
    await newOrder.save()
    await user.save()
    res.status(200).json({message: "Order created", order: newOrder})
  } catch (error) {
    res.status(500).json({ message: 'Error creating order'});
  }

}

export const showOrder = async(req,res)=>{
  const {orderId} = req.params
  console.log(orderId)

  try {
    const order = await orderModel.findOne({_id: orderId}).populate('items.productId')
    res.status(200).json({message: "order fetched successfully", order: order})
  } catch (error) {
    res.status(500).json({ message: 'Error in finding order'});
  }
}

export const startPayment = async (req, res) => {
  const { amount, currency } = req.body;

  const options = {
    amount: amount * 100,
    currency: currency || "INR",
    receipt: `receipt#${Math.random() * 10000}`,
  };


  try {
    const order = await razorpayInstance.orders.create(options);
    res.status(200).json({ message: "Order successfully", order: order });
  } catch (error) {
    res.status(500).json({ message: "No order created" });
  }
};
