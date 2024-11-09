import { React, useEffect, useState } from "react";
import ArticleFiber from "../../../../components/Blog/ArticleFiber";
import ArticleSupport from "../../../../components/Blog/ArticleSupport";
import BlogBody from "../../../../components/Blog/BlogBody";
import BlogHeader from "../../../../components/Blog/BlogHeader";
import FiberSection from "../../../../components/Blog/FiberSection";
import Footer from "../../../../components/Footer";
import Header from "../../../../components/Header";
import { APIURL } from "../../../../Methods/Fetch";
import { axiosGet } from "../../../../Methods/Save";
import { useRouter } from "next/router";
import MetaContext from "../../../../context/MetaContext";
// import { useParams } from "react-router-dom";

function Blog({pageDetails,metaData}) {
  const [category, setCategory] = useState();
  const params = useRouter().query;
  const { search } = params;


  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("articles_category") != null) {
      setCategory(JSON.parse(localStorage.getItem("articles_category")));
    }
  }, [refresh]);

  return (
    <>
      <MetaContext {...metaData} />

      <div className="buisness">
        <Header bussinesspage={true} />
      </div>

      <div className="body-box-margin">
        <BlogHeader category={category} title={search} />
        <BlogBody setRefresh={setRefresh} refresh={refresh}  />
        <ArticleFiber
          deal_title={pageDetails.deal_title}
          deal_desc={pageDetails.deal_desc}
          check_btn_name={pageDetails.check_btn_name}
          check_btn_link={pageDetails.check_btn_link}
        />
        <FiberSection
          experience_title={pageDetails.experience_title}
          experience_desc={pageDetails.experience_desc}
        />
        <ArticleSupport
          offer_img1={pageDetails.offer_img1}
          offer_title1={pageDetails.offer_title1}
          offer_desc1={pageDetails.offer_desc1}
          deal_btn_name={pageDetails.deal_btn_name}
          deal_btn_link={pageDetails.deal_btn_link}
          offer_img2={pageDetails.offer_img2}
          offer_title2={pageDetails.offer_title2}
          offer_desc2={pageDetails.offer_desc2}
          shop_btn_name={pageDetails.shop_btn_name}
          shop_btn_link={pageDetails.shop_btn_link}
        />
        <Footer bussinesspage={true} />
      </div>
    </>
  );
}
export const getServerSideProps = async () => {
    let url = APIURL() + "blog-page";
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
  

export default Blog;
