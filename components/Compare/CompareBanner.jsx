import Image from "next/image";
import React from "react";

function CompareBanner() {
  return (
    <>
      <section className="compare_banner">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-8 col-lg-6">
              <div className="buisness-content">
                <h3
                  className="wow fadeInLeftBig text-white"
                  data-wow-delay="0.4s"
                >
                  We are the Compare Your Product
                </h3>
                <h4
                  className="wow fadeInLeftBig text-white"
                  data-wow-delay="1.0s"
                >
                  We have you covered... Moblie, Fixed, Cloud &amp; Data
                </h4>
                <p
                  className="wow fadeInLeftBig text-white"
                  data-wow-delay="1.8s"
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Assumenda et voluptates earum corporis deleniti
                  necessitatibus, qui voluptatibus cum aliquid.
                </p>
              </div>
            </div>
            <div
              className="col-xl-4 col-lg-6 wow fadeInRightBig"
              data-wow-delay="0.8s"
            >
              <div className="banner-img">
                <Image height={400} width={400} src="/images/compare-img.png" alt="banner_img" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CompareBanner;
