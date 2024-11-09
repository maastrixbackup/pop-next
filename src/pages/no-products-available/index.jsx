import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { emailOnly } from "../../../Methods/ValidateForms";
import { APIURL } from "../../../Methods/Fetch";
import { axiosPost } from "../../../Methods/Save";
import { Alert, Snackbar } from "@mui/material";
import TrustPilot from "../../../components/TrustPilot";
import { useRouter } from "next/router";

function NoProductAvailable() {
  const navigate = useRouter();
  const [openpopup, setOpenPopup] = useState(false);
  const [vertical, setvertical] = useState("top");
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [horizontal, sethori] = useState("right");
  const [userDetails, setUserDetails] = useState({});
  useEffect(() => {
    if (localStorage.getItem("user_details") != null)
      setUserDetails(JSON.parse(localStorage.getItem("user_details")));
  }, []);

  const [errors, setErrors] = useState({
    email: "blank",
  });
  const sendEmail = () => {
    if (userDetails.email.length > 0) {
      var url = APIURL() + "not-available";
      var data = {
        ...userDetails,
      };
      axiosPost(url, data)
        .then((response) => {
          setMessage("We will get back to you soon!");
          setOpenPopup(true);
          setAlertType("success");
          setTimeout(() => {
            navigate.push("/");
          }, 2000);
        })
        .catch(function (error) {
          setAlertType("error");
          setMessage("There was some unexpected error please try again later");
          setOpenPopup(true);
        });
    } else setErrors({ ...errors, email: "Cannot be empty" });
  };

  return (
    <>
      <Header />
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
        open={openpopup}
        autoHideDuration={6000}
        onClose={() => {
          setOpenPopup(false);
        }}
      >
        <Alert
          onClose={() => {
            setOpenPopup(false);
          }}
          variant="filled"
          severity={alertType}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <div className="not-ava-sec">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="not_found_parent">
                <div className="not_found_child">
                  <h1 className="text-center text-warning">
                    <i
                      class="fa fa-exclamation-triangle"
                      aria-hidden="true"
                    ></i>
                  </h1>
                  <h3 className="text-center">We’re not available at </h3>
                  <h4 className="text-center">{userDetails.address}</h4>
                  <h6 className=" text-center">
                    Provide your email below and we’ll let you know when
                    PopTelecom is available at your home.
                  </h6>

                  <div className="row">
                    <div className="col-md-12 first-box list-box mb-5 bg-design">
                      This is due to one of three reasons
                      <ul>
                        <li>Poptelecom cannot service your address</li>
                        <li>
                          Poptelecom have not upgraded your address to fibre to
                          the cabinet
                        </li>
                        <li>Our network has not freed up your exchange</li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-xl-12">
                    <div className="mb-3">
                      <input
                        type="text"
                        className={
                          errors.email == "blank"
                            ? "form-control"
                            : errors.email == ""
                            ? "form-control is-valid"
                            : "form-control is-invalid"
                        }
                        placeholder="Email"
                        name="email"
                        value={userDetails.email}
                        onChange={(e) =>
                          emailOnly(
                            e,
                            setUserDetails,
                            userDetails,
                            setErrors,
                            errors
                          )
                        }
                      />
                      <div class="invalid-feedback">{errors.email}</div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-12 mb-3">
                      <a
                        style={{ cursor: "pointer" }}
                        className="btn-style-two"
                        onClick={sendEmail}
                      >
                        Continue
                      </a>
                    </div>
                    <div className="col-xl-12 text-center">
                      <div
                        className="btn btn-primary"
                        onClick={() => navigate.push("/address")}
                      >
                        Back to Address Page
                      </div>
                    </div>

                    <div className="col-xl-12 text-center no-foundotrust">
                      <TrustPilot />
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

export default NoProductAvailable;
