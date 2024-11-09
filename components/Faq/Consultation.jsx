import { React, useState, useEffect } from "react";
import { APIURL } from "../../Methods/Fetch";
import { axiosGet } from "../../Methods/Save";
import { useRouter } from "next/router";
import Image from "next/image";

function Consultation(props) {
  const navigate = useRouter();
    const {faq_contact_section  } = props;
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
      <section className="contact contact--agency">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3" dangerouslySetInnerHTML={{ __html:faq_contact_section }}>
              
            </div>
          </div>
        </div>
      </section>
      <section className="header-status-greybg">
        <div className="container">
          <div className="row">
            {pageDetails && pageDetails.length > 0
              ? pageDetails.map((pd,index) => (
                  <div key={index} className="col-lg-4 col-md-4 mb-3">
                    <div className="header-status-greybox">
                      <div className="header-status-greyboxpics">
                        <Image height={400} width={400} src={pd.image} alt="banner_img" />
                      </div>
                      <div className="header-status-greybox-content">
                        <h4 onClick={(e)=>saveInLocal(pd)} style={{ cursor:"pointer" }}>{pd.title}</h4>
                        <div
                          dangerouslySetInnerHTML={{ __html: pd.description }}
                        ></div>
                        <a style={{ cursor:"pointer"}} onClick={(e)=>saveInLocal(pd)}>
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

export default Consultation;
