import { React, useState, useEffect } from "react";
import YourOrders from "../ContractInstallation/YourOrders";
import Link from "next/link";


function ThankYouAgent(props) {
    var {
        monthlyTotal,
        product,
        addons,
        goToPayment,
        setAddOns,
        data,
        upfrontPayment,
        rentalProducts,
        priceBeforeDiscount,
        setStep,
        planDetails
      } = props;
  const [orderNo, setOrderNo] = useState();
  setStep(3);
  useEffect(() => {
    setOrderNo(localStorage.getItem("order_no"));
  }, []);
  var bussiness_type = localStorage.getItem("bussiness_type");
  return (
    <>
      <section
        className={
          bussiness_type
            ? "buisness-mobile address-form-sec"
            : " address-form-sec"
        }
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-8 mx-auto">
              <div className="contract-left-box-sec">
                <div className="thank-you-box">
                  <img src={"/images/check-circle.png"} alt="checkcircle" className="mb-3" />
                  <h2 className="mb-1">Thank You!</h2>
                  <h5 className="mb-1">We are processing your order!</h5>
                  <p>
                    Your Order ID : <strong>{orderNo}</strong>
                  </p>
                  <p>
                    Thank you for your order and for choosing Pop Telecom as
                    your service provider! Please keep an eye out for an email
                    with your login and activation link. Your breakdown of
                    packages is below. You can print your order or close this
                    page when you’re done.
                  </p>
                  <div>
                    <Link href="/" className="pay-btn">
                      Keep Shopping
                    </Link>
                    <a href="#" className="print-btn">
                      <i className="fal fa-print me-2" />
                      Print Receipt
                    </a>
                  </div>
                  <div className="social-thankyou social-links">
                    <ul>
                      <li>Share via:</li>
                      <li>
                        <a href="#" className="bg1">
                          <i className="fab fa-instagram" />
                        </a>
                      </li>
                      <li>
                        <a href="#" className="bg2">
                          <i className="fab fa-whatsapp" />
                        </a>
                      </li>
                      <li>
                        <a href="#" className="bg3">
                          <i className="fab fa-twitter" />
                        </a>
                      </li>
                      <li>
                        <a href="#" className="bg4">
                          <i className="fab fa-facebook-messenger" />
                        </a>
                      </li>
                      <li>
                        <a href="#" className="bg5">
                          <i className="fab fa-facebook-f" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="contract-left-box-sec">
                <div className="contract-title">
                  <h6>Your Order Details</h6>
                </div>
                <YourOrders
                  monthlyTotal={monthlyTotal}
                  planDetails={planDetails}
                  registerandsave={goToPayment}
                  addons={addons}
                  installation_cost={localStorage.getItem("upfrontPayment")}
                  setAddOns={setAddOns}
                  upfrontPayment={upfrontPayment}
                  rentalProducts={rentalProducts}
                  data="completionpage"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ThankYouAgent;
