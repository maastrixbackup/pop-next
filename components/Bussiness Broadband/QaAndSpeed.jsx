import React, { useEffect, useState } from "react";
import TrustPilot from "../TrustPilot";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { APIURL } from "../../Methods/Fetch";
import { axiosGet } from "../../Methods/Save";
import Link from "next/link";
import Image from "next/image";

function QaAndSpeed(props) {
  const {
    faq_desc,
    speed_title,
    speed_desc,
    speed_btn_name,
    speed_btn_link,
    term_header,
    term_title,
    term_desc,
    faq_btn_name,
    faq_btn_link,
    speed_img,  
  } = props;
  const [faq, setFaq] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    var url = APIURL() + "business-faq-details";
    axiosGet(url).then((response) => {
      setFaq(response.data[0].response.data);
    });
  }, []);
  const handleChange = (panel) => (event, isExpanded) => {
    setInitialLoad(false);
    setExpanded(isExpanded === true ? panel : 9999);
  };
  return (
    <>
      <div>
        <section className="faq-sec ptb-80 blue-banner">
          <div className="container">
            <div className="row">
              <div className="col-xl-5 col-md-6 mb-4">
                <div
                  className="faq-title-sec blue"
                  dangerouslySetInnerHTML={{ __html: faq_desc }}
                ></div>
                <Link class="btn-style-one" href={faq_btn_link}>
                  {faq_btn_name}
                </Link>
              </div>
              <div className="col-xl-7 col-md-6">
                <div className="faq-box">
                  {" "}
                  <div className="accordion" id="accordionExample">
                    {faq && faq.length > 0
                      ? faq.map((faq_detail, index) => (
                          <Accordion
                            key={index}
                            className="accordion-item wow fadeInRightBig"
                            data-wow-delay="0.4s"
                            onChange={handleChange(index)}
                            expanded={index == expanded ? true : false}
                          >
                            <AccordionSummary
                              expandIcon={
                                <ExpandMoreIcon
                                  className={
                                    index == expanded ? "text-white" : ""
                                  }
                                />
                              }
                              className={index == expanded ? "blue_bg_acc" : ""}
                            >
                              <span
                                className={
                                  index == expanded ? "text-white" : ""
                                }
                              >
                                {faq_detail.title}
                              </span>
                            </AccordionSummary>
                            <AccordionDetails>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: faq_detail.description,
                                }}
                              ></div>
                            </AccordionDetails>
                          </Accordion>
                        ))
                      : ""}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="speed-checker-sec">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="speed-checker-content">
                  <Image height={400} width={400} src={speed_img} alt="banner_img" />
                  <h3>{speed_title}</h3>
                  <div dangerouslySetInnerHTML={{ __html: speed_desc }}></div>
                  <Link href={speed_btn_link} className="btn-speed-checker">
                    {" "}
                    {speed_btn_name}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="ptb-50 bg-grays tp_parent">
          <div className="container">
            <div className="row">
              <div className="col-xl-7 mx-auto text-center">
                <TrustPilot fullwidth={true} />
              </div>
            </div>
          </div>
        </section>
        <section className="business-mobile-btmsec faq-term-sec bg-grays ptb-50">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="faq-term">
                  <h4>{term_header}</h4>
                  <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingOne">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          {term_title}
                        </button>
                      </h2>
                      <div
                        id="collapseOne"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample"
                      >
                        <div
                          className="accordion-body"
                          dangerouslySetInnerHTML={{ __html: term_desc }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default QaAndSpeed;
