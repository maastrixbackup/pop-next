import Image from "next/image";
import Link from "next/link";
import React from "react";

function ArticleSupport(props) {
  const {
    offer_img1,
    offer_title1,
    offer_desc1,
    deal_btn_name,
    offer_img2,
    offer_title2,
    offer_desc2,
    shop_btn_name,
    deal_btn_link,
    shop_btn_link

  } = props;
  return (
    <>
      <section className="business-mobile-btmsec article-support-btm">
        <div className="container">
          <div className="row">
            <div
              className="col-xl-6 col-md-6 mb-3 wow fadeInLeftBig"
              data-wow-delay="0.4s"
            >
              <div className="mob-deal-box text-center">
                <Image height={400} width={400} src={offer_img1} alt="offer_img1" />
                <div className="mob-deal-content">
                  <h5>{offer_title1}</h5>
                  <div dangerouslySetInnerHTML={{ __html: offer_desc1 }}></div>
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
              <div className="mob-deal-box text-center">
                <Image height={400} width={400} src={offer_img2} alt="offer_img2" />
                <div className="mob-deal-content">
                  <h5>{offer_title2}</h5>
                  <div dangerouslySetInnerHTML={{ __html: offer_desc2 }}></div>
                  <Link href={shop_btn_link} className="deal-btn-shop">
                    {shop_btn_name}
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

export default ArticleSupport;
