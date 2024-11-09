import { React, useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { APIURL } from "../../Methods/Fetch";
import { axiosPost } from "../../Methods/Save";

function OrderDetails(props) {
  const { orderNo, setTab } = props;
  const [orderDetails, setOrderDetails] = useState();
  const [userDetails, setUserDetails] = useState();
  useEffect(() => {
    var url = APIURL() + `order/details`;
    var data = {
      order_id: orderNo,
    };
    axiosPost(url, data).then((response) => {
      setOrderDetails(response.data[0].response.data);
      setUserDetails(response.data[0].response.order);
    });
  }, [orderNo]);
  return (
    <>
      <div className="col-lg-9 col-md-8">
        <div className="btn btn-primary" onClick={() => setTab("my-order")}>
          <ArrowBackIcon sx={{ cursor: "pointer", color: "white" }} />
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="order-details-box">
              <div className="order-details-title">
                <h5>
                  {" "}
                  <i className="fad fa-user-tie me-2" /> Personal Information
                </h5>
              </div>
              <div className="order-details-data">
                <ul>
                  <li>
                    <span>Title :</span>
                    <span>{userDetails ? userDetails.name_title : ""}</span>
                  </li>
                  <li>
                    <span>First Name :</span>
                    <span>{userDetails ? userDetails.first_name : ""}</span>
                  </li>
                  <li>
                    <span>Last Name:</span>
                    <span>{userDetails ? userDetails.last_name : ""}</span>
                  </li>
                  <li>
                    <span>DOB (d-m-y):</span>
                    <span>{userDetails ? userDetails.dob : ""}</span>
                  </li>
                  <li>
                    <span>Email:</span>
                    <span>C{userDetails ? userDetails.name_title : ""}</span>
                  </li>
                  <li>
                    <span>Number:</span>
                    <span>{userDetails ? userDetails.name_title : ""}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="order-details-box br-cl-2">
              <div className="order-details-title">
                <h5>
                  {" "}
                  <i className="fal fa-address-card" /> Address Information
                </h5>
              </div>
              <div className="order-details-data">
                <ul>
                  <li>
                    <span>Address:</span>
                    <span>{userDetails ? userDetails.address : ""}</span>
                  </li>
                  <li>
                    <span>City:</span>
                    <span>{userDetails ? userDetails.city : ""}</span>
                  </li>
                  <li>
                    <span>Country:</span>
                    <span>{userDetails ? userDetails.country : ""}</span>
                  </li>
                  <li>
                    <span>Postcode:</span>
                    <span>{userDetails ? userDetails.postcode : ""}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="order-details-box br-cl-3">
              <div className="order-details-title">
                <h5>
                  {" "}
                  <i className="fal fa-address-card" /> Order Details
                </h5>
              </div>
              <div className="order-details-data">
                <ul>
                  <li>
                    <span>ID:</span>
                    <span>{userDetails ? userDetails.order_no : ""}</span>
                  </li>
                  <li>
                    <span>Date:</span>
                    <span>{userDetails ? userDetails.created_at : ""}</span>
                  </li>
                  <li>
                    <span>Status:</span>
                    <span>{userDetails ? userDetails.order_status : ""}</span>
                  </li>
                  <li>
                    <span>Upfront:</span>
                    <span>
                      £ {userDetails ? Number(userDetails.upfront_total).toFixed(2) : ""}
                    </span>
                  </li>
                  <li>
                    <span>Monthly:</span>
                    <span>
                      £ {userDetails ? Number(userDetails.monthly_total).toFixed(2) : ""}
                    </span>
                  </li>
                  <li>
                    <span>Install required:</span>
                    <span>
                      {userDetails ? userDetails.install_required : ""}
                    </span>
                  </li>
                  <li>
                    <span>Installation Cost:</span>
                    <span>£ {userDetails ? Number(userDetails.install_cost).toFixed(2) : ""}</span>
                  </li>
                  {userDetails && userDetails.wifi_username ? (
                    <li>
                      <span>Wifi UserName:</span>
                      <span>{userDetails.wifi_username}</span>
                    </li>
                  ) : (
                    ""
                  )}

                  {userDetails && userDetails.wifi_pw ? (
                    <li>
                      <span>Wifi Password:</span>
                      <span>{userDetails.wifi_pw}</span>
                    </li>
                  ) : (
                    ""
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="overview-box">
          <div className="table-box">
            <div className="tab-flex">
              <div>
                <h5 className="left-border">Products</h5>
              </div>
            </div>
          </div>
          <div className="table_responsive_maas">
            <table className="table" width="100%">
              <thead>
                <tr>
                  <th>
                    <span className="th-head-icon">SI</span>
                  </th>
                  <th>
                    <span className="th-head-icon">Product</span>
                  </th>
                  <th>
                    <span className="th-head-icon">Total Monthly</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderDetails && orderDetails.length > 0
                  ? orderDetails.map((detail, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{detail.product_name}</td>
                        <td>£{Number(detail.amount).toFixed(2)}</td>
                      </tr>
                    ))
                  : ""}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderDetails;
