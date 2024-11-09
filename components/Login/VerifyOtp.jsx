import { React, useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { APIURL } from "../../Methods/Fetch";
import { axiosPost } from "../../Methods/Save";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

function VerifyOtp(props) {
    const navigate = useNavigate();    
  const [vertical, setvertical] = useState("top");
  const [horizontal, sethori] = useState("right");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [alerttype, setAlertType] = useState("");
  const {  setOtpTab ,loginDetails} = props;
  const [email, setEmail] = useState();
  const resetPass = () => {
    var url = APIURL() + "verify-otp";
    var data = {
      otp: email,
      user_id: localStorage.getItem("user_id"),
    };
    axiosPost(url, data).then(async (response) => {
      if (response.data.status == "success") {
        setAlertType("success");
        setMessage(
          "OTP verified."
        );
        setOpen(true);
        localStorage.setItem("logged_in", true);
        await signIn("credentials", {
          redirect: false,
          email: email,
        });
        navigate("/my-account");
      } else {
        setAlertType("error");
        setMessage("Wrong OTP Please Try Again");
        setOpen(true);
      }
    });
  };
  return (
    <>
      <div className="col-lg-6 col-md-12 form-section">
        <div className="login-inner-form">
          <div className="details">
            <h3>Enter Your OTP</h3>
            <div className="col-lg-9">
              <div className="forgot-bg">
                <div className="mb-3">
                  <label htmlFor className="form-label">
                    OTP
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <button
                  onClick={resetPass}
                  type="submit"
                  className="btn btn-style-four"
                >
                  Submit
                </button>
              </div>
              <ArrowBackIcon
                style={{ cursor: "pointer" }}
                onClick={() => {
                    setOtpTab(false);
                }}
              />
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

export default VerifyOtp;
