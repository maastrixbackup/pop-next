import React from "react";
import SkeletonComponent from "../Common/SkeletonComponent";
import { useRouter } from "next/router";

function Banner(props) {
  const navigate = useRouter();
  const { name, product_image, feature, price, affName, product, desc, type } =
    props;
  const saveInLocal = () => {
    localStorage.setItem("Product", JSON.stringify(product));
    if (type == "mobile") {
      localStorage.setItem(
        "upfrontPayment",
        product.upfront_price ? product.upfront_price : 0
      );
      localStorage.setItem(
        "initial_installation_price",
        product.upfront_price ? product.upfront_price : 0
      );
    } else {
      localStorage.setItem(
        "upfrontPayment",
        product.installation_cost ? product.installation_cost : 0
      );
      localStorage.setItem(
        "initial_installation_price",
        product.installation_cost ? product.installation_cost : 0
      );
    }
    localStorage.setItem("monthlyTotal", product.price ? product.price : 0);
    localStorage.setItem(
      "startingmonthlyCost",
      product.price ? product.price : 0
    );

    if (affName) localStorage.setItem("affName", affName);
    else localStorage.setItem("affName", "");

    navigate("/address");
  };
  return (
    <>
      <section className="mobile-banner landing-banner">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-7 col-lg-6">
              <div className="mobile-content">
                <h3 className="wow fadeInLeftBig" data-wow-delay="0.8s">
                  {name}
                </h3>
                <p className="wow fadeInLeftBig" data-wow-delay="1.2s">
                  <div dangerouslySetInnerHTML={{ __html: desc }}></div>
                  {/*{feature && feature.length > 0
                    ? feature.map((feature_item, index) => (
                        <div key={index}>
                          -{feature_item.feature_name}
                          <br />
                        </div>
                      ))
                    : ""}*/}
                  <strong>£{price && price.toFixed(2)} </strong> per month
                </p>
                <a
                  style={{ cursor: "pointer" }}
                  onClick={saveInLocal}
                  className="btn-style-four"
                >
                  BUY NOW
                </a>
              </div>
            </div>
            <div
              className="col-xl-5 col-lg-6 wow fadeInRightBig"
              data-wow-delay="0.8s"
            >
              {product_image ? (
                <div className="banner-img">
                  <img src={product_image} alt="banner_img" />
                </div>
              ) : (
                <SkeletonComponent color="#7084a162" />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Banner;
