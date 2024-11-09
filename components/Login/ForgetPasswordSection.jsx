import { React, useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { APIURL } from "../../Methods/Fetch";
import { axiosPost } from "../../Methods/Save";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

function ForgetPasswordSection(props) {
  const [vertical, setvertical] = useState("top");
  const [horizontal, sethori] = useState("right");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [alerttype, setAlertType] = useState("");
  const { setRegisterTab, setFgtPwTab } = props;
  const [email, setEmail] = useState("");
  const resetPass = () => {
    if (email.length > 0) {
      var url = APIURL() + "reset-password";
      var data = {
        email: email,
      };
      axiosPost(url, data).then((response) => {
        if (response.data[0].response.status == "success") {
          setAlertType("success");
          setMessage(
            "Password reset link was successfully sent to your email address."
          );
          setOpen(true);
        } else {
          setAlertType("error");
          setMessage("There was some error..Please try again later");
          setOpen(true);
        }
      });
    } else {
      setAlertType("error");
      setMessage("Email cannot be blank");
      setOpen(true);
    }
  };

  return (
    <>
      <div className="col-lg-6 col-md-12 form-section">
        <div className="login-inner-form">
          <div className="details">
            <h1>No Worries!</h1>
            <h3>Enter Your Email</h3>
            <div className="row">
              <div className="col-lg-12">
                <div className="mb-3">
                  <label htmlFor className="form-label">
                    E-Mail Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <button
                      onClick={resetPass}
                      type="submit"
                      className="btn-style-one"
                    >
                      Send Mail
                    </button>
                  </div>
                  <div className="col-lg-6">
                    <div className="arr-bck text-end">
                      <button
                        onClick={() => {
                          setFgtPwTab(false);
                        }}
                        type="submit"
                        className="btn-style-one"
                      >
                        Back to Login
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
        open={open}
        autoHideDuration={6000}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Alert
          onClose={() => {
            setOpen(false);
          }}
          variant="filled"
          severity={alerttype}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default ForgetPasswordSection;
