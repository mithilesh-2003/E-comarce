import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper and SwiperSlide
import { Navigation, Pagination } from "swiper/modules";
// import CatCard from "../../components/CatCard";
import FeaturedCard from "../../components/FeaturedCard";
import api from "../../utils/api";
// Import necessary Swiper modules

// Import Swiper styles
// import 'swiper/swiper-bundle.min.css';

// Styled components for Swiper
const StyledSwiper = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  margin-top: 10px;
`;

// Styled component for SwiperSlide
const StyledSwiperSlide = styled(SwiperSlide)`
  text-align: center;
  font-size: 18px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;

  /* Fixing the height to ensure consistency across all slides */
  height: auto; /* Adjust height as needed */

  .banner-bg-image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover; /* Ensures the image covers the container without stretching */
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover; /* Ensures the image fills the entire space, maintaining aspect ratio */
  }
`;

// Button styles for next and prev buttons
const SwiperButtonNext = styled.div`
  /* Add your button styles here */
`;

const SwiperButtonPrev = styled.div`
  /* Add your button styles here */
`;

function FeaturedSection() {

  const [featuredProducts,setFeaturedProducts] = useState([])

  useEffect(()=>{
    const fetchedProduct = async()=>{
      try {
        const response = await api.get('/api/allproducts');

        const filterData = response.data.products.filter((product)=> product.type == "featuredGrocery")
        setFeaturedProducts(filterData)
        // console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
    fetchedProduct()
  }, [])

  return (
    <>
      <div className="rts-grocery-feature-area rts-section-gapBottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="title-area-between" style={{margin:0}}>
                <h2 className="title-left">Featured Grocery</h2>
                <div className="next-prev-swiper-wrapper">
                  <div className="swiper-button-prev">
                    <i className="fa-regular fa-chevron-left" />
                  </div>
                  <div className="swiper-button-next">
                    <i className="fa-regular fa-chevron-right" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="category-area-main-wrapper-one">
                <StyledSwiper>
                <Swiper
                    modules={[Navigation, Pagination]} // Ensure the Navigation module is imported
                    spaceBetween={10} // Adjust space between slides
                    slidesPerView={6} // Default number of slides for large screens
                    navigation={{
                      nextEl: ".swiper-button-next", // Target the next button
                      prevEl: ".swiper-button-prev", // Target the previous button
                    }}
                    breakpoints={{
                      320: {
                        slidesPerView: 1, // 1 slide for small screens (mobile)
                        spaceBetween: 10, // Reduce space between slides
                      },
                      480: {
                        slidesPerView: 2, // 2 slides for slightly larger screens
                        spaceBetween: 10,
                      },
                      768: {
                        slidesPerView: 3, // 3 slides for tablets
                        spaceBetween: 20,
                      },
                      1024: {
                        slidesPerView: 5, // 5 slides for desktops
                        spaceBetween: 30,
                      },
                      1200: {
                        slidesPerView: 6, // 6 slides for large screens
                      },
                    }}
                  >
                    
                    {
                      featuredProducts.map((product,index)=>(
                        <StyledSwiperSlide key={index}>
                      <FeaturedCard product={product}/>
                    </StyledSwiperSlide>
                      ))
                    }
                    {/* Next and Prev buttons */}
                    {/* <SwiperButtonNext className="swiper-button-next" />
          <SwiperButtonPrev className="swiper-button-prev" /> */}
                  </Swiper>
                </StyledSwiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FeaturedSection;
