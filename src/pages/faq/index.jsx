import { useRef, useState } from "react";
import ArticleBody from "../../../components/Faq/ArticleBody";
import Banner from "../../../components/Faq/Banner";
import Consultation from "../../../components/Faq/Consultation";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import SupportBox from "../../../components/HelpAndSupport/SupportBox";
import { APIURL } from "../../../Methods/Fetch";
import { axiosGet } from "../../../Methods/Save";
import SetPageName from "../../../components/SetPageName";
import MetaContext from "../../../context/MetaContext";

function Index({ pageDetails, metaData }) {
    const resultSec = useRef(null);

    const [searchText, setSearchText] = useState([]);
  return (
    <>
      <SetPageName name={pageDetails.page_title} />
      <MetaContext {...metaData} />
      <div className="">
        <div>
          <Header />
          <div className="body-box-margin helpsupport-pink">
            <Banner
              setSearchText={setSearchText}
              searchText={searchText}
              resultSec={resultSec}
            />
            <SupportBox page="faq" />
            <ArticleBody
              setSearchText={setSearchText}
              searchText={searchText}
              resultSec={resultSec}
            />
            <Consultation
              faq_contact_section={pageDetails.faq_contact_section}
            />

            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
export const getServerSideProps = async () => {
  let url = APIURL() + "faq-page";
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
