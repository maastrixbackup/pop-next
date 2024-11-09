import { React, useEffect, useState } from "react";
import { APIURL } from "../../Methods/Fetch";
import { axiosPost } from "../../Methods/Save";
import TrustPilotReview from "../TrustPilotReview";
import PaginationIcons from "../Common/PaginationIcons";

function MyOrders(props) {
  const { setTab, setOrderNo } = props;
  const [pageDetails, setPageDetails] = useState([]);
  useEffect(() => {
    var user_id = localStorage.getItem("user_id");
    var url = APIURL() + `order/list`;
    var data = {
      user_id: user_id,
    };
    axiosPost(url, data).then((response) => {
      setPageDetails(response.data[0].response.data);
    });
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const posts = pageDetails.slice(firstPostIndex, lastPostIndex);
  const viewOrder = (id) => {
    setOrderNo(id);
    setTab("order-details");
  };
  const [pageNo, setPageNo] = useState(1);

  return (
    <>
      <div className="col-lg-9">
        {posts && posts.length > 0 ? (
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
                              <span className="th-head-icon">Order number</span>
                            </th>
                            <th>
                              <span className="th-head-icon">Ordered On </span>
                            </th>
                            <th>
                              <span className="th-head-icon">
                                Completion Date{" "}
                              </span>
                            </th>
                            <th>
                              <span className="th-head-icon">Price </span>
                            </th>
                            
                            <th>
                              <span className="th-head-icon">Details </span>
                            </th>
                            <th>&nbsp;</th>
                          </tr>
                        </thead>
                        <tbody>
                          {posts.map((order, index) => (
                            <tr key={index}>
                              <td>{order.order_no}</td>
                              <td>{order.order_date}</td>
                              <td>{order.completion_date}</td>
                              <td>{order.total_amount}</td>
                              <td>
                                <a
                                  href="#!"
                                  className="cl-light"
                                  data-bs-toggle="modal"
                                  data-bs-target="#order-details-modal"
                                  onClick={() => viewOrder(order.id)}
                                >
                                  <i className="fas fa-eye mx-2" /> View
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {pageDetails.length > postsPerPage ? (
                      <PaginationIcons
                        totalposts={pageDetails.length}
                        postsperpage={postsPerPage}
                        setCurrentPage={setCurrentPage}
                        setPage={setPageNo}
                        page={pageNo}
                      />
                    ) : (
                      ""
                    )}
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
        <TrustPilotReview />
      </div>
    </>
  );
}

export default MyOrders;
