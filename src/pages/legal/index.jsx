import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import Content from "../../../components/Legal/Content";
import SetPageName from "../../../components/SetPageName";
import MetaContext from "../../../context/MetaContext";
import { axiosGet } from "../../../Methods/Save";
import { APIURL } from "../../../Methods/Fetch";

function index({ pageDetails, metaData }) {
  return (
    <>
      <SetPageName name={pageDetails.page_title} />

      <MetaContext {...metaData} />
      <div className="buisness">
        <Header shoBblueLogo={true} bussinesspage={true} />
        <div className="body-box-margin">
          <Content pageDetails={pageDetails} />
          <Footer bussinesspage={true} />
        </div>
      </div>
    </>
  );
}
export const getServerSideProps = async () => {
  let url = APIURL() + "legal-details";
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
