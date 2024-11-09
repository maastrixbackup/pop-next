import { React, useState, useEffect, useLayoutEffect } from "react";
import { axiosGet } from "../Methods/Save";
import { APIURL } from "../Methods/Fetch";
import { emailOnly } from "../Methods/ValidateForms";
import { Alert, Snackbar } from "@mui/material";
import { Helmet } from "react-helmet";
import Link from "next/link";
import Image from "next/image";

function Footer(props) {
  const { bussinesspage, setPhone } = props;
  const today = new Date();
  const [menuLinks, setMenuLinks] = useState({
    consumer: [],
    business: [],
    customer_care: [],
  });
  const [userDetails, setUserDetails] = useState({
    EMAIL: "",
  });
  const [errors, setErrors] = useState({
    EMAIL: "blank",
  });
  const [footerInfo, setFooterInfo] = useState();
  const [fooInfo, setFooInfo] = useState([]);
  const [vertical, setvertical] = useState("top");
  const [horizontal, sethori] = useState("right");
  const [openpopup, setOpenPopup] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    var url = APIURL() + "website-setting";
    axiosGet(url).then((response) => {
      setFooterInfo(response.data[0].response.data[0]);
      setPhone && setPhone(response.data[0].response.data[0].phone);
    });
  }, []);
  const submitForm = (e) => {
    if (errors.EMAIL != "") {
      setOpenPopup(true);
      setMessage("Provide a valid email");
      e.preventDefault();
    }
  };
  useLayoutEffect(() => {
    const fetchData = async () => {
      const url = APIURL() + "menu-links";
      const res = await axiosGet(url);
      setMenuLinks(res.data[0].response.data);
    };
    fetchData();
  }, []);
  useLayoutEffect(() => {
    const fetchData = async () => {
      const url = APIURL() + "foo-links";
      const res = await axiosGet(url);
      setFooInfo(res.data[0].response.data);
    };
    fetchData();
  }, []);
  return (
    <>
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
          severity={"error"}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <footer className={bussinesspage ? "footer-sec-two" : ""}>
        <div className="footer-top">
          {!bussinesspage ? (
            <Link href="/">
              <div className="footer-img">
                <Image height={400} width={400} src="/images/logo.png" alt="logo" />
              </div>
            </Link>
          ) : (
            ""
          )}
          <div className="container">
            <div className="row">
              <div className="col-xl-4 wow">
                <div className="footer-title">
                  <h3>
                    {bussinesspage ? (
                      <Image height={400} width={400} src="/images/blue-logo.png" alt="qwe" />
                    ) : (
                      ""
                    )}
                    About POP Telecom
                  </h3>
                </div>
                <div className="footer-about-text">
                  <p>{footerInfo ? footerInfo.description : ""}</p>
                  <div className="about-contact">
                    <ul>
                      <li>
                        <span>
                          <i className="fal fa-map-marker-alt" />
                          {footerInfo ? footerInfo.address : ""}
                        </span>
                      </li>
                      <li>
                        <i className="fal fa-phone-alt" />
                        <a
                          href={
                            footerInfo && footerInfo.phone
                              ? `tel:${footerInfo.phone}`
                              : ""
                          }
                        >
                          {footerInfo ? footerInfo.phone : ""}
                        </a>
                      </li>
                      <li>
                        <i className="fal fa-envelope" />
                        <a
                          href={
                            footerInfo && footerInfo.email
                              ? `mailto:${footerInfo.email}`
                              : ""
                          }
                        >
                          {footerInfo ? footerInfo.email : ""}
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="social-links">
                    <ul>
                      <li>
                        <a href={footerInfo ? footerInfo.facebook : ""}>
                          <i className="fab fa-facebook-f" />
                        </a>
                      </li>
                      <li>
                        <a
                          href={footerInfo ? footerInfo.twitter : ""}
                          className="bg1"
                        >
                          <i className="fab fa-twitter" />
                        </a>
                      </li>
                      <li>
                        <a
                          href={footerInfo ? footerInfo.instagram : ""}
                          className="bg2"
                        >
                          <i className="fab fa-instagram" />
                        </a>
                      </li>
                      <li>
                        <a
                          href={footerInfo ? footerInfo.linkedin : ""}
                          className="bg3"
                        >
                          <i className="fab fa-linkedin-in" />
                        </a>
                      </li>
                      <li>
                        <a
                          href={footerInfo ? footerInfo.tiktok : ""}
                          className="bg5"
                        >
                          <Image height={400} width={400}
                            src="/images/tiktok.png"
                            alt="tiku"
                            onMouseEnter={(e) =>
                              (e.target.src = "/images/tiktokup.png")
                            }
                            onMouseLeave={(e) =>
                              (e.target.src = "/images/tiktok.png")
                            }
                          />
                        </a>
                      </li>
                      <li>
                        <a
                          href={footerInfo ? footerInfo.youTube : ""}
                          className="bg4"
                        >
                          <i className="fab fa-youtube" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-8">
                <div className="row">
                  <div className="col-xl-4 col-md-4 wow ">
                    <div className="footer-title">
                      <h3>Consumer</h3>
                    </div>
                    <div className="footer-links">
                      <ul>
                        {menuLinks.consumer.map((link, index) => (
                          <li key={index}>
                            <Link href={`/${link.url}`}>
                              <i className="fal fa-long-arrow-right" />
                              {link.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="col-xl-4 col-md-4 wow ">
                    <div className="footer-title">
                      <h3>Business</h3>
                    </div>
                    <div className="footer-links">
                      <ul>
                        {menuLinks.business.map((link, index) => (
                          <li key={index}>
                            <Link href={`/${link.url}`}>
                              <i className="fal fa-long-arrow-right" />
                              {link.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="col-xl-4 col-md-4 wow ">
                    <div className="footer-title">
                      <h3>Customer Care</h3>
                    </div>
                    <div className="footer-links">
                      <ul>
                        {menuLinks.customer_care.map((link, index) => (
                          <li key={index}>
                            <Link href={`/${link.url}`}>
                              <i className="fal fa-long-arrow-right" />
                              {link.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-4"></div>
                  <div className="col-xl-8 col-md-12 wow ">
                    <div id="mc_embed_signup">
                      <form
                        action="https://gmail.us21.list-manage.com/subscribe/post?u=ec8a162ba5f6a09f752b13fc0&id=f0303160e4&f_id=00eceee1f0"
                        method="post"
                        id="mc-embedded-subscribe-form"
                        name="mc-embedded-subscribe-form"
                        className="validate"
                        target="_blank"
                        noValidate
                      >
                        <div className="mc-field-group">
                          <label htmlFor="mce-EMAIL">
                            Subscribe to our Newsletter{" "}
                            <span className="asterisk">*</span>
                          </label>
                          <div className="email-btn-box">
                            <input
                              type="email"
                              placeholder="Enter Your Email"
                              name="EMAIL"
                              className={
                                bussinesspage
                                  ? "buss-input required email"
                                  : "required email"
                              }
                              id="mce-EMAIL"
                              required={true}
                              value={userDetails.EMAIL}
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

                            <button
                              onClick={(e) => submitForm(e)}
                              type="submit"
                              defaultValue="Subscribe"
                              name="subscribe"
                              className={
                                bussinesspage
                                  ? "buss-subs email-btn"
                                  : "email-btn"
                              }
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={bussinesspage ? "footer-bottom dark-bg" : "footer-bottom"}
        >
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-4 col-md-4">
                <div className="copy-right">
                  <p>
                    © {today.getFullYear()}{" "}
                    <a href="#" className="color-main">
                      {" "}
                      POP Telecom{" "}
                    </a>{" "}
                    All rights reserved.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-4">
                <div className="payment-img">
                  <a href="#">
                    <Image height={400} width={400} src="/images/payment-img.png" alt="qwe" />
                  </a>
                </div>
              </div>
              <div className="col-lg-4 col-md-4">
                <div className="copy-right">
                  <ul>
                    {fooInfo.map((info, index) => (
                      <li key={index}>
                        <Link href={`/${info.url}`}>{info.title} </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Helmet>
          <script
            src="https://cors-anywhere.herokuapp.com/https://www.dwin1.com/51999.js"
            type="text/javascript"
            defer="defer"
          ></script>
        </Helmet>
      </footer>
      <a href="#" className="back-to-top" style={{ display: "none" }}>
        <i className="fa fa-arrow-up" aria-hidden="true" />
      </a>
    </>
  );
}

export default Footer;
