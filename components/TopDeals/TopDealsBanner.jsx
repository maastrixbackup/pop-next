import { React, useEffect } from "react";
import AddressInput from "../Homepage/AddressInput";
import dynamic from "next/dynamic";
const TrustPilot = dynamic(() => import("../TrustPilot"), {
  ssr: false,
});
// const AddressInput = dynamic(() => import("../Homepage/AddressInput"));
function TopDealsBanner(props) {
  const { title, description, bussiness } = props;

  return (
    <>
      <section
        className={
          bussiness ? "top-deal-banner biz-topdeal-banner" : "top-deal-banner"
        }
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-8">
              <div className="top-deal-content">
                <h3>{title}</h3>
                <div dangerouslySetInnerHTML={{ __html: description }}></div>
                <div
                  className="banner-inputform"
                  style={{ marginBottom: "20px" }}
                >
                  <AddressInput page="tv" />
                </div>
                <TrustPilot />
              </div>
            </div>
            <div
              className="col-xl-4 wow fadeInRightBig"
              data-wow-delay="0.8s"
            ></div>
          </div>
        </div>
      </section>
    </>
  );
}

export default TopDealsBanner;
