import { React, useEffect, useState } from "react";
import { APIURL } from "../../Methods/Fetch";
import { axiosPost } from "../../Methods/Save";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});
import dynamic from "next/dynamic";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion } from "@mui/material";
import { Tooltip } from "@mui/material";
import Fade from "@mui/material/Fade";
import { useRouter } from "next/router";

function Pricing(props) {
  const { page, type, bussinesspage } = props;
  var pro_type = type || "consumer";
  const navigate = useRouter();

  useEffect(() => {
    var url = APIURL() + `feature_products`;
    var data = {
      product_type: pro_type,
      page_type: page,
    };
    axiosPost(url, data).then((response) => {
      setProduct(response.data[0].response.data);
    });
  }, []);
  const [product, setProduct] = useState([]);
  const saveInLocal = (e, data) => {
    localStorage.setItem("Product", JSON.stringify(data));
    localStorage.setItem("page", data.package);
    localStorage.setItem(
      "upfrontPayment",
      data.installation_cost ? data.installation_cost : 0
    );
    localStorage.setItem("monthlyTotal", data.price ? data.price : 0);
    localStorage.setItem("startingmonthlyCost", data.price ? data.price : 0);
    localStorage.setItem(
      "initial_installation_price",
      data.installation_cost ? data.installation_cost : 0
    );
    navigate.push("/address");
  };
  const options = {
    loop: true,
    margin: 10,
    items: 1,
    dots: true,
    nav: false,
    // animateIn: "fadeInLeft",
    // autoplay: true,
    autoplayTimeout: 10000,
  };

  return (
    <>
      <section>
        <div className="price-expand-inner desktop_responsive">
          {product
            ? product.map((res, index) => (
                <div className="price-box" key={index}>
                  <div className="price-expand-width">
                    <div className="swiper-slide-price border-price">
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
                          <div
                            className="nn-list"
                            dangerouslySetInnerHTML={{
                              __html: res.description,
                            }}
                          ></div>

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
                          <span
                            className={
                              index == 0
                                ? "con-length"
                                : index == 1
                                ? "con-length cl2"
                                : index == 2
                                ? "con-length cl3"
                                : index == 3
                                ? "con-length cl4"
                                : "con-length"
                            }
                          >
                            {res.contract_length}
                          </span>
                          <div className="price-text">
                            <p>
                              £{(Math.round(res.price * 100) / 100).toFixed(2)}
                              <span>
                                {bussinesspage
                                  ? "+ VAT per month"
                                  : "per month"}{" "}
                              </span>
                            </p>
                          </div>
                          <div className="pricingtable-footer">
                            <a
                              style={{ cursor: "pointer" }}
                              onClick={(e) => {
                                saveInLocal(e, res);
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
                    {pro_type != "business" && (
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
                    )}
                  </div>
                </div>
              ))
            : ""}
        </div>
        <section className="price-expand-inner mobile_responsive">
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
                                        {bussinesspage ? "+VAT " : ""}
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
                                    <li>
                                      {res.contract_length} Contract Length
                                    </li>

                                    {res.feature
                                      ? res.feature.map((feat, index) => (
                                          <li key={index}>
                                            {feat.feature_name}{" "}
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
                                <div className="price-tab-btn">
                                  <button
                                    type="button"
                                    className="btn-style-tabprice"
                                    onClick={(e) => {
                                      saveInLocal(e, res);
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
      </section>
    </>
  );
}

export default Pricing;
