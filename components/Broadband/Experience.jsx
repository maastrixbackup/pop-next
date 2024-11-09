import Image from "next/image";
import React from "react";

function Experience(props) {
  const {
    title,
    contact_btn_name,
    description,
    offer_img1,
    offer_title1,
    offer_desc1,
    deal_btn_name,
    offer_img2,
    offer_title2,
    offer_desc2,
    shop_btn_name,
    deal_btn_link,
    shop_btn_link,
    contact_btn_link,
  } = props;
  return (
    <>
      <div>
        <div className="talk-area-two">
          <div className="container">
            <div className="talk-content text-center">
              <div className="section-title text-center">
                <span className="sp-color1">Let's Talk</span>
                <h2>{title}</h2>
                <div dangerouslySetInnerHTML={{ __html: description }}></div>
              </div>
              <a href={contact_btn_link} className="btn-style-one">
                {contact_btn_name}
              </a>
            </div>
          </div>
        </div>
        <section className="project-card pt-50">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="img">
                  <Image height={400} width={400} src={offer_img1} className="main-img" alt="main-img" />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="info">
                  <h4 className="title"> {offer_title1}</h4>
                  <div dangerouslySetInnerHTML={{ __html: offer_desc1 }}></div>
                  <a href={deal_btn_link} className="deal-btn-shop">
                    {deal_btn_name}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="project-card v2 pt-50 pb-140">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="info">
                  <h4 className="title">{offer_title2}</h4>
                  <div dangerouslySetInnerHTML={{ __html: offer_desc2 }}></div>
                  <a href={shop_btn_link} className="deal-btn-shop">
                    {shop_btn_name}
                  </a>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="img">
                  <Image height={400} width={400} src={offer_img2} alt="offer_img2" className="main-img" />
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
