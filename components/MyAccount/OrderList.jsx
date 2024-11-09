import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { APIURL } from "../../Methods/Fetch";
import { axiosGet, axiosPost } from "../../Methods/Save";

function OrderList(props) {
  const { setTab, setOrderNo, setDdDetails, setMonthlyTotal } = props;
  const viewOrder = (order) => {
    setDdDetails(order.direct_debit_details);
    setOrderNo(order.order_no);
    setMonthlyTotal(order.monthly_total);
    setTab("update-dd");
  };
  const [pageDetails, setPageDetails] = useState([]);
  useEffect(() => {
    var user_id = localStorage.getItem("user_id");
    var url = APIURL() + `order-records/${user_id}`;
    axiosGet(url).then((response) => {
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
                  <h5 className="left-border">My Orders</h5>
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
                              <span className="th-head-icon">Name </span>
                            </th>
                            <th>
                              <span className="th-head-icon">Order number</span>
                            </th>
                            <th>
                              <span className="th-head-icon">Price </span>
                            </th>
                            <th>Change direct debit details</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pageDetails.map((order, index) => (
                            <tr key={index}>
                              <td>{order.product_name}</td>
                              <td>{order.order_no}</td>
                              <td>{order.monthly_total}</td>
                              <td>
                                {order.site_id && order.site_id != "" ? (
                                  <a
                                    href="!#"
                                    style={{ cursor: "pointer" }}
                                    className="cl-light"
                                    onClick={() => viewOrder(order)}
                                  >
                                    <i className="fas fa-eye mx-2" /> Edit
                                  </a>
                                ) : (
                                  "N/A"
                                )}
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
            <h1>No orders to show</h1>
          </div>
        )}
      </div>
    </>
  );
}

export default OrderList;
