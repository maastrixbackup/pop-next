import { React, useEffect, useState } from "react";
import { APIURL } from "../../Methods/Fetch";
import { axiosGet } from "../../Methods/Save";
import { useRouter } from "next/router";
import Image from "next/image";

function Helps() {
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
  return (
    <>
      <section className="header-status-greybg">
        <div className="container">
          <div className="row">
            {pageDetails && pageDetails.length > 0
              ? pageDetails.map((pageDetail,index) => (
                  <div key={index} className="col-lg-4 col-md-6 mb-3">
                    <div className="header-status-greybox">
                      <div className="header-status-greyboxpics">
                        <Image height={400} width={400} src={pageDetail.image} alt="abc" />
                      </div>
                      <div className="header-status-greybox-content">
                        <h4 style={{ cursor:"pointer"}} onClick={(e)=>saveInLocal(pageDetail)}>{pageDetail.title}</h4>
                        <div dangerouslySetInnerHTML={{ __html:pageDetail.description }}></div>
                        <a style={{ cursor:"pointer"}} onClick={(e)=>saveInLocal(pageDetail)}>
                          Check Service Status{" "}
                          <i className="far fa-chevron-right" />
                        </a>
                      </div>
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

export default Helps;
