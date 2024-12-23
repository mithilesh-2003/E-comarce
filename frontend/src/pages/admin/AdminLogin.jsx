import React from "react";
import { Link } from "react-router-dom";

function AdminLogin() {
  return (
    <>
      <div>
        {/* rts register area start */}
        <div
          className="rts-register-area rts-section-gap bg_light-1"
          style={{ height: "100vh" }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="registration-wrapper-1">
                  <div className="logo-area mb--0">
                    <img
                      className="mb--10"
                      src="/images/logo/fav.png"
                      alt="logo"
                    />
                  </div>
                  <h3 className="title">Login Into Your Account</h3>
                  <form action="#" className="registration-form">
                    <div className="input-wrapper">
                      <label htmlFor="email">Email*</label>
                      <input type="email" id="email" />
                    </div>
                    <div className="input-wrapper">
                      <label htmlFor="password">Password*</label>
                      <input type="password" id="password" />
                    </div>
                    <button className="rts-btn btn-primary">
                      Login Account
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* rts register area end */}
      </div>
    </>
  );
}

export default AdminLogin;
