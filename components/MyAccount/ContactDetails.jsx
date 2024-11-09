import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import sitman from "../../images/sit-man.png";
import { APIURL } from "../../Methods/Fetch";
import { axiosGet, axiosPost } from "../../Methods/Save";

function ContactDetails(props) {
  const { userDetails, setMessage, setOpen, setAlertType, setTab } = props;
  const [pageDetails, setPageDetails] = useState([]);
  useEffect(() => {
    var url = APIURL() + "profile-details";
    var data = {
      user_id: localStorage.getItem("user_id"),
    };
    axiosPost(url, data).then((response) => {
      setPageDetails(response.data[0].response.data[0]);
    });
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPageDetails({ ...pageDetails, [name]: value });
  };
  const updateUser = () => {
    var url = APIURL() + "profile-update";
    var data = {
      ...pageDetails,
      user_id: localStorage.getItem("user_id"),
    };
    axiosPost(url, data).then((response) => {
      localStorage.setItem(
        "user_details",
        JSON.stringify({ ...userDetails, ...pageDetails })
      );
      setMessage("Profile information updated!");
      setAlertType("success");
      setOpen(true);
    });
  };
  return (
    <>
      <div className="col-lg-9">
        <div className="profile-category2">
          <div className="category-form-pan-box">
            {pageDetails ? (
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group mb-20">
                    <label htmlFor="name">Name</label>
                    <input
                      name="name"
                      placeholder="Name"
                      className="form-control"
                      type="text"
                      value={pageDetails.name}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group mb-20">
                    <label htmlFor="email">E-mail Address</label>
                    <input
                      name="email"
                      placeholder="email address"
                      className="form-control"
                      type="email"
                      onChange={(e) => handleChange(e)}
                      value={pageDetails.email}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group mb-20">
                    <label htmlFor>Mobile Number</label>
                    <input
                      name="mobile_number"
                      placeholder="Mobile Number"
                      className="form-control"
                      type="number"
                      onChange={(e) => handleChange(e)}
                      value={pageDetails.mobile_number}
                      onWheel={(event) => event.currentTarget.blur()}
                    />
                  </div>
                </div>
                <div className="col-lg-6"></div>
                <div className="col-lg-6">
                  <div className="form-group mb-20">
                    <button className="btn-style-one" onClick={updateUser}>
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactDetails;
