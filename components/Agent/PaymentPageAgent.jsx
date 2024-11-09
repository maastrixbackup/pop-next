import { React, useState, useEffect } from "react";

import { APIURL } from "../../Methods/Fetch";
import {
  axiosPost,
  getCardIdentifier,
  getMerchantSessionKey,
  paymentApi,
} from "../../Methods/Save";
import creditCardType from "credit-card-type";
import axios from "axios";
import Image from "next/image";

const unknownCard = "/images/59173-200.png";
const mastercard = "/images/mastercard.png";
const visa = "/images/VISA-Logo-2006.png";
const amex = "/images/amex.png";

function PaymentPageAgent(props) {
  const {
    userDetails,
    relatedProducts,
    addons,
    upfrontPayment,
    monthlyTotal,
    setStep,
    agent_id,
    setThankYouTab,
    setPaymentTab,
    setpenLoader,
    rentalProducts,
    type,
  } = props;
  const [direct_debit_details,setdirect_debit_details]=useState([]);
  const [duplicateemail,setduplicateemail]=useState([]);
  const [wifiDetails,setwifiDetails]=useState([]);
  const [addonproducts,setaddonproducts]=useState([]);
  const [order_id,setorder_id]=useState([]);
  const [directdebit,setdirectdebit]=useState([]);
  const [page,setpage]=useState([]);
  const [fasttrack_price,setfasttrack_price]=useState([]);
  const [goLiveDate,setgoLiveDate]=useState([]);
  const [appointment_note,setappointment_note]=useState([]);
  const [appointment_slot,setappointment_slot]=useState([]);
  const [broadband,setbroadband]=useState([]);

  useEffect(() => {
    if (localStorage.getItem("addonproducts") !== null) {
      setaddonproducts(JSON.parse(localStorage.getItem("addonproducts")));
    } else setaddonproducts("");
    if (localStorage.getItem("order_id") !== null) {
      setorder_id(localStorage.getItem("order_id"));
    } else  setorder_id("");
    if (localStorage.getItem("Product") !== null) {
      setbroadband(JSON.parse(localStorage.getItem("Product")));
    } else setbroadband("");
    // if (localStorage.getItem("upfrontPayment") !== null) {
    //   var upfrontPayment = JSON.parse(localStorage.getItem("upfrontPayment"));
    // } else var upfrontPayment = "";
    // if (localStorage.getItem("monthlyTotal") !== null) {
    //   var monthlyTotal = JSON.parse(localStorage.getItem("monthlyTotal"));
    // } else var monthlyTotal = "";
    if (localStorage.getItem("directdebit") !== null) {
      setdirectdebit(JSON.parse(localStorage.getItem("directdebit")));
    } else setdirectdebit("");
    if (localStorage.getItem("wifiDetails") !== null) {
       setwifiDetails(JSON.parse(localStorage.getItem("wifiDetails")));
    } else setwifiDetails({ name: "", password: "" });

    if (localStorage.getItem("duplicate-email") !== null) {
      setduplicateemail(true);
    }
    if (localStorage.getItem("directDebitDetails") !== null) {
      setdirect_debit_details(JSON.parse(
        localStorage.getItem("directDebitDetails")
      ));
    }
    if (localStorage.getItem("page") !== null) {
      setpage(localStorage.getItem("page"));
    } else setpage("broadband");
    if (localStorage.getItem("fasttrack_price") !== null) {
      setfasttrack_price(localStorage.getItem("fasttrack_price"));
    } else setfasttrack_price(0);
    if (localStorage.getItem("goLiveDate") !== null) {
      setgoLiveDate(JSON.parse(localStorage.getItem("goLiveDate")));
    } else setgoLiveDate(0);
    if (localStorage.getItem("appointment_note") !== null) {
      setappointment_note(localStorage.getItem("appointment_note"));
    } else setappointment_note("");
    if (localStorage.getItem("appointment_slot") !== null) {
      setappointment_slot(localStorage.getItem("appointment_slot"));
    } else setappointment_slot("AM");
  }, []);

  const [checkedTerms, setcheckedTerms] = useState(false);
  const [alerttype, setAlertType] = useState("");
  const [checked, setChecked] = useState(false);
  const [verified, setVerified] = useState(false);
  const [message, setMessage] = useState("");
  const [message1, setMessage1] = useState("");
  const [open, setOpen] = useState(false);
  const [directDebitDetails, setDirectDebitDetails] = useState([]);
  const [valid, setValid] = useState({
    sort_code: "empty",
    account_number: "empty",
    name: "empty",
  });
  const [valid1, setValid1] = useState("empty");
  const [validSc, setValidSc] = useState("empty");
  const [validCvv, setValidCvv] = useState("empty");
  const [environment, setEnvironment] = useState("");
  const [key, setKey] = useState("");
  const [vendor, setVendor] = useState("");
  const [ipAddress, setIpAddress] = useState("");

  function cc_format(value) {
    const v = value
      .replace(/\s+/g, "")
      .replace(/[^0-9]/gi, "")
      .substr(0, 6);
    const parts = [];

    for (let i = 0; i < v.length; i += 2) {
      parts.push(v.substr(i, 2));
    }

    return parts.length > 1 ? parts.join("-") : value;
  }
  const [accountInfo, setAccountInfo] = useState({
    sort_code: "",
    account_number: "",
    name: "",
  });
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
        console.error(error);
      });
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (e.target.name == "sort_code") {
      if (value.length > 5) {
        setValid({ ...valid, [name]: true });
      } else setValid({ ...valid, [name]: false });
    }
    if (e.target.name == "name") {
      if (value.length > 0) {
        setValid({ ...valid, [name]: true });
      } else setValid({ ...valid, [name]: false });
    }
    setAccountInfo({
      ...accountInfo,
      [e.target.name]: e.target.value,
    });
  };
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
  const verifyAcnt = () => {
    if (!valid) {
      setMessage1("Enter a valid payment Account number.");
      setOpen(true);
      setVerified(false);
    } else if (!checked) {
      setMessage1("Please authorise for auto payment.");
      setOpen(true);
      setVerified(false);
    } else if (accountInfo.sort_code == "") {
      setMessage1("Please enter sort code.");
      setOpen(true);
      setVerified(false);
    } else if (
      accountInfo.account_number == "" ||
      valid.account_number !== true
    ) {
      setMessage1("Please enter a Valid Account number.");
      setOpen(true);
      setVerified(false);
    } else if (accountInfo.name == "") {
      setMessage1("Please enter Account holder's name.");
      setVerified(false);
      setOpen(true);
    } else {
      localStorage.setItem(
        "directDebitDetails",
        JSON.stringify(directDebitDetails)
      );
      localStorage.setItem("accountInfo", JSON.stringify(accountInfo));
      setVerified(true);
    }
  };
  setStep(2);
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (accountInfo.account_number.length > 5) {
        setpenLoader(true);
        var url =
          "https://api.addressy.com/BankAccountValidation/Interactive/Validate/v2.00/json3.ws";
        var SortCodeSplit = accountInfo.sort_code.split("-");
        var SortCode = SortCodeSplit[0] + SortCodeSplit[1] + SortCodeSplit[2];
        var data = {
          Key: "DA29-PD91-BN79-KU55",
          AccountNumber: accountInfo.account_number,
          SortCode: SortCode,
        };
        localStorage.setItem("accountInfo", JSON.stringify(accountInfo));
        localStorage.setItem("directdebit", JSON.stringify(data));
        axiosPost(url, data).then((response) => {
          setpenLoader(false);

          if (response.data.Items[0].Error) {
            setMessage(response.data.Items[0].Description);
            setOpen(true);
          } else {
            if (response.data.Items[0].IsCorrect == true) {
              setDirectDebitDetails(response.data.Items[0]);
              setValid({ ...valid, account_number: true });
              setOpen(false);
            } else {
              setMessage(response.data.Items[0].StatusInformation);
              if (
                response.data.Items[0].StatusInformation.includes("SortCode")
              ) {
                setValid({ ...valid, sort_code: false });

                setOpen(true);
              } else {
                setValid({ ...valid, account_number: false });

                setOpen(true);
              }
            }
          }
        });
      }
    }, 1200);
  }, [accountInfo.account_number, accountInfo.sort_code]);
  const [cardDetails, setCardDetails] = useState({
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    securityCode: "",
  });
  const [cardTypeImage, setCardTypeImage] = useState(unknownCard);
  // if (localStorage.getItem("upfrontPayment") !== null) {
  //   var upfrontPayment = JSON.parse(localStorage.getItem("upfrontPayment"));
  // } else var upfrontPayment = "";
  const register = () => {
    var url = APIURL() + "register";

    var data = { ...userDetails };
    return axiosPost(url, data);
  };
  const completeOrder = (tranid) => {
    var address = userDetails.address.split(",");
    var length = address.length;

    var url = APIURL() + "order/update";
    const appointmentDate = type != "upgrade" && goLiveDate;
    const appointmentSlot = type != "upgrade" && appointment_slot;
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
      related_products: relatedProducts,
      rentalProducts: rentalProducts,
      addons: addons,
      [page]: broadband,
      wifi_username: wifiDetails.name,
      wifi_pw: wifiDetails.password,
      direct_debit_details: direct_debit_details,
      fasttrack_connection: fasttrack_price,
      broadband_service: broadband.type,
      agent_id: agent_id,
      goLiveDate: appointmentDate,
      appointment_slot: appointmentSlot,
      appointment_note: appointment_note,
    };
    axiosPost(url, data, "header", data)
      .then((response) => {
        localStorage.setItem("order_no", response.data[0].response.order_no);
        // const link = document.createElement("a");
        // link.href = response.data[0].response.invoice;
        // document.body.appendChild(link);
        // link.setAttribute("target", "_blank");
        // link.click();
        setpenLoader(false);
        setOpen(true);
        localStorage.removeItem("_blank");
        setPaymentTab(false);
        setThankYouTab(true);
        // setTimeout(() => {}, 2000);
      })
      .catch(function (error) {
        setpenLoader(false);
      });
  };
  const completePayment = async () => {
    setValid("empty");
    setValidSc("empty");
    setValidCvv("empty");
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
                    setMessage("The transaction was successful.");
                    setValid(true);
                    setValidSc(true);
                    setValidCvv(true);
                    setAlertType("success");

                    localStorage.setItem("payment_completed", true);
                    localStorage.setItem(
                      "payment_details",
                      JSON.stringify(result)
                    );
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
                  } else {
                    setpenLoader(false);
                    setMessage("There was some error.");
                    setAlertType("error");
                    setValid(false);

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
              } else if (result.errors[0].clientMessage.includes("security")) {
                setValidCvv(false);
              } else {
                setValid(false);
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
  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
    if (e.target.name === "cardNumber") {
      if (value.length > 0) {
        setValid1("empty");
        var suggestion = creditCardType(e.target.value)[0];
      } else {
        setMessage("Please enter a card number");
        setValid1(false);
      }
      const cardType = suggestion ? suggestion.type : "unknown";
      let imageUrl;

      switch (cardType) {
        case "visa":
          imageUrl = visa;
          break;
        case "mastercard":
          imageUrl = mastercard;
          break;
        case "american-express":
          imageUrl = amex;
          break;
        default:
          imageUrl = unknownCard;
      }
      setCardTypeImage(imageUrl);
    }
  };
  function cc_format1(value) {
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
    if (verified && upfrontPayment === 0) {
      setpenLoader(true);
      completeOrder();
    }
  }, [upfrontPayment, verified]);
  useEffect(() => {
    if (type == "upgrade" || type == "CLN") setVerified(true);
  }, []);
  return (
    <>
      <section className={verified ? "d-none" : ""}>
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="contract-left-box-sec">
                <div className="contract-title">
                  <div className="d-flex justify-content-between">
                    <h5 className="m-0 fw-bold">Direct Debit Mandate</h5>
                    <h6 className="color-purple">£0.00 to pay today</h6>
                  </div>
                  <p className="sub-para">
                    We will use these details to set up your monthly Direct
                    Debit.
                  </p>
                </div>
                <div className="contract-content-box">
                  <div className="d-flex justify-content-between">
                    <p className="m-0">Monthly Direct Debit</p>
                    <Image
                      width={40}
                      height={40}
                      style={{
                        width: "auto",
                        height: "auto",
                      }}
                      alt="qwe"
                      src="/images/direct-debit.jpg"
                    />
                  </div>
                  <div className="col-xl-12">
                    <div className="mb-3">
                      <input
                        type="text"
                        className={
                          valid.sort_code == "empty"
                            ? "form-control"
                            : valid.sort_code === true
                            ? "form-control is-valid"
                            : "form-control is-invalid"
                        }
                        placeholder="Sort code"
                        name="sort_code"
                        maxLength={8}
                        value={cc_format(accountInfo.sort_code)}
                        onChange={(e) => handleChange(e)}
                      />
                      <div className="invalid-feedback">{message1}</div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="mb-3">
                        <input
                          type="text"
                          className={
                            valid.account_number == "empty"
                              ? "form-control"
                              : valid.account_number === true
                              ? "form-control is-valid"
                              : "form-control is-invalid"
                          }
                          placeholder="Account number"
                          name="account_number"
                          value={accountInfo.account_number}
                          onChange={(e) => handleChange(e)}
                        />
                        <div className="invalid-feedback">{message1}</div>
                      </div>
                    </div>
                    <div className="col-xl-12">
                      <div className="mb-3">
                        <input
                          type="text"
                          className={
                            valid.name == "empty"
                              ? "form-control"
                              : valid.name === true
                              ? "form-control is-valid"
                              : "form-control is-invalid"
                          }
                          placeholder="Account holder name"
                          name="name"
                          value={accountInfo.name}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                    <div className="col-xl-12">
                      <div className="mb-3 check-box">
                        <input
                          id="Option2"
                          type="checkbox"
                          checked={checked}
                          onChange={() => setChecked(!checked)}
                        />
                        <label className="checkbox" htmlFor="Option2">
                          I am authorised to set up Direct Debits on this
                          account.{" "}
                        </label>
                      </div>
                    </div>
                    <div className="col-xl-12">
                      <div className="mb-3 check-box">
                        <a onClick={verifyAcnt} className="btn-chekout mb-2">
                          Go to Verify
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={verified ? "" : "d-none"}>
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="contract-left-box-sec">
                <div className="installation-page-title">
                  <h6>CHECKOUT</h6>
                </div>
                <div className="contract-golive-box">
                  <div className="row">
                    <div className="col-xl-12">
                      <label htmlFor className="mb-1">
                        Card number <span>*</span>
                      </label>
                      <div className="input-group mb-3">
                        <input
                          type="number"
                          className={
                            valid1 === "empty"
                              ? "form-control"
                              : valid1
                              ? "form-control is-valid"
                              : "form-control is-invalid"
                          }
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          name="cardNumber"
                          onWheel={(event) => event.currentTarget.blur()}
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
                        Expires <span>*</span>
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
                          value={cc_format1(cardDetails.expiryDate)}
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
                        <div className="invalid-feedback">{message}</div>
                        <span className="input-group-text" id="basic-addon1">
                          <i className="fal fa-question-circle" />
                        </span>
                      </div>
                    </div>
                    <div className="col-xl-12">
                      <div className="mb-3">
                        <a
                          onClick={completePayment}
                          className="pay-btn"
                          style={{ cursor: "pointer" }}
                        >
                          Pay Now
                        </a>
                        <a href="#" className="cancel-btn">
                          Cancel
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PaymentPageAgent;
