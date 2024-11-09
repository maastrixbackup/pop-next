import MobileBanner from "../../../components/Mobile/MobileBanner";
import Pricing from "../../../components/LandLine/Pricing";
import Filter from "../../../components/Mobile/Filter";
import { axiosGet } from "../../../Methods/Save";
import { APIURL } from "../../../Methods/Fetch";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Experience from "../../../components/Mobile/Experience";
import Title from "../../../components/Title";
import MetaContext from "../../../context/MetaContext";
import SetPageName from "../../../components/SetPageName";

function index({ metaData, pageDetails, product }) {
  return (
    <>
      <MetaContext {...metaData} />
      <SetPageName name="mobile" />
      <div className="buisness-mobile buisness-mobile2">
        <div className="buisness">
          <Header bussinesspage={true} />
          <div className="body-box-margin">
            <MobileBanner
              title={pageDetails.title}
              banner={pageDetails.image}
              header={pageDetails.header}
              description={pageDetails.description}
              buy_btn_name={pageDetails.buy_btn_name}
              compare_btn_name={pageDetails.compare_btn_name}
              compare_btn_link={pageDetails.compare_btn_link}
              page="mobile-business"
              defaultProduct={product}
              theme="dark"
            />
            <Pricing bussinesspage={true} page="mobile" type="business" />
            <Filter bussinesspage={true} type="business" page="mobile" />
            <Experience
              title={pageDetails.experience_title}
              check_btn_name={pageDetails.check_btn_name}
              check_btn_link={pageDetails.check_btn_link}
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
              page="mobile"
              //   type="bussinesss"
            />
            <Footer bussinesspage={true} />
          </div>
        </div>
      </div>
    </>
  );
}
export const getServerSideProps = async () => {
  let url = APIURL() + "business-mobile-page-details";
  let res = await axiosGet(url);
  const pageDetails = res.data[0].response.data[0];
  const product = res.data[0].response.data.product[0];

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

  return { props: { pageDetails, metaData, product } };
};

export default index;
