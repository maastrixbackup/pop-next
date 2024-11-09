import { React, useEffect, useState } from "react";
import { APIURL } from "../../Methods/Fetch";
import { axiosGet } from "../../Methods/Save";
import { useRouter } from "next/router";

function SupportFeature() {
  const navigate = useRouter();
  const [pageDetails, setPageDetails] = useState([]);

  useEffect(() => {
    var url = APIURL() + "blog-featured-article";
    axiosGet(url).then((response) => {
      setPageDetails(response.data[0].response.data);
    });
  }, []);
  const saveInLocal = (article) => {
    localStorage.setItem("blog-featured-article", JSON.stringify(article));
    var para = article.title.toLowerCase().split(" ").join("-");
    var category = article.category[0].category_name.toLowerCase().split(" ").join("-");
  
    navigate.push(`/help-support/${category}/${para}`);
  };
  const goToRelatedBlogs = (id) => {
    localStorage.setItem("articles_category", JSON.stringify(id));
    var para = id.category_name.toLowerCase().split(" ").join("-");
    navigate.push(`/help-support/${para}`);
  };
  return (
    <>
      <section className="support-featured-article">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center pb-4">
              <h4>Featured Articles</h4>
            </div>
          </div>
          <div className="row">
            {pageDetails && pageDetails.length > 0
              ? pageDetails.map((pageDetail,index) => (
                <div key={index} className="col-lg-4 col-md-6">
                  <div className="support-featured-articlebox">
                    <h6 style={{ cursor: "pointer" }} onClick={(e) => goToRelatedBlogs(pageDetail.category[0])}>{pageDetail.category[0].category_name}</h6>
                    <a
                      onClick={(e) => saveInLocal(pageDetail)}
                      style={{ cursor: "pointer" }}
                    >
                      {pageDetail.title}
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

export default SupportFeature;
