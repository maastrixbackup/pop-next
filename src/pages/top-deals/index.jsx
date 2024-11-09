// import Footer from "../../../components/Footer";
// import Header from "../../../components/Header";
// import Filter from "../../../components/Mobile/Filter";
import { axiosGet } from "../../../Methods/Save";
import { APIURL } from "../../../Methods/Fetch";
import TopDealsBanner from "../../../components/TopDeals/TopDealsBanner";
// import Bubbles from "../../../components/Bubbles";
import Pricing from "../../../components/TopDeals/Pricing";
import MetaContext from "../../../context/MetaContext";
// import SetPageName from "../../../components/SetPageName";
import dynamic from "next/dynamic";
const Bubbles = dynamic(() => import("../../../components/Bubbles"), {
  ssr: false,
});
const SetPageName = dynamic(() => import("../../../components/SetPageName"), {
  ssr: false,
});
const Footer = dynamic(() => import("../../../components/Footer"), {
  ssr: false,
});
const Header = dynamic(() => import("../../../components/Header"), {
  ssr: false,
});
const Filter = dynamic(() => import("../../../components/Mobile/Filter"), {
  ssr: false,
});

function index({ pageDetails, metaData }) {
  return (
    <>
      <MetaContext {...metaData} />
      <SetPageName name="topdeal" />
      <Header />

      <div className="body-box-margin">
        <Bubbles />

        <TopDealsBanner
          title={pageDetails.title}
          description={pageDetails.description}
        />
        <Pricing page="topdeal" />
        <Filter page="topdeal" />
        <Footer />
      </div>
    </>
  );
}
export const getServerSideProps = async () => {
  let url = APIURL() + "topdeal-page-details";
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
