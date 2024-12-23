import React, { useEffect, useState } from "react";

function WishlistCard() {

    let price = 200;
    let [qut,Setqut] = useState(1);
    let [total,SetTotal] = useState(price)

    useEffect(()=>{
        SetTotal(price*qut)
    }, [qut])
    var handleIncQut = ()=>{
        Setqut((prev)=> prev+1)
        SetTotal(price*qut)
    }

    var handleDecQut = ()=>{
        if (qut > 1) {
            Setqut((prev) => prev - 1);
          }
    }
    // console.log(qut)


  return (
    <>
      <div className="single-cart-area-list main  item-parent">
                    <div className="product-main-cart">
                      <div className="close section-activation">
                        <img src="/images/shop/01.png" alt="shop" />
                      </div>
                      <div className="thumbnail">
                        <img src="/images/shop/02.png" alt="shop" />
                      </div>
                      <div className="information">
                        <h6 className="title">
                          SunChips Minis, Garden Salsa Flavored Canister,
                          Multigrain Chips
                        </h6>
                        <span>SKU:BG-1001</span>
                      </div>
                    </div>
                    <div className="price">
                      <p>₹ {price}</p>
                    </div>
                    <div className="quantity">
                      <div className="quantity-edit">
                        <input type="text" className="input" value={qut} readOnly/>
                        <div className="button-wrapper-action">
                          <button className="button" onClick={handleDecQut}>
                            <i className="fa-regular fa-chevron-down" />
                          </button>
                          <button className="button plus" onClick={handleIncQut}>
                            +<i className="fa-regular fa-chevron-up" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="subtotal">
                      <p>₹ {total}</p>
                    </div>
                    <div className="button-area">
                      <a
                        href="#"
                        className="rts-btn btn-primary radious-sm with-icon"
                      >
                        <div className="btn-text">Add To Cart</div>
                        <div className="arrow-icon">
                          <i className="fa-regular fa-cart-shopping" />
                        </div>
                        <div className="arrow-icon">
                          <i className="fa-regular fa-cart-shopping" />
                        </div>
                      </a>
                    </div>
                  </div>
    </>
  );
}

export default WishlistCard;
