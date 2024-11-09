import Link from "next/link";
import React, { useEffect, useRef } from "react";

function Offers(props) {
  const {
    offer_title1,
    offer_title2,
    offer_desc1,
    deal_btn_name,
    deal_btn_link,
    review_title,
    offer_img1
  } = props;
  const ref = useRef(null);
  useEffect(() => {
    // If window.Trustpilot is available it means that we need to load the TrustBox from our ref.
    // If it's not, it means the script you pasted into <head /> isn't loaded  just yet.
    // When it is, it will automatically load the TrustBox.
    if (window.Trustpilot) {
      window.Trustpilot.loadFromElement(ref.current, true);
    }
  }, []);
  return (
    <>
      <div>
        <section className="mobile-offer-sec">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-xl-5">
                <div className="mobile-offer-content mb-3">
                  <span className="offer-sim-only">{offer_title1}</span>
                  <h4>{offer_title2}</h4>
                  <div dangerouslySetInnerHTML={{ __html: offer_desc1 }}></div>
                  <Link href={deal_btn_link} className="buisness-btn-one">
                    {deal_btn_name}
                  </Link>
                </div>
              </div>
              <div className="col-xl-7">
                <div
                  className="mobile-offer-img"
                  style={{
                    backgroundImage: `url(${offer_img1})`,
                  }}
                >
                  {/* <Image height={400} width={400} src="/images/mobile-offer.png" alt=""> */}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="customer-say-sec">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="title-buis">
                  <h4>{review_title}</h4>
                </div>
                <div
                  ref={ref}
                  className="trustpilot-widget trust_pilot_full_height"
                  data-locale="en-GB"
                  data-template-id="54ad5defc6454f065c28af8b"
                  data-businessunit-id="54736db600006400057bbc3c"
                  data-style-height="240px"
                  data-style-width="100%"
                  data-theme="light"
                  data-review-languages="en"
                  data-stars="5"
                >
                  <a
                    href="https://uk.trustpilot.com/review/www.poptelecom.co.uk"
                    target="_blank"
                    rel="noopener"
                  >
                    Trustpilot
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Offers;
