import { React, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";

function DontSlowDown(props) {
  const navigate = useRouter();
  const [vertical, setvertical] = useState("bottom");
  const [horizontal, sethori] = useState("right");
  const [open, setOpen] = useState(false);
  const { image, desc, slow_down_btn } = props;
  const [postCode, setPostCode] = useState("");
  const [error, setError] = useState("blank");
  const goToAddress = () => {
    if (postCode.length <= 4) {
      setError("Please enter a valid post code");
      setOpen(true);
      return;
    }
    localStorage.setItem("PostCode", postCode);
    navigate.push("/address");
  };
  return (
    <>
      <section className="news-slow-sec">
        <div className="container">
          <div className="row align-items-center">
            <div
              className="col-xl-6 col-md-12 wow fadeInLeftBig"
              data-wow-delay="0.4s"
            >
              <div className="news-img">
                <Image height={400} width={400} src={image} alt="image" />
              </div>
            </div>
            <div
              className="col-xl-6 col-md-12 wow fadeInRightBig"
              data-wow-delay="0.8s"
            >
              <div className="slow-doen-content">
                <div dangerouslySetInnerHTML={{ __html: desc }}></div>
                <div className="news-inputform">
                  <input
                    type="text"
                    value={postCode}
                    className={
                      error == "blank"
                        ? "form-control"
                        : error.length > 0
                        ? "form-control is-invalid"
                        : "form-control is-valid"
                    }
                    onChange={(e) => {
                      if (e.target.value.length == 0) {
                        setPostCode(e.target.value);
                        setError("Please enter a valid post code");
                      } else {
                        setPostCode(e.target.value);
                        setError("");
                      }
                    }}
                    placeholder="Enter Postcode?"
                  />
                  <div className="invalid-feedback">
                    <span>{error}</span>
                  </div>
                  <button
                    onClick={goToAddress}
                    type="button"
                    className="check-speed"
                  >
                    {slow_down_btn} <i className="fas fa-arrow-right" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
          severity="error"
        >
          Please enter a valid Postcode
        </Alert>
      </Snackbar>
    </>
  );
}

export default DontSlowDown;
