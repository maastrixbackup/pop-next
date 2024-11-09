import React from "react";

function Banner() {
  return (
    <>
      <section className="contact-header">
        <div className="container">
          <div className="row align-items-center">
            <div
              className="col-xl-8 wow fadeInRightBig mx-auto"
              data-wow-delay="0.2s"
              style={{
                visibility: "visible",
                animationDelay: "0.2s",
                animationName: "fadeInRightBig",
              }}
            >
              <div className="inner-title-small">
                <h3 className="p-2"></h3>
                <h3>Pay My Bill</h3>
                <div>
                  <p>Pay bill online using credit card in five minutes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Banner;
