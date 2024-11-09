import { Alert, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import YourOrders from "../ContractInstallation/YourOrders";
import InnerPageHeader from "../InnerPageHeader";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Content from "../Terms and Conditions/Content";
import { APIURL } from "../../Methods/Fetch";
import { axiosPost } from "../../Methods/Save";
import { useRouter } from "next/router";
export const TermsModal = ({ show, toggle }) => {
  return (
    <Modal isOpen={show} toggle={toggle} backdrop="static" scrollable={true}>
      <ModalHeader toggle={toggle}>Terms and conditions</ModalHeader>
      <ModalBody>
        <Content modal={show} />
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => toggle()}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

function Marketting() {
  const navigate = useRouter();
  if (localStorage.getItem("page") !== null) {
    var page = localStorage.getItem("page");
  } else var page = "broadband";
  var bussiness_type = localStorage.getItem("bussiness_type");
  const [vertical, setvertical] = useState("top");
  const [horizontal, sethori] = useState("right");
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [checkedTerms, setcheckedTerms] = useState(false);
  const [signedIn, SetSignedIn] = useState(false);
  const toggle = () => {
    setShow(!show);
  };
  useEffect(() => {
    if (localStorage.getItem("user_id") != null) {
      SetSignedIn(true);
    }
  }, []);
  const [checkedState, setCheckedState] = useState({
    phone: false,
    email: false,
    post: false,
    text: false,
  });
  const [installation_cost, setInstallationCost] = useState(
    Number(localStorage.getItem("upfrontPayment"))
  );
  const [message, setMessage] = useState("");
  const goTo = () => {
    if (!checkedTerms) {
      setMessage("Please agree to our terms.");
      setOpen(true);
      return;
    }
    var url = APIURL() + "store-order-step";
    var data = {
      order_id: localStorage.getItem("order_id"),
      order_step: "marketing",
    };

    axiosPost(url, data)
      .then((response) => {
        if (response.data[0].response.status === "success") {
          console.log("success");
        }
      })
      .catch(function (error) {
        console.log("fail");
      });
    // if (
    //   checkedState.phone == false &&
    //   checkedState.email == false &&
    //   checkedState.post == false &&
    //   checkedState.text == false
    // ) {
    //   setMessage("Please select atleast one Marketting Preference.");
    //   setOpen(true);
    //   return;
    // }
    localStorage.setItem("marketing_preference", JSON.stringify(checkedState));
    if (page != "shop" && page != "mobile") navigate.push("/payment");
    else navigate.push("/paymentconfirm");
  };
  const handleOnChange = (e) => {
    const name = e.target.name;
    setCheckedState({ ...checkedState, [name]: !checkedState[name] });
  };

  return (
    <>
      <TermsModal show={show} toggle={toggle} />
      <InnerPageHeader
        activeTab="payment"
        bussiness_type={bussiness_type}
        signedIn={signedIn}
        SetSignedIn={SetSignedIn}
        page={page}
        step={1}
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
                <div className="installation-page-title">
                  <h6>Marketing Preferences</h6>
                </div>
                <div className="contract-content-box guarantee">
                  <p>Choose Your Marketing Preference</p>
                  <div className="connet-check">
                    <div className="row">
                      <div className="col-xl-12">
                        <div className="mb-3 check-box">
                          <input
                            id="Option3"
                            type="checkbox"
                            name="phone"
                            checked={checkedState.phone}
                            onChange={(e) => handleOnChange(e)}
                          />
                          <label className="checkbox" htmlFor="Option3">
                            Phone{" "}
                          </label>
                        </div>
                      </div>
                      <div className="col-xl-12">
                        <div className="mb-3 check-box">
                          <input
                            id="Option4"
                            type="checkbox"
                            name="email"
                            checked={checkedState.email}
                            onChange={(e) => handleOnChange(e)}
                          />
                          <label className="checkbox" htmlFor="Option4">
                            E-Mail{" "}
                          </label>
                        </div>
                      </div>
                      <div className="col-xl-12">
                        <div className="mb-3 check-box">
                          <input
                            id="Option5"
                            type="checkbox"
                            name="post"
                            checked={checkedState.post}
                            onChange={(e) => handleOnChange(e)}
                          />
                          <label className="checkbox" htmlFor="Option5">
                            Post{" "}
                          </label>
                        </div>
                      </div>
                      <div className="col-xl-12">
                        <div className="mb-3 check-box">
                          <input
                            id="Option6"
                            type="checkbox"
                            name="text"
                            checked={checkedState.text}
                            onChange={(e) => handleOnChange(e)}
                          />
                          <label className="checkbox" htmlFor="Option6">
                            Text message{" "}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-12">
                    <div className="mb-3 check-box">
                      <input
                        id="Option7"
                        type="checkbox"
                        checked={checkedTerms}
                        onChange={() => setcheckedTerms(!checkedTerms)}
                      />
                      <label className="checkbox" htmlFor="Option7">
                        By ticking, you are confirming that you have read,
                        understood and agree{" "}
                        <a
                          onClick={toggle}
                          style={{ cursor: "pointer" }}
                          className="color-purple text-underline"
                        >
                          Terms &amp; Conditions
                        </a>
                      </label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="mb-3 check-box">
                        <a onClick={goTo} className="btn-chekout mb-2">
                          Go to Verify Direct Debit Details
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <YourOrders data="payment" shop={page != "shop" ? false : true} />
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

export default Marketting;
