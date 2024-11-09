import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { APIURL } from "../../Methods/Fetch";
import { axiosGet, axiosPost } from "../../Methods/Save";
import { Modal, ModalBody } from "reactstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import Dropzone from "react-dropzone";
import axios from "axios";

function ViewTicket(props) {
  const { setTab, userDetails } = props;
  const [uploadedImages, setUploadedImages] = useState([]);
  const [ticket, setTicket] = useState();
  const [reply, setReply] = useState();
  const [img, setImg] = useState();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [ticketDetails, setTicketDetails] = useState();
  const [update, setUpdate] = useState(false);
  const getImageFromUpload = (data) => {
    return URL.createObjectURL(data);
  };
  const handleImageRemove = (data) => {
    const filteredPeople = uploadedImages.filter(
      (item) => item.name !== data.name
    );
    setUploadedImages(filteredPeople);
  };
  useEffect(() => {
    var ticket_id = localStorage.getItem("ticket_id");
    var url = APIURL() + `ticket-details/${ticket_id}`;

    axiosGet(url).then((response) => {
      setTicket(response.data[0].response.data);
    });
  }, [update]);
  useEffect(() => {
    setTicketDetails(JSON.parse(localStorage.getItem("ticket")));
  }, []);
  const replyAction = () => {
    var ticket_id = localStorage.getItem("ticket_id");

    var url = APIURL() + `ticket-reply/${ticket_id}`;

    const formData = new FormData();
    for (let file of uploadedImages) {
      formData.append("attachment[]", file);
    }
    formData.append("user_id", localStorage.getItem("user_id"));
    formData.append("id", ticketDetails.id);
    formData.append("service_type", ticketDetails.service_type_id);
    formData.append("subject", ticketDetails.subject);
    formData.append("status", ticketDetails.status_id);
    formData.append("priority", ticketDetails.priority_id);
    formData.append("order_no", ticketDetails.order_no);
    formData.append("reply", reply);

    axios({
      method: "post",
      url: url,
      data: formData,
      headers: {
        Authorization: "Bearer Bearer POPTELECOM@987612",
        Accept: "application/json",
      },
    }).then((response) => {
      setUpdate(!update);
      setReply("");
      setUploadedImages([]);
    });
  };
  // const replyAction = () => {
  //   var ticket_id = localStorage.getItem("ticket_id");

  //   var data = {
  //     id: ticketDetails.id,
  //     service_type: ticketDetails.service_type_id,
  //     subject: ticketDetails.subject,
  //     reply: reply,
  //     priority: ticketDetails.priority_id,
  //     order_no: ticketDetails.order_no,
  //     user_id: localStorage.getItem("user_id"),
  //     status: ticketDetails.status_id,
  //   };
  //   var url = APIURL() + `ticket-reply/${ticket_id}`;
  //   axiosPost(url, data).then((response) => {
  //     setUpdate(!update);
  //     setReply("");
  //   });
  // };
  return (
    <>
      <div className="col-lg-9">
        <div className="btn btn-primary" onClick={() => setTab("tickets")}>
          <ArrowBackIcon sx={{ cursor: "pointer", color: "white" }} />
        </div>
        <div className="row">
          <div className="col-md-8 col-12">
            <div className="card ad-tic-form">
              <div className="card-body">
                <h4 className="card-title">
                  <i className="lni lni-envelope" />{" "}
                  {ticketDetails ? ticketDetails.subject : ""}
                  <span>#{ticketDetails ? ticketDetails.ticket_no : ""}</span>
                </h4>
                {ticket && ticket.length > 0
                  ? ticket.map((tkt, index) => (
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
                          <div className="user-acth-btn">
                            {tkt.attachment && tkt.attachment.length > 0
                              ? tkt.attachment.map((att, index) => (
                                  <button
                                    key={index}
                                    onClick={(e) => {
                                      setImg(att.attachment_name);
                                      toggle();
                                    }}
                                    className="atch-btn"
                                  >
                                    <i className="fal fa-paperclip" />
                                    Attachement {index + 1}
                                  </button>
                                ))
                              : ""}
                          </div>
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
                    {/*<CKEditor
                      editor={ClassicEditor}
                      data={reply}
                      onReady={(editor) => {
                        // You can store the "editor" and use when it is needed.
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setReply(data);
                      }}
                      onBlur={(event, editor) => {}}
                      onFocus={(event, editor) => {}}
                    />*/}
                    <textarea
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      name="description"
                      type="text"
                      className="form-control"
                      rows={6}
                    ></textarea>
                  </div>
                  <div className="col-lg-12">
                    <div className="tab-pane active" id="home" role="tabpanel">
                      <Dropzone
                        accept="image/*"
                        onDrop={(acceptedFiles) => {
                          acceptedFiles.map((res) => {
                            if (
                              res.type == "image/jpeg" ||
                              res.type == "image/jpg" ||
                              res.type == "image/png"
                            ) {
                              setUploadedImages((oldArray) => [
                                ...oldArray,
                                res,
                              ]);
                            } else {
                            }
                          });
                        }}
                      >
                        {({ getRootProps, getInputProps, isDragActive }) => (
                          <div
                            {...getRootProps({
                              className: "dropzone",
                            })}
                          >
                            <input {...getInputProps()} />
                            {isDragActive ? (
                              <p>Drop the files here ...</p>
                            ) : (
                              <p>
                                Drag 'n' drop some files here, or click to
                                select files
                              </p>
                            )}
                          </div>
                        )}
                      </Dropzone>
                      {uploadedImages.length > 0 && (
                        <React.Fragment>
                          <h4 style={{ marginTop: "20px" }}>
                            Uploaded Files :
                          </h4>
                          <div className="row">
                            {uploadedImages.map((res,i) => (
                              <div key={i} className="col-lg-2 col-md-2">
                                <img
                                  style={{
                                    height: "100px",
                                    width: "100%",
                                  }}
                                  src={getImageFromUpload(res)}
                                  alt="img"
                                />
                                <DeleteIcon
                                  onClick={() => handleImageRemove(res)}
                                  style={{
                                    marginTop: "-124%",
                                    marginLeft: "86%",
                                    background: "#fff",
                                    color: "red",
                                    cursor: "pointer",
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                        </React.Fragment>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={replyAction}
                    className="btn btn-outline-primary mt-4"
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
                          Type
                        </label>
                        <span>{ticketDetails.service_type}</span>
                      </div>
                    </div>
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
                    <div className="col-lg-12">
                      <div className="mb-3">
                        <label htmlFor className="form-label">
                          Priority
                        </label>
                        <span
                          className={
                            ticketDetails.priority_id == 3
                              ? "circle-priority"
                              : ticketDetails.priority_id == 2
                              ? "circle-priority cs2"
                              : ticketDetails.priority_id == 1
                              ? "circle-priority cs3"
                              : "circle-priority"
                          }
                        >
                          <i className="fas fa-circle" />
                          {ticketDetails.priority}
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
      <Modal className="ticket_modal" isOpen={modal} toggle={toggle}>
        <ModalBody>
          <img src={img} alt="attachment" />
        </ModalBody>
      </Modal>
    </>
  );
}

export default ViewTicket;
