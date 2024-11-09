import React, { useEffect, useState } from "react";
import { Alert, Backdrop, CircularProgress, Snackbar } from "@mui/material";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

function Body(props) {
  const { akj, postcode } = props;
  const [vertical, setvertical] = useState("top");
  const [horizontal, sethori] = useState("right");
  const [open, setOpen] = useState(false);

  const [openpopup, setOpenPopup] = useState(false);
  const [stepTwo, setStepTwo] = useState({
    address: "",
    city: "",
    postCode: "",
  });

  const [showStep2, setShowStep2] = useState(false);
  const [acntNo, setAcntNo] = useState();
  const [postCode, setPostCode] = useState();
  const [userDetails, setUserDetails] = useState({});
  const [amount, setAmount] = useState();
  const [customAmount, setCustomAmount] = useState();
  const [upfrontPayment, setUpfrontPayment] = useState();
  const [showStep3, setShowStep3] = useState(false);

  const [message, setMessage] = useState("");
  const [stepone, setStepOne] = useState({
    account: "",
    postcode: "",
  });

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (customAmount && customAmount > 0) setAmount(customAmount);
    else setAmount(upfrontPayment);
  }, [upfrontPayment, customAmount]);
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
        open={openpopup}
        autoHideDuration={6000}
        onClose={() => {
          setOpenPopup(false);
        }}
      >
        <Alert
          onClose={() => {
            setOpenPopup(false);
          }}
          variant="filled"
          severity={"error"}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <section className="business-mobile-btmsec pt-50 pb-140 payment-sec">
        <div className="container">
          <div className="row payment-sec-box">
            {showStep2 ? (
              ""
            ) : (
              <StepOne
                setMessage={setMessage}
                setOpenPopup={setOpenPopup}
                setOpen={setOpen}
                setUserDetails={setUserDetails}
                setStepTwo={setStepTwo}
                stepTwo={stepTwo}
                setUpfrontPayment={setUpfrontPayment}
                setAcntNo={setAcntNo}
                setPostCode={setPostCode}
                setShowStep2={setShowStep2}
                akj={akj}
                postcode={postcode}
                stepone={stepone}
                setStepOne={setStepOne}
              />
            )}
            {showStep2 && !showStep3 ? (
              <StepTwo
                upfrontPayment={upfrontPayment}
                userDetails={userDetails}
                setUserDetails={setUserDetails}
                acntNo={acntNo}
                setMessage={setMessage}
                setOpenPopup={setOpenPopup}
                stepTwo={stepTwo}
                setStepTwo={setStepTwo}
                setShowStep3={setShowStep3}
                setCustomAmount={setCustomAmount}
                customAmount={customAmount}
                amount={amount}
                stepone={stepone}
              />
            ) : (
              ""
            )}
            {showStep3 ? (
              <StepThree
                userDetails={userDetails}
                upfrontPayment={upfrontPayment}
                setMessage={setMessage}
                message={message}
                amount={amount}
                stepone={stepone}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Body;
