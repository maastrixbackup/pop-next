import { useRef } from "react";
import { React, useState, useEffect } from "react";
import { APIURL } from "../../Methods/Fetch";
import { axiosGet } from "../../Methods/Save";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";

function ReviewsAndFaq(props) {
  const { review_title, faq_desc, faq_btn_link, faq_btn_name } = props;
  const [faq, setFaq] = useState([]);
  useEffect(() => {
    var url = APIURL() + "business-faq-details";
    axiosGet(url).then((response) => {
      setFaq(response.data[0].response.data);
    });
  }, []);
  const [expanded, setExpanded] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const ref = useRef(null);
  useEffect(() => {
    // If window.Trustpilot is available it means that we need to load the TrustBox from our ref.
    // If it's not, it means the script you pasted into <head /> isn't loaded  just yet.
    // When it is, it will automatically load the TrustBox.
    if (window.Trustpilot) {
      window.Trustpilot.loadFromElement(ref.current, true);
    }
  }, []);
  const handleChange = (panel) => (event, isExpanded) => {
    setInitialLoad(false);
    setExpanded(isExpanded === true ? panel : 9999);
  };
  return (
    <>
      <section className="customer-say-sec">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="title-buis">
                <h4>{review_title}</h4>
              </div>
              <div
                ref={ref}
                className="trustpilot-widget trust_pilot_full_height"
                data-locale="en-GB"
                data-template-id="54ad5defc6454f065c28af8b"
                data-businessunit-id="54736db600006400057bbc3c"
                data-style-height="240px"
                data-style-width="100%"
                data-theme="light"
                data-review-languages="en"
                data-stars="5"
              >
                <a
                  href="https://uk.trustpilot.com/review/www.poptelecom.co.uk"
                  target="_blank"
                  rel="noopener"
                >
                  Trustpilot
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="faq-sec ptb-80 blue-banner">
        <div className="container">
          <div className="row">
            <div className="col-xl-5 col-md-6 mb-4">
              <div
                dangerouslySetInnerHTML={{ __html: faq_desc }}
                className="faq-title-sec blue"
              ></div>
              <Link class="btn-style-one" href={faq_btn_link}>
                {faq_btn_name}
              </Link>
            </div>
            <div className="col-xl-7 col-md-6">
              <div className="faq-box">
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
                              className={index == expanded ? "text-white" : ""}
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
    </>
  );
}

export default ReviewsAndFaq;
