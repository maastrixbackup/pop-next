import { React, useState, useEffect } from "react";

function Features(props) {
  const { title_one, desc_one, img_one, product } = props;
  const [time, setTime] = useState({
    minutes: "",
    days: "",
    hours: "",
    seconds: "",
  });

  return (
    <>
      <section className="landingbody-wlcmsec">
        <div className="container">
          <div className="landingbody-wlcmsec2">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <h2>{product.title_one ? product.title_one : title_one} </h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: product.desc_one ? product.desc_one : desc_one,
                  }}
                ></div>
              </div>
              <div className="col-lg-6">
                <img
                  src={product.img_one ? product.img_one : img_one}
                  alt="banner_img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Features;
