import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { Link } from "react-router-dom";

function TopTrendingSection() {

  const [fetchedProducts,setFetchedProducts] = useState([])

  useEffect(()=>{
    const fetchProducts = async()=>{
      try {
        const response = await api.get('/api/allproducts')
        const filterData = response.data.products.filter((product)=> product.type == "topTrendingProducts")
        setFetchedProducts(filterData.slice(0,8))
      } catch (error) {
        console.log(error)
      }
    }
    fetchProducts()
  },[])

  return (
    <>
      {/* rts top tranding product area */}
      <div className="top-tranding-product rts-section-gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="title-area-between">
                <h2 className="title-left mb--10">Top Trending Products</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="cover-card-main-over">
                <div className="row g-4">
                  {
                    fetchedProducts.map((product,index)=>(
                      <div className="col-xl-3 col-md-6 col-sm-12 col-12" key={index}>
                    <div className="single-shopping-card-one tranding-product">
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
                      <div className="body-content">
                        <Link to={`/singleproduct/${product?._id}`}>
                          <h4 className="title">{product?.title}</h4>
                        </Link>
                        <span className="availability">{product?.weight} Pack</span>
                        <div className="price-area">
                          <span className="current">₹{Math.ceil(product?.sellingprice)}</span>
                          <div className="previous">₹{product?.originalprice}</div>
                        </div>
                      </div>
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
      {/* rts top tranding product area end */}
    </>
  );
}

export default TopTrendingSection;
