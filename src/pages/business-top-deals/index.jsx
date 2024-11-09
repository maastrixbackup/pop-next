import Filter from "../../../components/Mobile/Filter";
import { axiosGet } from "../../../Methods/Save";
import { APIURL } from "../../../Methods/Fetch";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import BussinessTopDealsBanner from "../../../components/Bussiness/BussinessTopDealsBanner";
import Pricing from "../../../components/LandLine/Pricing";
import MetaContext from "../../../context/MetaContext";
import SetPageName from "../../../components/SetPageName";

function index({ pageDetails, metaData }) {
  return (
    <>
      <MetaContext {...metaData} />
      <SetPageName name="topdeal" />
      <div className="buisness-mobile buisness-mobile2">
        <div className="buisness">
          <Header bussinesspage={true} />
          <div className="body-box-margin">
            <BussinessTopDealsBanner
              title={pageDetails.title}
              description={pageDetails.description}
              image={pageDetails.image}
              theme="dark"
            />
            <Pricing bussinesspage={true} page="topdeal" type="business" />
            <Filter bussinesspage={true} type="business" page="mobile" />
            <Footer bussinesspage={true} />
          </div>
        </div>
      </div>
    </>
  );
}
export const getServerSideProps = async () => {
  let url = APIURL() + "business-topdeal-page-details";
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
