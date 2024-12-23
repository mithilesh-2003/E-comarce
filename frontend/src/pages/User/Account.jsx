import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import api from "../../utils/api";
import { UserProvider } from "../../utils/UserContext.jsx";

function Account() {

    const location = useLocation()

    const [userDetails,setUserDetails] = useState({})
// console.log(userDetails)

    useEffect(()=>{
      const token = localStorage.getItem('token')
      const fetchUserDetails = async()=>{
        try {
          const response = await api.get('/api/userdetails',{headers:{Authorization: `Bearer ${token}`}})
          localStorage.setItem('user', JSON.stringify(response.data.user))
          setUserDetails(localStorage.getItem('user'))
          // console.log(localStorage.getItem('user'))      
          // console.log(response.data.user)
        } catch (error) {
          console.log(error)
        }
      }
      fetchUserDetails()
    },[])
    

  return (
    <>
      <UserProvider>
      <div>
        <div className="rts-navigation-area-breadcrumb">
          <div className="container-2">
            <div className="row">
              <div className="col-lg-12">
                <div className="navigator-breadcrumb-wrapper">
                  <Link to={'/'}>Home</Link>
                  <i className="fa-regular fa-chevron-right" />
                  <Link className="current" to={'/account'}>
                    Account
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
                  <Link to={'/account'}>
                  <button
                    className={`nav-link  ${location.pathname == '/account' && 'active'}`}
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
                  <Link to={'/account/order'}>
                  <button
                    className={`nav-link  ${location.pathname == '/account/order' && 'active'}`}
                    id="v-pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-profile"
                    aria-selected="false"
                  >
                    <i className="fa-regular fa-bag-shopping" />
                    Order
                  </button>
                  </Link>
                  <Link to={'/account/ordertracking'}>
                  <button
                    className={`nav-link  ${location.pathname == '/account/ordertracking' && 'active'}`}
                    id="v-pills-messages-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-messages"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-messages"
                    aria-selected="false"
                  >
                    <i className="fa-sharp fa-regular fa-tractor" /> Track Your
                    Order
                  </button>
                  </Link>
                  <Link to={'/account/address'}>
                  <button
                    className={`nav-link  ${location.pathname == '/account/address' && 'active'}`}
                    id="v-pills-settings-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-settings"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-settings"
                    aria-selected="false"
                  >
                    <i className="fa-sharp fa-regular fa-location-dot" />
                    My Address
                  </button>
                  </Link>
                  <Link to={'/account/accountdetails'}>
                  <button
                    className={`nav-link  ${location.pathname == '/account/accountdetails' && 'active'}`}
                    id="v-pills-settingsa-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-settingsa"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-settingsa"
                    aria-selected="false"
                  >
                    <i className="fa-light fa-user" />
                    Account Details
                  </button>
                  </Link>
                  <Link to={'/account/logout'}>
                  <button
                    className={`nav-link  ${location.pathname == '/account/logout' && 'active'}`}
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
      </UserProvider>
    </>
  );
}

export default Account;
