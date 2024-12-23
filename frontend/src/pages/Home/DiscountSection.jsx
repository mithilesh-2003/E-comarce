import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { Link } from "react-router-dom";
import AddtoCart from "../../components/AddtoCart";

function DiscountSection() {

  const [products,setProducts] = useState([])
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(()=>{
    const fetchProducts = async()=>{
      try {
        const response = await api.get("/api/allproducts")
      const filterProduct = response.data.products.filter((product)=> product.type == "productWithDiscount")
      setProducts(filterProduct)
      } catch (error) {
        console.log(error)
      }
    }
    fetchProducts()
  },[])

  return (
    <>
      {/* rts grocery feature area start */}
      <div className="rts-grocery-feature-area rts-section-gapBottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="title-area-between">
                <h2 className="title-left">Products With Discounts</h2>
                {/* <div className="countdown">
                  <div className="countDown">10/05/2025 10:20:00</div>
                </div> */}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="product-with-discount">
                <div className="row g-5">
                  <div className="col-xl-4 col-lg-12">
                    <a
                      className="single-discount-with-bg"
                    >
                      <div className="inner-content">
                        <h4 className="title">
                          Alpro Organic Flavored <br />
                          Fresh Juice
                        </h4>
                        <div className="price-area">
                          <span>Only</span>
                          <h4 className="title">$15.00</h4>
                        </div>
                      </div>
                    </a>
                    <a
                      className="single-discount-with-bg bg-2"
                    >
                      <div className="inner-content">
                        <h4 className="title">
                          Alpro Organic Flavored <br />
                          Fresh Juice
                        </h4>
                        <div className="price-area">
                          <span>Only</span>
                          <h4 className="title">$15.00</h4>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="col-xl-8 col-lg-12">
                    <div className="row">
                      <div className="col-lg-6">
                        {
                          products.slice(0,2).map((product,index)=>(
                            <div className="single-shopping-card-one discount-offer" key={index}>
                          <Link
                            to={`/singleproduct/${product?._id}`}
                            className="thumbnail-preview"
                          >
                            <div className="badge">
                              <span>
                                {product?.discount}% <br />
                                Off
                              </span>
                              <i className="fa-solid fa-bookmark" />
                            </div>
                            <img
                              src={product?.images[0]?.url} 
                              alt="grocery"
                            />
                          </Link>
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
                            <AddtoCart  productId={product?._id} userId={user._id}/>
                          </div>
                        </div>
                          ))
                        }
                      </div>
                      <div className="col-lg-6">
                      {
                          products.slice(2,4).map((product,index)=>(
                            <div className="single-shopping-card-one discount-offer" key={index}>
                          <Link
                            to={`/singleproduct/${product?._id}`}
                            className="thumbnail-preview"
                          >
                            <div className="badge">
                              <span>
                                {product?.discount}% <br />
                                Off
                              </span>
                              <i className="fa-solid fa-bookmark" />
                            </div>
                            <img
                              src={product?.images[0]?.url} 
                              alt="grocery"
                            />
                          </Link>
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
                            <AddtoCart  productId={product?._id} userId={user._id}/>
                          </div>
                        </div>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* rts grocery feature area end */}
    </>
  );
}

export default DiscountSection;
