import React, { useLayoutEffect } from "react";
import { useEffect } from "react";
import InnerPageHeader from "../InnerPageHeader";
import { useState } from "react";
import { axiosPost } from "../../Methods/Save";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import YourOrders from "../ContractInstallation/YourOrders";
import Image from "next/image";
import { useRouter } from "next/router";

function PaymentPage() {
  if (localStorage.getItem("page") !== null) {
    var page = localStorage.getItem("page");
  } else var page = "broadband";
  const [vertical, setvertical] = useState("top");
  const [horizontal, sethori] = useState("right");
  const [signedIn, SetSignedIn] = useState(false);
  const [checked, setChecked] = useState(false);
  const [checkedTerms, setcheckedTerms] = useState(false);
  const [directDebitDetails, setDirectDebitDetails] = useState([]);

  const navigate = useRouter();
  const [message, setMessage] = useState("");
  const verifyAcnt = () => {
    if (!valid) {
      setMessage("Enter a valid payment Account number.");
      setOpen(true);
    } else if (!checked) {
      setMessage("Please authorise for auto payment.");
      setOpen(true);
    } else if (accountInfo.sort_code == "") {
      setValid({ ...valid, sort_code: "Please enter sort code." });
      setMessage("Please enter sort code.");
      setOpen(true);
    } else if (accountInfo.account_number == "" || valid.account_number !== true) {
      setValid({ ...valid, account_number: "Please enter Account number." });
      setMessage("Please enter a valid Account number.");
      setOpen(true);
    } else if (accountInfo.name == "") {
      setValid({ ...valid, name: "Please enter Account holder's name." });
      setMessage("Please enter Account holder's name.");
      setOpen(true);
    } else {
      localStorage.setItem(
        "directDebitDetails",
        JSON.stringify(directDebitDetails)
      );
      localStorage.setItem("accountInfo", JSON.stringify(accountInfo));
      localStorage.removeItem("paymentPage");
      navigate.push("/paymentconfirm");
    }
  };
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [open, setOpen] = React.useState(false);
  const [accountInfo, setAccountInfo] = useState({
    sort_code: "",
    account_number: "",
    name: "",
  });
  const [valid, setValid] = useState({
    sort_code: "empty",
    account_number: "empty",
    name: "empty",
  });
  useLayoutEffect(() => {
    if (localStorage.getItem("accountInfo") != null)
      setAccountInfo(JSON.parse(localStorage.getItem("accountInfo")));
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
    const delayDebounceFn = setTimeout(() => {
      if (accountInfo.account_number.length > 5) {
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
          if (response.data.Items[0].Error) {
            setMessage(response.data.Items[0].Description);
            if (response.data.Items[0].Description.includes("SortCode")) {
              setValid({
                ...valid,
                sort_code: "Please enter valid sort Code",
              });
              setValid({ ...valid, sort_code: "Please enter sort code." });

              setOpen(true);
            } else {
              setValid({ ...valid, account_number: false });

              setOpen(true);
            }
            setOpen(true);
          } else {
            if (response.data.Items[0].IsCorrect == true) {
              setDirectDebitDetails(response.data.Items[0]);
              setValid({ ...valid, account_number: true });
              setOpen(false);
            } else {
              console.log(response.data.Items);
              setMessage(response.data.Items[0].StatusInformation);
              if (
                response.data.Items[0].StatusInformation.includes("SortCode")
              ) {
                setValid({
                  ...valid,
                  sort_code: "Please enter valid sort Code",
                });
                setValid({ ...valid, sort_code: "Please enter sort code." });

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
  // var payment_completed = true;
  // useEffect(() => {
  //   if (localStorage.getItem("order_initiated") !=true) {
  //     console.log(localStorage.getItem("order_initiated"));
  //     // payment_completed = true;
  //     // navigate('/');
  //   }
  // }, []);
  var bussiness_type = localStorage.getItem("bussiness_type");
  // useEffect(() => {
  //   if (localStorage.getItem("paymentPage") == null && page != "mobile") {
  //     navigate("/");
  //   }
  // }, []);
  useEffect(() => {
    if (localStorage.getItem("user_id") != null) {
      SetSignedIn(true);
    }
  }, []);
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
                <div className="contract-title">
                  <div className="d-flex justify-content-between">
                    <h5 className="m-0 fw-bold">Direct Debit Mandate</h5>
                  </div>
                  <p className="sub-para">
                    We will use these details to set up your monthly Direct
                    Debit.
                  </p>
                </div>
                <div className="contract-content-box">
                  <div className="d-flex justify-content-between">
                    <p className="m-0">Monthly Direct Debit</p>
                    <Image height={38} width={81} src="/images/direct-debit.jpg" alt="dd" />
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
                      <div className="invalid-feedback">{message}</div>
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
                        <div className="invalid-feedback">{message}</div>
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
                      <div tabindex="0" className="mb-3 check-box">
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
                  </div>
                </div>
                <div className="contract-content-box guarantee">
                  <h6>The Direct Debit Guarantee</h6>
                  <ul>
                    <li>
                      The Guarantee is offered by all banks and building
                      societies that accept instructions to pay Direct Debits
                    </li>
                    <li>
                      If there are any changes to the amount, date or frequency
                      of your Direct Debit the organisation will notify you
                      (normally 10 working days) in advance of your account
                      being debited or as otherwise agreed. If you request the
                      organisation to collect a payment, confirmation of the
                      amount and date will be given to you at the time of the
                      request
                    </li>
                    <li>
                      If an error is made in the payment of your Direct Debit,
                      by the organisation or your bank or building society, you
                      are entitled to a full and immediate refund of the amount
                      paid from your bank or building society
                    </li>
                    <li>
                      If you receive a refund you are not entitled to, you must
                      pay it back when the organisation asks you to
                    </li>
                    <li>
                      You can cancel a Direct Debit at any time by simply
                      contacting your bank or building society. Written
                      confirmation may be required. Please also notify the
                      organisation.
                    </li>
                  </ul>
                </div>
                <div className="row desktop_responsive">
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
            <YourOrders data="payment" shop={page != "shop" ? false : true} />

            <div className="row mobile_responsive">
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
      </section>

      <section className="ptb-50 star-sec">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="star-img">
                <Image height={400} width={400} src="/images/star.png" alt="star" />
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
          severity="error"
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default PaymentPage;