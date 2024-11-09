import { React, useState, useEffect } from "react";
import { APIURL } from "../../Methods/Fetch";
import { axiosGet, axiosPost } from "../../Methods/Save";

function MyReferral() {
  const [pageDetails, setPageDetails] = useState([]);

  useEffect(() => {
    var user_id = localStorage.getItem("user_id");
    var url = APIURL() + `referral-log`;
    var data = {
      user_id: user_id,
    };
    axiosPost(url, data).then((response) => {
      setPageDetails(response.data[0].response.data);
    });
  }, []);
  return (
    <>
      <div className="col-lg-9">
        {pageDetails && pageDetails.length > 0 ? (
          <div className="overview-box">
            <div className="table-box">
              <div className="tab-flex">
                <div>
                  <h5 className="left-border">My Referrals</h5>
                  <h5>My referral code :</h5>
                </div>
              </div>
            </div>
            <div className="tab-content">
              <div className="tab-pane active" id="tabdel">
                <div className="row">
                  <div className="col-md-12">
                    <div className="table_responsive_maas">
                      <table className="table" width="100%">
                        <thead>
                          <tr>
                            <th>
                              <span className="th-head-icon">Product name</span>
                            </th>
                            <th>
                              <span className="th-head-icon">Ordered On </span>
                            </th>
                            <th>
                              <span className="th-head-icon">Order Id</span>
                            </th>
                            <th>
                              <span className="th-head-icon">
                                Order Amount{" "}
                              </span>
                            </th>
                            <th>
                              <span className="th-head-icon">
                                Referral Amount{" "}
                              </span>
                            </th>
                            <th>&nbsp;</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pageDetails.map((order,index) => (
                            <tr key={index}>
                              <td>{order.product_name}</td>
                              <td>{order.order_date}</td>
                              <td>{order.order_id}</td>
                              <td>{order.total_amount}</td>
                              <td>{order.order_status}</td>
                              <td>
                                <a
                                  href="#"
                                  className="cl-light"
                                  data-bs-toggle="modal"
                                  data-bs-target="#order-details-modal"
                                >
                                  <i className="fas fa-eye mx-2" /> View
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h1>No referrals Found.</h1>
            <h5>
              My referral code : <span style={{ color: "red" }}>abcdf</span>{" "}
            </h5>
          </div>
        )}
      </div>
    </>
  );
}

export default MyReferral;
