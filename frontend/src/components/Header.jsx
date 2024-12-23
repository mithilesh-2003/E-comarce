import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import { toast } from "react-toastify";

function Header() {

  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem('token');

  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    const fetchedCategory = async () => {
      try {
        const response = await api.get('/api/allcategory')
        setCategories(response.data.categories)
      } catch (error) {
        console.log(error)
      }
    }
    fetchedCategory()
  }, [])

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await api.post('/api/showcart', { userId: user._id })
        setCart(response.data.cart.products.lenght != 0 ? response.data.cart.products: 0)
        // console.log(response)
      } catch (error) {
        toast.error(error.response.message)
        // console.log(error)
      }
    }

    fetchCart()
  }, [cart])



  return (
    <>
      <div className="rts-header-one-area-one">
        <div className="search-header-area-main">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="logo-search-category-wrapper">
                  <Link to={'/'} className="logo-area">
                    <img
                      src="/images/logo/logo-01.svg"
                      alt="logo-main"
                      className="logo"
                    />
                  </Link>
                  <div className="category-search-wrapper">
                    <div className="category-btn category-hover-header">
                      <img
                        className="parent"
                        src="/images/icons/bar-1.svg"
                        alt="icons"
                      />
                      <span>Categories</span>
                      <ul
                        className="category-sub-menu"
                        id="category-active-four"
                      >
                        {
                          categories.map((category, index) => (
                            <li key={index}>
                              <Link to={`/products/${category?.catname}`} className="menu-item">
                                {/* <img src={`${api.defaults.baseURL}uploads/category/${category?.image}`} alt="icons" /> */}
                                <span>{category.catname}</span>
                                {/* <i className="fa-regular fa-plus" /> */}
                              </Link>
                            </li>
                          ))
                        }
                        {/* <li>
                          <a href="#" className="menu-item">
                            <img src="/images/icons/02.svg" alt="icons" />
                            <span>Meats &amp; Seafood</span>
                            <i className="fa-regular fa-plus" />
                          </a>
                          <ul className="submenu mm-collapse">
                            <li>
                              <a className="mobile-menu-link" href="#">
                                Breakfast
                              </a>
                            </li>
                            <li>
                              <a className="mobile-menu-link" href="#">
                                Dinner
                              </a>
                            </li>
                            <li>
                              <a className="mobile-menu-link" href="#">
                                {" "}
                                Pumking
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="#" className="menu-item">
                            <img src="/images/icons/03.svg" alt="icons" />
                            <span>Breads &amp; Bakery</span>
                          </a>
                        </li>
                        <li>
                          <a href="#" className="menu-item">
                            <img src="/images/icons/04.svg" alt="icons" />
                            <span>Chips &amp; Snacks</span>
                            <i className="fa-regular fa-plus" />
                          </a>
                          <ul className="submenu mm-collapse">
                            <li>
                              <a className="mobile-menu-link" href="#">
                                Breakfast
                              </a>
                            </li>
                            <li>
                              <a className="mobile-menu-link" href="#">
                                Dinner
                              </a>
                            </li>
                            <li>
                              <a className="mobile-menu-link" href="#">
                                {" "}
                                Pumking
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="#" className="menu-item">
                            <img src="/images/icons/05.svg" alt="icons" />
                            <span>Medical Healthcare</span>
                          </a>
                        </li>
                        <li>
                          <a href="#" className="menu-item">
                            <img src="/images/icons/06.svg" alt="icons" />
                            <span>Breads &amp; Bakery</span>
                          </a>
                        </li>
                        <li>
                          <a href="#" className="menu-item">
                            <img src="/images/icons/07.svg" alt="icons" />
                            <span>Biscuits &amp; Snacks</span>
                            <i className="fa-regular fa-plus" />
                          </a>
                          <ul className="submenu mm-collapse">
                            <li>
                              <a className="mobile-menu-link" href="#">
                                Breakfast
                              </a>
                            </li>
                            <li>
                              <a className="mobile-menu-link" href="#">
                                Dinner
                              </a>
                            </li>
                            <li>
                              <a className="mobile-menu-link" href="#">
                                {" "}
                                Pumking
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="#" className="menu-item">
                            <img src="/images/icons/08.svg" alt="icons" />
                            <span>Frozen Foods</span>
                          </a>
                        </li>
                        <li>
                          <a href="#" className="menu-item">
                            <img src="/images/icons/09.svg" alt="icons" />
                            <span>Grocery &amp; Staples</span>
                          </a>
                        </li>
                        <li>
                          <a href="#" className="menu-item">
                            <img src="/images/icons/10.svg" alt="icons" />
                            <span>Other Items</span>
                          </a>
                        </li> */}
                      </ul>
                    </div>
                    <form action="#" className="search-header">
                      <input
                        type="text"
                        placeholder="Search for products, categories or brands"
                        required
                      />
                      <a
                        href="#"
                        className="rts-btn btn-primary radious-sm with-icon"
                      >
                        <div className="btn-text">Search</div>
                        <div className="arrow-icon">
                          <i className="fa-light fa-magnifying-glass" />
                        </div>
                        <div className="arrow-icon">
                          <i className="fa-light fa-magnifying-glass" />
                        </div>
                      </a>
                    </form>
                  </div>
                  <div className="actions-area">
                    <div className="search-btn" id="searchs">
                      <svg
                        width={17}
                        height={16}
                        viewBox="0 0 17 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.75 14.7188L11.5625 10.5312C12.4688 9.4375 12.9688 8.03125 12.9688 6.5C12.9688 2.9375 10.0312 0 6.46875 0C2.875 0 0 2.9375 0 6.5C0 10.0938 2.90625 13 6.46875 13C7.96875 13 9.375 12.5 10.5 11.5938L14.6875 15.7812C14.8438 15.9375 15.0312 16 15.25 16C15.4375 16 15.625 15.9375 15.75 15.7812C16.0625 15.5 16.0625 15.0312 15.75 14.7188ZM1.5 6.5C1.5 3.75 3.71875 1.5 6.5 1.5C9.25 1.5 11.5 3.75 11.5 6.5C11.5 9.28125 9.25 11.5 6.5 11.5C3.71875 11.5 1.5 9.28125 1.5 6.5Z"
                          fill="#1F1F25"
                        />
                      </svg>
                    </div>
                    <div className="menu-btn" id="menu-btn">
                      <svg
                        width={20}
                        height={16}
                        viewBox="0 0 20 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect y={14} width={20} height={2} fill="#1F1F25" />
                        <rect y={7} width={20} height={2} fill="#1F1F25" />
                        <rect width={20} height={2} fill="#1F1F25" />
                      </svg>
                    </div>
                  </div>
                  {
                    token ? (
                      <div className="accont-wishlist-cart-area-header">
                        <Link to={'/account'} className="btn-border-only account">
                          <i className="fa-light fa-user" />
                          <span>Account</span>
                        </Link>
                        <Link
                          to="/wishlist"
                          className="btn-border-only wishlist"
                        >
                          <i className="fa-regular fa-heart" />
                          <span className="text">Wishlist</span>
                          <span className="number">2</span>
                        </Link>
                        <div className="btn-border-only cart category-hover-header">
                          <i className="fa-sharp fa-regular fa-cart-shopping" />
                          <span className="text">My Cart</span>
                          <span className="number">{cart.length}</span>
                          <Link to={'/cart'} className="over_link" />
                        </div>
                      </div>
                    ) : (
                      <div className="accont-wishlist-cart-area-header">
                        <Link to={'/signup'} className="btn-border-only account">
                          <i className="fa-light fa-user" />
                          <span>Signup</span>
                        </Link>
                        <Link to={'/login'} className="btn-border-only account">
                          <i className="fa-light fa-user" />
                          <span>Login</span>
                        </Link>
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
