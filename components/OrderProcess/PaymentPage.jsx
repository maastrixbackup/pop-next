import { React, useState, useEffect } from "react";
import InnerPageHeader from "../InnerPageHeader";
import Box from "@mui/material/Box";
import {
  axiosPost,
  getCardIdentifier,
  getMerchantSessionKey,
  paymentApi,
} from "../../Methods/Save";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import YourOrders from "../ContractInstallation/YourOrders";
import { APIURL } from "../../Methods/Fetch";
import creditCardType from "credit-card-type";
import TrustPilot from "../TrustPilot";
import { BlankValidation } from "../../Methods/ValidateForms";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

function FinalPage() {
  const [vertical, setvertical] = useState("top");
  const [valid, setValid] = useState("empty");
  const [validSc, setValidSc] = useState("empty");
  const [validCvv, setValidCvv] = useState("empty");
  const [horizontal, sethori] = useState("right");
  const [signedIn, SetSignedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("user_id") != null) {
      SetSignedIn(true);
    }
  }, []);
  const navigate = useRouter();

  const [open, setOpen] = useState(false);
  const [environment, setEnvironment] = useState("");
  const [key, setKey] = useState("");
  const [vendor, setVendor] = useState("");
  const [message, setMessage] = useState("");
  const [alerttype, setAlertType] = useState("");
  const [openLoader, setpenLoader] = useState(false);
  const [openLoader1, setpenLoader1] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    securityCode: "",
  });
  const [errors, setErrors] = useState({
    cardholderName: "blank",
    cardNumber: "blank",
    expiryDate: "blank",
    securityCode: "blank",
  });
  const [ipAddress, setIpAddress] = useState("");

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
  var bussiness_type = localStorage.getItem("bussiness_type");
  const [cardTypeImage, setCardTypeImage] = useState("card-logo-unknown.svg");
  const handleChange = (e) => {
    const { name, value, id } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
    if (name === "cardNumber") {
      if (value.length > 0) {
        setErrors({ ...errors, cardNumber: "blank" });
        setValid("empty");
        var suggestion = creditCardType(e.target.value)[0];
      } else {
        setMessage("Please enter a card number");
        setErrors({ ...errors, cardNumber: "Please enter a card number" });
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
    } else {
      if (value.length > 0) {
        setErrors({ ...errors, [name]: "blank" });
        setValid("empty");
      } else {
        setMessage("Please enter a card number");
        setErrors({ ...errors, [name]: `${id} Cannot be empty` });
        setValid(false);
      }
    }
  };

  var userDetails = JSON.parse(localStorage.getItem("user_details"));
  if (localStorage.getItem("address_details") !== null) {
    var address_details = JSON.parse(localStorage.getItem("address_details"));
    // var thorough_fare_number = address_details.building_no.replaceAll(",", "");
    // var thorough_fare_name =
    //   address_details.building_name != ""
    //     ? address_details.building_name.replaceAll(",", "")
    //     : address_details.sub_building.replaceAll(",", "");
    var thorough_fare_number =
      address_details.building_no != ""
        ? address_details.building_no.replaceAll(",", "")
        : address_details.building_name.replaceAll(",", "");
    var thorough_fare_name = address_details.Street.replaceAll(",", "");
  } else {
    thorough_fare_number = "";
    var thorough_fare_name = "";
  }
  if (localStorage.getItem("page") !== null) {
    var page = localStorage.getItem("page");
  } else var page = "broadband";
  if (localStorage.getItem("uprn") !== null) {
    var uprn = localStorage.getItem("uprn");
  } else var uprn = "";
  if (localStorage.getItem("appointment_note") !== null) {
    var appointment_note = localStorage.getItem("appointment_note");
  } else var appointment_note = "";
  if (localStorage.getItem("appointment_slot") !== null) {
    var appointment_slot = localStorage.getItem("appointment_slot");
  } else var appointment_slot = "AM";
  if (localStorage.getItem("goLiveDate") !== null) {
    var goLiveDate = localStorage.getItem("goLiveDate");
  } else var goLiveDate = "";
  if (localStorage.getItem("addons") !== null) {
    var addonproducts = JSON.parse(localStorage.getItem("addons"));
  } else var addonproducts = "";
  if (localStorage.getItem("accountInfo") !== null) {
    var accountInfo = JSON.parse(localStorage.getItem("accountInfo"));
  } else var accountInfo = "";
  if (localStorage.getItem("rentalProducts") !== null) {
    var rentalProducts = JSON.parse(localStorage.getItem("rentalProducts"));
  } else var rentalProducts = "";
  if (localStorage.getItem("addonproducts") !== null) {
    var products = JSON.parse(localStorage.getItem("addonproducts"));
  } else var products = "";
  if (localStorage.getItem("order_id") !== null) {
    var order_id = localStorage.getItem("order_id");
  } else var order_id = "";
  if (localStorage.getItem("Product") !== null) {
    var broadband = JSON.parse(localStorage.getItem("Product"));
  } else var broadband = "";
  if (localStorage.getItem("upfrontPayment") !== null) {
    var upfrontPayment = JSON.parse(localStorage.getItem("upfrontPayment"));
  } else var upfrontPayment = "";
  if (localStorage.getItem("monthlyTotal") !== null) {
    var monthlyTotal = JSON.parse(localStorage.getItem("monthlyTotal"));
  } else var monthlyTotal = "";
  if (localStorage.getItem("directdebit") !== null) {
    var directdebit = JSON.parse(localStorage.getItem("directdebit"));
  } else var directdebit = "";
  if (localStorage.getItem("wifiDetails") !== null) {
    var wifiDetails = JSON.parse(localStorage.getItem("wifiDetails"));
  } else var wifiDetails = { name: "", password: "" };

  if (localStorage.getItem("duplicate-email") !== null) {
    var duplicateemail = true;
  }
  if (localStorage.getItem("directDebitDetails") !== null) {
    var direct_debit_details = JSON.parse(
      localStorage.getItem("directDebitDetails")
    );
  }
  if (localStorage.getItem("page") !== null) {
    var page = localStorage.getItem("page");
  } else var page = "broadband";
  if (localStorage.getItem("fasttrack_price") !== null) {
    var fasttrack_price = localStorage.getItem("fasttrack_price");
  } else var fasttrack_price = 0;
  if (localStorage.getItem("goLiveDate") !== null) {
    var goLiveDate = localStorage.getItem("goLiveDate");
  } else var goLiveDate = 0;
  if (localStorage.getItem("marketing_preference") !== null) {
    var marketing_preference = JSON.parse(
      localStorage.getItem("marketing_preference")
    );
  } else var marketing_preference = "";
  if (bussiness_type == "true" && localStorage.getItem("vatMonthly") !== null) {
    var vatMonthly =
      Number(localStorage.getItem("vatMonthly")) -
      Number(localStorage.getItem("monthlyTotal"));
    var monthlyTotal = localStorage.getItem("vatMonthly");
  } else {
    var vatMonthly = 0;
  }
  if (bussiness_type == "true" && localStorage.getItem("vatUpfront") !== null) {
    var vatUpfront =
      Number(localStorage.getItem("vatUpfront")) -
      Number(localStorage.getItem("upfrontPayment"));
    var upfrontPayment = localStorage.getItem("vatUpfront");
  } else {
    var vatUpfront = 0;
  }
  if (page == "broadband" && localStorage.getItem("chk_add_details") !== null) {
    var addressDetails = JSON.parse(localStorage.getItem("chk_add_details"));
  } else
    var addressDetails = {
      CSSDistrictCode: "",
      alk: "",
      category: 0,
      postcode: "",
    };

  const register = () => {
    var url = APIURL() + "register";

    var data = { ...userDetails };
    return axiosPost(url, data);
  };
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
  const completeOrder = (tranid) => {
    var address = userDetails.address.split(",");
    var length = address.length;

    var url = APIURL() + "order/update";
    var data = {
      user_id: "",
      order_id: order_id,
      // name_title: userDetails.salutation,
      // first_name: userDetails.first_name,
      // last_name: userDetails.last_name,
      // address: userDetails.address,
      // city: address[length - 2],
      // country: "UK",
      // postcode: address[length - 1],
      // number: userDetails.mobile_number,
      // dob: userDetails.dob,
      // new_line_required: 0,
      install_required: 1,
      install_cost: upfrontPayment,
      // email: userDetails.email,
      upfront_total: upfrontPayment,
      monthly_total: monthlyTotal,
      transaction_id: tranid,
      total_amount: upfrontPayment,
      order_status: "pending",
      sort_code: directdebit.SortCode,
      account_number: directdebit.AccountNumber,
      account_holder_name: accountInfo.name,
      is_authorised: 1,
      rentalProducts: rentalProducts,
      related_products: products,
      addons: addonproducts,
      [page]: broadband,
      wifi_username: wifiDetails.name,
      wifi_pw: wifiDetails.password,
      direct_debit_details: direct_debit_details,
      fasttrack_connection: fasttrack_price,
      broadband_service: broadband.type,
      referral_code: userDetails.referral_code,
      goLiveDate: goLiveDate,
      monthly_vat: vatMonthly,
      upfront_vat: vatUpfront,
      alk: addressDetails.alk,
      district_code: addressDetails.CSSDistrictCode,
      // thorough_fare_number: thorough_fare_number,
      // thorough_fare_name: thorough_fare_name,
      is_consumer: bussiness_type == "true" ? 0 : 1,
      appointment_slot: appointment_slot,
      appointment_note: appointment_note,
      uprn: uprn,
      marketing_preference: marketing_preference,
    };
    axiosPost(url, data, "header", data)
      .then((response) => {
        if (response && response.data[0].response.status == "success") {
          localStorage.setItem("order_no", response.data[0].response.order_no);
          // const link = document.createElement("a");
          // link.href = response.data[0].response.invoice;
          localStorage.setItem(
            "invoice_link",
            response.data[0].response.invoice
          );
          // document.body.appendChild(link);
          // link.setAttribute("target", "_blank");
          // link.click();
          setpenLoader(false);
          setOpen(true);
          localStorage.removeItem("_blank");
          localStorage.removeItem("user_details");

          navigate.push("/completionpage");
        }
      })
      .catch(function (error) {
        setpenLoader(false);
        setMessage("There was some error.");
        setAlertType("error");
        setOpen(true);
      });
  };
  const validate = () => {
    const result = BlankValidation(
      cardDetails,
      completePayment,
      errors,
      setErrors
    );
    if (result == false) {
      setMessage("Please Fill all fields.");
      setAlertType("error");
      setOpen(true);
    }
  };
  const proceed = (result) => {
    setMessage("The transaction was successful.");
    setValid(true);
    setValidSc(true);
    setValidCvv(true);
    setErrors({
      cardholderName: "blank",
      cardNumber: "blank",
      expiryDate: "blank",
      securityCode: "blank",
    });
    setAlertType("success");

    localStorage.setItem("payment_completed", true);
    localStorage.setItem("payment_details", JSON.stringify(result));
  };
  const completePayment = async () => {
    setValid("empty");
    setValidSc("empty");
    setValidCvv("empty");
    setErrors({
      cardholderName: "blank",
      cardNumber: "blank",
      expiryDate: "blank",
      securityCode: "blank",
    });
    var expirySplit = cardDetails.expiryDate.split("/");
    var expirydate = expirySplit[0] + expirySplit[1];
    var carddetails = { ...cardDetails };
    carddetails.expiryDate = expirydate;

    setpenLoader(true);
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
                upfrontPayment,
                key,
                environment,
                ipAddress
              )
                .then((response) => response.json())
                .then((result) => {
                  if (result.statusCode === "0000") {
                    proceed(result);
                    if (!duplicateemail) {
                      register()
                        .then((res) => {
                          if (res.status == 200) {
                          }
                        })
                        .catch((error) => {
                          if (error.response) {
                            Object.entries(error.response.data.errors).forEach(
                              (entry) => {
                                const [key, value] = entry;
                                // setMessage(value[0]);
                                // setOpen(true);
                              }
                            );
                          }
                        });
                    }
                    completeOrder(result.transactionId);
                  }
                  //else if (result.statusCode === "2021") {
                  //   console.log(result);
                  //   var data = { creq: result.cReq };
                  //   axiosPost(result.acsUrl, data);
                  // window.open(result.acsUrl, "_blank");
                  // proceedWith3dSecure(
                  //   result.transactionId,
                  //   result.cReq,
                  //   key,
                  //   environment
                  // )
                  //   .then((response) => response.json())
                  //   .then((result) => {

                  //     if (result.status == "Ok") proceed(result);
                  //   });
                  // }
                  else {
                    setpenLoader(false);
                    setMessage(result.description);
                    if (result.description.includes("SecurityCod")) {
                      setValidCvv(false);
                      setErrors({
                        ...errors,
                        securityCode: "Invalid Security Code",
                      });
                    } else {
                      setValid(false);
                      setErrors({
                        ...errors,
                        cardNumber: "Invalid Card Number",
                      });
                    }

                    setAlertType("error");

                    setOpen(true);
                  }
                })
                .catch((error) => {
                  setpenLoader(false);
                });
            } else {
              setpenLoader(false);
              setMessage(result.errors[0].clientMessage);
              if (result.errors[0].clientMessage.includes("date")) {
                setValidSc(false);
                setErrors({
                  ...errors,
                  expiryDate: "Please enter a valid date",
                });
              } else if (result.errors[0].clientMessage.includes("security")) {
                setValidCvv(false);
              } else {
                setValid(false);
                setErrors({
                  ...errors,
                  cardNumber: "Please enter a valid card number",
                });
              }
              setAlertType("error");
              setOpen(true);
            }
          })
          .catch((error) => {
            setpenLoader(false);
          });
      })
      .catch((error) => {
        setpenLoader(false);
      });
  };
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
    if (localStorage.getItem("payment_completed") != null) {
      navigate.push("/completionpage");
    }
  }, []);
  useEffect(() => {
    if (upfrontPayment == 0) {
      setpenLoader1(true);
      completeOrder();
    }
  }, [upfrontPayment]);
  return (
    <>
      <InnerPageHeader
        activeTab="payment"
        bussiness_type={bussiness_type}
        signedIn={signedIn}
        SetSignedIn={SetSignedIn}
        page={page}
        step={2}
      />
      {upfrontPayment && upfrontPayment > 0 ? (
        <section
          className={
            bussiness_type == "true"
              ? "buisness-mobile buisness-mobile2 address-form-sec"
              : " address-form-sec"
          }
        >
          <div className="container">
            <div className="row">
              <div className="col-xl-8">
                <div className="contract-left-box-sec">
                  <div className="installation-page-title">
                    <h6>CHECKOUT</h6>
                  </div>
                  <div className="contract-golive-box">
                    <div className="row">
                      <div className="col-xl-12">
                        <h5>Card Details</h5>
                      </div>
                      <div className="col-xl-12">
                        <label htmlFor className="mb-1">
                          Card number <span>*</span>
                        </label>
                        <div className="input-group mb-3">
                          <input
                            id="Card Number"
                            type="number"
                            onWheel={(event) => event.currentTarget.blur()}
                            className={
                              errors.cardNumber === "blank"
                                ? "form-control"
                                : errors.cardNumber.length < 0
                                ? "form-control is-valid"
                                : "form-control is-invalid"
                            }
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            name="cardNumber"
                            value={cardDetails.cardNumber.trim()}
                            onChange={(e) => handleChange(e)}
                          />

                          <span className="input-group-text" id="basic-addon1">
                            <img src={cardTypeImage} alt="card logo" />
                          </span>
                          <div className="invalid-feedback">
                            {errors.cardNumber}
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-12">
                        <div className="mb-3">
                          <label htmlFor className="mb-1">
                            Card holder name <span>*</span>
                          </label>
                          <input
                            id="Card holder's name"
                            type="text"
                            className={
                              errors.cardholderName === "blank"
                                ? "form-control"
                                : errors.cardholderName.length < 0
                                ? "form-control is-valid"
                                : "form-control is-invalid"
                            }
                            aria-label="Username"
                            name="cardholderName"
                            value={cardDetails.cardholderName}
                            onChange={(e) => handleChange(e)}
                          />
                          <div className="invalid-feedback">
                            {errors.cardholderName}
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <label htmlFor className="mb-1">
                          Expiry date <span>*</span>
                        </label>
                        <div id="example1">
                          <input
                            id="Expiry Date"
                            className={
                              errors.expiryDate === "blank"
                                ? "form-control"
                                : errors.expiryDate.length < 0
                                ? "form-control is-valid"
                                : "form-control is-invalid"
                            }
                            type="text"
                            maxLength={5}
                            name="expiryDate"
                            value={cc_format(cardDetails.expiryDate)}
                            onChange={(e) => handleChange(e)}
                          />
                          <div className="invalid-feedback">
                            {errors.expiryDate}
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <label htmlFor className="mb-1">
                          Security Code <span>*</span>
                        </label>
                        <div className="input-group mb-3">
                          <input
                            id="Security Code"
                            type="text"
                            className={
                              errors.securityCode === "blank"
                                ? "form-control"
                                : errors.securityCode.length < 0
                                ? "form-control is-valid"
                                : "form-control is-invalid"
                            }
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            name="securityCode"
                            value={cardDetails.securityCode}
                            onChange={(e) => handleChange(e)}
                          />
                          <span className="input-group-text" id="basic-addon1">
                            <i className="fal fa-question-circle" />
                          </span>
                          <div className="invalid-feedback">
                            {errors.securityCode}
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-12">
                        <div className="mb-3">
                          <a onClick={validate} className="pay-btn">
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
              </div>
              <YourOrders
                data="finalPage"
                shop={page != "shop" ? false : true}
                page={page}
              />
            </div>
          </div>
        </section>
      ) : (
        ""
      )}

      <section className="ptb-50 star-sec">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="star-img">
                <TrustPilot fullWidth={true} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
        open={open}
        autoHideDuration={6000}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Alert
          onClose={() => {
            setOpen(false);
          }}
          variant="filled"
          severity={alerttype}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLoader}
        onBackdropClick="false"
      >
        <Box
          className="custom-loader-uma"
          sx={{ position: "relative", display: "block", textAlign: "center" }}
        >
          <h1 style={{ color: "white" }}>Payment is in Progress.</h1>
          <h2 style={{ color: "white" }}>
            Please wait. Do not stop or reload the page when the payment is
            processing..
          </h2>
          <CircularProgress color="inherit" />
        </Box>
      </Backdrop>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLoader1}
        onBackdropClick="false"
      >
        <Box
          sx={{ position: "relative", display: "block", textAlign: "center" }}
        >
          <h2 style={{ color: "white", width: "600px" }}>
            Please wait. We are finalizing your order..
          </h2>
          <CircularProgress color="inherit" />
        </Box>
      </Backdrop>
    </>
  );
}

export default FinalPage;
