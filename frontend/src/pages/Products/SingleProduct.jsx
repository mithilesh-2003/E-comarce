import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link, useParams } from "react-router-dom";
import api from "../../utils/api";
import { toast, ToastContainer } from "react-toastify";

function SingleProduct() {

  const { id } = useParams()

  const [product, setProduct] = useState({})
  const [currentImage, setCurrentImage] = useState("")
  const [activeIndex, setActiveIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const user = JSON.parse(localStorage.getItem('user'))

  const handleInc = () => {
    setQuantity((prev) => prev + 1)
  }

  const handleDec = () => {
    if (quantity != 1) {
      setQuantity((prev) => prev - 1)
    } else {
      setQuantity(1)
    }
  }

  const handleAddtoCart = async () => {
    const data = { productId: product._id, userId: user._id, quantity }
    try {
      const response = await api.post('/api/addtocart', data)
      // console.log(response)
      toast.success(response.data.message)
    } catch (error) {
      toast.error(error.response.data.message)
      // console.log(error)
    }
  }


  const handleImageChange = (Imagesrc, index) => {
    setCurrentImage(Imagesrc)
    setActiveIndex(index)
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchSingleProduct = async () => {
      try {
        const response = await api.get(`/api/singleproduct/${id}`)
        // console.log(response)
        setProduct(response.data.singleProduct)
        setCurrentImage(response.data.singleProduct?.images[0].url)
      } catch (error) {
        console.log(error)
      }
    }
    fetchSingleProduct()
  }, [])

  // useEffect()


  return (
    <>
      <Header />

      <div>
        <div className="rts-navigation-area-breadcrumb bg_light-1">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="navigator-breadcrumb-wrapper">
                  <Link to={'/'}>Home</Link>
                  <i className="fa-regular fa-chevron-right" />
                  <Link className="#" >
                    {product?.category}
                  </Link>
                  <i className="fa-regular fa-chevron-right" />
                  <Link className="current">
                    {product?.title}
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
        <div className="rts-chop-details-area rts-section-gap bg_light-1">
          <div className="container">
            <div className="shopdetails-style-1-wrapper">
              <div className="row g-5">
                <div className="col-xl-8 col-lg-8 col-md-12">
                  <div className="product-details-popup-wrapper in-shopdetails">
                    <div className="rts-product-details-section rts-product-details-section2 product-details-popup-section">
                      <div className="product-details-popup">
                        <div className="details-product-area">
                          <div className="product-thumb-area">
                            <div className="cursor" />
                            <div className="thumb-wrapper one filterd-items figure">

                              <div className="product-thumb">
                                <img src={currentImage} alt="product-thumb" />
                              </div>
                            </div>
                            <div className="product-thumb-filter-group">
                              {
                                product?.images?.map((image, index) => (
                                  <div className={`thumb-filter filter-btn ${activeIndex == index && 'active'}`} key={index}
                                    onClick={() => handleImageChange(image.url, index)}
                                  >
                                    <img
                                      src={image.url}
                                      alt="product-thumb-filter"
                                    />
                                  </div>
                                ))
                              }

                            </div>
                          </div>
                          <div className="contents">
                            <div className="product-status">
                              <span className="product-catagory">{product?.category}</span>
                              <div className="rating-stars-group">
                                <div className="rating-star">
                                  <i className="fas fa-star" />
                                </div>
                                <div className="rating-star">
                                  <i className="fas fa-star" />
                                </div>
                                <div className="rating-star">
                                  <i className="fas fa-star-half-alt" />
                                </div>
                                <span>10 Reviews</span>
                              </div>
                            </div>
                            <h2 className="product-title">
                              {product?.title}
                            </h2>
                            <p className="mt--20 mb--20">
                              {product?.description}
                            </p>
                            <span
                              className="product-price mb--15 d-block"
                              style={{ color: "#DC2626", fontWeight: 600 }}
                            >
                              ₹{product?.sellingprice}
                              <span className="old-price ml--15">₹{product?.originalprice}</span>
                            </span>
                            <div className="product-bottom-action">
                              <div className="cart-edits">
                                <div className="quantity-edit action-item">
                                  <button className="button" onClick={handleDec}>
                                    <i className="fal fa-minus minus" />
                                  </button>
                                  <input
                                    type="text"
                                    className="input"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                  />
                                  <button className="button plus" onClick={handleInc}>
                                    +<i className="fal fa-plus plus" />
                                  </button>
                                </div>
                              </div>
                              <a
                                className="rts-btn btn-primary radious-sm with-icon"
                                style={{ cursor: 'pointer' }}
                                onClick={handleAddtoCart}
                              >
                                <div className="btn-text">Add To Cart</div>
                                <div className="arrow-icon">
                                  <i className="fa-regular fa-cart-shopping" />
                                </div>
                                <div className="arrow-icon">
                                  <i className="fa-regular fa-cart-shopping" />
                                </div>
                              </a>
                              <a
                                className="rts-btn btn-primary ml--20"
                              >
                                <i className="fa-light fa-heart" />
                              </a>
                            </div>
                            <div className="product-uniques">
                              {/* <span className="sku product-unipue mb--10">
                                <span
                                  style={{ fontWeight: 400, marginRight: 10 }}
                                >
                                  SKU:{" "}
                                </span>{" "}
                                BO1D0MX8SJ
                              </span> */}
                              <span className="catagorys product-unipue mb--10">
                                <span
                                  style={{ fontWeight: 400, marginRight: 10 }}
                                >
                                  Categories:{" "}
                                </span>{" "}
                                {product?.category}
                              </span>
                              {/* <span className="tags product-unipue mb--10">
                                <span
                                  style={{ fontWeight: 400, marginRight: 10 }}
                                >
                                  Tags:{" "}
                                </span>{" "}
                                fashion, t-shirts, Men
                              </span> */}
                              <span className="tags product-unipue mb--10">
                                <span
                                  style={{ fontWeight: 400, marginRight: 10 }}
                                >
                                  Weight::{" "}
                                </span>{" "}
                                {product?.weight}
                              </span>
                              {/* <span className="tags product-unipue mb--10">
                                <span
                                  style={{ fontWeight: 400, marginRight: 10 }}
                                >
                                  Type:{" "}
                                </span>{" "}
                                original
                              </span> */}
                              {/* <span className="tags product-unipue mb--10">
                                <span
                                  style={{ fontWeight: 400, marginRight: 10 }}
                                >
                                  Category:{" "}
                                </span>{" "}
                                Beverages, Dairy &amp; Bakery
                              </span> */}
                            </div>
                            <div className="share-option-shop-details">
                              <div className="single-share-option">
                                <div className="icon">
                                  <i className="fa-regular fa-heart" />
                                </div>
                                <span>Add To Wishlist</span>
                              </div>
                              <div className="single-share-option">
                                <div className="icon">
                                  <i className="fa-solid fa-share" />
                                </div>
                                <span>Share On social</span>
                              </div>
                              <div className="single-share-option">
                                <div className="icon">
                                  <i className="fa-light fa-code-compare" />
                                </div>
                                <span>Compare</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-12 offset-xl-1  rts-sticky-column-item">
                  <div className="theiaStickySidebar">
                    <div className="shop-sight-sticky-sidevbar  mb--20">
                      <h6 className="title">Available offers</h6>
                      <div className="single-offer-area">
                        <div className="icon">
                          <img src="/images/shop/01.svg" alt="icon" />
                        </div>
                        <div className="details">
                          <p>
                            Get %5 instant discount for the 1st Flipkart Order
                            using Ekomart UPI T&amp;C
                          </p>
                        </div>
                      </div>
                      <div className="single-offer-area">
                        <div className="icon">
                          <img src="/images/shop/02.svg" alt="icon" />
                        </div>
                        <div className="details">
                          <p>
                            Flat $250 off on Citi-branded Credit Card EMI
                            Transactions on orders of $30 and above T&amp;C
                          </p>
                        </div>
                      </div>
                      <div className="single-offer-area">
                        <div className="icon">
                          <img src="/images/shop/03.svg" alt="icon" />
                        </div>
                        <div className="details">
                          <p>Free Worldwide Shipping on all orders over $100</p>
                        </div>
                      </div>
                    </div>
                    <div className="our-payment-method">
                      <h5 className="title">Guaranteed Safe Checkout</h5>
                      <img src="/images/shop/03.png" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <ToastContainer autoClose={3000} closeButton={false} />
    </>
  );
}

export default SingleProduct;
