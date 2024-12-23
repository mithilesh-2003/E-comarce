import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../utils/UserContext.jsx";

function Order() {

  const user = useContext(UserContext)

  return (
    <>
      <div className="order-table-account">
        <div className="h2 title">Your Orders</div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                user.order > 0 ? (<tr>
                  <td>#1357</td>
                  <td>March 45, 2020</td>
                  <td>Processing</td>
                  <td>$125.00 for 2 item</td>
                  <td>
                    <a href="#" className="btn-small d-block">
                      View
                    </a>
                  </td>
                </tr>) : (<tr>
                  <td>You not ordered yet</td>
                </tr>)
              }


            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Order;
