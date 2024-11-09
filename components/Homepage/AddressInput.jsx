import { React, useState, useEffect, useRef } from "react";
import { axiosPost } from "../../Methods/Save";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import TrustPilot from "../TrustPilot";
import Link from "next/link";

function AddressInput(props) {
  const { page,homepage } = props;
  const [vertical, setvertical] = useState("top");
  const [horizontal, sethori] = useState("right");
  const [open, setOpen] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);
  const [valid, setValid] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const inputRef = useRef(null);
  const [postCode, setPostCode] = useState("");
  const checkAvailablity = (e) => {
    if (postCode.length < 5) {
      e.preventDefault();
      setOpenMessage(true);
    }
    localStorage.setItem("PostCode", postCode);
    // } else if (!valid) {
    //   e.preventDefault();
    //   setOpen(false);
    //   setOpenMessage(true);
    // }
  };
  // useEffect(() => {
  //   const delayDebounceFn = setTimeout(() => {
  //     if (postCode.length >= 5) {
  //       setOpen(true);

  //       var data = {
  //         Key: "DA29-PD91-BN79-KU55",
  //         Location: postCode,
  //       };

  //       var url = "https://api.addressy.com/Geocoding/UK/Find/v2.00/json3.ws";
  //       axiosPost(url, data).then((response) => {
  //         if (response.data.Items.length > 0) {
  //           if (response.data.Items[0].Type == "Postcode") {
  //             console.log("valid response");
  //             localStorage.setItem("PostCode", postCode);
  //             setValid(true);
  //             setOpen(false);
  //           } else {
  //             // console.log(response.data.Items[0].Type);

  //             setValid(false);
  //             setOpen(false);
  //             setOpenMessage(true);
  //           }
  //         } else {
  //           setValid(false);
  //           setOpen(false);
  //           setOpenMessage(true);
  //         }
  //       });
  //     }
  //   }, 1200);
  // }, [postCode]);

  return (
    <>
      <div className={page ? "" : "desktop banner-inputform"}>
        <input
          type="text"
          placeholder="Enter Postcode?"
          value={postCode}
          onChange={(e) => setPostCode(e.target.value)}
          autoComplete="chrome-off"
          onKeyDown={(e) => {
            if (e.key === "Enter") {

              inputRef.current.click();
            }
          }}
        />
        <Link href="/address">
          <button
            type="button"
            className="book-value"
            onClick={checkAvailablity}
            ref={inputRef}
          >
            Check Availability
          </button>
        </Link>
        <div className={homepage ?"title3":"d-none"}>
          <TrustPilot />
        </div>
      </div>
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
        open={openMessage}
        autoHideDuration={6000}
        onClose={() => {
          setOpenMessage(false);
        }}
      >
        <Alert
          onClose={() => {
            setOpenMessage(false);
          }}
          variant="filled"
          severity="error"
          sx={{ width: "100%" }}
        >
          Please enter a valid Postcode
        </Alert>
      </Snackbar>
    </>
  );
}

export default AddressInput;
