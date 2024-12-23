import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper and SwiperSlide
import { Navigation, Pagination } from 'swiper/modules';
import { Link } from "react-router-dom";
// Import necessary Swiper modules

// Import Swiper styles
// import 'swiper/swiper-bundle.min.css';

// Styled components for Swiper
const StyledSwiper = styled.div`
  width: 100%;
  height: 100%;
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
  height: 400px; /* Adjust height as needed */

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

function Banner() {
  return (
    <>
      <StyledSwiper>
        <Swiper
          modules={[Navigation, Pagination]} // Add Swiper modules
          spaceBetween={50}
          slidesPerView={1}
          navigation={{ // Navigation options
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
        >
          <StyledSwiperSlide><div className="swiper-slide">
            <div className="banner-bg-image bg_image bg_one-banner ptb--120 ptb_md--80 ptb_sm--60">
              <div className="banner-one-inner-content">
                <span className="pre">Get up to 30% off on your first $150 purchase</span>
                <h1 className="title">Do not miss our amazing <br /> grocery deals</h1>
                <Link to={'/products'} className="rts-btn btn-primary radious-sm with-icon">
                  <div className="btn-text">Shop Now</div>
                  <div className="arrow-icon"><i className="fa-light fa-arrow-right" /></div>
                </Link>
              </div>
            </div>
          </div></StyledSwiperSlide>
          <StyledSwiperSlide><div className="swiper-slide">
            <div className="banner-bg-image bg_image bg_one-banner ptb--120 ptb_md--80 ptb_sm--60">
              <div className="banner-one-inner-content">
                <span className="pre">Get up to 30% off on your first $150 purchase</span>
                <h1 className="title">Amazing grocery deals just for you</h1>
                <Link to={'/products'} className="rts-btn btn-primary radious-sm with-icon">
                  <div className="btn-text">Shop Now</div>
                  <div className="arrow-icon"><i className="fa-light fa-arrow-right" /></div>
                </Link>
              </div>
            </div>
          </div></StyledSwiperSlide>

          {/* Next and Prev buttons */}
          {/* <SwiperButtonNext className="swiper-button-next" />
          <SwiperButtonPrev className="swiper-button-prev" /> */}
        </Swiper>
      </StyledSwiper>
    </>
  );
}

export default Banner;
