import React from "react";
import Link from "next/link";

function Deals(props) {
  const { pageDetails } = props;
  return (
    <>
      <section className="ptb-50 pb-140 bg-grays">
        <div className="container">
          <div className="row">
            <div
              className="col-xl-6 col-md-6 mb-3 wow fadeInLeftBig"
              data-wow-delay="0.4s"
            >
              <div className="mob-deal-box">
                <img src={pageDetails.offer_img1} alt />
                <div className="mob-deal-content">
                  <h5>{pageDetails.offer_title1}</h5>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: pageDetails.offer_desc1,
                    }}
                  ></div>
                  <Link
                    href={pageDetails.deal_btn_link}
                    className="deal-btn-shop"
                  >
                    {pageDetails.deal_btn_name}
                  </Link>
                </div>
              </div>
            </div>
            <div
              className="col-xl-6 col-md-6 mb-3 wow fadeInRightBig"
              data-wow-delay="0.8s"
            >
              <div className="mob-deal-box">
                <img src={pageDetails.offer_img2} alt />
                <div className="mob-deal-content">
                  <h5>{pageDetails.offer_title2}</h5>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: pageDetails.offer_desc2,
                    }}
                  ></div>
                  <Link
                    href={pageDetails.shop_btn_link}
                    className="deal-btn-shop"
                  >
                    {pageDetails.shop_btn_name}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Deals;
