import React from "react";
import AddressInput from "../Homepage/AddressInput";
import Link from "next/link";
import Image from "next/image";

function Deals(props) {
  const {
    experience_title,
    experience_desc,
    offer_img1,
    offer_title1,
    offer_desc1,
    deal_btn_name,
    offer_img2,
    offer_title2,
    offer_desc2,
    shop_btn_name,
    deal_btn_link,
    check_btn_link,
    shop_btn_link,
  } = props;
  return (
    <>
      <div>
        <section className="fiber-sec bluebg">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="fiber-box">
                  <h2 className="wow fadeInLeftBig" data-wow-delay="0.4s">
                    {experience_title}
                  </h2>
                  <div
                    dangerouslySetInnerHTML={{ __html: experience_desc }}
                  ></div>
                  <div className="banner-inputform">
                    <AddressInput page="broadband" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="business-mobile-btmsec help-support-btm">
          <div className="container">
            <div className="row">
              <div
                className="col-xl-6 col-md-6 mb-3 wow fadeInLeftBig"
                data-wow-delay="0.4s"
              >
                <div className="mob-deal-box text-center">
                  <Image height={400} width={400} src={offer_img1} alt="banner_img" />
                  <div className="mob-deal-content">
                    <h5>{offer_title1}</h5>
                    <div
                      dangerouslySetInnerHTML={{ __html: offer_desc1 }}
                    ></div>
                    {deal_btn_link && (
                      <Link href={deal_btn_link} className="deal-btn-shop">
                        {deal_btn_name}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              <div
                className="col-xl-6 col-md-6 mb-3 wow fadeInRightBig"
                data-wow-delay="0.8s"
              >
                <div className="mob-deal-box text-center">
                  <Image height={400} width={400} src={offer_img2} alt="banner_img" />
                  <div className="mob-deal-content">
                    <h5>{offer_title2}</h5>
                    <div
                      dangerouslySetInnerHTML={{ __html: offer_desc2 }}
                    ></div>
                    {shop_btn_link && (
                      <Link href={shop_btn_link} className="deal-btn-shop">
                        {shop_btn_name}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Deals;
