import React from "react";
import SkeletonComponent from "../Common/SkeletonComponent";
import { useRouter } from "next/router";
import Image from "next/image";

function Deals(props) {
  const navigate = useRouter();

  const {
    pop_deal_title,
    pop_deal_desc,
    pop_deal_image,
    deal_btn_name,
    grab_deal_img1,
    grab_deal_desc1,
    grab_deal_btn_name1,
    grab_deal_img2,
    grab_deal_desc2,
    grab_deal_btn_name2,
    bussinessPage,
    product1,
    product2,
    product3,
  } = props;
  const goToAddress = (defaultProduct) => {
    localStorage.setItem("Product", JSON.stringify(defaultProduct));
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
    localStorage.setItem("page", "shop");
    localStorage.setItem(
      "initial_installation_price",
      defaultProduct.installation_cost ? defaultProduct.installation_cost : 0
    );
    navigate.push("/address");
  };
  return (
    <>
      <section
        className={
          bussinessPage ? "pt-50 bg-grays bizpage-deals-box" : "pt-50 bg-grays"
        }
      >
        <div className="container">
          <div className="row">
            <div
              className="col-xl-6 mb-3 col-md-12 wow fadeInLeftBig"
              data-wow-delay="0.4s"
            >
              <div className="pop-deal">
                <div className="pop-deal-title">
                  <h4>{pop_deal_title}</h4>
                </div>
                <div className="pop-deal-flex">
                  <div
                    className="pop-deal-text"
                    dangerouslySetInnerHTML={{ __html: pop_deal_desc }}
                  ></div>
                  {pop_deal_image ? (
                    <div className="pop-deal-img">
                      <Image height={400} width={400} src={pop_deal_image} alt="banner_img" />
                    </div>
                  ) : (
                    <SkeletonComponent color="#1058c4" />
                  )}
                </div>
              </div>
              <a
                style={{ cursor: "pointer" }}
                onClick={(e) => goToAddress(product1)}
                className="deal-btn"
              >
                {deal_btn_name} <i className="fal fa-chevron-right" />
              </a>
            </div>
            <div
              className="col-xl-3 mb-3 col-md-6 wow fadeInUpBig"
              data-wow-delay="0.8s"
            >
              <div className="pop-deal">
                <div className="pop-deal-flex pop-flex-2">
                  {grab_deal_img1 ? (
                    <div className="pop-deal-img">
                      <Image height={400} width={400} src={grab_deal_img1} alt="banner_img" />
                    </div>
                  ) : (
                    <SkeletonComponent color="#1058c4" />
                  )}

                  <div
                    className="pop-deal-text"
                    dangerouslySetInnerHTML={{ __html: grab_deal_desc1 }}
                  ></div>
                </div>
              </div>
              <a
                style={{ cursor: "pointer" }}
                onClick={(e) => goToAddress(product2)}
                className="deal-btn"
              >
                {grab_deal_btn_name1} <i className="fal fa-chevron-right" />
              </a>
            </div>
            <div
              className="col-xl-3 mb-3 col-md-6 wow fadeInRightBig"
              data-wow-delay="1.4s"
            >
              <div className="pop-deal">
                <div className="pop-deal-flex pop-flex-2">
                  {grab_deal_img2 ? (
                    <div className="pop-deal-img">
                      <Image height={400} width={400} src={grab_deal_img2} alt="banner_img" />
                    </div>
                  ) : (
                    <SkeletonComponent color="#1058c4" />
                  )}

                  <div
                    className="pop-deal-text"
                    dangerouslySetInnerHTML={{ __html: grab_deal_desc2 }}
                  ></div>
                </div>
              </div>
              <a
                style={{ cursor: "pointer" }}
                onClick={(e) => goToAddress(product3)}
                className="deal-btn"
              >
                {grab_deal_btn_name2} <i className="fal fa-chevron-right" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Deals;
