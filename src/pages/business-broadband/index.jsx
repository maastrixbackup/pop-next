import MobileBanner from "../../../components/Mobile/MobileBanner";
import Pricing from "../../../components/Mobile/Pricing";
import { axiosGet } from "../../../Methods/Save";
import { APIURL } from "../../../Methods/Fetch";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Offers from "../../../components/Bussiness Broadband/Offers";
import QaAndSpeed from "../../../components/Bussiness Broadband/QaAndSpeed";
import Filter from "../../../components/Mobile/Filter";
import MetaContext from "../../../context/MetaContext";
import SetPageName from "../../../components/SetPageName";

function index({ pageDetails,metaData }) {
  return (
    <>
      <MetaContext {...metaData} />
      <SetPageName name="broadband" />
      <div className="buisness-mobile buisness-mobile2">
        <div className="buisness">
          <Header bussinesspage={true} />
          <div className="body-box-margin">
            <MobileBanner
              bussinesspage={true}
              title={pageDetails.title}
              banner={pageDetails.image}
              header={pageDetails.header}
              description={pageDetails.description}
              buy_btn_name={pageDetails.buy_btn_name}
              compare_btn_name={pageDetails.compare_btn_name}
              compare_btn_link={pageDetails.compare_btn_link}
              page="buisness-broadband"
            />
            <Pricing bussinesspage={true} page="broadband" type="business" />
            <Filter bussinesspage={true} type="business" page="broadband" />
            <Offers
              offer_img1={pageDetails.offer_img1}
              offer_title1={pageDetails.offer_title1}
              offer_title2={pageDetails.offer_title2}
              offer_desc1={pageDetails.offer_desc1}
              deal_btn_name={pageDetails.deal_btn_name}
              deal_btn_link={pageDetails.deal_btn_link}
              review_title={pageDetails.review_title}
            />
            <QaAndSpeed
              faq_desc={pageDetails.faq_desc}
              speed_title={pageDetails.speed_title}
              speed_desc={pageDetails.speed_desc}
              speed_img={pageDetails.speed_img}
              speed_btn_name={pageDetails.speed_btn_name}
              speed_btn_link={pageDetails.speed_btn_link}
              term_header={pageDetails.term_header}
              term_title={pageDetails.term_title}
              term_desc={pageDetails.term_desc}
              faq_btn_link={pageDetails.faq_btn_link}
              faq_btn_name={pageDetails.faq_btn_name}
            />
            <Footer bussinesspage={true} />
          </div>
        </div>
      </div>
    </>
  );
}
export const getServerSideProps = async () => {
    let url = APIURL() + "business-broadband-page-details";
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
