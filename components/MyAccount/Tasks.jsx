import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { APIURL } from "../../Methods/Fetch";
import { axiosGet } from "../../Methods/Save";

function Tasks(props) {
  const { setTab } = props;
  const [pageDetails, setPageDetails] = useState([]);

  const createOrder = () => {
    // setTab("create-task");
    setTab("create-akj-task");
  };
  useEffect(() => {
    var user_id = localStorage.getItem("user_id");
    var url = APIURL() + `task/listing/${user_id}`;
    var data = {
      user_id: user_id,
    };
    axiosGet(url, data).then((response) => {
      setPageDetails(response.data[0].response.data);
    });
  }, []);
  const viewTicket = (pageDetails) => {
    localStorage.setItem("task_id", pageDetails.id);
    localStorage.setItem("task", JSON.stringify(pageDetails));
    setTab("view-task");
  };

  return (
    <>
      <div className="col-lg-9">
        {pageDetails && pageDetails.length > 0 ? (
          <div className="overview-box">
            <div className="row">
              <div className="col-xl-12">
                <div className="inner-title-box">
                  <div>
                    <h4 className="title-inner">Tasks</h4>
                  </div>
                  <Link
                    style={{ cursor: "pointer" }}
                    onClick={createOrder}
                    className="btn-create-order"
                  >
                    <i className="fas fa-plus" /> Raise a question
                  </Link>
                </div>
              </div>
            </div>
            <div className="table_responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Task Number</th>
                    <th scope="col">Priority</th>
                    <th scope="col">Subject</th>
                    <th scope="col">Status</th>
                    <th scope="col">Created Date</th>
                    <th scope="col">Updated At</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {pageDetails.map((pageDetail,index) => (
                    <tr key={index}>
                      <td>{pageDetail.task_no}</td>
                      <td
                        className={
                          pageDetail.priority_id == 3
                            ? "circle-priority"
                            : pageDetail.priority_id == 2
                            ? "circle-priority cs2"
                            : pageDetail.priority_id == 1
                            ? "circle-priority cs3"
                            : ""
                        }
                      >
                        <i className="fas fa-circle" />
                        {pageDetail.priority}
                      </td>
                      <td>{pageDetail.subject}</td>
                      <td
                        className={
                          pageDetail.status_id == 1
                            ? "status-re"
                            : pageDetail.status_id == 2
                            ? "status-re sr2"
                            : pageDetail.status_id == 6
                            ? "status-re sr3"
                            : "status-re sr2"
                        }
                      >
                        <i className="fas fa-rectangle-landscape" />
                        {pageDetail.status}
                      </td>
                      <td>{pageDetail.created_at}</td>
                      <td className="open-close">{pageDetail.updated_at}</td>
                      <td scope="col">
                        <button
                          onClick={(e) => viewTicket(pageDetail)}
                          type="button"
                          className="edit-btn-ticket"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="mx-auto text-center mt-5">
            <Link
              style={{ cursor: "pointer" }}
              onClick={createOrder}
              className="btn-create-order"
            >
              <i className="fas fa-plus" /> Raise a question
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default Tasks;
