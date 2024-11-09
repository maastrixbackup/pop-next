import { React, useEffect, useState } from "react";
// import animate from "../../public/images/animate.mp4";
import { axiosGet } from "../../Methods/Save";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import { APIURL } from "../../Methods/Fetch";
// import OwlCarousel from "react-owl-carousel";
import { Tooltip } from "@mui/material";
import Fade from "@mui/material/Fade";
import { useRouter } from "next/router";

function LookBeforeChoosing(props) {
  const { title, desc, offerPage, business } = props;
  useEffect(() => {
    var url = "";
    if (offerPage) {
      if (business == true) url = APIURL() + "broadband-offer/business";
      else url = APIURL() + "broadband-offer";
    } else url = APIURL() + "broadband";
    axiosGet(url).then((response) => {
      setProduct(response.data[0].response.data);
    });
  }, []);
  const [product, setProduct] = useState([]);
  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    "&:before": {
      display: "none",
    },
  }));
  const saveInLocal = (product) => {
    localStorage.setItem("category_id", product.category);
    navigate.push("/address");
  };
  const navigate = useRouter();
  const options = {
    loop: true,
    margin: 10,
    items: 1,
    dots: true,
    nav: false,
    // animateIn: "fadeInLeft",
    autoplay: true,
    autoplayTimeout: 10000,
    navText: [
      "<i class='fa fa-angle-left sp'></i>",
      "<i class='fa fa-angle-right sp'></i>",
    ],
  };
  return (
    <>
  
      <section className="superfast-paylist-sec">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 wow fadeInRightBig" data-wow-delay="0.2s">
              <span className="sub-title">{title}</span>
              <div className="title m-0">
                <div dangerouslySetInnerHTML={{ __html: desc }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="desktop_responsive">
        <div className="price-expand accordion" id="accordionpriceexpandhome">
          {product
            ? product.map((res, index) => (
                <div className="price-box" key={index}>
                  <div className="price-expand-width">
                    <div className="swiper-slide3 border-price">
                      <div className="pricingtable-wrapper style-1 home-price-wrapper">
                        <div className="pricingtable-inner">
                          <div
                            className={
                              index == 0
                                ? "pricingtable-title bg-standard shadow-info"
                                : index == 1
                                ? "pricingtable-title bg-warning shadow-info"
                                : index == 2
                                ? "pricingtable-title bg-unlimited shadow-info"
                                : index == 3
                                ? "pricingtable-title bg-danger shadow-info"
                                : "pricingtable-title bg-unlimited shadow-info"
                            }
                          >
                            {res.name}
                          </div>
                          <br />
                          <span className="speed">
                            <b>Download speed</b>
                          </span>
                          <div className="pricingtable-circle price-box-2">
                            <p>{res.avg_download_speed}</p>
                            <span> Mbps</span>
                          </div>

                          <div className="pricingtable-media m-b20">
                            <ul>
                              <li className="speed">
                                <span>Upload speed</span>
                              </li>
                              <li className="upload">
                                <h3>
                                  {res.avg_upload_speed} <span> Mbps</span>
                                </h3>
                              </li>
                            </ul>
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
                                                title={feat.feature_info}
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
                                    <li>
                                      Average Upload Speed{" "}
                                      {res.avg_upload_speed} Mpbs
                                    </li>
                                    <li>
                                      Average Download Speed{" "}
                                      {res.avg_download_speed} Mpbs
                                    </li>
                                  </ul>
                                </div>
                              </AccordionDetails>
                            </Accordion>
                          </div>
                          <div className="price-text">
                            <p>
                              £{(Math.round(res.price * 100) / 100).toFixed(2)}
                              <span> per month</span>
                            </p>
                          </div>
                          <div className="pricingtable-footer">
                            <a
                              style={{ cursor: "pointer" }}
                              onClick={(e) => {
                                saveInLocal(res);
                              }}
                              className="plan-style-btn"
                            >
                              Select
                              <i className="fas fa-chevron-right" />
                            </a>
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
      </section>
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
                            <div className="price-tab-box" key={index}>
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
                                      ).toFixed(2)}{" "}
                                      per month
                                    </h4>
                                  </div>
                                  <div className="col-lg-6 col-6">
                                    <div className="speed-item-price">
                                      <span>Download Speed</span>
                                      <div className="sped-count">
                                        {" "}
                                        {res.avg_download_speed
                                          ? res.avg_download_speed
                                          : ""}
                                        MB/s
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-6 col-6">
                                    <div className="speed-item-price">
                                      <span>Upload Speed</span>
                                      <div className="sped-count bg2">
                                        {res.avg_upload_speed
                                          ? res.avg_upload_speed
                                          : ""}
                                        MB/s
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="price-tab-btn">
                                <ul>
                                  <li>{res.contract_length} Contract Length</li>

                                  {res.feature
                                    ? res.feature.map((feat, index) => (
                                        <li key={index}>
                                          {feat.feature_name}{" "}
                                        </li>
                                      ))
                                    : ""}
                                  <li>
                                    Average Upload Speed {res.avg_upload_speed}{" "}
                                    Mpbs
                                  </li>
                                  <li>
                                    Average Download Speed{" "}
                                    {res.avg_download_speed} Mpbs
                                  </li>
                                </ul>
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
    </>
  );
}

export default LookBeforeChoosing;
