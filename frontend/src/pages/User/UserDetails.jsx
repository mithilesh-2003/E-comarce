import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../utils/UserContext.jsx";

function UserDetails() {

  const user = useContext(UserContext)

  return (
    <>
      <div
        className="tab-pane fade show active"
        id="v-pills-home"
        role="tabpanel"
        aria-labelledby="v-pills-home-tab"
        tabIndex="{0}"
      >
        <div className="dashboard-account-area">
          <h2 className="title">
            Hello {user?.firstname || user?.username }! 
            {/* <Link to={'/'}> Log Out.</Link> */}
          </h2>
          <p className="disc">
            From your account dashboard you can view your recent orders, manage
            your shipping and billing addresses, and edit your password and
            account details.
          </p>
        </div>
      </div>
    </>
  );
}

export default UserDetails;
