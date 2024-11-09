import React, { useEffect, useState } from "react";
import {
  axiosPost,
  getCardIdentifier,
  getMerchantSessionKey,
  paymentApi,
} from "../../Methods/Save";
import creditCardType from "credit-card-type";
import { APIURL } from "../../Methods/Fetch";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

function StepThree({ userDetails, setMessage, message, amount, stepone }) {
  const navigate = useRouter();

  const [environment, setEnvironment] = useState("");
  const [key, setKey] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [vendor, setVendor] = useState("");
  const [valid, setValid] = useState("empty");
  const [validSc, setValidSc] = useState("empty");
  const [validCvv, setValidCvv] = useState("empty");
  const [cardDetails, setCardDetails] = useState({
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    securityCode: "",
  });
  function cc_format(value) {
    const v = value
      .replace(/\s+/g, "")
      .replace(/[^0-9]/gi, "")
      .substr(0, 6);
    const parts = [];

    for (let i = 0; i < v.length; i += 2) {
      parts.push(v.substr(i, 2));
    }

    return parts.length > 1 ? parts.join("/") : value;
  }
  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const response = await axios.get("https://geolocation-db.com/json/");
        setIpAddress(response.data.IPv4);
      } catch (error) {
        console.log(error);
      }
    };

    fetchIpAddress();
  }, []);
  useEffect(() => {
    var url = APIURL() + "setting";
    var data = { setting_type: "sagepay" };
    axiosPost(url, data)
      .then((response) => {
        setEnvironment(response.data[0].response.data.environment);
        setKey(response.data[0].response.data.authorization);
        setVendor(response.data[0].response.data.vendor_name);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const [cardTypeImage, setCardTypeImage] = useState("card-logo-unknown.svg");
  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
    if (e.target.name === "cardNumber") {
      if (value.length > 0) {
        setValid("empty");
        var suggestion = creditCardType(e.target.value)[0];
      } else {
        setMessage("Please enter a card number");
        setValid(false);
      }
      const cardType = suggestion ? suggestion.type : "unknown";
      let imageUrl;

      switch (cardType) {
        case "visa":
          imageUrl = "card-logo-visa.svg";
          break;
        case "mastercard":
          imageUrl = "card-logo-mastercard.svg";
          break;
        case "american-express":
          imageUrl = "card-logo-amex.svg";
          break;
        default:
          imageUrl = "card-logo-unknown.svg";
      }
      setCardTypeImage(imageUrl);
    }
  };
  const completePayment = async () => {
    setValid("empty");
    setValidSc("empty");
    setValidCvv("empty");
    var expirySplit = cardDetails.expiryDate.split("/");
    var expirydate = expirySplit[0] + expirySplit[1];
    var carddetails = { ...cardDetails };
    carddetails.expiryDate = expirydate;

    // setpenLoader(true);
    getMerchantSessionKey(environment, key, vendor)
      .then((response) => response.json())
      .then((result) => {
        var merchantSessionKey = result.merchantSessionKey;
        getCardIdentifier(result.merchantSessionKey, carddetails, environment)
          .then((response) => response.json())
          .then((result) => {
            if (!result.errors) {
              var rand = 1 + Math.random() * 100;
              var transactionCode = `REPpoptelecom${rand}`;
              paymentApi(
                merchantSessionKey,
                result.cardIdentifier,
                userDetails,
                transactionCode,
                amount,
                key,
                environment,
                ipAddress
              )
                .then((response) => response.json())
                .then((result) => {
                  if (result.statusCode === "0000") {
                    setMessage("The transaction was successful.");
                    setValid(true);
                    setValidSc(true);
                    setValidCvv(true);
                    // setAlertType("success");
                    localStorage.setItem("payment_completed", true);
                    localStorage.setItem(
                      "payment_details",
                      JSON.stringify(result)
                    );
                    navigate.push("/thank-you");

                    // completeOrder(result.transactionId);
                  } else {
                    // setpenLoader(false);
                    setMessage(result.description);
                    if (result.description.includes("SecurityCod")) {
                      setValidCvv(false);
                    } else setValid(false);

                    // setAlertType("error");

                    // setOpen(true);
                  }
                })
                .catch((error) => {
                  // setpenLoader(false);
                });
            } else {
              // setpenLoader(false);
              setMessage(result.errors[0].clientMessage);
              if (result.errors[0].clientMessage.includes("date")) {
                setValidSc(false);
              } else if (result.errors[0].clientMessage.includes("security")) {
                setValidCvv(false);
              } else {
                setValid(false);
              }
              // setAlertType("error");
              // setOpen(true);
            }
          })
          .catch((error) => {
            // setpenLoader(false);
          });
      })
      .catch((error) => {
        // setpenLoader(false);
      });
  };
  return (
    <>
      <div className="col-lg-12 payment-box-item">
        <div className="row">
          <div className="col-lg-6">
            <div className="payment-form">
              <h2>Credit Card Info</h2>
              <div className="row">
                <div className="col-xl-12">
                  <h5>Amount</h5>
                  <p>Card Details</p>
                </div>
                <div className="col-xl-12">
                  <label htmlFor className="mb-1">
                    Card number <span>*</span>
                  </label>
                  <div className="input-group mb-3">
                    <input
                      type="number"
                      onWheel={(event) => event.currentTarget.blur()}
                      className={
                        valid === "empty"
                          ? "form-control"
                          : valid
                          ? "form-control is-valid"
                          : "form-control is-invalid"
                      }
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      name="cardNumber"
                      value={cardDetails.cardNumber.trim()}
                      onChange={(e) => handleChange1(e)}
                    />

                    <span className="input-group-text" id="basic-addon1">
                      <img src={cardTypeImage} alt="card logo" />
                    </span>
                    <div className="invalid-feedback">{message}</div>
                  </div>
                </div>
                <div className="col-xl-12">
                  <div className="mb-3">
                    <label htmlFor className="mb-1">
                      Card holder name <span>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      aria-label="Username"
                      name="cardholderName"
                      value={cardDetails.cardholderName}
                      onChange={(e) => handleChange1(e)}
                    />
                  </div>
                </div>
                <div className="col-xl-6">
                  <label htmlFor className="mb-1">
                    Expiry date <span>*</span>
                  </label>
                  <div id="example1">
                    <input
                      className={
                        validSc === "empty"
                          ? "form-control"
                          : validSc
                          ? "form-control is-valid"
                          : "form-control is-invalid"
                      }
                      type="text"
                      maxLength={5}
                      name="expiryDate"
                      value={cc_format(cardDetails.expiryDate)}
                      onChange={(e) => handleChange1(e)}
                    />
                    <div className="invalid-feedback">{message}</div>
                  </div>
                </div>
                <div className="col-xl-6">
                  <label htmlFor className="mb-1">
                    Security Code <span>*</span>
                  </label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className={
                        validCvv === "empty"
                          ? "form-control"
                          : validCvv
                          ? "form-control is-valid"
                          : "form-control is-invalid"
                      }
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      name="securityCode"
                      value={cardDetails.securityCode}
                      onChange={(e) => handleChange1(e)}
                    />
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fal fa-question-circle" />
                    </span>
                    <div className="invalid-feedback">{message}</div>
                  </div>
                </div>
                <div className="col-xl-12">
                  <div className="mb-3">
                    <a onClick={completePayment} className="pay-btn">
                      Pay Now
                    </a>
                    <Link href="/" className="cancel-btn">
                      Cancel
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="payment-img1">
              <Image
                height={400}
                width={400}
                src={"/images/payment2.png"}
                alt="paymenty"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StepThree;
