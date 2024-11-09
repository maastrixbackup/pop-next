import { React, useState } from "react";
import SkeletonComponent from "../Common/SkeletonComponent";
import { useRouter } from "next/router";
import Image from "next/image";

function Banner(props) {
  const navigate = useRouter();
  const { image, title, header } = props;
  const [searchText, setSearchText] = useState();
  const goTo = () => {
    var para = searchText.toLowerCase().split(" ").join("-");
    localStorage.setItem("searchText", searchText);
    // localStorage.removeItem("articles_category");
    navigate.push(`/help-support/${para}`);
  };

  return (
    <>
      <section className="help-support-banner">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-8">
              <div className="mobile-content">
                <h3 className="wow fadeInLeftBig" data-wow-delay="0.4s">
                  POP Telecom Guides &amp; FAQS
                </h3>
                <h2 className="wow fadeInLeftBig" data-wow-delay="0.8s">
                  Need Help?
                </h2>
                <div className="banner-inputform">
                  <input
                    type="text"
                    name="searchText"
                    placeholder="Search help articles"
                    value={searchText}
                    onChange={(e) => {
                      setSearchText(e.target.value);
                      localStorage.setItem("search_text", e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        goTo();
                      }
                    }}
                  />
                  <button onClick={goTo} type="button" className="book-value">
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div className="col-xl-4 wow fadeInRightBig" data-wow-delay="0.8s">
              {image ? (
                <div className="banner-img">
                  <Image height={400} width={400} src={image} alt="banner_img" />
                </div>
              ) : (
                <SkeletonComponent color="#7084a162" />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Banner;
