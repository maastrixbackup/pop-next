import { React, useEffect, useState } from "react";
import ArticleContent from "../../../../components/Article/ArticleContent";
import ArticleFiber from "../../../../components/Article/ArticleFiber";
import ArticleSupport from "../../../../components/Article/ArticleSupport";
import FiberSection from "../../../../components/Article/FiberSection";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import { APIURL } from "../../../../Methods/Fetch";
import { axiosGet } from "../../../../Methods/Save";
import MetaContext from "../../../../context/MetaContext";

function Article({ pageDetails, metaData, article }) {


  return (
    <>
      <MetaContext {...metaData} />

      <div>
        <Header />
      </div>
      <div className="body-box-margin helpsupport-pink">
        <ArticleContent article={article} />
        <ArticleFiber
          deal_desc={pageDetails.deal_desc}
          deal_title={pageDetails.deal_title}
          deal_btn_link={pageDetails.deal_btn_link}
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
          offer_img2={pageDetails.offer_img2}
          offer_title2={pageDetails.offer_title2}
          offer_desc2={pageDetails.offer_desc2}
          shop_btn_name={pageDetails.shop_btn_name}
          deal_btn_link={pageDetails.deal_btn_link}
          shop_btn_link={pageDetails.shop_btn_link}
        />
        <Footer />
      </div>
    </>
  );
}
export const getServerSideProps = async (context) => {
  let url = APIURL() + "blog-page";
  let res = await axiosGet(url);
  const pageDetails = res.data[0].response.data[0];
  const title = context.params.title;
  url = APIURL() + `blog/${title}`;
  res = await axiosGet(url);
  const article = res.data[0].response.data[0];
  if(!article){
    return{
      notFound:true,
    }
  }
  const metaData = {
    title: article.title ? article.title : "",
    metaTitle: article.meta_tag ? article.meta_tag : "",
    metaKeyWords: article.meta_keyword ? article.meta_keyword : "",
    metaDesc: article.meta_desc ? article.meta_desc : "",
    ogTitle: article.og_title ? article.og_title : "",
    ogDesc: article.og_desc ? article.og_desc : "",
    ogSiteName: article.og_site_name ? article.og_site_name : "",
    twitterCard: article.twitter_card ? article.twitter_card : "",
    twitterDesc: article.twitter_desc ? article.twitter_desc : "",
    twitterSite: article.twitter_site ? article.twitter_site : "",
    twitterTitle: article.twitter_title ? article.twitter_title : "",
  };
  

  return { props: { pageDetails, metaData,article } };
};

export default Article;
