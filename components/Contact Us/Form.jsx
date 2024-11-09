import { React, useEffect, useState, useRef } from "react";
import { APIURL } from "../../Methods/Fetch";
import { axiosPost } from "../../Methods/Save";
import { Alert, Backdrop, CircularProgress } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { BlankValidation } from "../../Methods/ValidateForms";
import HelpAndSupportSidebar from "../HelpAndSupportSidebar";

function Form(props) {
  const captchaRef = useRef(null);
  const { image_at, image_email, setModal, desc_two } = props;
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [vertical, setvertical] = useState("top");
  const [horizontal, sethori] = useState("right");
  const [message, setMessage] = useState("");
  const [alerttype, setAlertType] = useState("");
  const [openLoader, setpenLoader] = useState(false);
  const [captcha, setCaptcha] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact_no: "",
    topic: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "blank",
    email: "blank",
    contact_no: "blank",
    topic: "blank",
    message: "blank",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors({ ...errors, [name]: "blank" });
  };
  const validate = () => {
    const result = BlankValidation(formData, contactUs, errors, setErrors);
    if (result == false) {
      setAlertType("error");
      setMessage("Fill all fields.");
      setOpen(true);
    }
  };
  const contactUs = () => {
    if (captcha) {
      setpenLoader(true);
      var url = APIURL() + "contact-detail";
      var data = { ...formData };
      axiosPost(url, data).then((response) => {
        if (response.data[0].response.status == "success") {
          setpenLoader(false);
          setAlertType("success");
          setMessage(
            "Thank you for contacting us! We will get back to you soon."
          );
          setFormData({
            name: "",
            email: "",
            contact_no: "",
            topic: "",
            message: "",
            is_checked: 1,
          });
          window.grecaptcha.reset();

          setOpen(true);
        } else {
          setpenLoader(false);
          setAlertType("error");
          setMessage("There was some error. Please try again later.");
          setOpen(true);
        }
      });
    } else {
      setAlertType("error");
      setMessage("Captcha validation failed.");
      setOpen(true);
    }
  };
  function onChange(value) {
    setCaptcha(true);
  }
  return (
    <>
      <section className="business-mobile-btmsec contact-body3">
        <div className="container">
          <div className="content">
            <div className="row justify-content-center">
              <div className="col-lg-9">
                <div className="section-head text-center style-4 mb-40">
                  <h2 className="mb-1">
                    {alerttype == "success" && open ? (
                      <div
                        class="alert alert-success d-flex align-items-center"
                        role="alert"
                      >
                        <svg
                          class="bi flex-shrink-0 me-2"
                          width="24"
                          height="24"
                          role="img"
                          aria-label="Success:"
                        ></svg>
                        <div>
                          <p class="text-success">
                            Thank you for contacting us! We will get back to you
                            soon.
                          </p>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    Get In <span>Touch</span>
                  </h2>
                  <div dangerouslySetInnerHTML={{ __html: desc_two }}></div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group mb-20">
                      <input
                        name="name"
                        placeholder="Name"
                        className={
                          errors.name === "blank"
                            ? "form-control"
                            : errors.name == ""
                            ? "form-control is-valid"
                            : "form-control is-invalid"
                        }
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                      <div className="invalid-feedback">
                        <span>{errors.name}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group mb-20">
                      <input
                        name="email"
                        placeholder="Email Address *"
                        className={
                          errors.email === "blank"
                            ? "form-control"
                            : errors.email == ""
                            ? "form-control is-valid"
                            : "form-control is-invalid"
                        }
                        type="text"
                        value={formData.email}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                      <div className="invalid-feedback">
                        <span>{errors.email}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group mb-20">
                      <input
                        name="contact_no"
                        placeholder="Phone Number"
                        className={
                          errors.contact_no === "blank"
                            ? "form-control"
                            : errors.contact_no == ""
                            ? "form-control is-valid"
                            : "form-control is-invalid"
                        }
                        type="number"
                        value={formData.contact_no}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        onWheel={(event) => event.currentTarget.blur()}
                      />
                      <div className="invalid-feedback">
                        <span>{errors.contact_no}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group mb-20">
                      <input
                        name="topic"
                        placeholder="Your topic"
                        className={
                          errors.topic === "blank"
                            ? "form-control"
                            : errors.topic == ""
                            ? "form-control is-valid"
                            : "form-control is-invalid"
                        }
                        type="text"
                        value={formData.topic}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                      <div className="invalid-feedback">
                        <span>{errors.topic}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <textarea
                        rows={10}
                        name="message"
                        placeholder="How can we help you?"
                        className={
                          errors.message === "blank"
                            ? "form-control"
                            : errors.message == ""
                            ? "form-control is-valid"
                            : "form-control is-invalid"
                        }
                        value={formData.message}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                      <div className="invalid-feedback">
                        <span>{errors.message}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 text-center">
                    <div className="form-check d-inline-flex mt-30 mb-30">
                      <ReCAPTCHA
                        sitekey="6LeboUsmAAAAANxMyTiGTqGv5Cvq1wlhQtAcrnGr"
                        onChange={onChange}
                        ref={captchaRef}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 text-center">
                    <input
                      onClick={validate}
                      type="submit"
                      defaultValue="Send Your Request"
                      className="btn-style-one"
                    />
                  </div>
                </div>
              </div>
              <HelpAndSupportSidebar
                setRefresh={setRefresh}
                refresh={refresh}
              />
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
          severity={alerttype}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLoader}
        onBackdropClick="false"
      >
        <Box
          sx={{ position: "relative", display: "block", textAlign: "center" }}
        >
          <CircularProgress color="inherit" />
        </Box>
      </Backdrop>
    </>
  );
}

export default Form;
