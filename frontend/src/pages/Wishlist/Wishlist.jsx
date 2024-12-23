import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import WishlistCard from './WishlistCard'
import { Link } from 'react-router-dom'

function Wishlist() {
  return (
    <>
      <Header/>
      <div>
        <div className="rts-navigation-area-breadcrumb bg_light-1">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="navigator-breadcrumb-wrapper">
                  <Link to="/">Home</Link>
                  <i className="fa-regular fa-chevron-right" />
                  <Link className="current" to="/wishlist">
                    wishlist
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section-seperator bg_light-1">
          <div className="container">
            <hr className="section-seperator" />
          </div>
        </div>
        {/* rts cart area start */}
        <div className="rts-cart-area rts-section-gap bg_light-1">
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-12">
                <div className="rts-cart-list-area wishlist">
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
                    <div className="button-area"></div>
                  </div>
                  <WishlistCard/>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* rts cart area end */}
      </div>
      <Footer/>
    </>
  )
}

export default Wishlist
