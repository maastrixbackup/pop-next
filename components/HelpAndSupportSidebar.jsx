import React, { useEffect, useState } from "react";
import { APIURL } from "../Methods/Fetch";
import { axiosGet } from "../Methods/Save";
import { useRouter } from "next/router";
function HelpAndSupportSidebar(props) {
  const { refresh, setRefresh } = props;
  const navigate = useRouter();
  const [pageDetails, setPageDetails] = useState([]);

  useEffect(() => {
    var url = APIURL() + `top-faq-category`;
    axiosGet(url).then((response) => {
      setPageDetails(response.data[0].response.data);
    });
  }, []);
  const goToRelatedBlogs = (id) => {
    localStorage.setItem("articles_category", JSON.stringify(id));
    var para = id.title.toLowerCase().split(" ").join("-");
    setRefresh(!refresh);
    navigate.push(`/help-support/${para}`);
  };
  return (
    <>
      <div className="col-xl-3 col-lg-3">
        <div className="article-main-body-right">
          <div className="article-main-body-right1">
            <h4>Help &amp; Support</h4>
            <ul>
              {pageDetails && pageDetails.length > 0
                ? pageDetails.map((pageDetail, index) => (
                    <li key={index}>
                      <a
                        style={{ cursor: "pointer" }}
                        onClick={(e) => goToRelatedBlogs(pageDetail)}
                      >
                        {pageDetail.title}
                      </a>
                    </li>
                  ))
                : ""}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default HelpAndSupportSidebar;
