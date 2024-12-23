import React from "react";
import api from "../utils/api"
import { Link } from "react-router-dom";

function CatCard({category}) {

  const{image,catname} = category
  // console.log(image,catname)

  return (
    <>
      {/* single swiper start */}
      <div className="swiper-slide">
        <Link to={`/products/${category?.catname}`} className="single-category-one">
          <img src={category?.image?.url} alt="category" />
          <p>{catname}</p>
        </Link>
      </div>
      {/* single swiper end */}
    </>
  );
}

export default CatCard;
