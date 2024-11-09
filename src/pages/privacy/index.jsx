import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import Content from "../../../components/Privacy/Content";
import MetaContext from "../../../context/MetaContext";
import { axiosGet } from "../../../Methods/Save";
import { APIURL } from "../../../Methods/Fetch";
import SetPageName from "../../../components/SetPageName";

function index({ metaData, pageDetails, pageDataDetails }) {
  return (
    <>
      <MetaContext {...metaData} />
      <SetPageName name={pageDataDetails.page_title} />

      <div className="buisness">
        <Header shoBblueLogo={true} bussinesspage={true} />
        <div className="body-box-margin">
          <Content
            pageDataDetails={pageDataDetails}
            pageDetails={pageDetails}
          />
          <Footer bussinesspage={true} />
        </div>
      </div>
    </>
  );
}
export const getServerSideProps = async () => {
  let url = APIURL() + "privacy-page-details";
  let res = await axiosGet(url);
  const pageDetails = res.data[0].response.data;
  const pageDataDetails = res.data[0].response.data_details;
  const metaData = {
    title: pageDataDetails.page_title ? pageDataDetails.page_title : "",
    metaTitle: pageDataDetails.meta_tag ? pageDataDetails.meta_tag : "",
    metaKeyWords: pageDataDetails.meta_keyword ? pageDataDetails.meta_keyword : "",
    metaDesc: pageDataDetails.meta_desc ? pageDataDetails.meta_desc : "",
    ogTitle: pageDataDetails.og_title ? pageDataDetails.og_title : "",
    ogDesc: pageDataDetails.og_desc ? pageDataDetails.og_desc : "",
    ogSiteName: pageDataDetails.og_site_name ? pageDataDetails.og_site_name : "",
    twitterCard: pageDataDetails.twitter_card ? pageDataDetails.twitter_card : "",
    twitterDesc: pageDataDetails.twitter_desc ? pageDataDetails.twitter_desc : "",
    twitterSite: pageDataDetails.twitter_site ? pageDataDetails.twitter_site : "",
    twitterTitle: pageDataDetails.twitter_title ? pageDataDetails.twitter_title : "",
  };

  return { props: { pageDetails, metaData, pageDataDetails } };
};

export default index;
