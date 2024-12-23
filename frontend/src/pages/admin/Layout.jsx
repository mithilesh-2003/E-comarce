import React from 'react'
import Dashboard from './Dashboard'

import { Link, Outlet, useLocation } from 'react-router-dom'


function Layout() {

    const location = useLocation()

  return (
    <>
      <div>
        <div className="rts-navigation-area-breadcrumb">
          <div className="container-2">
            <div className="row">
              <div className="col-lg-12">
                <div className="navigator-breadcrumb-wrapper">
                  <Link to={'/'}>Home</Link>
                  <i className="fa-regular fa-chevron-right" />
                  <Link className="current" to={'/admin'}>
                    Admin
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="account-tab-area-start rts-section-gap">
          <div className="container-2">
            <div className="row">
              <div className="col-lg-3">
                <div
                  className="nav accout-dashborard-nav flex-column nav-pills me-3"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <Link to={'/admin'}>
                  <button
                    className={`nav-link  ${location.pathname == '/admin' && 'active'}`}
                    id="v-pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-home"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-home"
                    aria-selected="true"
                  >
                    <i className="fa-regular fa-chart-line" />
                    Dashboard
                  </button>
                  </Link>
                  <Link to={'/admin/allproducts'}>
                  <button
                    className={`nav-link  ${location.pathname == '/admin/allproducts' && 'active'}`}
                    id="v-pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-profile"
                    aria-selected="false"
                  >
                    <i className="fa-regular fa-bag-shopping" />
                    All Products
                  </button>
                  </Link>
                  <Link to={'/admin/addproduct'}>
                  <button
                    className={`nav-link  ${location.pathname == '/admin/addproduct' && 'active'}`}
                    id="v-pills-messages-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-messages"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-messages"
                    aria-selected="false"
                  >
                    <i className="fa-sharp fa-regular fa-tractor" /> Add Product
                  </button>
                  </Link>
                  <Link to={'/admin/allcategory'}>
                  <button
                    className={`nav-link  ${location.pathname == '/admin/allcategory' && 'active'}`}
                    id="v-pills-settings-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-settings"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-settings"
                    aria-selected="false"
                  >
                    <i className="fa-sharp fa-regular fa-location-dot" />
                    All Category
                  </button>
                  </Link>
                  <Link to={'/admin/addcategory'}>
                  <button
                    className={`nav-link  ${location.pathname == '/admin/addcategory' && 'active'}`}
                    id="v-pills-settingsa-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-settingsa"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-settingsa"
                    aria-selected="false"
                  >
                    <i className="fa-light fa-user" />
                    Add Category
                  </button>
                  </Link>
                  <Link to={'/admin/logout'}>
                  <button
                    className={`nav-link  ${location.pathname == '/admin/logout' && 'active'}`}
                    id="v-pills-settingsb-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-settingsb"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-settingsb"
                    aria-selected="false"
                  >
                      <i className="fa-light fa-right-from-bracket" />
                      log Out
                  </button>
                  </Link>
                </div>
              </div>
              <div className="col-lg-9 pl--50 pl_md--10 pl_sm--10 pt_md--30 pt_sm--30">
                <div className="tab-content" id="v-pills-tabContent">
                <Outlet/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout
