import { useEffect, useState } from "react";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import Banner from "../../../components/HelpAndSupport/Banner";
import Deals from "../../../components/HelpAndSupport/Deals";
import Helps from "../../../components/HelpAndSupport/Helps";
import SupportBox from "../../../components/HelpAndSupport/SupportBox";
import SupportFeature from "../../../components/HelpAndSupport/SupportFeature";
import { APIURL } from "../../../Methods/Fetch";
import { axiosGet } from "../../../Methods/Save";
import MetaContext from "../../../context/MetaContext";

function Index({ pageDetails, metaData }) {
  // const [pageDetails, setPageDetails] = useState([]);
  // const [metaData, setMetaData] = useState([]);

  useEffect(() => {
    localStorage.removeItem("searchText");
    localStorage.removeItem("articles_category");
  }, []);
  return (
    <>
      <MetaContext {...metaData} />
      <div>
        <Header />
      </div>
      <div className="body-box-margin helpsupport-pink">
        <Banner image={pageDetails.image} header={pageDetails.header} />
        <SupportBox page="blog" />
        <SupportFeature />
        <Helps />
        <Deals
          experience_title={pageDetails.experience_title}
          experience_desc={pageDetails.experience_desc}
          offer_img1={pageDetails.offer_img1}
          offer_title1={pageDetails.offer_title1}
          offer_desc1={pageDetails.offer_desc1}
          deal_btn_name={pageDetails.deal_btn_name}
          offer_img2={pageDetails.offer_img2}
          offer_title2={pageDetails.offer_title2}
          offer_desc2={pageDetails.offer_desc2}
          deal_btn_link={pageDetails.deal_btn_link}
          check_btn_link={pageDetails.check_btn_link}
          shop_btn_name={pageDetails.shop_btn_name}
          shop_btn_link={pageDetails.shop_btn_link}
        />
        <Footer />
      </div>
    </>
  );
}
export const getServerSideProps = async () => {
  let url = APIURL() + "blog-page";
  let res = await axiosGet(url);
  const pageDetails = res.data[0].response.data[0];
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

  return { props: { pageDetails, metaData } };
};

export default Index;
