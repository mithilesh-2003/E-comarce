import React, { useEffect, useState } from "react";
import CartCard from "./CartCard";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import api from "../../utils/api";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  // const [newCart, SetNewCart] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();


  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await api.post("/api/showcart", { userId: user._id });
        setCart(response.data.cart.products);
        // console.log(response)
        const initialTotal = response.data.cart.products.reduce(
          (acc, item) => acc + item.product.sellingprice * item.quantity,
          0
        );
        setTotal(initialTotal);
      } catch (error) {
        toast.error(error.response.data.message);
        // console.log(error)
      }
    };
    fetchCart();
  }, []);

  const updateTotal = (subtotalDifference) => {
    setTotal((prev) => prev + subtotalDifference);
  };

  const handleCheckOut = async()=>{
    const orderData = {
      userId: user._id,
      items: cart.map((item)=> ({productId: item.product._id, quantity: item.quantity})),
      totalAmount: total,
    }
    try {
      const response = await api.post('/api/createorder', orderData)
      // console.log(response)
      if(response){
        if (response.data && response.data.order) {
          navigate(`/checkout/${response.data.order._id}`);
      } else {
          console.error('Order not found in response:', response.data);
      }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Header />
      {/* rts cart area start */}
      <div className="rts-cart-area rts-section-gap bg_light-1">
        <div className="container">
          <div className="row g-5">
            <div className="col-xl-9 col-lg-12 col-md-12 col-12 order-2 order-xl-1 order-lg-2 order-md-2 order-sm-2">
              {/* <div className="cart-area-main-wrapper">
                <div className="cart-top-area-note">
                  <p>
                    Add <span>$59.69</span> to cart and get free shipping
                  </p>
                  <div className="bottom-content-deals mt--10">
                    <div className="single-progress-area-incard">
                      <div className="progress">
                        <div
                          className="progress-bar wow fadeInLeft"
                          role="progressbar"
                          style={{ width: "80%" }}
                          aria-valuenow={25}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="rts-cart-list-area">
                <div className="single-cart-area-list head">
                  <div className="product-main">
                    <p>Products</p>
                  </div>
                  <div className="price">
                    <p>Price</p>
                  </div>
                  <div className="quantity">
                    <p>Quantity</p>
                  </div>
                  <div className="subtotal">
                    <p>SubTotal</p>
                  </div>
                </div>
                {cart.map((singleCart, index) => (
                  <CartCard
                    cart={singleCart}
                    key={index}
                    updateTotal={updateTotal}
                    setCart={setCart}
                  />
                ))}

                {/* <div className="bottom-cupon-code-cart-area">
                  <form action="#">
                    <input type="text" placeholder="Cupon Code" />
                    <button className="rts-btn btn-primary">
                      Apply Coupon
                    </button>
                  </form>
                  <a href="#" className="rts-btn btn-primary mr--50">
                    Clear All
                  </a>
                </div> */}
                {/* <div className="bottom-cupon-code-cart-area">
                  <form action="#">
                    <input type="text" placeholder="Cupon Code" />
                    <button className="rts-btn btn-primary">
                      Apply Coupon
                    </button>
                  </form>
                  <a href="#" className="rts-btn btn-primary mr--50">
                    Clear All
                  </a>
                </div> */}
              </div>
            </div>
            <div className="col-xl-3 col-lg-12 col-md-12 col-12 order-1 order-xl-2 order-lg-1 order-md-1 order-sm-1">
              <div className="cart-total-area-start-right">
                <h5 className="title">Cart Totals</h5>
                <div className="subtotal">
                  <span>Total</span>
                  <h6 className="price">₹ {total}</h6>
                </div>
                {/* <div className="shipping">
                  <span>Shipping</span>
                  <ul>
                    <li>
                      <input type="radio" id="f-option" name="selector" />
                      <label htmlFor="f-option">Free Shipping</label>
                      <div className="check" />
                    </li>
                    <li>
                      <input type="radio" id="s-option" name="selector" />
                      <label htmlFor="s-option">Flat Rate</label>
                      <div className="check">
                        <div className="inside" />
                      </div>
                    </li>
                    <li>
                      <input type="radio" id="t-option" name="selector" />
                      <label htmlFor="t-option">Local Pickup</label>
                      <div className="check">
                        <div className="inside" />
                      </div>
                    </li>
                    <li>
                      <p>Shipping options will be updated during checkout</p>
                      <p className="bold">Calculate Shipping</p>
                    </li>
                  </ul>
                </div> */}
                <div className="bottom">
                  {/* <div className="wrapper">
                    <span>Subtotal</span>
                    <h6 className="price">$1100.00</h6>
                  </div> */}
                  <div className="button-area">
                    
                      <button className="rts-btn btn-primary" onClick={handleCheckOut}>
                        Proceed To Checkout
                      </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* rts cart area end */}
      <Footer />
      <ToastContainer autoClose={3000} closeButton={false} />
    </>
  );
}

export default Cart;
