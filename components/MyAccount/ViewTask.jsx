import { React, useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { APIURL } from "../../Methods/Fetch";
import { axiosGet, axiosPost } from "../../Methods/Save";
import { Modal, ModalBody } from "reactstrap";

function ViewTask(props) {
  const { setTab, userDetails } = props;
  const [ticket, setTicket] = useState();
  const [reply, setReply] = useState();
  const [ticketDetails, setTicketDetails] = useState();
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    var task_id = localStorage.getItem("task_id");
    var url = APIURL() + `task-details/${task_id}`;

    axiosGet(url).then((response) => {
      setTicket(response.data[0].response.data);
    });
  }, [update]);
  useEffect(() => {
    setTicketDetails(JSON.parse(localStorage.getItem("task")));
  }, []);
  const replyAction = () => {
    var ticket_id = localStorage.getItem("task_id");

    var data = {
      id: ticketDetails.id,
      subject: ticketDetails.subject,
      description: reply,
      task_no: ticketDetails.task_no,
      user_id: localStorage.getItem("user_id"),
      status: ticketDetails.status_id,
    };
    var url = APIURL() + `task-query/${ticket_id}`;
    axiosPost(url, data).then((response) => {
      setUpdate(!update);
      setReply("");
    });
  };
  return <>
  <div className="col-lg-9">
        <div className="btn btn-primary" onClick={() => setTab("tasks")}>
          <ArrowBackIcon sx={{ cursor: "pointer", color: "white" }} />
        </div>
        <div className="row">
          <div className="col-md-8 col-12">
            <div className="card ad-tic-form">
              <div className="card-body">
                <h4 className="card-title">
                  <i className="lni lni-envelope" />{" "}
                  {ticketDetails ? ticketDetails.subject : ""}
                  <span>#{ticketDetails ? ticketDetails.task_no : ""}</span>
                </h4>
                {ticket && ticket.length > 0
                  ? ticket.map((tkt,index) => (
                      <div
                      key={index}
                        className={
                          tkt.admin_id != null
                            ? "card-box-sec admin"
                            : "card-box-sec"
                        }
                      >
                        <div className="user-ticket-box">
                          <div>
                            <span className="price h6">
                              {tkt.admin_id != null
                                ? tkt.admin_name
                                : userDetails.first_name}
                            </span>
                          </div>
                          <div className="text-success">
                            <i className="fal fa-alarm-plus me-2" />
                            {tkt.created_at}{" "}
                            <span style={{ color: "#ff7e00" }}>{tkt.time}</span>
                          </div>
                        </div>
                        <div className="user-ticket-desc">
                          <div
                            className="ticket_desc"
                            dangerouslySetInnerHTML={{
                              __html: tkt.description,
                            }}
                          ></div>                         
                        </div>
                      </div>
                    ))
                  : ""}
                <div>
                  <div className="mb-3">
                    <label
                      htmlFor="inputProductDescription"
                      className="form-label"
                    >
                      Reply Here
                    </label>
                    <textarea
                      className="form-control"
                      id="inputProductDescription"
                      name="reply"
                      rows={3}
                      defaultValue={""}
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                    />
                  </div>
                  <button
                    onClick={replyAction}
                    className="btn btn-outline-primary"
                  >
                    <i className="fadeIn animated bx bx-chevron-left-circle" />
                    <span className="text">Reply</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {ticketDetails ? (
            <div className="col-md-4 col-12">
              <div className="ad-tic-form mb-3">
                <div className="ad-ticket-fr-box">
                  <div className="row">                    
                    <div className="col-lg-12">
                      <div className="mb-3">
                        <label htmlFor className="form-label">
                          Status
                        </label>
                        <span
                          className={
                            ticketDetails.status_id == 1
                              ? "status-re"
                              : ticketDetails.status_id == 2
                              ? "status-re sr2"
                              : ticketDetails.status_id == 6
                              ? "status-re sr3"
                              : "status-re sr2"
                          }
                        >
                          <i className="fas fa-rectangle-landscape" />
                          {ticketDetails.status}
                        </span>
                      </div>
                    </div>                    
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>    
  </>;
}

export default ViewTask;
