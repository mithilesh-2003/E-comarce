import React from "react";

function OrderTracking() {
  return (
    <>
       <div className="tracing-order-account">
          <h2 className="title">Orders tracking</h2>
          <p>
            To keep up with the status of your order, kindly input your OrderID
            in the designated box below and click the "Track" button. This
            unique identifier can be found on your receipt as well as in the
            confirmation email that was sent to you.
          </p>
          <form action="#" className="order-tracking">
            <div className="single-input">
              <label htmlFor="order-id">Order Id</label>
              <input
                type="text"
                placeholder="Found in your order confirmation email"
                required
              />
            </div>
            <div className="single-input">
              <label htmlFor="order-id">Billing email</label>
              <input type="text" placeholder="Email You use during checkout" />
            </div>
            <button className="rts-btn btn-primary">Track</button>
          </form>
        </div>
    </>
  );
}

export default OrderTracking;
