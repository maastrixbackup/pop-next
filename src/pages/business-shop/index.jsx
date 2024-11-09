import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import Deals from "../../../components/Shop/Deals";
import Filter from "../../../components/Shop/Filter";
import ShopBanner from "../../../components/Shop/ShopBanner";
import { APIURL } from "../../../Methods/Fetch";
import { axiosGet } from "../../../Methods/Save";
import SetPageName from "../../../components/SetPageName";
import MetaContext from "../../../context/MetaContext";

function index({ shopProducts, metaData,defaultProducts }) {
  return (
    <>
      <MetaContext {...metaData} />
      <SetPageName name="shop" />
      <div className="buisness-mobile buisness-mobile2">
        <div className="buisness">
          <Header bussinesspage={true} />
          <div className="body-box-margin">
            <ShopBanner
              shop_title_image={shopProducts.shop_title_image}
              shop_deal_image={shopProducts.shop_deal_image}
              shop_banner_title={shopProducts.shop_banner_title}
              bussinessPage={true}
            />
            <Deals
              pop_deal_title={shopProducts.pop_deal_title}
              pop_deal_desc={shopProducts.pop_deal_desc}
              pop_deal_image={shopProducts.pop_deal_image}
              deal_btn_name={shopProducts.deal_btn_name}
              grab_deal_img1={shopProducts.grab_deal_img1}
              grab_deal_desc1={shopProducts.grab_deal_desc1}
              grab_deal_btn_name1={shopProducts.grab_deal_btn_name1}
              grab_deal_img2={shopProducts.grab_deal_img2}
              grab_deal_desc2={shopProducts.grab_deal_desc2}
              grab_deal_btn_name2={shopProducts.grab_deal_btn_name2}
              bussinessPage={true}
              product1={defaultProducts[0]}
              product2={defaultProducts[1]}
              product3={defaultProducts[2]}
            />
            <Filter bussinessPage={true} />
            <Footer bussinesspage={true} />
          </div>
        </div>
      </div>
    </>
  );
}
export const getServerSideProps = async () => {
  let url = APIURL() + "business-shop-page-details";
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
  url = APIURL() + "shop-top-feature-products/business";
  res = await axiosGet(url);
  const defaultProducts = res.data[0].response.data;

  return {
    props: {
      shopProducts: pageDetails,
      metaData,
      defaultProducts,
    },
  };
};

export default index;
