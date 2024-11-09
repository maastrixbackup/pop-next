import React from "react";
import SkeletonComponent from "../Common/SkeletonComponent";
import AddressInput from "../Homepage/AddressInput";

function BannerSection(props) {
  const { pageDetails } = props;
  return (
    <>
      <section className="landing-page-banner">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <div className="landing-page-content">
                <h3>{pageDetails.title}</h3>
                <div
                  dangerouslySetInnerHTML={{ __html: pageDetails.description }}
                ></div>
                <div className="broadband-compare-flex">
                  <div className="banner-inputform">
                    <AddressInput page="broadband" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 wow fadeInRightBig" data-wow-delay="0.8s">
              {pageDetails && pageDetails.image ? (
                <div className="banner-img">
                  <img src={pageDetails.image} alt="asd" />
                </div>
              ) : (
                <SkeletonComponent color="#125ecf62" />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default BannerSection;
