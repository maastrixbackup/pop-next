import { React, useEffect, useState } from "react";
import InnerPageHeader from "../../../components/InnerPageHeader";
import { axiosGet } from "../../../Methods/Save";
import { APIURL } from "../../../Methods/Fetch";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import { Backdrop, Box, CircularProgress, Tooltip } from "@mui/material";
import TrustPilot from "../../../components/TrustPilot";
import { useRouter } from "next/router";

function UnlimitedPlans() {
  const longText = `Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus.
Praesent non nunc mollis, fermentum neque at, semper arcu.
Nullam eget est sed sem iaculis gravida eget vitae justo.`;
  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    "&:before": {
      display: "none",
    },
  }));
  var bussiness_type = false;
  useEffect(() => {
    bussiness_type = localStorage.getItem("bussiness_type");
  }, []);
  const navigate = useRouter();
  useEffect(() => {
    var bussiness_type = localStorage.getItem("bussiness_type");
    var type = "consumer";
    if (bussiness_type === "true") type = "business";
    setOpenLoader(true);
    var add_details = JSON.parse(localStorage.getItem("chk_add_details"));
    var url =
      APIURL() +
      `fttp-availability-product?CSSDistrictCode=${add_details.CSSDistrictCode}&alk=${add_details.alk}&product_type=${type}`;
    axiosGet(url).then((response) => {
      setProduct(response.data[0].response.data);
      setOpenLoader(false);
    });
  }, []);
  const [product, setProduct] = useState([]);
  const [userDetails, setuserDetails] = useState({});
  const [openLoader, setOpenLoader] = useState(false);

  useEffect(() => {
    setuserDetails(JSON.parse(localStorage.getItem("user_details")));
  }, []);
  const saveInLocal = (res) => {
    localStorage.setItem("monthlyTotal", res.price);
    localStorage.setItem("startingmonthlyCost", res.price);
    localStorage.setItem("Product", JSON.stringify(res));
    if (userDetails.landline == "") {
      localStorage.setItem(
        "initial_installation_price",
        res.installation_cost ? res.installation_cost : 0
      );
      localStorage.setItem(
        "upfrontPayment",
        res.installation_cost ? res.installation_cost : 0
      );
    } else {
      localStorage.setItem("upfrontPayment", 0);
      localStorage.setItem(
        "initial_installation_price",
        res.installation_cost ? res.installation_cost : 0
      );
    }

    navigate.push("/contractinstallation");
  };
  const options = {
    loop: false,
    margin: 10,
    dots: false,
    nav: true,
    // animateIn: "fadeInLeft",
    // autoplay: true,
    autoplayTimeout: 10000,
    responsive: {
      0: {
        items: 1,
      },

      600: {
        items: 1,
      },

      1024: {
        items: 4,
      },

      1366: {
        items: 4,
      },
    },
  };
  const [signedIn, SetSignedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("user_id") != null) {
      SetSignedIn(true);
    }
  }, []);

  return (
    <>
      <InnerPageHeader
        activeTab="priceSpeed"
        signedIn={signedIn}
        SetSignedIn={SetSignedIn}
        bussiness_type={bussiness_type}
      />
      <section className="address-form-sec">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="address-title mb-5">
                <h3>GREAT NEWS, {userDetails.first_name}</h3>
                <p>
                  You can get Pop Telecom's <b>FTTP</b> broadband at :
                </p>
                <h6> {userDetails.address}</h6>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="price-expand desktop_responsive">
        {product && product.length > 0
          ? product.map((res, index) => (
              <div key={index} className="price-box available">
                <div className="price-expand-width">
                  <div className={`swiper-slide${index + 1} border-price`}>
                    <span className="rrbion_avn available">
                      {res.is_available === 1 ? "Available" : "Not Available"}
                    </span>
                    <div className="pricingtable-wrapper style-1">
                      <div className="pricingtable-inner">
                        <div className="pricingtable-title bg-standard shadow-secondary">
                          {res.name}
                        </div>
                        <br />
                        <div className="pricingtable-price">
                          <span className="pricingtable-type">
                            Fast and Reliable
                          </span>
                        </div>

                        <div>
                          <span className="speed">
                            <b>Download speed</b>
                          </span>
                          <div className="price-height">
                            <div className="pricingtable-circle">
                              <p>
                                {res.is_available === 1
                                  ? res.DownstreamPeakHour
                                    ? res.DownstreamPeakHour
                                    : ""
                                  : "0"}
                              </p>
                              <span> Mbps</span>
                            </div>
                          </div>
                          <div className="pricingtable-media m-b20">
                            <ul>
                              <li className="speed">
                                <span>Upload speed</span>
                              </li>
                              <li className="upload">
                                <h3>
                                  {res.is_available === 1
                                    ? res.UpstreamPeakHour
                                      ? res.UpstreamPeakHour
                                      : ""
                                    : "0"}
                                  <span> Mbps</span>
                                </h3>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="pricingtable-features">
                          <Accordion>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                            >
                              <p
                                className="accordion-header"
                                id="headingOnepricehome"
                              >
                                Package and speed details
                              </p>
                            </AccordionSummary>
                            <AccordionDetails>
                              <div className="accordion-body">
                                <ul>
                                  <li>{res.contract_length} Contract Length</li>

                                  {res.feature
                                    ? res.feature.map((feat, index) => (
                                        <li key={index}>
                                          {feat.feature_name}
                                          <Tooltip
                                            title={longText}
                                            className={
                                              index == 0 ? "" : "d-none"
                                            }
                                          >
                                            <i
                                              className={
                                                index == 0
                                                  ? "fas fa-info"
                                                  : "fas fa-info d-none"
                                              }
                                              data-bs-toggle="tooltip"
                                              data-bs-placement="top"
                                              title="Tooltip on top"
                                            ></i>
                                          </Tooltip>
                                        </li>
                                      ))
                                    : ""}
                                  <li>
                                    Minimum Download Speed{" "}
                                    {res.MinDownstreamPeakHour
                                      ? res.MinDownstreamPeakHour
                                      : "0"}{" "}
                                    Mbps
                                  </li>
                                  <li>
                                    Minimum Upload Speed{" "}
                                    {res.MinUpstreamPeakHour
                                      ? res.MinUpstreamPeakHour
                                      : "0"}
                                    Mbps
                                  </li>
                                </ul>
                              </div>
                            </AccordionDetails>
                          </Accordion>
                        </div>
                        <div className="price-text">
                          <p>
                            £{(Math.round(res.price * 100) / 100).toFixed(2)}
                            <span>/month</span>
                          </p>
                        </div>
                        <div className="pricingtable-footer">
                          <button
                            style={{ border: " 0px" }}
                            className="plan-style-btn"
                            onClick={(e) => {
                              saveInLocal(res);
                            }}
                          >
                            {res.is_available === 1 ? "Select" : "Unavailable"}
                            <i className="fas fa-chevron-right" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="video-wrapper">
                    <div className="video-box">
                      <video
                        src="/images/animate.mp4"
                        preload="auto"
                        style={{ opacity: 1 }}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="video-icon"
                      ></video>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : ""}
      </div>
      <section className="mobile_responsive">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="tab-box">
                <ul className="nav nav-tabs">
                  {product && product.length > 0
                    ? product.map((res, index) => (
                        <li key={index} className="nav-item">
                          <a
                            className="nav-link"
                            data-bs-toggle="tab"
                            href={`#tabone${index}`}
                          >
                            <div
                              className="price-tab-box available"
                              key={index}
                            >
                              <div className="price-tab-title">
                                <h4>{res.name}</h4>
                              </div>
                              <div className="price-tab-speed-box">
                                <div className="row">
                                  <div className="col-lg-12">
                                    <h4 className="fast-rel">
                                      {" "}
                                      £
                                      {(
                                        Math.round(res.price * 100) / 100
                                      ).toFixed(2)}
                                      /month
                                    </h4>
                                  </div>
                                  <div className="col-lg-6 col-6">
                                    <div className="speed-item-price">
                                      <span>Download Speed</span>
                                      <div className="sped-count">
                                        {" "}
                                        {res.is_available === 1
                                          ? res.DownstreamPeakHour
                                            ? res.DownstreamPeakHour
                                            : ""
                                          : "0"}
                                        Mbps
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-6 col-6">
                                    <div className="speed-item-price">
                                      <span>Upload Speed</span>
                                      <div className="sped-count bg2">
                                        {res.is_available === 1
                                          ? res.UpstreamPeakHour
                                            ? res.UpstreamPeakHour
                                            : ""
                                          : "0"}
                                        Mbps
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="price-tab-btn">
                                <div className="pop-mob-list">
                                  <ul>
                                    <li>
                                      {res.contract_length} Contract Length
                                    </li>

                                    <li>
                                      Minimum Download Speed{" "}
                                      {res.MinDownstreamPeakHour
                                        ? res.MinDownstreamPeakHour
                                        : "0"}{" "}
                                      Mbps
                                    </li>
                                    <li>
                                      Minimum Upload Speed{" "}
                                      {res.MinUpstreamPeakHour
                                        ? res.MinUpstreamPeakHour
                                        : "0"}{" "}
                                      Mbps
                                    </li>
                                    {res.feature
                                      ? res.feature.map((feat, index) => (
                                          <li key={index}>
                                            {feat.feature_name}
                                            <Tooltip
                                              title={longText}
                                              className={
                                                index == 0 ? "" : "d-none"
                                              }
                                            >
                                              <i
                                                className={
                                                  index == 0
                                                    ? "fas fa-info"
                                                    : "fas fa-info d-none"
                                                }
                                                data-bs-toggle="tooltip"
                                                data-bs-placement="top"
                                                title="Tooltip on top"
                                              ></i>
                                            </Tooltip>
                                          </li>
                                        ))
                                      : ""}
                                  </ul>
                                </div>
                              </div>
                              <div className="price-tab-btn">
                                <button
                                  type="button"
                                  className="btn-style-tabprice"
                                  onClick={(e) => {
                                    saveInLocal(res);
                                  }}
                                >
                                  Select
                                  <i className="fas fa-chevron-right" />
                                </button>
                              </div>
                            </div>
                          </a>
                        </li>
                      ))
                    : ""}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="ptb-50">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="star-img">
                <TrustPilot fullWidth={true} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLoader}
        // onClick={handleClose}
        onBackdropClick="false"
      >
        <Box
          className="custom-loader-uma"
          sx={{ position: "relative", display: "block", textAlign: "center" }}
        >
          <h1 style={{ color: "white" }}>Please wait.</h1>
          <h2 style={{ color: "white" }}>
            We are fetching the available FTTP products for your location.
          </h2>
          <CircularProgress color="inherit" />
        </Box>
      </Backdrop>
    </>
  );
}

export default UnlimitedPlans;
