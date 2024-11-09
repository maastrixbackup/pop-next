import React from "react";
import dynamic from "next/dynamic";
import SkeletonComponent from "../Common/SkeletonComponent";
import Link from "next/link";
import AddressInput from "../Homepage/AddressInput";
import Image from "next/image";

// const AddressInput = dynamic(() => import('../Homepage/AddressInput'), {
//   ssr: false,
// })
const TrustPilot = dynamic(() => import('../TrustPilot'), {
  ssr: false,
})

function MobileBanner(props) {
  const {
    title,
    header,
    description,
    buy_btn_name,
    compare_btn_name,
    page,
    banner,
    defaultProduct,
    bussinesspage,
    compare_btn_link,
    theme,
  } = props;
  const goToAddress = () => {
    localStorage.setItem("Product", JSON.stringify(defaultProduct));
    var upfront = defaultProduct.upfront_price
      ? defaultProduct.upfront_price
      : 0;
    var initial_installation_price = defaultProduct.installation_cost
      ? defaultProduct.installation_cost
      : 0;
    var upfrontPayment = Number(upfront) + Number(initial_installation_price);
    localStorage.setItem("upfrontPayment", upfrontPayment);
    localStorage.setItem(
      "upfrontPayment",
      defaultProduct.installation_cost ? defaultProduct.installation_cost : 0
    );
    localStorage.setItem(
      "monthlyTotal",
      defaultProduct.price ? defaultProduct.price : 0
    );
    localStorage.setItem(
      "startingmonthlyCost",
      defaultProduct.price ? defaultProduct.price : 0
    );
    localStorage.setItem("initial_installation_price", upfrontPayment);
  };
  return (
    <>
      <section className={`${page}-banner`} style={{ backgroundImage:"/images/banner-box2.png" }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8 col-md-8">
              <div
                className={
                  bussinesspage
                    ? "buisness-content bizbroadband"
                    : `${page}-content`
                }
              >
                <div dangerouslySetInnerHTML={{ __html: title }}></div>
                <div dangerouslySetInnerHTML={{ __html: header }}></div>
                <div dangerouslySetInnerHTML={{ __html: description }}></div>

                {page == "broadband" || page == "buisness-broadband" ? (
                  <div className="broadband-compare-flex">
                    <div className="banner-inputform">
                      <AddressInput page="broadband" />
                    </div>
                    <a href={compare_btn_link} className="btn-style-four">
                      {compare_btn_name}
                    </a>
                  </div>
                ) : (
                  <div className="text_centre_uma btn-space">
                    <Link
                      href="/address"
                      onClick={goToAddress}
                      className="btn-style-three"
                    >
                      {buy_btn_name}
                    </Link>
                    <a href={compare_btn_link} className="btn-style-four">
                      {compare_btn_name}
                    </a>
                  </div>
                )}
              </div>
              <TrustPilot theme={theme} />
            </div>
            <div
              className="col-lg-4 col-md-4 wow fadeInRightBig"
              data-wow-delay="0.8s"
            >
              {banner ? (
                <div className="banner-img">
                  <Image height={400} width={400} src={banner} alt="banner" />
                </div>
              ) : (
                <SkeletonComponent color="#80a4c583" />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MobileBanner;
