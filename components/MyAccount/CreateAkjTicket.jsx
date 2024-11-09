import React, { useState, useEffect } from "react";
import { APIURL } from "../../Methods/Fetch";
import { axiosPost } from "../../Methods/Save";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";



function CreateAkjTicket(props) {
  const [valid, setValid] = useState({
    siteID: "",
    summary: "",
    detail: "",
    dueDate: "",
    category: "",
    subCategory: "",
    owner: "",
  });
  const { setTab, setMessage, setAlertType, setOpen, setSummary } = props;
  const [pageDetails, setPageDetails] = useState([]);
  const initialState = {
    owner: "",
    siteID: "",
    summary: "",
    priorityId: 1,
    dueDate: "",
    category: "",
    subCategory: "",
  };
  const initialDescState = {
    detail: ""
  };

  const [ticketDetails, setTicketDetails] = useState(initialState);
  const [descDetails, setDescDetails] = useState(initialDescState);

  useEffect(() => {
    var user_id = localStorage.getItem("user_id");
    var url = APIURL() + `order/akj-list`;
    var data = {
      user_id: user_id,
    };
    axiosPost(url, data).then((response) => {
      setPageDetails(response.data[0].response.data);
    });
  }, []);

  // const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setTicketDetails({ ...ticketDetails, [name]: value });
  //     if (value.length > 0) setValid({ ...valid, [name]: true });
  // };
  const createTicket = () => {
    try {
      if (
        ticketDetails.siteID.length > 0 &&
        ticketDetails.summary.length > 0 &&
        descDetails.detail.length > 0 &&
        ticketDetails.dueDate.length > 0 &&
        ticketDetails.category.length > 0 &&
        ticketDetails.subCategory.length > 0 &&
        ticketDetails.owner.length > 0
      ) {
        var url = APIURL() + `create-ticket`;
        var data = {
          ...ticketDetails,
          ...descDetails,
        };

        axiosPost(url, data).then((response) => {
          if (response.data[0].response.status === "success") {
            setMessage("Ticket Created Successfully");
            setAlertType("success");
            setOpen(true);
            setTab("create-akj-ticket");
            setTicketDetails(initialState);
            setDescDetails(initialDescState);
          } else {
            setMessage("Technical issue,Please try again");
            setAlertType("error");
            setOpen(true);
            setTab("create-akj-ticket");
            setTicketDetails(initialState);
            setDescDetails(initialDescState);
          }
        });
      } else if (ticketDetails.siteID.length === 0) {
        setMessage("Please choose Order No");
        setAlertType("error");
        setValid({ ...valid, siteID: false });
        setOpen(true);
      } else if (ticketDetails.summary.length === 0) {
        setMessage("Please enter Summary");
        setAlertType("error");
        setValid({ ...valid, summary: false });
        setOpen(true);
      } else if (descDetails.detail.length === 0) {
        setMessage("Please enter Description");
        setAlertType("error");
        setValid({ ...valid, detail: false });
        setOpen(true);
      } else if (ticketDetails.dueDate.length === 0) {
        setMessage("Please choose Date");
        setAlertType("error");
        setValid({ ...valid, dueDate: false });
        setOpen(true);
      } else if (ticketDetails.category.length === 0) {
        setMessage("Please choose Category");
        setAlertType("error");
        setValid({ ...valid, category: false });
        setOpen(true);
      } else if (ticketDetails.subCategory.length === 0) {
        setMessage("Please choose Sub-Category");
        setAlertType("error");
        setValid({ ...valid, subCategory: false });
        setOpen(true);
      } else if (ticketDetails.owner.length === 0) {
        setMessage("Please choose Owner");
        setAlertType("error");
        setValid({ ...valid, owner: false });
        setOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlechange = (e) => {
    const { name, value } = e.target;
    setTicketDetails({ ...ticketDetails, [name]: value });
  };

  return (
    <>
      <div className="col-lg-9">
        <div className="inner-title-box">
          <div>
            <h4 className="title-inner">Create Ticket</h4>
          </div>
        </div>
        {/* <div className="btn btn-primary" onClick={() => setTab("tickets")}>
                    <ArrowBackIcon sx={{ cursor: "pointer", color: "white" }} />
                </div> */}

        <div className="ticket-box">
          <div className="row flex-box">
            <div className="col-lg-7">
              <div className="ticket-form-sec">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="mb-3">
                      <label htmlFor className="form-label">
                        Order Number
                      </label>
                      <select
                        className={
                          valid.siteID === false
                            ? "form-select is-invalid"
                            : "form-select"
                        }
                        aria-label="Default select example"
                        name="siteID"
                        onBlur={(e) => handlechange(e)}
                      >
                        <option value="" selected>
                          Choose Order Number
                        </option>
                        {pageDetails && pageDetails.length > 0
                          ? pageDetails.map((pageDetail, index) => (
                              <option selected={
                                ticketDetails.siteID == pageDetail.site_id
                                  ? true
                                  : false
                              } key={index} value={pageDetail.site_id}>
                                {pageDetail.order_no}
                              </option>
                            ))
                          : ""}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor className="form-label">
                        Summary
                      </label>
                      <input
                        value={ticketDetails.summary}
                        onChange={(e) => handlechange(e)}
                        name="summary"
                        type="text"
                        className={
                          valid.summary === false
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="App">
                      <p>Description</p>
                      <CKEditor
                        editor={ClassicEditor}
                        data={descDetails.detail}
                        onReady={(editor) => {
                          // You can store the "editor" and use when it is needed.
                        }}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setDescDetails({
                            ...descDetails,
                            detail: data,
                          });
                        }}
                        onBlur={(event, editor) => {}}
                        onFocus={(event, editor) => {}}
                      />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="mb-3">
                      <label htmlFor className="form-label">
                        Due Date
                      </label>
                      <input
                        value={ticketDetails.dueDate}
                        onChange={(e) => handlechange(e)}
                        name="dueDate"
                        type="date"
                        className={
                          valid.dueDate === false
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                      />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="mb-3">
                      <label htmlFor className="form-label">
                        Category
                      </label>
                      <select
                        className={
                          valid.category === false
                            ? "form-select is-invalid"
                            : "form-select"
                        }
                        aria-label="Default select example"
                        name="category"
                        onBlur={(e) => handlechange(e)}
                      >
                        <option value="">Choose Category</option>
                        <option
                          selected={
                            ticketDetails.category == "Credit Request By Agent"
                              ? true
                              : false
                          }
                          value="Credit Request By Agent"
                        >
                          Credit Request By Agent
                        </option>
                        <option selected={
                            ticketDetails.category == "Email from Tech Email"
                              ? true
                              : false
                          } value="Email from Tech Email">
                          Email from Tech Email
                        </option>
                        <option selected={
                            ticketDetails.category == "Fault - Calling Fault"
                              ? true
                              : false
                          } value="Fault - Calling Fault">
                          Fault - Calling Fault
                        </option>
                        <option selected={
                            ticketDetails.category == "Fault - Class 5 Service"
                              ? true
                              : false
                          } value="Fault - Class 5 Service">
                          Fault - Class 5 Service
                        </option>
                        <option selected={
                            ticketDetails.category == "Fault - Intermittent Connection"
                              ? true
                              : false
                          } value="Fault - Intermittent Connection">
                          Fault - Intermittent Connection
                        </option>
                        <option selected={
                            ticketDetails.category == "Fault - Line Faults"
                              ? true
                              : false
                          } value="Fault - Line Faults">
                          Fault - Line Faults
                        </option>
                        <option selected={
                            ticketDetails.category == "Fault - No Sync"
                              ? true
                              : false
                          }  value="Fault - No Sync">Fault - No Sync</option>
                        <option selected={
                            ticketDetails.category == "Fault - Slow Speed"
                              ? true
                              : false
                          } value="Fault - Slow Speed">
                          Fault - Slow Speed
                        </option>
                        <option selected={
                            ticketDetails.category == "Fault - TLOS"
                              ? true
                              : false
                          } value="Fault - TLOS">Fault - TLOS</option>
                        <option selected={
                            ticketDetails.category == "Fault -Line Faults"
                              ? true
                              : false
                          } value="Fault -Line Faults">
                          Fault -Line Faults
                        </option>

                        <option selected={
                            ticketDetails.category == "Mobile Fault"
                              ? true
                              : false
                          } value="Mobile Fault">Mobile Fault</option>
                        <option selected={
                            ticketDetails.category == "Non Fault Query"
                              ? true
                              : false
                          } value="Non Fault Query">Non Fault Query</option>
                        <option selected={
                            ticketDetails.category == "Order Equipment"
                              ? true
                              : false
                          } value="Order Equipment">Order Equipment</option>
                        <option selected={
                            ticketDetails.category == "Order Router Replacement"
                              ? true
                              : false
                          } value="Order Router Replacement">
                          Order Router Replacement
                        </option>
                        <option selected={
                            ticketDetails.category == "Order Sim Card Replacement"
                              ? true
                              : false
                          } value="Order Sim Card Replacement">
                          Order Sim Card Replacement
                        </option>
                        <option selected={
                            ticketDetails.category == "Phone System Missed Call"
                              ? true
                              : false
                          } value="Phone System Missed Call">
                          Phone System Missed Call
                        </option>
                        <option selected={
                            ticketDetails.category == "Router Issue"
                              ? true
                              : false
                          } value="Router Issue">Router Issue</option>
                        <option selected={
                            ticketDetails.category == "Router Not Arrived"
                              ? true
                              : false
                          } value="Router Not Arrived">
                          Router Not Arrived
                        </option>
                        <option selected={
                            ticketDetails.category == "Router Return Pending"
                              ? true
                              : false
                          } value="Router Return Pending">
                          Router Return Pending
                        </option>
                        <option selected={
                            ticketDetails.category == "TV Box Fault / Issue"
                              ? true
                              : false
                          } value="TV Box Fault / Issue">
                          TV Box Fault / Issue
                        </option>
                        <option selected={
                            ticketDetails.category == "WiFi Issues"
                              ? true
                              : false
                          } value="WiFi Issues">WiFi Issues</option>
                        <option selected={
                            ticketDetails.category == "Credit Declined"
                              ? true
                              : false
                          } value="Credit Declined">Credit Declined</option>
                        <option selected={
                            ticketDetails.category == "Escalation"
                              ? true
                              : false
                          } value="Escalation">Escalation</option>
                        <option selected={
                            ticketDetails.category == "Internal"
                              ? true
                              : false
                          } value="Internal">Internal</option>
                        <option selected={
                            ticketDetails.category == "Complaint"
                              ? true
                              : false
                          } value="Complaint">Complaint</option>
                        <option selected={
                            ticketDetails.category == "Credit Authorised by Team Leader"
                              ? true
                              : false
                          } value="Credit Authorised by Team Leader">
                          Credit Authorised by Team Leader
                        </option>
                        <option selected={
                            ticketDetails.category == "Engineer Charge Query"
                              ? true
                              : false
                          } value="Engineer Charge Query">
                          Engineer Charge Query
                        </option>
                        <option selected={
                            ticketDetails.category == "Email for Support"
                              ? true
                              : false
                          } value="Email for Support">
                          Email for Support
                        </option>
                        <option selected={
                            ticketDetails.category == "No Details Showing"
                              ? true
                              : false
                          } value="No Details Showing">
                          No Details Showing
                        </option>
                        <option selected={
                            ticketDetails.category == "Order"
                              ? true
                              : false
                          } value="Order">Order</option>
                        <option selected={
                            ticketDetails.category == "Pending Equipment Delivery"
                              ? true
                              : false
                          } value="Pending Equipment Delivery">
                          Pending Equipment Delivery
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="mb-3">
                      <label htmlFor className="form-label">
                        Sub-Category
                      </label>
                      <select
                        className={
                          valid.subCategory === false
                            ? "form-select is-invalid"
                            : "form-select"
                        }
                        aria-label="Default select example"
                        name="subCategory"
                        onBlur={(e) => handlechange(e)}
                      >
                        <option value="">Choose Sub-Category</option>
                        <option selected={
                            ticketDetails.subCategory == "Change me to the correct Category"
                              ? true
                              : false
                          } value="Change me to the correct Category">
                          Change me to the correct Category
                        </option>
                        <option selected={
                            ticketDetails.subCategory == "OR"
                              ? true
                              : false
                          } value="OR">OR</option>
                        <option selected={
                            ticketDetails.subCategory == "TTB"
                              ? true
                              : false
                          } value="TTB">TTB</option>
                        <option selected={
                            ticketDetails.subCategory == "VODA"
                              ? true
                              : false
                          } value="VODA">VODA</option>
                        <option selected={
                            ticketDetails.subCategory == "Filter"
                              ? true
                              : false
                          } value="Filter">Filter</option>
                        <option selected={
                            ticketDetails.subCategory == "Power Line Adapter"
                              ? true
                              : false
                          } value="Power Line Adapter">
                          Power Line Adapter
                        </option>
                        <option selected={
                            ticketDetails.subCategory == "AC Rated Router"
                              ? true
                              : false
                          } value="AC Rated Router">AC Rated Router</option>
                        <option selected={
                            ticketDetails.subCategory == "N Rated Router"
                              ? true
                              : false
                          } value="N Rated Router">N Rated Router</option>
                        <option selected={
                            ticketDetails.subCategory == "Order Sim Card Replacement"
                              ? true
                              : false
                          } value="Order Sim Card Replacement">
                          Order Sim Card Replacement
                        </option>
                        <option selected={
                            ticketDetails.subCategory == "Change this category once contact is made"
                              ? true
                              : false
                          } value="Change this category once contact is made">
                          Change this category once contact is made
                        </option>
                        <option selected={
                            ticketDetails.subCategory == "Netgem"
                              ? true
                              : false
                          } value="Netgem">Netgem</option>
                        <option  selected={
                            ticketDetails.subCategory == "Escalation"
                              ? true
                              : false
                          } value="Escalation">Escalation</option>
                        <option selected={
                            ticketDetails.subCategory == "Customer Official - Call"
                              ? true
                              : false
                          } value="Customer Official - Call">
                          Customer Official - Call
                        </option>
                        <option selected={
                            ticketDetails.subCategory == "Customer Official - Letter / Email"
                              ? true
                              : false
                          } value="Customer Official - Letter / Email">
                          Customer Official - Letter / Email
                        </option>
                        <option selected={
                            ticketDetails.subCategory == "Returning to Pop"
                              ? true
                              : false
                          } value="Returning to Pop">
                          Returning to Pop
                        </option>
                        <option selected={
                            ticketDetails.subCategory == "Pre Paid Bag"
                              ? true
                              : false
                          } value="Pre Paid Bag">Pre Paid Bag</option>
                        <option selected={
                            ticketDetails.category == "Card Left"
                              ? true
                              : false
                          } value="Card Left">Card Left</option>
                        <option selected={
                            ticketDetails.subCategory == "Delivered"
                              ? true
                              : false
                          } value="Delivered">Delivered</option>
                        <option selected={
                            ticketDetails.subCategory == "Delivery Pending"
                              ? true
                              : false
                          }  value="Delivery Pending">
                          Delivery Pending
                        </option>
                        <option selected={
                            ticketDetails.subCategory == "No Details Showing"
                              ? true
                              : false
                          } value="No Details Showing">
                          No Details Showing
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="mb-3">
                      <label htmlFor className="form-label">
                        Owner
                      </label>
                      <select
                        className={
                          valid.owner === false
                            ? "form-select is-invalid"
                            : "form-select"
                        }
                        aria-label="Default select example"
                        name="owner"
                        onBlur={(e) => handlechange(e)}
                      >
                        <option value="">Choose Owner</option>
                        <option  selected={
                            ticketDetails.owner == "Customer Support"
                              ? true
                              : false
                          } value="Customer Support">
                          Customer Support
                        </option>
                        <option  selected={
                            ticketDetails.owner == "Management"
                              ? true
                              : false
                          } value="Management">Management</option>
                        <option  selected={
                            ticketDetails.owner == "Team Leaders"
                              ? true
                              : false
                          } value="Team Leaders">Team Leaders</option>
                        <option  selected={
                            ticketDetails.owner == "Voip"
                              ? true
                              : false
                          } value="Voip">Voip</option>
                        <option  selected={
                            ticketDetails.owner == "Warehouse"
                              ? true
                              : false
                          } value="Warehouse">Warehouse</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="mb-3 text-center">
                      <button
                        onClick={createTicket}
                        type="button"
                        className="btn btn-primary"
                      >
                        Submit Ticket
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateAkjTicket;
