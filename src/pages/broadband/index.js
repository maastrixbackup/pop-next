// import Header from "../../../components/Header";
import MobileBanner from "../../../components/Mobile/MobileBanner";
// import Footer from "../../../components/Footer";
import Pricing from "../../../components/Mobile/Pricing";
// import Filter from "../../../components/Mobile/Filter";
import Experience from "../../../components/Broadband/Experience";
import { axiosGet } from "../../../Methods/Save";
import { APIURL } from "../../../Methods/Fetch";
import dynamic from "next/dynamic";
import MetaContext from "../../../context/MetaContext";
const SetPageName = dynamic(() => import("../../../components/SetPageName"), {
  ssr: false,
});
const Filter = dynamic(() => import("../../../components/Mobile/Filter"), {
  ssr: false,
});
const Footer = dynamic(() => import("../../../components/Footer"), {
  ssr: false,
});
const Header = dynamic(() => import("../../../components/Header"), {
  ssr: false,
});

function index({ pageDetails, metaData }) {
  return (
    <>
      <MetaContext {...metaData} />
      <SetPageName name="broadband" />
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
          page="broadband"
        />
        <Pricing page="broadband" />
        <Filter page="broadband" />
        <Experience
          title={pageDetails.experience_title}
          contact_btn_name={pageDetails.contact_btn_name}
          contact_btn_link={pageDetails.contact_btn_link}
          description={pageDetails.experience_desc}
          offer_img1={pageDetails.offer_img1}
          offer_title1={pageDetails.offer_title1}
          offer_desc1={pageDetails.offer_desc1}
          deal_btn_name={pageDetails.deal_btn_name}
          offer_img2={pageDetails.offer_img2}
          offer_title2={pageDetails.offer_title2}
          offer_desc2={pageDetails.offer_desc2}
          shop_btn_name={pageDetails.shop_btn_name}
          deal_btn_link={pageDetails.deal_btn_link}
          shop_btn_link={pageDetails.shop_btn_link}
        />
        <Footer />
      </div>
    </>
  );
}
export const getServerSideProps = async () => {
  let url = APIURL() + "broadband-page-details";
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

export default index;
