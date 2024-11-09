import BussinessBanner from "../../../components/Bussiness/BussinessBanner";
import Contactus from "../../../components/Bussiness/Contactus";
import HardwarePackages from "../../../components/Bussiness/HardwarePackages";
import ReviewsAndFaq from "../../../components/Bussiness/ReviewsAndFaq";
// import Footer from "../../../components/Footer";
// import Header from "../../../components/Header";
import { APIURL } from "../../../Methods/Fetch";
import { axiosGet } from "../../../Methods/Save";
import LocalStorage from "../../../components/Homepage/LocalStorage";
import Pricing from "../../../components/Mobile/Pricing";
import MetaContext from "../../../context/MetaContext";
import SetPageName from "../../../components/SetPageName";
import dynamic from "next/dynamic";
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
      <SetPageName name="business" />
      <div className="buisness-mobile buisness-mobile2">
        <div className="buisness">
          <LocalStorage />

          <Header bussinesspage={true} shoBblueLogo={true} />
          <div className="body-box-margin">
            <BussinessBanner
              banner_header={pageDetails.banner_header}
              banner_title={pageDetails.banner_title}
              banner_img={pageDetails.banner_img}
              // phone={phone}
            />
            <Pricing bussinesspage={true} page="broadband" type="business" />
            <HardwarePackages
              package_header={pageDetails.package_header}
              package_title={pageDetails.package_title}
              tab_one_title1={pageDetails.tab_one_title1}
              tab_one_title2={pageDetails.tab_one_title2}
              tab_one_desc1={pageDetails.tab_one_desc1}
              tab_one_desc2={pageDetails.tab_one_desc2}
              tab_one_img1={pageDetails.tab_one_img1}
              tab_one_img2={pageDetails.tab_one_img2}
              tab_two_title1={pageDetails.tab_two_title1}
              tab_two_title2={pageDetails.tab_two_title2}
              tab_two_desc1={pageDetails.tab_two_desc1}
              tab_two_desc2={pageDetails.tab_two_desc2}
              tab_two_img1={pageDetails.tab_two_img1}
              tab_two_img2={pageDetails.tab_two_img2}
              tab_three_title1={pageDetails.tab_three_title1}
              tab_three_desc1={pageDetails.tab_three_desc1}
              tab_three_title2={pageDetails.tab_three_title2}
              tab_three_desc2={pageDetails.tab_three_desc2}
              tab_three_img1={pageDetails.tab_three_img1}
              tab_three_img2={pageDetails.tab_three_img2}
              tab_name1={pageDetails.tab_name1}
              tab_name2={pageDetails.tab_name2}
              tab_name3={pageDetails.tab_name3}
              tab_one_btn_link2={pageDetails.tab_one_btn_link2}
              tab_one_btn_name2={pageDetails.tab_one_btn_name2}
              tab_one_btn_link1={pageDetails.tab_one_btn_link1}
              tab_one_btn_name1={pageDetails.tab_one_btn_name1}
              tab_two_btn_link1={pageDetails.tab_two_btn_link1}
              tab_two_btn_name1={pageDetails.tab_two_btn_name1}
              tab_three_btn_name1={pageDetails.tab_three_btn_name1}
              tab_three_btn_link1={pageDetails.tab_three_btn_link1}
            />
            <ReviewsAndFaq
              review_title={pageDetails.review_title}
              faq_desc={pageDetails.faq_desc}
              faq_btn_name={pageDetails.faq_btn_name}
              faq_btn_link={pageDetails.faq_btn_link}
            />
            <Contactus
              contact_desc={pageDetails.contact_desc}
              contact_title={pageDetails.contact_title}
              deal_btn_name={pageDetails.deal_btn_name}
              deal_btn_link={pageDetails.deal_btn_link}
              deal_desc={pageDetails.deal_desc}
              deal_img={pageDetails.deal_img}
              deal_title={pageDetails.deal_title}
              shop_btn_link={pageDetails.shop_btn_link}
              shop_btn_name={pageDetails.shop_btn_name}
              shop_desc={pageDetails.shop_desc}
              shop_title={pageDetails.shop_title}
            />
            <Footer
              // setPhone={setPhone}
              bussinesspage={true}
            />
          </div>
        </div>
      </div>
    </>
  );
}
export const getServerSideProps = async () => {
  let url = APIURL() + "business-home-page-details";
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
