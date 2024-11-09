import React, { useEffect, useState } from "react";
import { BlankValidation } from "../../Methods/ValidateForms";
import { axiosPost } from "../../Methods/Save";
import { APIURL } from "../../Methods/Fetch";
import Image from "next/image";

function StepOne({
  setMessage,
  setOpenPopup,
  setOpen,
  setUserDetails,
  setStepTwo,
  stepTwo,
  setUpfrontPayment,
  setAcntNo,
  setPostCode,
  setShowStep2,
  akj,
  postcode,
  stepone,
  setStepOne,
}) {
  const [errorOne, setErrorOne] = useState({
    account: "blank",
    postcode: "blank",
  });
  useEffect(() => {
    localStorage.removeItem("paymentDone");
  }, []);
  const handleChange = (e) => {
    const { name, value, id } = e.target;

    if (value.length > 0) {
      setErrorOne({ ...errorOne, [name]: "" });
      setStepOne({
        ...stepone,
        [name]: value,
      });
    } else {
      setErrorOne({ ...errorOne, [name]: `Please enter ${id}` });
      setStepOne({
        ...stepone,
        [name]: value,
      });
    }
  };
  const validateStepOne = () => {
    const result = BlankValidation(stepone, lookup, errorOne, setErrorOne);
    if (result == false) {
      setMessage("Please Fill all fields.");
      setOpenPopup(true);
    }
  };
  useEffect(() => {
    if (akj)
      setStepOne({
        ...stepone,
        account: akj,
        postcode: postcode,
      });
  }, [akj, postcode]);
  const lookup = () => {
    setOpen(true);
    var url = APIURL() + "pay-my-bill";
    var data = {
      ...stepone,
      postcode: stepone.postcode.replaceAll(/\s/g, ""),
      // user_id: localStorage.getItem("user_id"),
    };
    axiosPost(url, data)
      .then((response) => {
        setOpen(false);
        if (response.data[0].response.status == "success") {
          setUserDetails({
            ...response.data[0].response.user_details,
            first_name:
              response.data[0].response.data.details.siteXmlResponse.SiteName.split(
                " "
              )[0],
            last_name:
              response.data[0].response.data.details.siteXmlResponse.SiteName.split(
                " "
              )[1],
            name: response.data[0].response.data.details.siteXmlResponse
              .SiteName,
            address: response.data[0].response.invoice_address,
            home_address: response.data[0].response.address,
            city: response.data[0].response.city,
            email: response.data[0].response.user_details.email
              ? response.data[0].response.user_details.email
              : "",
          });
          setStepTwo({
            ...stepTwo,
            address: response.data[0].response.address,
            city: response.data[0].response.city,
            postCode: response.data[0].response.data.details.postcode,
          });
          setUpfrontPayment(
            response.data[0].response.data.details.up_current_balance
          );
          setAcntNo(
            response.data[0].response.data.details.xmlResponse.AccountNumber
          );
          setPostCode(response.data[0].response.data.details.postcode);
          // setMessage("Profile information updated!");
          // setAlertType("success");
          // setOpen(true);
          setShowStep2(true);
        } else {
          setMessage(response.data[0].response.msg);
          setOpenPopup(true);
        }
      })
      .catch((err) => {
        setOpen(false);
        setMessage(err.response.data[0].response.msg);
        setOpenPopup(true);
      });
  };
  return (
    <>
      <div className="col-lg-12 payment-box-item">
        <div className="row align-items-end">
          <div className="col-lg-6">
            <div className="payment-form">
              <h2>Make a Payment</h2>
              <p>
                Please input your account number and postcode to retrieve your
                outstanding balance.
              </p>
              <div className="row">
                <div className="col-lg-12">
                  <div className="mb-3">
                    <label htmlFor className="form-label">
                      Account Number
                    </label>
                    <div className="make-payment-form">
                      <i class="fas fa-id-card"></i>
                      <input
                        type="number"
                        id="Account Id"
                        className={
                          errorOne.account === "blank"
                            ? "form-control"
                            : errorOne.account
                            ? "form-control is-invalid"
                            : "form-control is-valid"
                        }
                        aria-label="account"
                        aria-describedby="basic-addon1"
                        name="account"
                        value={stepone.account.trim()}
                        onChange={(e) => handleChange(e)}
                        onWheel={(event) => event.currentTarget.blur()}
                      />
                      <div className="invalid-feedback">{errorOne.account}</div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="mb-3">
                    <label htmlFor className="form-label">
                      Post Code
                    </label>
                    <div className="make-payment-form">
                      <i class="fal fa-mailbox"></i>
                      <input
                        type="text"
                        id="PostCode"
                        className={
                          errorOne.postcode === "blank"
                            ? "form-control"
                            : errorOne.postcode
                            ? "form-control is-invalid"
                            : "form-control is-valid"
                        }
                        aria-label="postcode"
                        aria-describedby="basic-addon1"
                        name="postcode"
                        value={stepone.postcode.trim()}
                        onChange={(e) => handleChange(e)}
                      />
                      <div className="invalid-feedback">
                        {errorOne.postcode}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="mt-3 mb-3">
                    <a
                      onClick={(e) => validateStepOne()}
                      style={{ cursor: "pointer" }}
                      className="btn-style-one"
                    >
                      Lookup
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="payment-img1">
              <Image height={400} width={400} src={"/images/payment.png"} alt="paymenty" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StepOne;
