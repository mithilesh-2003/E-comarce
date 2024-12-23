import React from "react";
import api from "../utils/api";
import { Link } from "react-router-dom";
import AddtoCart from "./AddtoCart";

function FeaturedCard({product}) {
// console.log(product)
// if(product){
//   const {_id,brandname,category,description,originalprice,sellingprice,title,weight,images} = product
//   // console.log(_id)
// }
  
  // const user = JSON.parse(localStorage.getItem('user'))
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;



  return (
    <>
      <div className="swiper-slide">
        <div className="single-shopping-card-one">
          <div className="image-and-action-area-wrapper">
            <Link to={`/singleproduct/${product?._id}`} className="thumbnail-preview">
              <div className="badge">
                <span>
                  {product?.discount}% <br />
                  Off
                </span>
                <i className="fa-solid fa-bookmark" />
              </div>
              <img src={product?.images[0]?.url} alt="grocery" />
            </Link>
            <div className="action-share-option">
              <div
                className="single-action openuptip message-show-action"
                data-flow="up"
                title="Add To Wishlist"
              >
                <i className="fa-light fa-heart" />
              </div>
              <div
                className="single-action openuptip"
                data-flow="up"
                title="Compare"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <i className="fa-solid fa-arrows-retweet" />
              </div>
              <div
                className="single-action openuptip cta-quickview product-details-popup-btn"
                data-flow="up"
                title="Quick View"
              >
                <i className="fa-regular fa-eye" />
              </div>
            </div>
          </div>
          <div className="body-content">
            <Link to={`/singleproduct/${product?._id}`}>
              <h4 className="title">
                {product?.title}
              </h4>
            </Link>
            <span className="availability">{product?.weight} Pack</span>
            <div className="price-area">
              <span className="current">₹{Math.ceil(product?.sellingprice)}</span>
              <div className="previous">₹{product?.originalprice}</div>
            </div>
            {
              user ? (<AddtoCart productId={product?._id} userId={user._id}/>) : (<AddtoCart productId={product?._id} userId={null}/>)
            }
            {/* <AddtoCart productId={product?._id} userId={user._id}/> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default FeaturedCard;
