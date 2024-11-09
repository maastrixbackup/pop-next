import React from "react";
import TrustPilot from "../TrustPilot";
import Link from "next/link";
import Image from "next/image";

function Contactus(props) {
  const {
    contact_title,
    contact_desc,
    deal_btn_name,
    deal_desc,
    deal_img,
    deal_title,
    shop_btn_link,
    shop_btn_name,
    shop_desc,
    deal_btn_link,
    shop_title,
  } = props;
  return (
    <>
      <div>
        <section className="ptb-50 blue-deals bg-grays">
          <div className="container">
            <div className="row">
              <div
                className="col-xl-6 col-md-6 mb-3 wow fadeInLeftBig"
                data-wow-delay="0.4s"
              >
                <div className="mob-deal-box">
                  <Image height={400} width={400} src={deal_img} alt="banner_img" />
                  <div className="mob-deal-content">
                    <h5>{deal_title}</h5>
                    <div dangerouslySetInnerHTML={{ __html:deal_desc }}></div>
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
                  <Image height={400} width={400} src="/images/deal-img2.jpg" alt="banner_img" />
                  <div className="mob-deal-content">
                    <h5>{shop_title}</h5>
                    <div dangerouslySetInnerHTML={{ __html:shop_desc }}></div>
                    <Link href={shop_btn_link} className="deal-btn-shop">
                      {shop_btn_name}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="pb-50 bg-grays tp_parent">
          <div className="container">
            <div className="row">
              <div className="col-xl-7 mx-auto text-center">
                <TrustPilot fullwidth={true}/>
              </div>
            </div>
          </div>
        </section>
      </div>
      <section className="cloud-phone-sec">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="cloud-box-content">
                <span className="contact-sub-title">{contact_title}</span>
                <div
                  dangerouslySetInnerHTML={{ __html: contact_desc }}
                ></div>
              </div>
            </div>
          </div> 
        </div>
      </section>
    </>
  );
}

export default Contactus;
