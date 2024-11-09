import { React, useEffect, useState } from "react";
import InnerPageHeader from "../../../components/InnerPageHeader";
import { axiosPost } from "../../../Methods/Save";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import { APIURL } from "../../../Methods/Fetch";
import Tooltip from "@mui/material/Tooltip";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import Box from "@mui/material/Box";
import TrustPilot from "../../../components/TrustPilot";
import Fade from "@mui/material/Fade";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

function ProductPriceSpeed() {
  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    "&:before": {
      display: "none",
    },
  }));
  const navigate = useRouter();
  const [userDetails, setuserDetails] = useState({});
  const [availableProductName, setAvailableProductName] = useState();
  const [checkAddress, setCheckAdress] = useState();
  const [fttpAvailable, setFttpAvailable] = useState(false);
  const [modal, setModal] = useState(false);
  const [openLoader, setOpenLoader] = useState(true);
  const [vertical, setvertical] = useState("top");
  const [horizontal, sethori] = useState("right");

  const toggle = () => setModal(!modal);
  useEffect(() => {
    setCheckAdress(JSON.parse(localStorage.getItem("chk_add_details")));
    setuserDetails(JSON.parse(localStorage.getItem("user_details")));
  }, []);
  useEffect(() => {
    var page = "broadband";
    if (localStorage.getItem("page") != null) {
      page = localStorage.getItem("page");
      if (page == "topdeal") {
        page = "broadband";
      }
    }
    if (checkAddress) {
      setOpenLoader(true);
      var affiliate_name = "";
      if (localStorage.getItem("affName") != null)
        affiliate_name = localStorage.getItem("affName");
      var url = APIURL() + "get-all-product-availability";
      if (localStorage.getItem("affProduct") != null) {
        var data = {
          ...checkAddress,
          product_type: "affiliate",
          type: page,
          affiliate_name: affiliate_name,
        };
      } else if (bussiness_type == "true")
        var data = {
          ...checkAddress,
          product_type: "business",
          type: page,
          affiliate_name: affiliate_name,
        };
      else
        var data = {
          ...checkAddress,
          product_type: "consumer",
          type: page,
          affiliate_name: affiliate_name,
        };
      axiosPost(url, data).then((response) => {
        if (
          response.data[0].response.data.filter(
            (data) => data.is_available == 1
          ).length == 0
        ) {
          navigate.push("/no-products-available");
        }
        setProduct(
          response.data[0].response.data.filter(
            (data) => data.is_available == 1
          )
        );
        setOpenLoader(false);
        var fttp = response.data[0].response.data.filter(
          (data) => data.type == 11
        );
        if (fttp[0].is_available == 1) setFttpAvailable(true);
      });
    }
  }, [checkAddress]);
  const [selProduct, setSelProduct] = useState([]);
  const [product, setProduct] = useState([]);
  const [openMessage, setOpenMessage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(4);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const saveInLocal = (res) => {
    setSelProduct(res);
    setOpenLoader(true);
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
    loop: true,
    margin: 10,
    items: 4,
    dots: true,
    nav: false,
    stagePadding: 30,
    responsive: {
      0: {
        items: 1,
      },

      600: {
        items: 1,
      },

      1024: {
        items: 4,
        loop: false,
      },

      1366: {
        items: 4,
        loop: false,
      },
    },
    navText: [
      "<i class='fa fa-angle-left sp'></i>",
      "<i class='fa fa-angle-right sp'></i>",
    ],
    // autoplay: true,
    autoplayTimeout: 10000,
  };
  const proceed = () => {
    toggle();
    navigate.push("/contractinstallation");
  };
  useEffect(() => {
    if (product && product.length > 0) {
      for (let index = product.length - 1; index > 0; index--) {
        if (product[index].is_available == 1) {
          setAvailableProductName(product[index].name);
          break;
        }
      }
    }
  }, [product]);
  var bussiness_type = false;
  useEffect(() => {
    bussiness_type = localStorage.getItem("bussiness_type");
  }, []);
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
        bussiness_type={bussiness_type}
        signedIn={signedIn}
        SetSignedIn={SetSignedIn}
      />
      <div
        className={
          bussiness_type == "true" ? "buisness-mobile buisness-mobile2" : ""
        }
      >
        {product && product.length > 0 && (
          <section className="address-form-sec">
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <div className="address-title">
                    <h3>
                      GREAT NEWS{" "}
                      {userDetails.first_name
                        ? `,${userDetails.first_name}`
                        : ""}
                      !
                    </h3>
                    <p>You can get Pop Telecom's great services at:</p>
                    <h6> {userDetails.address}</h6>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        <section className="desktop_responsive">
          <div className="price-expand">
            {product && product.length > 0 ? (
              <>
                {product.map((res, index) => (
                  <div
                    key={index}
                    className={
                      res.is_available === 1
                        ? "price-box available"
                        : "price-box no-available"
                    }
                  >
                    <div className="price-expand-width">
                      <div className={`swiper-slide${index + 1} border-price`}>
                        <span
                          className={
                            res.is_available === 1
                              ? "rrbion_avn available"
                              : "rrbion_avn no-available"
                          }
                        >
                          {res.is_available === 1
                            ? "Available"
                            : "Not Available"}
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
                                  <span>Mbps</span>
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
                                              {feat.feature_info ? (
                                                <Tooltip
                                                  TransitionComponent={Fade}
                                                  TransitionProps={{
                                                    timeout: 600,
                                                  }}
                                                  title="Add"
                                                  placement="right-start"
                                                >
                                                  <i
                                                    className="fas fa-info"
                                                    data-bs-toggle="tooltip"
                                                    data-bs-placement="top"
                                                    title={feat.feature_info}
                                                  />
                                                </Tooltip>
                                              ) : (
                                                ""
                                              )}
                                            </li>
                                          ))
                                        : ""}
                                    </ul>
                                  </div>
                                </AccordionDetails>
                              </Accordion>
                            </div>
                            <div className="price-text">
                              <p>
                                £
                                {(Math.round(res.price * 100) / 100).toFixed(2)}
                                <span>
                                  {bussiness_type === "true"
                                    ? " +VAT per month"
                                    : " per month"}
                                </span>
                              </p>
                            </div>
                            <div className="pricingtable-footer">
                              <button
                                style={{ border: " 0px" }}
                                className={
                                  res.is_available === 1
                                    ? "plan-style-btn"
                                    : "plan-style-btn btn btn-secondary"
                                }
                                onClick={(e) => {
                                  saveInLocal(res);
                                }}
                                disabled={res.is_available === 1 ? false : true}
                              >
                                {res.is_available === 1
                                  ? "Select"
                                  : "Unavailable"}
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
                ))}
                {fttpAvailable ? (
                  <div className="price-box">
                    <div className="price-expand-width">
                      <div className="swiper-slide3 border-price">
                        <div className="pricingtable-wrapper style-2 ">
                          <div className="pricingfancy-inner">
                            <div className="fancy-title">
                              <h6>fancy going a bit faster?</h6>
                              <Image
                                height={400}
                                width={400}
                                src="/images/faster.png"
                                alt="banner_img"
                              />
                            </div>
                            <div className="ultimate-deals">
                              <h3>
                                Check out our other Ultrafast Packages up to
                                1000Mb/s
                              </h3>
                              <div className="pricingtable-footer">
                                <Link
                                  href="/unlimitedplans"
                                  className="plan-style-btn"
                                >
                                  Check
                                  <i className="fas fa-chevron-right" />
                                </Link>
                              </div>
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
                ) : (
                  ""
                )}
              </>
            ) : openLoader == true ? (
              ""
            ) : (
              <div className="text-center">
                <h4 className="no_available_location">
                  Sorry We currently do not provide service at this Location
                </h4>
              </div>
            )}
          </div>
        </section>
        <section className="mobile_responsive">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="tab-box">
                  <ul className="nav nav-tabs">
                    {product && product.length > 0
                      ? product.map((res, index) => (
                          <li
                            key={index}
                            className={
                              res.is_available === 1
                                ? "nav-item"
                                : "no-available"
                            }
                          >
                            <a
                              className="nav-link"
                              data-bs-toggle="tab"
                              href={`#tabone${index}`}
                            >
                              <div
                                className={
                                  res.is_available === 1
                                    ? "price-tab-box available"
                                    : "price-tab-box no-available"
                                }
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
                                        {bussiness_type === "true"
                                          ? " +VAT per month"
                                          : " per month"}
                                      </h4>
                                    </div>
                                    <div className="col-lg-6 col-6">
                                      <div className="speed-item-price">
                                        <span>Download Speed</span>
                                        <div className="sped-count">
                                          {" "}
                                          {res.DownstreamPeakHour
                                            ? res.DownstreamPeakHour
                                            : "0"}{" "}
                                          Mbps
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-6 col-6">
                                      <div className="speed-item-price">
                                        <span>Upload Speed</span>
                                        <div className="sped-count bg2">
                                          {res.UpstreamPeakHour
                                            ? res.UpstreamPeakHour
                                            : "0"}{" "}
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
                                            </li>
                                          ))
                                        : ""}
                                    </ul>
                                  </div>
                                </div>
                                <div className="price-tab-btn">
                                  <button
                                    type="button"
                                    className={
                                      res.is_available === 1
                                        ? "btn-style-tabprice"
                                        : "btn-style-tabprice btn btn-secondary"
                                    }
                                    onClick={(e) => {
                                      saveInLocal(res);
                                    }}
                                    disabled={
                                      res.is_available === 1 ? false : true
                                    }
                                  >
                                    {res.is_available === 1
                                      ? "Select"
                                      : "Unavailable"}{" "}
                                    <i className="fas fa-chevron-right" />
                                  </button>
                                </div>
                              </div>
                            </a>
                          </li>
                        ))
                      : ""}
                    {fttpAvailable ? (
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          data-bs-toggle="tab"
                          href="#tabone0"
                        >
                          <div class="price-tab-box available">
                            <div class="price-tab-title">
                              <h4>Fancy going a bit faster?</h4>
                            </div>
                            <div class="price-tab-speed-box">
                              <div class="row">
                                <h3 className="mobile_extra_card">
                                  Check out our other Ultrafast Packages up to
                                  1000Mb/s
                                </h3>
                              </div>
                            </div>
                            <div class="price-tab-btn">
                              <button
                                type="button"
                                class="btn-style-tabprice btn btn-secondary"
                                onClick={(e) =>
                                  navigate.push("/unlimitedplans")
                                }
                              >
                                Choose
                                <i class="fas fa-chevron-right"></i>
                              </button>
                            </div>
                          </div>
                        </a>
                      </li>
                    ) : (
                      ""
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/*<div className="tab-content-main-box">
              <div className="tab-content">
                {posts && posts.length > 0
                  ? posts.map((res, index) => (
                      <div
                        className={index == 0 ? "tab-pane active" : "tab-pane"}
                        id={`tab${index}`}
                      >
                        <div className="pr-ce-desc">
                          <p>Package and speed details</p>
                          <ul>
                            {res.feature
                              ? res.feature.map((feat, index) => (
                                  <li>
                                    <strong>{feat.feature_name}</strong>
                                    <i
                                      className="fas fa-info"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      title="AC Router Included"
                                    />
                                  </li>
                                ))
                              : ""}
                          </ul>
                        </div>
                      </div>
                    ))
                  : ""}
              </div>
                              </div>*/}
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
      </div>
      <Modal isOpen={modal} toggle={toggle} backdrop="static">
        <ModalHeader>
          Congratulations! This product is available for your location.
        </ModalHeader>
        <ModalBody>
          <h3>Details for {selProduct.name}:</h3>
          <p>Download Speed: {selProduct.DownstreamPeakHour} </p>
          <p>Upload Speed : {selProduct.avg_upload_speed} </p>
          <p>Contract Length : {selProduct.contract_length} </p>
          <p>Price : {selProduct.price} </p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => proceed()}>
            Continue
          </Button>
          <Button color="secondary" onClick={toggle}>
            Choose another
          </Button>
        </ModalFooter>
      </Modal>
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
            We are fetching the available products for your location.
          </h2>
          <CircularProgress color="inherit" />
        </Box>
      </Backdrop>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
        open={openMessage}
        autoHideDuration={6000}
        onClose={() => {
          setOpenMessage(false);
        }}
      >
        <Alert
          onClose={() => {
            setOpenMessage(false);
          }}
          variant="filled"
          severity="error"
          sx={{ width: "100%" }}
        >
          Sorry this Product is not available for your location.Please select
          another product..
        </Alert>
      </Snackbar>
    </>
  );
}

export default ProductPriceSpeed;
