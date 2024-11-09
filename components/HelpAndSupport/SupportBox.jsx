import { React, useEffect, useState } from "react";
import { APIURL } from "../../Methods/Fetch";
import { axiosGet } from "../../Methods/Save";
import { useRouter } from "next/router";

function SupportBox(props) {
  const {page} = props;
  const navigate = useRouter();
  const [pageDetails, setPageDetails] = useState([]);

  useEffect(() => {
    var url = APIURL() + `top-${page}-category`;
    axiosGet(url).then((response) => {
      setPageDetails(response.data[0].response.data);
    });
  }, []);
  const goToRelatedBlogs = (id) => {
    localStorage.setItem("articles_category", JSON.stringify(id));
    var para = id.title.toLowerCase().split(" ").join("-");
    navigate.push(`/help-support/${para}`);
  };
  return (
    <>
      <section className="support-box-area">
        <div className="container">
          <div className="row">
            {pageDetails && pageDetails.length > 0
              ? pageDetails.map((pageDetail,index) => (
                  <div key={index} className="col-lg-4 col-md-6">
                    <div className="support-box-wh">
                      <i className={pageDetail.icon} />
                      <h4
                        style={{ cursor: "pointer" }}
                        onClick={(e) => goToRelatedBlogs(pageDetail)}
                      >
                        {pageDetail.title}
                      </h4>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: pageDetail.description,
                        }}
                      ></div>
                      <a href="#" onClick={(e) => goToRelatedBlogs(pageDetail)}>
                        {pageDetail.title} Help{" "}
                        <i className="far fa-chevron-right" />
                      </a>
                    </div>
                  </div>
                ))
              : ""}
          </div>
        </div>
      </section>
    </>
  );
}

export default SupportBox;
