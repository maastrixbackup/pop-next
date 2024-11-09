import { React, useEffect, useState } from "react";
import { APIURL } from "../../Methods/Fetch";
import { axiosPost } from "../../Methods/Save";

function MyInvoices(props) {
  const { setTab } = props;
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
  const downloadInvoice = (invoice) => {
    const link = document.createElement("a");
    link.href = invoice;
    document.body.appendChild(link);
    link.setAttribute("target", "_blank");
    link.click();
  };
  return (
    <>
      <div className="col-lg-9">
        {posts && posts.length > 0 ? (
          <div className="overview-box">
            <div className="table-box">
              <div className="tab-flex">
                <div>
                  <h5 className="left-border">My Invoices</h5>
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
                                Completion Date
                              </span>
                            </th>
                            <th>
                              <span className="th-head-icon">Price </span>
                            </th>
                            <th>
                              <span className="th-head-icon">
                                Order Status
                              </span>
                            </th>
                            <th>
                              <span className="th-head-icon">
                                Download invoice
                              </span>
                            </th>
                            <th>&nbsp;</th>
                          </tr>
                        </thead>
                        <tbody>
                          {posts.map((order,index) => (
                            <tr key={index}>
                              <td>{order.order_no}</td>
                              <td>{order.order_date}</td>
                              <td>{order.completion_date}</td>
                              <td>{order.total_amount}</td>
                              <td>{order.order_status}</td>
                              <td>
                                <a
                                  href="#"
                                  className="cl-light"
                                  data-bs-toggle="modal"
                                  data-bs-target="#order-details-modal"
                                  onClick={() => downloadInvoice(order.invoice)}
                                >
                                  <i className="fas fa-file-pdf"></i> Download
                                  Invoice
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
            <h1>No Invoices to show</h1>
          </div>
        )}
      </div>
    </>
  );
}

export default MyInvoices;
