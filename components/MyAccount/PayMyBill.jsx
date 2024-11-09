import {
  Alert,
  Backdrop,
  Box,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import creditCardType from "credit-card-type";
import { React, useState, useEffect } from "react";
import {
  getCardIdentifier,
  getMerchantSessionKey,
  paymentApi,
} from "../../Methods/Save";
import Body from "../MakePayment/Body";
import { useRouter } from "next/router";

function PayMyBill() {
  const [vertical, setvertical] = useState("top");
  const [valid, setValid] = useState("empty");
  const [amount, setAmount] = useState();
  const [validSc, setValidSc] = useState("empty");
  const [validCvv, setValidCvv] = useState("empty");
  const [horizontal, sethori] = useState("right");

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [alerttype, setAlertType] = useState("");
  const [openLoader, setpenLoader] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    securityCode: "",
  });
  const [cardTypeImage, setCardTypeImage] = useState("card-logo-unknown.svg");
  const handleChange = (e) => {
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
  if (localStorage.getItem("user_data") != null) {
    var userDetails = JSON.parse(localStorage.getItem("user_data"));
  }
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
  const completePayment = async () => {
    setValid("empty");
    setValidSc("empty");
    setValidCvv("empty");
    var expirySplit = cardDetails.expiryDate.split("/");
    var expirydate = expirySplit[0] + expirySplit[1];
    var carddetails = { ...cardDetails };
    carddetails.expiryDate = expirydate;

    setpenLoader(true);
    getMerchantSessionKey()
      .then((response) => response.json())
      .then((result) => {
        var merchantSessionKey = result.merchantSessionKey;
        getCardIdentifier(result.merchantSessionKey, carddetails)
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
                amount
              )
                .then((response) => response.json())
                .then((result) => {
                  if (result.statusCode === "0000") {
                    setMessage("The transaction was successful.");
                    setValid(true);
                    setValidSc(true);
                    setValidCvv(true);
                    setAlertType("success");
                    setpenLoader(false);
                    setOpen(true);
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
  return (
    <>
      <div className="col-lg-9">
        <Body
          akj={userDetails.akj}
          postcode={userDetails.address
            .split(",")
            [userDetails.address.split(",").length - 1].trim()}
        />
      </div>
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
          sx={{ position: "relative", display: "block", textAlign: "center" }}
        >
          <h1 style={{ color: "white" }}>Payment is in Progress.</h1>
          <h2 style={{ color: "white", width: "600px" }}>
            Please wait. Do not stop or reload the page when the payment is
            processing..
          </h2>
          <CircularProgress color="inherit" />
        </Box>
      </Backdrop>
    </>
  );
}

export default PayMyBill;
