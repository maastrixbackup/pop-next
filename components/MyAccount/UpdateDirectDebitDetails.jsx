import { React, useState, useEffect } from "react";
import directdebit from "../../images/direct-debit.jpg";
import { axiosPost } from "../../Methods/Save";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { APIURL } from "../../Methods/Fetch";

function UpdateDirectDebitDetails(props) {
  const {
    orderNo,
    ddDetails,
    setTab,
    setAlertType,
    setOpen,
    userDetails,
    setMainMessage,
  } = props;
  const [directDebitDetails, setDirectDebitDetails] = useState([]);
  const [newDirectDebitDetails, setNewDirectDebitDetails] = useState([]);
  const [message, setMessage] = useState("");
  const [requested, setRequested] = useState("");
  const [edit, setEdit] = useState(false);

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
    var url = APIURL() + "already-applied";
    var data = {
      order_no: orderNo,
    };
    axiosPost(url, data).then((res) => {
      if (res.data[0].response.status == "success") {
        setRequested(true);
        setNewDirectDebitDetails(res.data[0].response.data[0]);
      }
    });
  }, [orderNo,requested]);
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
        localStorage.setItem("directdebit", JSON.stringify(data));
        axiosPost(url, data).then((response) => {
          if (response.data.Items[0].Error) {
            setMainMessage(response.data.Items[0].Description);
            setAlertType("error");
            setOpen(true);
          } else {
            if (response.data.Items[0].IsCorrect == true) {
              setDirectDebitDetails(response.data.Items[0]);
              setValid({ ...valid, account_number: true });
              setOpen(false);
            } else {
              setAlertType("error");
              setMainMessage(response.data.Items[0].StatusInformation);
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
  const verifyAcnt = () => {
    if (!valid) {
      setAlertType("error");
      setMainMessage("Enter a valid payment Account number.");
      setOpen(true);
    } else if (accountInfo.sort_code == "") {
      setAlertType("error");
      setMessage("Please enter sort code.");
      setMainMessage("Please enter sort code.");
      setOpen(true);
    } else if (accountInfo.account_number == "") {
      setAlertType("error");
      setMessage("Please enter Account number.");
      setMainMessage("Please enter Account number.");
      setOpen(true);
    } else if (accountInfo.name == "") {
      setAlertType("error");
      setMessage("Please enter Account holder's name.");
      setMainMessage("Please enter Account holder's name.");
      setOpen(true);
    } else {
      var url = APIURL() + "direct-debit-order";
      var SortCodeSplit = accountInfo.sort_code.split("-");
      var SortCode = SortCodeSplit[0] + SortCodeSplit[1] + SortCodeSplit[2];
      var data = {
        order_no: orderNo,
        dd_number: accountInfo.account_number,
        dd_code: SortCode,
        direct_debit_details: JSON.stringify(directDebitDetails),
        name:accountInfo.name
      };
      axiosPost(url, data).then((res) => {
        if (res.data[0].response.status == "success") {
          setAlertType("success");
          setMainMessage("Your request for changing your direct debit details was submitted.");
          setOpen(true);
          setRequested(true);
        } else {
          setAlertType("error");
          setMainMessage("There was some error.");
          setOpen(true);
        }
      });
    }
  };
  return (
    <>
      <div className="col-xl-9">
        <div className="row">
          {requested ? (
            <h4 style={{ color: "orange" }} className="text-center">
              Your direct debit details is pending for approval !
            </h4>
          ) : (
            ""
          )}
          <div className="col-lg-6 mb-3">
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Direct debit Details
                </Typography>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Name : {ddDetails?.AccountName}
                </Typography>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Account number : {ddDetails?.AccountNumber}
                </Typography>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Sort Code : {ddDetails?.SortCode}
                </Typography>
              </CardContent>
              {!requested ? (
                <CardActions>
                  <Button onClick={(e) => setEdit(!edit)} size="small">
                    {edit ? "Cancel" : "Request Change"}
                  </Button>
                </CardActions>
              ) : (
                ""
              )}
            </Card>
          </div>
          {requested ? (
            <div className="col-lg-6 mb-3">
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    New Direct debit detail
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Name : {newDirectDebitDetails.name}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Account number : {newDirectDebitDetails.dd_number}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Sort Code : {newDirectDebitDetails.dd_code}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ) : (
            ""
          )}
        </div>

        <div
          className={
            !requested && edit ? "contract-left-box-sec" : "contract-left-box-sec d-none"
          }
        >
          <div className="contract-title">
            <div className="d-flex justify-content-between">
              <h5 className="m-0 fw-bold">Direct Debit Mandate</h5>
              <h6 className="color-purple">£0.00 to pay today</h6>
            </div>
            <p className="sub-para">
              We will use these details to set up your monthly Direct Debit.
            </p>
          </div>
          <div className="contract-content-box">
            <div className="d-flex justify-content-between">
              <p className="m-0">Monthly Direct Debit</p>
              <img src={directdebit} />
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
              <div>
                <button onClick={verifyAcnt} className="btn btn-add">
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateDirectDebitDetails;
