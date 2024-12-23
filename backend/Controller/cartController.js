import cartModel from "../Models/cartModel.js";

export const addtoCart = async (req, res) => {
  const { productId, userId, quantity } = req.body;

  try {
    const oldCart = await cartModel.findOne({ user: userId });
    // console.log(oldCart)

    if (oldCart) {
      const productIndex = oldCart.products.findIndex(
        (p) => p.product.toString() === productId
      );

      if (productIndex > -1) {
        oldCart.products[productIndex].quantity += quantity;
      } else {
        oldCart.products.push({ product: productId, quantity });
      }
      await oldCart.save();
      res.status(200).json({ message: "Cart updated" });
    } else {
      const newcart = new cartModel({
        user: userId,
        products: [{ product: productId, quantity }],
      });
      await newcart.save();
      res.status(200).json({ message: "Added to cart successfully" });
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ messgae: "Not added to cart" });
  }
};

export const showCart = async (req, res) => {
  const { userId } = req.body;
  // console.log(userId)
  try {
    const cart = await cartModel
      .findOne({ user: userId })
      .populate("products.product");
    if (cart) {
      res.status(200).json({ message: "Cart items fetched", cart });
    } else {
      res.status(400).json({ message: "No items added in cart" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const updateCart = async (req, res) => {
  const { productId, userId, quantity } = req.body

  try {
    const oldCart = await cartModel.findOne({ user: userId })
    if (oldCart) {
      const productIndex = oldCart.products.findIndex((p) => p.product.toString() === productId)
      if (productIndex > -1) {
        oldCart.products[productIndex].quantity = quantity
      }
    }
    await oldCart.save()
    res.status(200).json({ message: 'Cart updated' })
  } catch (error) {
    res.status(500).json({ message: 'Cart not updated' })
    console.log(error)
  }

}

export const deleteCart = async (req, res) => {
  const { productId, userId } = req.body

  try {
    const oldCart = await cartModel.findOne({ user: userId })
    if (oldCart) {
      const productIndex = oldCart.products.findIndex((p) => p.product.toString() === productId)
      if (productIndex > -1) {
        oldCart.products.splice(productIndex, 1)
        await oldCart.save()
        return res.status(200).json({ message: 'Product removed from cart' });
      }
      return res.status(404).json({ message: 'Product not found in cart' });
    }
    return res.status(404).json({ message: 'Cart not found' });
  } catch (error) {
    res.status(500).json({ message: 'Unable to update cart' });
    console.log(error)
  }

}