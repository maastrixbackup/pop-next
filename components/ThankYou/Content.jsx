import React, { useEffect } from "react";
import Link from "next/link";
// import tyImage from "../../images/thankyou.jpg";
import { APIURL } from "../../Methods/Fetch";
import { axiosPost } from "../../Methods/Save";
import Image from "next/image";

function Content({ paymentMode }) {
  useEffect(() => {
    try {
      var paymentModeee = paymentMode ? paymentMode : "creditcard";
      var url = APIURL() + "pay-my-bill-success";
      var data = {
        ...JSON.parse(localStorage.getItem("successPaymentDetails")),
        payment_mode: paymentModeee,
      };
      if (localStorage.getItem("paymentDone") == null)
        axiosPost(url, data).then((res) => {
          if (res.data[0].response.status === "success")
            localStorage.setItem("paymentDone", true);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <>
      <div>
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
                  <h3>Thank you</h3>
                  <div>
                    <p>
                      If you need to get in touch, you can contact our friendly
                      helpful team via phone, email or live chat
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="pb-140 payment-sec">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="tnk-box">
                  <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6">
                      <div className="tnk-box-img">
                        <Image
                          src="/images/thankyou.jpg"
                          alt="asd"
                          height={498}
                          width={498}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="tnk-content-box">
                        <div className="tnkyou-content">
                          <h3>Thank You !</h3>
                          <h4>
                            Your Payment is Successfull will get back to you{" "}
                          </h4>
                        </div>
                        <div>
                          <Link href="/" className="pay-btn mb-3">
                            Keep Shopping
                          </Link>
                        </div>
                      </div>
                    </div>
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

export default Content;
