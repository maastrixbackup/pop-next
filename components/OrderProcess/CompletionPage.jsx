import { React, useEffect, useState } from "react";
import InnerPageHeader from "../InnerPageHeader";
import YourOrders from "../ContractInstallation/YourOrders";
import { axiosGet } from "../../Methods/Save";
import { APIURL } from "../../Methods/Fetch";
import TrustPilot from "../TrustPilot";
import { Helmet } from "react-helmet";
import Image from "next/image";
import Link from "next/link";

function CompletionPage() {
  const [orderNo, setOrderNo] = useState();
  const [invoiceLink, setInvoiceLink] = useState(
    localStorage.getItem("invoice_link")
  );
  var upfrontPayment = "";
  if (!upfrontPayment) {
    if (localStorage.getItem("upfrontPayment") !== null) {
      upfrontPayment = localStorage.getItem("upfrontPayment");
    }
  }
  // useEffect(() => {
  //   if (localStorage.getItem("invoice_link" != null))
  //     setInvoiceLink(localStorage.getItem("invoice_link"));
  // }, []);
  let affType = "";
  if (localStorage.getItem("Product") != null) {
    affType = JSON.parse(localStorage.getItem("Product")).affiliate_type;
  }
  if (localStorage.getItem("page") !== null) {
    var page = localStorage.getItem("page");
  } else var page = "broadband";
  useEffect(() => {
    setOrderNo(localStorage.getItem("order_no"));
  }, []);
  var bussiness_type = localStorage.getItem("bussiness_type");
  const [footerInfo, setFooterInfo] = useState();
  useEffect(() => {
    var url = APIURL() + "website-setting";
    axiosGet(url).then((response) => {
      setFooterInfo(response.data[0].response.data[0]);
    });
  }, []);
  // useEffect(() => {
  //   var ts = Math.round(new Date().getTime() / 1000);
  //   var url = `https://www.awin1.com/sread.php?tt=ss&tv=2&merchant=51999&amount=${upfrontPayment}&ch=aw&parts=${ts}:${upfrontPayment}&vc=10OFF&cr=GBP&ref=orderNo&cks=51999_1683296206_eaa738621e7036c9b0bdcb5d4901dcb6&customeracquisition=RETURNING`;
  //   axiosGet(url);
  //   const link = document.createElement("a");
  //   link.href = url;
  //   document.body.appendChild(link);
  //   link.setAttribute("target", "_blank");
  //   link.click();
  // }, []);
  useEffect(() => {
    var awMastertag = document.createElement("script");
    awMastertag.setAttribute("defer", "defer");
    awMastertag.src = "https://www.dwin1.com/51999.js";
    awMastertag.type = "text/javascript";
    document.getElementsByTagName("body")[0].appendChild(awMastertag);
  }, []);
  return (
    <>
      <InnerPageHeader activeTab="payment" page={page} step={3} />
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
                  <Image
                    height={400}
                    width={400}
                    src={"/images/check-circle.png"}
                    alt="banner_img"
                    className="mb-3"
                  />
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
                    <a href={invoiceLink} download className="print-btn">
                      <i className="fal fa-print me-2" />
                      Print Receipt
                    </a>
                  </div>
                  <div className="social-thankyou social-links">
                    <ul>
                      <li>Share via:</li>
                      <li>
                        <a
                          href={footerInfo ? footerInfo.facebook : ""}
                          className="bg1"
                        >
                          <i className="fab fa-facebook-f" />
                        </a>
                      </li>
                      <li>
                        <a
                          href={footerInfo ? footerInfo.twitter : ""}
                          className="bg2"
                        >
                          <i className="fab fa-twitter" />
                        </a>
                      </li>
                      <li>
                        <a
                          href={footerInfo ? footerInfo.instagram : ""}
                          className="bg3"
                        >
                          <i className="fab fa-instagram" />
                        </a>
                      </li>
                      <li>
                        <a
                          href={footerInfo ? footerInfo.linkedin : ""}
                          className="bg4"
                        >
                          <i className="fab fa-linkedin-in" />
                        </a>
                      </li>
                      <li>
                        <a
                          href={footerInfo ? footerInfo.youTube : ""}
                          className="bg5"
                        >
                          <i className="fab fa-youtube"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="contract-left-box-sec">
                <div className="contract-title">
                  <h6 style={{ textAlign: "center" }}>Your Order Details</h6>
                </div>
                <YourOrders
                  data="completionpage"
                  thankYoupage={true}
                  shop={page != "shop" ? false : true}
                  page={page}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="ptb-50 star-sec">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <TrustPilot fullWidth={true} />
            </div>
          </div>
        </div>
      </section>
      <img
        src={`https://www.awin1.com/sread.img?tt=ns&tv=2&merchant=51999&amount=${upfrontPayment}&cr=GBP&ref=${orderNo}&parts=${affType}:${upfrontPayment}&vc=&ch=aw&customeracquisition=NEW`}
        border="0"
        width="0"
        height="0"
      />
      <Helmet>
        <script type="text/javascript">{`
          var AWIN = {};
          AWIN.Tracking = {};
          AWIN.Tracking.Sale = {};
          AWIN.Tracking.Sale.amount = "${upfrontPayment}";
          AWIN.Tracking.Sale.orderRef = "${orderNo}";
          AWIN.Tracking.Sale.parts = "${affType}:${upfrontPayment}";
          AWIN.Tracking.Sale.voucher = "";
          AWIN.Tracking.Sale.currency = "GBP";
          AWIN.Tracking.Sale.channel = "aw";
          AWIN.Tracking.Sale.customerAcquisition = "NEW";
        `}</script>
      </Helmet>
    </>
  );
}

export default CompletionPage;
