import React, { useEffect, useState } from "react";
import Paypal from "./Paypal";
import { BlankValidation, emailOnly } from "../../Methods/ValidateForms";

function StepTwo({
  upfrontPayment,
  userDetails,
  setUserDetails,
  acntNo,
  setMessage,
  setOpenPopup,
  stepTwo,
  setStepTwo,
  setShowStep3,
  setCustomAmount,
  amount,
  customAmount,
  stepone,
}) {
  const [show, setShow] = useState(false);
  const [baseUrl, setBaseUrl] = useState(false);
  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  const [errorTwo, setErrorTwo] = useState({
    address: "blank",
    city: "blank",
    postCode: "blank",
  });
  const [errors, setErrors] = useState({
    email: "blank",
  });
  useEffect(() => {
    setUserDetails({
      ...userDetails,
      address: `${userDetails.home_address},${userDetails.city},${userDetails.postCode}`,
    });
  }, [stepTwo.address, stepTwo.city, stepTwo.postCode]);
  const handleChange2 = (e) => {
    const { name, value, id } = e.target;
    if (value.length > 0) {
      setErrorTwo({ ...errorTwo, [name]: "" });
      setStepTwo({
        ...stepTwo,
        [name]: value,
      });
    } else {
      setErrorTwo({ ...errorTwo, [name]: `Please enter ${id}` });
      setStepTwo({
        ...stepTwo,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    if (userDetails.email.length > 0 && errors.email == "") {
      var data = {
        name: userDetails.name,
        email: userDetails.email,
        account_number: stepone.account,
        amount: amount,
        postcode: stepone.postcode,
        payment_mode:"credit_card",
      };
      localStorage.setItem("successPaymentDetails", JSON.stringify(data));
    }
  }, [userDetails.email,amount,userDetails.name,]);
  const validateStepTwo = () => {
    const result = BlankValidation(stepTwo, goToStep3, errorTwo, setErrorTwo);
    if (result == false) {
      setMessage("Please Fill all fields.");
      setOpenPopup(true);
    }
  };
  const goToStep3 = () => {
    if (userDetails.email.length > 0) {
      if (amount && Number(amount) > 0) setShowStep3(true);
      else {
        setMessage("No outstanding dues");
        setOpenPopup(true);
      }
    } else {
      setMessage("Please enter email address");
      setOpenPopup(true);
      return;
    }
  };
  useEffect(() => {
    if (!show) setCustomAmount();
  }, [show]);
  return (
    <>
      <div className="col-lg-12 payment-box-item">
        <div className="row flex-column-reverse flex-md-row">
          <div className="col-lg-6">
            <div className="payment-form">
              <h2>Payment Required</h2>
              <p>
                Your Currently have an outstanding balance of{" "}
                <strong>£{upfrontPayment}</strong>. Please fill out the details
                below to make a payment
              </p>
              <div className="row">
                <div className="col-lg-12">
                  <div className="mb-3">
                    <label htmlFor className="form-label">
                      Email Address
                    </label>
                    <div className="make-payment-form">
                      <i class="far fa-envelope"></i>
                      <input
                        type="email"
                        name="email"
                        className={
                          errors.email == "blank"
                            ? "form-control"
                            : errors.email == ""
                            ? "form-control is-valid"
                            : "form-control is-invalid"
                        }
                        value={userDetails.email}
                        onChange={(e) =>
                          emailOnly(
                            e,
                            setUserDetails,
                            userDetails,
                            setErrors,
                            errors
                          )
                        }
                      />
                      <div class="invalid-feedback">{errors.email}</div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="mb-3">
                    <label htmlFor className="form-label">
                      Registered address of card
                    </label>
                    <div className="make-payment-form">
                      <i class="fas fa-map-marked-alt"></i>
                      <input
                        type="text"
                        name="address"
                        className="form-control"
                        value={stepTwo.address}
                        onChange={(e) => handleChange2(e)}
                        id="Address"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="mb-3">
                    <label htmlFor className="form-label">
                      Registered city of card
                    </label>
                    <div className="make-payment-form">
                      <i class="fal fa-building"></i>
                      <input
                        type="text"
                        name="city"
                        className="form-control"
                        value={stepTwo.city}
                        onChange={(e) => handleChange2(e)}
                        id="City"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="mb-3">
                    <label htmlFor className="form-label">
                      Registered postcode of card
                    </label>
                    <div className="make-payment-form">
                      <i class="fal fa-mailbox"></i>
                      <input
                        type="text"
                        name="postCode"
                        id="Postcode"
                        className="form-control"
                        value={stepTwo.postCode}
                        onChange={(e) => handleChange2(e)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="mt-3 mb-3">
                    <a
                      onClick={(e) => {
                        validateStepTwo();
                      }}
                      style={{ cursor: "pointer" }}
                      className={
                        amount && Number(amount) > 0
                          ? "btn-style-one"
                          : "btn-style-disabled"
                      }
                    >
                      Pay with Card
                    </a>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <Paypal
                    product={"Bill Payment"}
                    amount={amount}
                    items={1}
                    currency={"GBP"}
                    first_name={userDetails.first_name}
                    last_name={"last_name"}
                    address1={stepTwo.address}
                    address2={stepTwo.address}
                    city={stepTwo.city}
                    state={""}
                    postcode={stepTwo.postCode}
                    email={"executive.office@poptelecom.co.uk"}
                    live_mode={1}
                    setOpenPopup={setOpenPopup}
                    setMessage={setMessage}
                    userDetails={userDetails}
                    stepone={stepone}
                    baseUrl={baseUrl}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="payment-form-details">
              <h2>Your Details</h2>
              <ul>
                <li>
                  <h4>
                    <i className="fal fa-shield-check" />
                    Account Number
                  </h4>
                  <span>{acntNo}</span>
                </li>
                <li>
                  <h4>
                    <i className="fal fa-shield-check" />
                    Name
                  </h4>
                  <span>{userDetails.name}</span>
                </li>
                <li className="outstanding-balance">
                  <h4>
                    <i className="fal fa-shield-check" />
                    Outstanding Balance
                  </h4>
                  <span>£{upfrontPayment.toFixed(2)}</span>
                </li>
              </ul>
              <button
                className={show ? "btn btn-danger" : "btn btn-primary"}
                onClick={(e) => setShow(!show)}
              >
                {show ? "Cancel Custom Amount" : "Pay Custom Amount"}
              </button>
              {show ? (
                <div>
                  <h2>Pay Custom Amount</h2>
                  <div className="row px-3">
                    <div className="col-12 mb-2">
                      <input
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        type="number"
                        onWheel={(event) => event.currentTarget.blur()}
                        placeholder="Enter Amount in GBP"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StepTwo;
