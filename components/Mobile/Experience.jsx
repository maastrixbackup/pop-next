import Image from "next/image";
import Link from "next/link";
import React from "react";

function Experience(props) {
  const {
    title,
    description,
    check_btn_name,
    offer_img1,
    offer_title1,
    offer_desc1,
    deal_btn_name,
    offer_img2,
    offer_title2,
    offer_desc2,
    shop_btn_name,
    page,
    deal_btn_link,
    shop_btn_link,
    check_btn_link,
    type,
  } = props;
  return (
    <>
      <div>
        <section
          className={
            type === "bussinesss"
              ? `fiber-sec ${page} bizlandline-bluebg`
              : `fiber-sec ${page}`
          }
        >
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="fiber-box">
                  <h2 className="wow fadeInLeftBig" data-wow-delay="0.4s">
                    {title}
                  </h2>
                  <div dangerouslySetInnerHTML={{ __html: description }}></div>
                  <a
                    href={check_btn_link}
                    className="fiber-check-btn wow fadeInUpBig"
                    data-wow-delay="1.2s"
                  >
                    {check_btn_name} <i className="fal fa-chevron-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="business-mobile-btmsec pt-50 pb-140">
          <div className="container">
            <div className="row">
              <div
                className="col-xl-6 col-md-6 mb-3 wow fadeInLeftBig"
                data-wow-delay="0.4s"
              >
                <div className="mob-deal-box">
                  <Image height={400} width={400} src={offer_img1} alt="banner_img" />
                  <div className="mob-deal-content">
                    <h5>{offer_title1}</h5>
                    <div
                      dangerouslySetInnerHTML={{ __html: offer_desc1 }}
                    ></div>
                    <Link href={deal_btn_link} className="deal-btn-shop">
                      {deal_btn_name}
                    </Link>
                  </div>
                </div>
              </div>
              <div
                className="col-xl-6 col-md-6 mb-3 wow fadeInRightBig"
                data-wow-delay="0.8s"
              >
                <div className="mob-deal-box">
                  <Image height={400} width={400} src={offer_img2} alt="banner_img" />
                  <div className="mob-deal-content">
                    <h5>{offer_title2}</h5>
                    <div
                      dangerouslySetInnerHTML={{ __html: offer_desc2 }}
                    ></div>
                    <Link href={shop_btn_link} className="deal-btn-shop">
                      {shop_btn_name}
                    </Link>
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

export default Experience;
