import React from "react";
import AddressInput from "../Homepage/AddressInput";
import TrustPilot from "../TrustPilot";
import SkeletonComponent from "../Common/SkeletonComponent";
import Image from "next/image";

function BussinessTopDealsBanner(props) {
  const { title, description, image, theme } = props;
  return (
    <>
      <section className="top-deal-banner biz-topdeal-banner">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-8 col-lg-6">
              <div className="top-deal-content">
                <div dangerouslySetInnerHTML={{ __html: title }}></div>
                <div dangerouslySetInnerHTML={{ __html: description }}></div>
                <div
                  className="banner-inputform"
                  style={{ marginBottom: "20px" }}
                >
                  <AddressInput page="tv" />
                </div>
                <TrustPilot theme={theme} />
              </div>
            </div>
            <div
              className="col-xl-4 col-lg-6 wow fadeInRightBig"
              data-wow-delay="0.8s"
            >
              {image ? (
                <div className="banner-img">
                  <Image height={400} width={400} src={image} alt="banner_img" />
                </div>
              ) : (
                <SkeletonComponent color="#80a4c583" />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default BussinessTopDealsBanner;
