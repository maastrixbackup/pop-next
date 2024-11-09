import { React, useState, useEffect } from "react";
import InnerPageHeader from "../InnerPageHeader";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import YourOrders from "../ContractInstallation/YourOrders";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { APIURL } from "../../Methods/Fetch";
import { axiosGet, axiosPost } from "../../Methods/Save";
import { Alert, Box, CircularProgress, Snackbar, Stack } from "@mui/material";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { useRouter } from "next/router";

function GoLive() {

  const navigate = useRouter();
  if (localStorage.getItem("page") !== null) {
    var page = localStorage.getItem("page");
  } else var page = "broadband";
  if (localStorage.getItem("Product") !== null) {
    var product = JSON.parse(localStorage.getItem("Product"));
  } else var product = "";
  if (
    page == "broadband" ||
    (page == "topdeal" && localStorage.getItem("chk_add_details") !== null)
  ) {
    var addressDetails = JSON.parse(localStorage.getItem("chk_add_details"));
  } else
    var addressDetails = {
      CSSDistrictCode: "",
      alk: "",
      category: 0,
      postcode: "",
    };

  const [initialLoad, setInitialLoad] = useState(true);
  const [active, setactive] = useState(true);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [vertical, setvertical] = useState("top");
  const [horizontal, sethori] = useState("right");
  const [modal, setModal] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");
  const [selectedDate, setSelectedDate] = useState("Select the Date");
  const [selectedDateObject, setSelectedDateObject] = useState({});
  const [id, setId] = useState();
  const [availableSlots, setAvailableSlots] = useState([]);
  const [fastTrackPrice, setFastTrackPrice] = useState();
  const [appointmentNote, setAppointmentNote] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const [wifiDetails, setWifiDetails] = useState({
    name: "",
    password: "",
  });
  // useEffect(() => {
  //   if (localStorage.getItem("fasttrack_connection") != null) setactive(true);
  // }, []);
  useEffect(() => {
    if (selectedDate != "Select the Date") {
      var date = selectedDate.split("-");
      setFormattedDate(`${date[2]}-${date[1]}-${date[0]}`);
    }
  }, [selectedDate]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setWifiDetails({ ...wifiDetails, [name]: value });
  };
  const toggle = (type) => {
    if (type == "ft") setactive(false);
    else setactive(true);
  };
  const [value, setValue] = useState(dayjs().add(14, "day"));
  const [valueFormatted, setValueFormatted] = useState(dayjs().add(14, "day"));

  const handleCheck = (newValue) => {
    setChecked(!checked);
  };
  const handleDateChange = (newValue) => {
    var newValue1 = `${newValue.$M + 1}-${newValue.$D}-${newValue.$y}`;
    setValue(newValue);
    setValueFormatted(newValue1);
  };
  const saveinlocal = () => {
    console.log("golive");
    var url = APIURL() + "store-order-step";
    var data = {
      order_id: localStorage.getItem("order_id"),
      order_step:'golive',
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
    
    // !active
    //   ? localStorage.setItem("fasttrack_price", fastTrackPrice)
    //   : localStorage.removeItem("fasttrack_price");
    if (!active) {
      localStorage.setItem("fasttrack_price", fastTrackPrice);
      localStorage.setItem("fasttrack_connection", true);
    } else {
      localStorage.removeItem("fasttrack_price");
      localStorage.removeItem("fasttrack_connection");
    }
    if (
      (selectedDate == "Select the Date" && page == "broadband") ||
      page == "topdeal"
    ) {
      localStorage.setItem(
        "goLiveDate",
        JSON.stringify(valueFormatted.format("DD MMM YYYY"))
      );
    } else {
      if (page == "broadband" || page == "topdeal")
        localStorage.setItem("goLiveDate", JSON.stringify(selectedDate));
      else localStorage.setItem("goLiveDate", JSON.stringify(value));
    }
    if (selectedDate == "Select the Date" && active) {
      setMessage("Please select an appointment date");
      setOpen(true);
      return;
    }
    if (wifiDetails.name && wifiDetails.password && checked)
      localStorage.setItem("wifiDetails", JSON.stringify(wifiDetails));
    localStorage.setItem("upfrontPayment", installation_cost);
    localStorage.setItem("paymentPage", "can_access");

    navigate.push("/marketing");
  };
  const [installation_cost, setInstallationCost] = useState(
    Number(localStorage.getItem("upfrontPayment"))
  );
  useEffect(() => {
    if (localStorage.getItem("fasttrack_price") != null) {
      var ft_price = localStorage.getItem("fasttrack_price");
      setInstallationCost(installation_cost - Number(ft_price));
    }
  }, []);
  useEffect(() => {
    if (fastTrackPrice) {
      if (active) {
        setValue(dayjs().add(30, "day"));
        if (!initialLoad)
          setInstallationCost(installation_cost - Number(fastTrackPrice));
        else setInitialLoad(false);
      } else {
        setValue(dayjs().add(14, "day"));
        setInstallationCost(installation_cost + Number(fastTrackPrice));
      }
    }
  }, [active, fastTrackPrice]);
  useEffect(() => {
    var url = APIURL() + `fastrack-price`;

    axiosGet(url).then((response) => {
      setFastTrackPrice(response.data[0].response.data.fasttrack_price);
    });
  }, []);
  useEffect(() => {
    var url = APIURL() + `get-available-appointments`;
    var data = {
      district_code: addressDetails.CSSDistrictCode,
      alk: addressDetails.alk,
      appointment_date: dayjs().add(14, "day").format("YYYY-MM-DD"),
      service_type: product.type,
    };

    axiosPost(url, data).then((response) => {
      setAvailableSlots(response.data[0].response.data);
      setSelectedDate(
        response.data[0].response.default_date.aAppointmentDate.split("T")[0]
      );
      setSelectedDateObject(response.data[0].response.default_date);
    });
  }, []);
  var bussiness_type = localStorage.getItem("bussiness_type");
  const openModal = () => {
    setModal(true);
  };  
  const proceed = () => {
    localStorage.setItem(
      "appointment_slot",
      selectedDateObject.aAppointmentTimeSlot
    );
    localStorage.setItem("appointment_note", appointmentNote);
    setModal(false);
  };
  const selectDate = (date, index) => {
    setSelectedDate(date.aAppointmentDate.split("T")[0]);
    setSelectedDateObject(date);
    setId(index);
  };
  const [signedIn, SetSignedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("user_id") != null) {
      SetSignedIn(true);
    }
  }, []);
  const toggleModal = () => {
    setModal(!modal);
  };
  return (
    <>
      <InnerPageHeader
        activeTab="goLive"
        bussiness_type={bussiness_type}
        signedIn={signedIn}
        SetSignedIn={SetSignedIn}
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
                  <h6>YOUR GO LIVE DATE</h6>
                </div>
                <div className="contract-golive-box">
                  <div className="row">
                    <div className="col-xl-6 mb-3">
                      <div
                        className={
                          active == false
                            ? "liver-box standard-show active-learn2"
                            : "liver-box standard-show"
                        }
                        onClick={(e) => toggle("ft")}
                      >
                        <h6>Fast Track</h6>
                        <span>Connection On</span>
                        <p>{dayjs().add(14, "day").format("DD MMM YYYY")}</p>
                        <div className="highlight-price-live">
                          <span>+£{Number(fastTrackPrice).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div
                        className={
                          active == true
                            ? "liver-box standard-show golive2 active-learn2"
                            : "liver-box standard-show golive2"
                        }
                        onClick={toggle}
                      >
                        <h6>STANDARD Connection</h6>
                        {selectedDate == "Select the Date" ? (
                          ""
                        ) : (
                          <div>
                            <span>Go Live On</span>
                            <p>{dayjs(selectedDate).format("DD MMM YYYY")}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-xl-12">
                      <div
                        className={
                          active == true
                            ? "date-box-show active-learn2"
                            : "date-box-show"
                        }
                      >
                        <div className="row">
                          <div className="col-lg-6">
                            <h6
                              className={
                                selectedDate != "Select the Date"
                                  ? ""
                                  : "d-none"
                              }
                              style={{ marginBottom: " 0px" }}
                            >
                              Yay, we can get you live by{" "}
                              {selectedDate == "Select the Date"
                                ? ""
                                : formattedDate}
                            </h6>
                            <p>
                              Our engineers will need to connect your property
                              to our network. We'll arrange for them to visit
                              (and we won't charge you for a standard
                              connection). Make sure you're home when they say
                              they'll visit, otherwise it can take up to 14 days
                              to reschedule.
                            </p>
                          </div>
                          <div className="col-lg-6">
                            <Box
                              component="form"
                              sx={{
                                "& > :not(style)": { m: 1, width: "100%" },
                              }}
                              noValidate
                              autoComplete="off"
                            >
                              {!page ||
                              page === "broadband" ||
                              page === "topdeal" ? (
                                <TextField
                                  id="outlined-basic"
                                  label="Appointment date"
                                  variant="outlined"
                                  value={formattedDate}
                                  onClick={openModal}
                                />
                              ) : (
                                ""
                              )}
                              {!page ||
                              page === "broadband" ||
                              page === "topdeal" ? (
                                ""
                              ) : (
                                <LocalizationProvider
                                  dateAdapter={AdapterDayjs}
                                >
                                  <Stack spacing={3}>
                                    <MobileDatePicker
                                      name="installation_date"
                                      className="form-control"
                                      label="Select Your Connection Date"
                                      inputFormat="DD/MM/YYYY"
                                      value={value}
                                      minDate={value}
                                      onChange={(newValue) => {
                                        handleDateChange(newValue);
                                      }}
                                      renderInput={(params) => (
                                        <TextField {...params} />
                                      )}
                                    />
                                  </Stack>
                                </LocalizationProvider>
                              )}
                              <TextField
                                id="outlined-basic"
                                label="Appointment Note"
                                variant="outlined"
                                value={appointmentNote}
                                onChange={(e) =>
                                  setAppointmentNote(e.target.value)
                                }
                              />
                            </Box>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {page == "broadband" && (
                  <div className="contract-golive-box">
                    <div className="row">
                      <div className="col-xl-12">
                        <div className="installation-page-title">
                          <h6>PERSONALISE YOUR ROUTER</h6>
                          <p>
                            You can get a personalised WiFi name and password
                            for your router.Please click on the checkbox below
                            to personalise your router login.
                          </p>
                        </div>
                        <div className="mb-3 check-box">
                          <input
                            id="Option1"
                            type="checkbox"
                            checked={checked}
                            onChange={handleCheck}
                          />
                          <label className="checkbox" htmlFor="Option1">
                            <b>
                              I want to personalize my router's WIFI name and
                              Password
                            </b>
                          </label>
                        </div>
                      </div>

                      <div className="col-xl-12">
                        <div className="mb-3">
                          <input
                            type="text"
                            className={
                              checked ? "form-control" : "form-control d-none"
                            }
                            placeholder="Wi-Fi name"
                            value={wifiDetails.name}
                            name="name"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-xl-12">
                        <div className="mb-3" style={{ position: "relative" }}>
                          <input
                            type={showPassword ? "text" : "password"}
                            className={
                              checked ? "form-control" : "form-control d-none"
                            }
                            name="password"
                            placeholder="Wi-Fi password"
                            value={wifiDetails.password}
                            onChange={handleChange}
                          />
                          {showPassword ? (
                            <VisibilityOffIcon
                              onClick={(e) => setShowPassword(false)}
                              className={checked ? "" : "d-none"}
                              style={{
                                position: "absolute",
                                top: "13px",
                                right: "13px",
                                cursor: "pointer",
                              }}
                            />
                          ) : (
                            <VisibilityIcon
                              onClick={(e) => setShowPassword(true)}
                              className={checked ? "" : "d-none"}
                              style={{
                                position: "absolute",
                                top: "13px",
                                right: "13px",
                                cursor: "pointer",
                              }}
                            />
                          )}
                        </div>
                      </div>

                      <div className="col-xl-12">
                        <a onClick={saveinlocal} className="btn-chekout mb-2">
                          Continue to Marketing
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {page == "broadband" ? (
                ""
              ) : (
                <div>
                  {" "}
                  <div className="col-xl-12">
                    <a onClick={saveinlocal} className="btn-chekout mb-2">
                      Continue to Marketing
                    </a>
                  </div>
                </div>
              )}
            </div>
            <YourOrders
              data="golive"
              upfrontPayment={installation_cost}
              shop={page != "shop" ? false : true}
              active={active ? "show" : "hide"}
              fasttrack_price={fastTrackPrice}
            />
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
      <Modal
        className="modal-dialog slot-box"
        isOpen={modal}
        toggle={toggleModal}
        backdrop="static"
      >
        <ModalHeader toggle={toggleModal}>
          These are the available time slots.
        </ModalHeader>
        <ModalBody>
          <div className="standard-product">
            <ul>
              {availableSlots && availableSlots.length > 0 ? (
                availableSlots.map((res, index) => (
                  <li
                    key={index}
                    onClick={(e) => {
                      selectDate(res, index);
                      proceed();
                    }}
                    className={id == index ? "active" : ""}
                  >
                    <span>
                      {res.aAppointmentTimeSlot == "AM"
                        ? `${res.aAppointmentTimeSlot} – 8am to 1pm`
                        : `${res.aAppointmentTimeSlot} – 1pm to 6pm`}
                    </span>
                    <span>{`${
                      res.aAppointmentDate.split("T")[0].split("-")[2]
                    }-${res.aAppointmentDate.split("T")[0].split("-")[1]}-${
                      res.aAppointmentDate.split("T")[0].split("-")[0]
                    }`}</span>
                  </li>
                ))
              ) : (
                <Box
                  sx={{
                    position: "relative",
                    display: "block",
                    textAlign: "center",
                  }}
                >
                  <CircularProgress />
                </Box>
              )}
            </ul>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

export default GoLive;
