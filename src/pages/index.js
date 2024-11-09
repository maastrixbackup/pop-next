import { APIURL } from "../../Methods/Fetch";
import { axiosGet } from "../../Methods/Save";
// import Header from "../../components/Header";
// import HomepageSlider from "../../components/Homepage/HomepageSlider";
import CallUs from "../../components/Homepage/CallUs";
import CustomerService from "../../components/Homepage/CustomerService";
import LookBeforeChoosing from "../../components/Homepage/LookBeforeChoosing";
import Reviewsection from "../../components/Homepage/Reviewsection";
import StillNotSure from "../../components/Homepage/StillNotSure";
import QuestionAnswer from "../../components/Homepage/QuestionAnswer";
import DontSlowDown from "../../components/Homepage/DontSlowDown";
// import Footer from "../../components/Footer";
// import LocalStorage from "../../components/Homepage/LocalStorage";
import dynamic from "next/dynamic";
import MetaContext from "../../context/MetaContext";
const LocalStorage = dynamic(
  () => import("../../components/Homepage/LocalStorage"),
  {
    ssr: false,
  }
);
const Footer = dynamic(() => import("../../components/Footer"), {
  ssr: false,
});
const Header = dynamic(() => import("../../components/Header"), {
  ssr: false,
});
const HomepageSlider = dynamic(
  () => import("../../components/Homepage/HomepageSlider"),
  {
    ssr: false,
  }
);
export default function Home({ banners, facility, pageDetails, metaData }) {
  return (
    <>
      <MetaContext {...metaData} />
      <LocalStorage />

      <Header />
      <HomepageSlider banners={banners} />
      <div>
        <CallUs facility={facility} />
        <CustomerService
          title={pageDetails.service_title}
          desc={pageDetails.service_desc}
        />
        <LookBeforeChoosing
          title={pageDetails.choose_title}
          desc={pageDetails.choose_desc}
        />

        <Reviewsection
          title={pageDetails.testimonial_title}
          desc={pageDetails.testimonial_desc}
        />
        <StillNotSure
          title={pageDetails.contact_title}
          desc={pageDetails.contact_desc}
        />
        <QuestionAnswer
          desc={pageDetails.faq_desc}
          faq_btn_name={pageDetails.faq_btn_name}
          faq_btn_link={pageDetails.faq_btn_link}
        />
        <DontSlowDown
          image={pageDetails.slowdown_img}
          desc={pageDetails.slowdown_desc}
          slow_down_btn={pageDetails.slow_down_btn}
        />
      </div>
      <Footer />
    </>
  );
}
export const getServerSideProps = async () => {
  let url = APIURL() + "banner-details";
  let res = await axiosGet(url);
  const banners = res.data[0].response.data;
  url = APIURL() + "facility-details";
  res = await axiosGet(url);
  const facility = res.data[0].response.data;
  url = APIURL() + "home-page-details";
  res = await axiosGet(url);
  const pageDetails = await res.data[0].response.data[0];
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
  return { props: { banners, facility, pageDetails, metaData } };
};
