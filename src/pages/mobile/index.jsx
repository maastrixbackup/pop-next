import { React, useEffect, useState } from "react";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import Experience from "../../../components/Mobile/Experience";
import Filter from "../../../components/Mobile/Filter";
import MobileBanner from "../../../components/Mobile/MobileBanner";
import { axiosGet } from "../../../Methods/Save";
import { APIURL } from "../../../Methods/Fetch";
import Pricing from "../../../components/LandLine/Pricing";
import SetPageName from "../../../components/SetPageName";
import MetaContext from "../../../context/MetaContext";

function index({ pageDetails, defaultProduct, metaData }) {
  return (
    <>
      <MetaContext {...metaData} />
      <SetPageName name="mobile" />

      <Header />
      <div className="body-box-margin">
        <MobileBanner
          title={pageDetails.title}
          banner={pageDetails.image}
          header={pageDetails.header}
          description={pageDetails.description}
          buy_btn_name={pageDetails.buy_btn_name}
          compare_btn_name={pageDetails.compare_btn_name}
          compare_btn_link={pageDetails.compare_btn_link}
          defaultProduct={defaultProduct}
          page="mobile"
          theme="dark"
        />
        <Pricing page="mobile" />
        <Filter className="desktop_responsive" page="mobile" />
        <Experience
          title={pageDetails.experience_title}
          check_btn_name={pageDetails.check_btn_name}
          description={pageDetails.experience_desc}
          offer_img1={pageDetails.offer_img1}
          offer_title1={pageDetails.offer_title1}
          offer_desc1={pageDetails.offer_desc1}
          deal_btn_name={pageDetails.deal_btn_name}
          offer_img2={pageDetails.offer_img2}
          offer_title2={pageDetails.offer_title2}
          offer_desc2={pageDetails.offer_desc2}
          shop_btn_name={pageDetails.shop_btn_name}
          check_btn_link={pageDetails.check_btn_link}
          deal_btn_link={pageDetails.deal_btn_link}
          shop_btn_link={pageDetails.shop_btn_link}
          page="mobile"
        />
        <Footer />
      </div>
    </>
  );
}
export const getServerSideProps = async () => {
  let url = APIURL() + "mobile-page-details";
  let res = await axiosGet(url);
  const pageDetails = res.data[0].response.data[0];
  const defaultProduct = res.data[0].response.data.product[0];
  const metaData = {
    title: pageDetails.page_title ? pageDetails.page_title : "",
    metaTitle: pageDetails.meta_tag ? pageDetails.meta_tag : "",
    metaKeyWords: pageDetails.meta_keyword ? pageDetails.meta_keyword : "",
    metaDesc: pageDetails.meta_desc ? pageDetails.meta_desc : "",
    ogTitle: pageDetails.og_title ? pageDetails.og_title : "",
    ogDesc: pageDetails.og_desc ? pageDetails.og_desc : "",
    ogSiteName: pageDetails.og_site_name ? pageDetails.og_site_name : "",
    twitterCard: pageDetails.twitter_card ? pageDetails.twitter_card : "",
    twitterDesc: pageDetails.twitter_desc ? pageDetails.twitter_desc : "",
    twitterSite: pageDetails.twitter_site ? pageDetails.twitter_site : "",
    twitterTitle: pageDetails.twitter_title ? pageDetails.twitter_title : "",
  };

  return { props: { pageDetails, metaData, defaultProduct } };
};

export default index;
