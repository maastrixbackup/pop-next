import { React, useEffect, useState } from "react";
import { APIURL } from "../../Methods/Fetch";
import { axiosGet } from "../../Methods/Save";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";

function QuestionAnswer(props) {
  const [faq, setFaq] = useState([]);
  useEffect(() => {
    var url = APIURL() + "faq-details";
    axiosGet(url).then((response) => {
      setFaq(response.data[0].response.data);
    });
  }, []);
  const { desc,faq_btn_name,faq_btn_link } = props;
  const [expanded, setExpanded] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const handleChange = (panel) => (event, isExpanded) => {
    setInitialLoad(false);
    setExpanded(isExpanded === true ? panel : 9999);
  };
  return (
    <>
      <section className="faq-sec ptb-80">
        <div className="container">
          <div className="row">
            <div className="col-xl-5 col-md-6 mb-4">
              <div className="faq-title-sec">
                <div dangerouslySetInnerHTML={{ __html: desc }}></div>
                <Link href={faq_btn_link} className="btn-style-one">
                  {faq_btn_name}
                </Link>
              </div>
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

export default QuestionAnswer;
