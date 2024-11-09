import React from "react";
import SkeletonComponent from "../Common/SkeletonComponent";
import Image from "next/image";

function ShopBanner(props) {
  const {
    shop_banner_title,
    shop_deal_image,
    shop_title_image,
    bussinessPage,
  } = props;
  return (
    <>
      <section
        className={
          bussinessPage ? "shop-banner business-shopbanner" : "shop-banner"
        }
      >
        <div className="container">
          <div className="row title-relative">
            {shop_title_image ? (
              <div
                className="col-xl-8 wow  animated animate__shakeX"
                data-wow-delay="0.4s"
              >
                <Image height={400} width={400} src={shop_title_image} alt="banner_img" />
              </div>
            ) : (
              <SkeletonComponent color="#7797b3" />
            )}
            {shop_deal_image ? (
              <div
                className="col-xl-4 wow fadeInRightBig"
                data-wow-delay="0.8s"
              >
                <Image height={400} width={400} src={shop_deal_image} alt="banner_img" />
              </div>
            ) : (
              <SkeletonComponent color="#7797b3" />
            )}
            {shop_banner_title ? (
              <div className="col-xl-12">
                <div className="shop-banner-title">
                  <h6>{shop_banner_title}</h6>
                </div>
              </div>
            ) : (
              <SkeletonComponent color="#7797b3" />
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default ShopBanner;
