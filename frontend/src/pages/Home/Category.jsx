import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper and SwiperSlide
import { Navigation, Pagination } from "swiper/modules";
import CatCard from "../../components/CatCard";
import api from "../../utils/api"
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

function Category() {

  const [categories,setCategories] = useState([])

  useEffect(()=>{
    const fetchCategory = async()=>{
      try {
        const response = await api.get('/api/allcategory')
        setCategories(response.data.categories)
        // console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
    fetchCategory()
  },[])

  return (
    <>
      <StyledSwiper>
        <Swiper
          spaceBetween={10} // Reduce space between slides for smaller screens
          slidesPerView={10} // Default is 10 slides at a time for large screens
          pagination={{ clickable: true }} // Enable pagination dots
          breakpoints={{
            320: {
              slidesPerView: 1, // 1 slide for very small screens
              spaceBetween: 10, // Adjust space between slides for smaller screens
            },
            480: {
              slidesPerView: 2, // 2 slides for small screens
              spaceBetween: 10, // Adjust space between slides for small screens
            },
            640: {
              slidesPerView: 3, // 3 slides for slightly larger screens
            },
            768: {
              slidesPerView: 4, // 4 slides for medium screens
            },
            1024: {
              slidesPerView: 5, // Adjust to 5 for larger screens if necessary
            },
            1200: {
              slidesPerView: 10, // Maintain 10 slides for very large screens (>= 1200px)
            },
          }}
        >
          {
            categories.map((category,index)=>(
              <StyledSwiperSlide key={index}>
            <CatCard category={category}/>
          </StyledSwiperSlide>
            ))
          }
          {/* Next and Prev buttons */}
          {/* <SwiperButtonNext className="swiper-button-next" />
          <SwiperButtonPrev className="swiper-button-prev" /> */}
        </Swiper>
      </StyledSwiper>
    </>
  );
}

export default Category;
