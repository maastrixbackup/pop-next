import React, { useEffect, useState } from "react";
import { APIURL } from "../../Methods/Fetch";
import { axiosGet } from "../../Methods/Save";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link, useParams } from "react-router-dom";
import HelpAndSupportSidebar from "../HelpAndSupportSidebar";

function ArticleBody(props) {
  const { searchText, resultSec } = props;
  const [faq, setFaq] = useState([]);
  const [posts, setPosts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    var url = APIURL() + "faq-details-page";
    axiosGet(url).then((response) => {
      setFaq(response.data[0].response.data);
      setPosts(response.data[0].response.data);
    });
  }, []);
  const [expanded, setExpanded] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const handleChange = (panel) => (event, isExpanded) => {
    setInitialLoad(false);
    setExpanded(isExpanded === true ? panel : 9999);
  };
  useEffect(() => {
    if (searchText.length > 0) {
      var arr = [...faq];
      var new_arr = arr.filter((item) =>
        item.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setPosts(new_arr);
    } else {
      setPosts(faq);
    }
  }, [searchText]);
  return (
    <>
      <section ref={resultSec} className="article-main-body faq-sec-inner">
        <div className="container">
          <div className="row">
            <div className="col-xl-9 col-lg-9">
              <div className="faq-box">
                <div className="accordion" id="accordionExample">
                  {posts && posts.length > 0 ? (
                    posts.map((faq_detail, index) => (
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
                              className={index == expanded ? "text-white" : ""}
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
                  ) : (
                    <div className="text-center">
                      <b>No results found</b>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <HelpAndSupportSidebar setRefresh={setRefresh} refresh={refresh} />
          </div>
        </div>
      </section>
    </>
  );
}

export default ArticleBody;
