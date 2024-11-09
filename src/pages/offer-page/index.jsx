import React, { useEffect, useState } from "react";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import LookBeforeChoosing from "../../../components/Homepage/LookBeforeChoosing";
import BannerSection from "../../../components/OfferPage/BannerSection";
import Deals from "../../../components/OfferPage/Deals";
import { APIURL } from "../../../Methods/Fetch";
import { axiosGet } from "../../../Methods/Save";

function OfferPage({ pageDetails }) {
  const business = false;
  return (
    <>
      <div className={business ? "buisness-mobile" : ""}>
        <div className={business ? "buisness" : ""}>
          <Header bussinesspage={business ? true : false} />
          <div className="body-box-margin">
            <BannerSection pageDetails={pageDetails} />
            <LookBeforeChoosing
              business={business ? true : false}
              offerPage={true}
            />
            <Deals pageDetails={pageDetails} />
            <Footer bussinesspage={business ? true : false} />
          </div>
        </div>
      </div>
    </>
  );
}
export const getServerSideProps = async () => {
  let url = APIURL() + "offer-page-details";
  let res = await axiosGet(url);
  const pageDetails = res.data[0].response.data[0];

  return { props: { pageDetails } };
};

export default OfferPage;
