import Link from "next/link";
import React from "react";

function ContactUs(props) {
  const {
    title_two,
    desc_two,
    contact_btn_name,
    contact_btn_link,
    title_three,
    desc_three,
    img_two,
    call_btn_name,
    call_btn_link,
    desc_four,
    btn_link,
    btn_name,
  } = props;
  return (
    <>
      <section className="fiber-sec">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="fiber-box">
                <h2 className="wow fadeInLeftBig" data-wow-delay="0.4s">
                  {title_two}
                </h2>
                <div dangerouslySetInnerHTML={{ __html: desc_two }}></div>
                <Link
                  href={contact_btn_link}
                  className="fiber-check-btn wow fadeInUpBig"
                  data-wow-delay="1.2s"
                >
                  {contact_btn_name}
                  <i className="fal fa-chevron-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="sound-good">
        <div className="container">
          <div className="row align-items-center">
            <div
              className="col-xl-5 wow fadeInLeftBig col-md-6"
              data-wow-delay="0.4s"
            >
              <div className="sports-img">
                <img src={img_two} alt="banner_img" />
              </div>
            </div>
            <div
              className="col-xl-7 wow fadeInRightBig col-md-6"
              data-wow-delay="0.8s"
            >
              <div className="sound-good-content">
                <h2>{title_three}</h2>
                <div dangerouslySetInnerHTML={{ __html: desc_three }}></div>
                <Link class="deal-btn-shop" href={btn_link}>
                  {btn_name}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="cloud-phone-sec landing-contact">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="cloud-box-content">
                <span className="contact-sub-title">contact us</span>
                <div dangerouslySetInnerHTML={{ __html: desc_four }}></div>
                <a className="check-btn" href={`tel:${call_btn_link}`}>{call_btn_name}  <i className="fas fa-arrow-circle-right" /></a>
                {/*<Link to={call_btn_link} className="check-btn">
                  {call_btn_name} <i className="fas fa-arrow-circle-right" />
  </Link>*/}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactUs;
