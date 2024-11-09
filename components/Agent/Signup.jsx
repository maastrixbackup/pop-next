import {
  Autocomplete,
  Box,
  CircularProgress,
  Stack,
  TextField,
} from "@mui/material";
import { React, useState, useEffect } from "react";
import dayjs from "dayjs";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { APIURL } from "../../Methods/Fetch";
import { axiosGet, axiosPost } from "../../Methods/Save";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

function Signup(props) {
  const {
    setuserDetails,
    userDetails,
    setWifiDetails,
    wifiDetails,
    setRelatedProductTab,
    setPaymentTab,
    monthlyTotal,
    setAlertType,
    setMessage,
    setOpen,
    product,
    page,
    addons,
    upfrontPayment,
    setpenLoader,
    setUpfrontPayment,
    agent_id,
    type,
    orderType,
  } = props;
  const [activeTab, setactiveTab] = useState("");
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [nodata, setNoData] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [showCheck1, setShowCheck1] = useState(false);
  const [prevOptions, setPrevOptions] = useState([]);
  const [active, setactive] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [duplicateEmail, setDuplicateEmail] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");
  const [selectedDate, setSelectedDate] = useState("Select the Date");
  const [modal, setModal] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDateObject, setSelectedDateObject] = useState({});
  const [id, setId] = useState();
  const [addressDetails, setAddressDetails] = useState(
    JSON.parse(localStorage.getItem("addressDetails"))
  );
  const [appointmentNote, setAppointmentNote] = useState("");
  const [planDetails, setplanDetails] = useState({});

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
        response.data[0].response.data[0].aAppointmentDate.split("T")[0]
      );
      setSelectedDateObject(response.data[0].response.data[0]);
    });
  }, []);
  const selectDate = (date, index) => {
    setSelectedDate(date.aAppointmentDate.split("T")[0]);
    setSelectedDateObject(date);
    setId(index);
  };
  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    if (selectedDate != "Select the Date") {
      var date = selectedDate.split("-");
      setFormattedDate(`${date[2]}-${date[1]}-${date[0]}`);
    }
  }, [selectedDate]);

  const [validInputs, setvalidInputs] = useState({
    first_name: "empty",
    last_name: "empty",
    mobile_number: "empty",
    email: "empty",
    address: "empty",
  });
  const toggle = (type) => {
    if (type == "ft") setactive(false);
    else setactive(true);
  };
  const [validatedInputs, setvalidatedInputs] = useState({
    mobile_number: "empty",
    email: "empty",
    landline: "empty",
    prev_address: "empty",
  });
  function handleClick(e) {
    setChecked(true);
    setactiveTab(e.currentTarget.id);
  }
  const initial_errors = {
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    mobile_number: "",
    dob: dayjs().add(14, "day"),
  };
  const [errors, setErrors] = useState(initial_errors);
  const [fastTrackPrice, setFastTrackPrice] = useState();
  const [value, setValue] = useState(dayjs().add(14, "day"));

  const handleInputChange = (e) => {
    const { name, value, id } = e.target;
    if (value.length <= 0) {
      setvalidatedInputs({ ...validatedInputs, [name]: false });

      setErrors({ ...errors, [name]: id + " is a Required Field" });
    } else setErrors({ ...errors, [name]: "" });

    setuserDetails({ ...userDetails, [name]: value });
  };
  const handleDateChange = (newValue) => {
    var newValue1 = `${newValue.$M + 1}-${newValue.$D}-${newValue.$y}`;
    setValue(newValue1);
  };
  const handleCheck1 = (newValue) => {
    setChecked1(!checked1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWifiDetails({ ...wifiDetails, [name]: value });
  };

  const [installation_cost, setInstallationCost] = useState(
    Number(localStorage.getItem("upfrontPayment"))
  );
  useEffect(() => {
    if (product && page != "mobile" && page != "shop" && page != "landline") {
      setpenLoader(true);
      var affiliate_name = "";

      if (localStorage.getItem("affName") != null)
        affiliate_name = localStorage.getItem("affName");
      var data = {
        ...addressDetails,
        product_id: product.id,
        type: page,
        affiliate_name: affiliate_name,
      };
      var url = APIURL() + "get-product-availability";
      axiosPost(url, data).then((response) => {
        setpenLoader(false);

        if (response.data[0].response.status == "available") {
          localStorage.setItem(
            "connection_info",
            JSON.stringify(response.data[0].response.data)
          );
          if (response.data[0].response.data.raw_data) {
            localStorage.setItem(
              "AccessLineID",
              response.data[0].response.data.raw_data.MPFAvailability
                .AvailabilityDetails.AccessLineID
            );
          }
          setplanDetails({ ...response.data[0].response.data });

          // userDetails.landline_no !== ""
          //   ? localStorage.setItem("installation_cost", 0)
          //   : localStorage.setItem(
          //       "installation_cost",
          //       res.installation_cost
          //     );
        } else {
          setMessage(
            "Sorry This product is not available for your location.Please choose from the available products."
          );
        }
      });
    }
  }, []);
  const initiateOrder = () => {
    if (userDetails.email.length < 1) {
      setAlertType("error");

      setMessage("Email is required");
      setOpen(true);
      return;
    }
    if (userDetails.dob.length < 1) {
      setAlertType("error");

      setMessage("Date of birth is required");
      setOpen(true);
      return;
    }
    if (userDetails.mobile_number.length < 1) {
      setAlertType("error");

      setMessage("Phone Number is required");
      setOpen(true);
      return;
    }
    if (userDetails.first_name.length < 1) {
      setAlertType("error");
      setMessage("First Name is required");
      setOpen(true);
      return;
    }
    if (userDetails.last_name.length < 1) {
      setAlertType("error");

      setMessage("Last Name is required");
      setOpen(true);
      return;
    }
    if (userDetails.address.length < 1) {
      setAlertType("error");
      setMessage("Address is required");
      setOpen(true);
      return;
    }
    setpenLoader(true);

    var address = userDetails.address.split(",");
    var length = address.length;
    var dobFormatted = userDetails.dob.split("-");
    var thoroughfare_name = localStorage.getItem("BuildingName");
    var thoroughfare_number = localStorage.getItem("BuildingNumber");
    localStorage.setItem(
      "appointment_slot",
      selectedDateObject.aAppointmentTimeSlot
    );
    localStorage.setItem("appointment_note", appointmentNote);
    setModal(false);

    var url = APIURL() + "order";
    var data = {
      access_line_id: planDetails.AccessLineID,
      onr_ref_no: planDetails.ont_ref_no,
      thorough_fare_number: thoroughfare_number,
      thorough_fare_name: thoroughfare_name,
      alk: addressDetails?.alk,
      district_code: addressDetails?.CSSDistrictCode,
      agent_id: agent_id,
      // user_id: "",
      name_title: userDetails.salutation,
      first_name: userDetails.first_name,
      last_name: userDetails.last_name,
      landline_no: userDetails.landline_no,
      address: userDetails.address,
      city: address[length - 2],
      country: "UK",
      postcode: address[length - 1],
      number: userDetails.mobile_number,
      dob: new Date(userDetails.dob),
      dobFormatted: `${dobFormatted[1]}-${dobFormatted[2]}-${dobFormatted[0]}`,
      new_line_required: 0,
      install_required: 1,
      // install_cost: upfrontPayment,
      email: userDetails.email,
      // upfront_total: upfrontPayment,
      monthly_total: monthlyTotal,
      // transaction_id: tranid,
      // total_amount: upfrontPayment,
      order_status: "initiated",
      // sort_code: directdebit.SortCode,
      // account_number: directdebit.AccountNumber,
      // account_holder_name: cardDetails.cardholderName,
      // is_authorised: 1,
      // related_products: addonproducts,
      addons: addons,
      order_type: orderType,
      [page]: product,
      // wifi_username: wifiDetails.name,
      // wifi_pw: wifiDetails.password,
      // direct_debit_details: direct_debit_details,
      // fasttrack_connection: fasttrack_price,
      is_consumer: type == "consumer" ? 1 : 0,
    };
    axiosPost(url, data, "header", data)
      .then((response) => {
        if (response.data[0].response.status === "success") {
          localStorage.setItem("order_id", response.data[0].response.order_id);
          // const link = document.createElement("a");
          // link.href = response.data[0].response.invoice;
          // document.body.appendChild(link);
          // link.setAttribute("target", "_blank");
          // link.click();

          setMessage("Your Order has been initiated");
          localStorage.setItem("order_initiated", true);
          setAlertType("success");
          setpenLoader(false);
          setOpen(true);
          localStorage.setItem("user_details", JSON.stringify(userDetails));
          localStorage.setItem("monthlyTotal", monthlyTotal ? monthlyTotal : 0);
          localStorage.setItem(
            "upfrontPayment",
            upfrontPayment ? upfrontPayment : 0
          );

          if (addons) localStorage.setItem("addons", JSON.stringify(addons));
          // localStorage.removeItem("_blank");
          setRelatedProductTab(false);
          setPaymentTab(true);
        } else {
          setMessage("There was some error. Please try again later.");
          setAlertType("error");
          setpenLoader(false);
          setOpen(true);
        }
      })
      .catch(function (error) {
        setpenLoader(false);
      });
  };
  useEffect(() => {
    var url = APIURL() + `fastrack-price`;

    axiosGet(url).then((response) => {
      setFastTrackPrice(response.data[0].response.data.fasttrack_price);
    });
  }, []);
  const register = () => {
    var url = APIURL() + "register";

    var data = { ...userDetails };
    return axiosPost(url, data);
  };
  const proceed = () => {
    if (!duplicateEmail) {
      register().then(() => {
        initiateOrder();
      });
    } else {
      initiateOrder();
    }
  };
  useEffect(() => {
    if (userDetails.email.length > 0) {
      var checkemailurl = APIURL() + "checkemail";
      var data = {
        email: userDetails.email,
      };
      axiosPost(checkemailurl, data)
        .then((response) => {
          setDuplicateEmail(false);
        })
        .catch(function (error) {
          setDuplicateEmail(true);
        });
    }
  }, [userDetails.email]);
  const saveinlocal = () => {
    // !active
    //   ? setUpfrontPayment(Number(upfrontPayment) + Number(fastTrackPrice))
    //   : localStorage.removeItem("fasttrack_price");
    if (type != "upgrade") {
      if (!active) {
        setUpfrontPayment(Number(upfrontPayment) + Number(fastTrackPrice));
        localStorage.setItem(
          "goLiveDate",
          JSON.stringify(dayjs().add(14, "day").format("YYYY-MM-DD"))
        );
      } else {
        localStorage.removeItem("fasttrack_price");
        localStorage.setItem("goLiveDate", JSON.stringify(selectedDate));
      }
    }

    if (wifiDetails.name && wifiDetails.password)
      localStorage.setItem("wifiDetails", JSON.stringify(wifiDetails));

    localStorage.setItem(
      "upfrontPayment",
      installation_cost ? installation_cost : 0
    );
    localStorage.setItem(
      "appointment_slot",
      selectedDateObject?.aAppointmentTimeSlot
    );
    localStorage.setItem("appointment_note", appointmentNote);
    proceed();
  };
  const openModal = () => {
    setModal(true);
  };
  const proceed1 = () => {
    localStorage.setItem(
      "appointment_slot",
      selectedDateObject.aAppointmentTimeSlot
    );
    localStorage.setItem("appointment_note", appointmentNote);
    setModal(false);
  };
  return (
    <>
      <div className="row">
        <div className="col-lg-10 mx-auto">
          <div className="property-live-in">
            <h4>What type of property do you live in ?</h4>
            <div className="property-box">
              <div className="row">
                <div className="col-xl-3 col-md-4 mb-3">
                  <div
                    className={
                      activeTab == "probox1" ? "box-pro1 active" : "box-pro1"
                    }
                    onClick={handleClick}
                    id="probox1"
                  >
                    <span> I have owned the home for over 3 years</span>
                  </div>
                </div>
                <div className="col-xl-3 col-md-4 mb-3">
                  <div
                    className={
                      activeTab == "probox2" ? "box-pro1 active" : "box-pro1"
                    }
                    onClick={handleClick}
                    id="probox2"
                  >
                    <span>I have owned for less than 3 years</span>
                  </div>
                </div>
                <div className="col-xl-3 col-md-4 mb-3">
                  <div
                    className={
                      activeTab == "probox3" ? "box-pro1 active" : "box-pro1"
                    }
                    onClick={handleClick}
                    id="probox3"
                  >
                    <span>I have been renting over 3 years</span>
                  </div>
                </div>
                <div className="col-xl-3 col-md-4 mb-3">
                  <div
                    className={
                      activeTab == "probox4" ? "box-pro1 active" : "box-pro1"
                    }
                    onClick={handleClick}
                    id="probox4"
                  >
                    <span>I have been renting less than 3 years</span>
                  </div>
                </div>
                {/* ///// Second Input Form //// */}
                <div
                  className={
                    activeTab === "probox4" || activeTab === "probox2"
                      ? "info input-show2"
                      : "info input-show2 d-none"
                  }
                >
                  <Autocomplete
                    loading
                    loadingText={
                      userDetails.prev_address.length > 0 ? (
                        loading1 === true ? (
                          <Box sx={{ display: "flex" }}>
                            <CircularProgress />
                          </Box>
                        ) : nodata == true ? (
                          "No data"
                        ) : (
                          "Just a sec.."
                        )
                      ) : (
                        "Start typing your postcode..."
                      )
                    }
                    open={open1}
                    onOpen={() => {
                      if (userDetails.prev_address.length > 0) {
                        setOpen1(true);
                      } else setPrevOptions([]);
                    }}
                    onClose={() => setOpen1(false)}
                    onChange={(event, value) => {
                      setuserDetails({
                        ...userDetails,
                        prev_address: value,
                      });
                      if (value.length > 0) {
                        setvalidInputs({
                          ...validInputs,
                          prev_address: true,
                        });
                      } else
                        setvalidInputs({
                          ...validInputs,
                          prev_address: false,
                        });
                    }}
                    sx={{}}
                    id="custom-input-demo"
                    options={prevOptions}
                    renderInput={(params) => (
                      <div ref={params.InputProps.ref}>
                        <div className="input-address active">
                          <input
                            {...params.inputProps}
                            type="text"
                            autoComplete="chrome-off"
                            className={
                              validatedInputs.prev_address === "empty"
                                ? "form-control"
                                : validatedInputs.prev_address === false
                                ? "form-control is-invalid"
                                : "form-control is-valid"
                            }
                            name="address"
                            placeholder="Enter your Postcode"
                            value={userDetails.prev_address}
                            onChange={(e) => {
                              setuserDetails({
                                ...userDetails,
                                prev_address: e.target.value,
                              });
                              setPrevOptions([]);
                            }}
                          />
                          <a
                            href="#"
                            className={showCheck1 ? "" : "d-none"}
                            onClick={() => {
                              setuserDetails({
                                ...userDetails,
                                prev_address: "",
                              });
                              setPrevOptions([]);
                              setShowCheck1(false);
                            }}
                          >
                            Change
                          </a>
                        </div>
                      </div>
                    )}
                  />
                </div>
                <div className="property-box-text">
                  <p>
                    Pssst! We can hold your quote or call you back for free,
                    just leave your details below and we’ll contact you
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="contract-left-box-sec">
            <div className="contract-title">
              <h3>Sign Up</h3>
            </div>
            <div className="contract-content-box">
              <div className="row">
                <div className="col-xl-6 col-md-6">
                  <div className="mb-3">
                    <select
                      className="form-control form-select"
                      name="salutation"
                      id="Salutation"
                      value={userDetails.salutation}
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                    >
                      <option selected value="">
                        Select.
                      </option>
                      <option value="Mr">Mr.</option>
                      <option value="Mrs">Mrs.</option>
                      <option value="Ms">Ms.</option>
                      <option value="Miss">Miss.</option>
                      <option value="Dr">Dr.</option>
                      <option value="Rev">Rev.</option>
                    </select>
                    <div className="invalid-feedback">
                      <span>{errors.first_name}</span>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-md-6">
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="First Name"
                      className={
                        userDetails.first_name == "empty"
                          ? "form-control"
                          : errors.first_name.length > 0
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      name="first_name"
                      id="First Name"
                      value={userDetails.first_name}
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                    />
                    <div className="invalid-feedback">
                      <span>{errors.first_name}</span>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-md-6">
                  <div className="mb-3">
                    <input
                      type="text"
                      className={
                        userDetails.last_name == "empty"
                          ? "form-control"
                          : errors.last_name.length > 0
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      placeholder="Last Name"
                      name="last_name"
                      id="Last Name"
                      value={userDetails.last_name}
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                    />
                    <div className="invalid-feedback">
                      <span>{errors.last_name}</span>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-md-6">
                  <div className="mb-3">
                    <input
                      type="email"
                      id="Email"
                      placeholder="Email"
                      className={
                        userDetails.email == ""
                          ? "form-control"
                          : validatedInputs.email == false
                          ? "form-control is-invalid"
                          : "form-control is-valid"
                      }
                      name="email"
                      value={userDetails.email}
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                    />
                    <div className="invalid-feedback">
                      <span>{errors.email}</span>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-md-6">
                  <div className="mb-3">
                    <input
                      type="number"
                      placeholder="Alternative Number"
                      style={{ "-webkitAppearance": "none", margin: "0" }}
                      className={
                        userDetails.mobile_number == ""
                          ? "form-control"
                          : validatedInputs.mobile_number == false
                          ? "form-control is-invalid"
                          : "form-control is-valid"
                      }
                      name="mobile_number"
                      id="Mobile Number"
                      value={userDetails.mobile_number}
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                      onWheel={(event) => event.currentTarget.blur()}
                    />
                    <div className="invalid-feedback">
                      <span>{errors.mobile_number}</span>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-md-6">
                  <div className="mb-3">
                    <input
                      type="date"
                      name="dob"
                      id="Date of Birth"
                      max="2004-01-01"
                      className="form-control"
                      label="Date of Birth"
                      value={userDetails.dob}
                      onChange={(e) => {
                        setuserDetails({
                          ...userDetails,
                          dob: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="col-xl-12 col-md-6">
                  <div className="mb-3">
                    <textarea
                      rows={4}
                      disabled
                      className={
                        userDetails.address == "empty"
                          ? "form-control"
                          : errors.address.length > 0
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      placeholder="Address"
                      id="Address"
                      name="address"
                      value={userDetails.address}
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                    />
                    <div className="invalid-feedback">
                      <span>{errors.address}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {type != "upgrade" && (
            <section>
              <div className="container">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="contract-left-box-sec">
                      <div className="installation-page-title">
                        <h6>YOUR GO LIVE DATE</h6>
                      </div>
                      <div className="contract-golive-box">
                        <div className="row">
                          <div className="col-xl-6">
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
                              <p>
                                {dayjs().add(14, "day").format("DD MMM YYYY")}
                              </p>
                              <div className="highlight-price-live">
                                <span>
                                  +£{Number(fastTrackPrice).toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6">
                            <div
                              className={
                                active == true
                                  ? "liver-box standard-show active-learn2"
                                  : "liver-box standard-show"
                              }
                              onClick={toggle}
                            >
                              <h6>STANDARD Connection</h6>
                              <span>Go Live On</span>
                              <p>{dayjs(selectedDate).format("DD MMM YYYY")}</p>
                            </div>
                          </div>
                          <div className="col-xl-12">
                            <div
                              className={
                                active == true
                                  ? "date-box-show active-learn2 d-flex"
                                  : "date-box-show"
                              }
                            >
                              <div className="col-6">
                                <h6 style={{ marginBottom: " 0px" }}>
                                  Yay, we can get you live by
                                  {selectedDate == "Select the Date"
                                    ? ""
                                    : formattedDate}
                                </h6>
                                <p>
                                  Our engineers will need to connect your
                                  property to our network. We'll arrange for
                                  them to visit (and we won't charge you for a
                                  standard connection). Make sure you're home
                                  when they say they'll visit, otherwise it can
                                  take up to 14 days to reschedule.
                                </p>
                              </div>
                              <div className="col-6">
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
                      <div className="contract-golive-box">
                        <div className="row">
                          <div className="col-xl-12">
                            <div className="installation-page-title">
                              <h6>PERSONALISE YOUR ROUTER</h6>
                            </div>
                            <div className="mb-3 check-box">
                              <input
                                id="Option1"
                                type="checkbox"
                                checked={checked1}
                                onChange={handleCheck1}
                              />
                              <label className="checkbox" htmlFor="Option1">
                                <b>
                                  I want to personalize my router's WIFI name
                                  and Password
                                </b>
                              </label>
                            </div>
                          </div>
                          {checked1 && (
                            <div className="row">
                              <div className="col-xl-12">
                                <div className="mb-3">
                                  <input
                                    type="text"
                                    className={
                                      checked1
                                        ? "form-control"
                                        : "form-control d-none"
                                    }
                                    placeholder="Wi-Fi name"
                                    value={wifiDetails.name}
                                    name="name"
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                              <div className="col-xl-12">
                                <div
                                  className="mb-3"
                                  style={{ position: "relative" }}
                                >
                                  <input
                                    type={showPassword ? "text" : "password"}
                                    className={
                                      checked1
                                        ? "form-control"
                                        : "form-control d-none"
                                    }
                                    name="password"
                                    placeholder="Wi-Fi password"
                                    value={wifiDetails.password}
                                    onChange={handleChange}
                                  />
                                  {showPassword ? (
                                    <VisibilityOffIcon
                                      onClick={(e) => setShowPassword(false)}
                                      className={checked1 ? "" : "d-none"}
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
                                      className={checked1 ? "" : "d-none"}
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
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
          <div className="col-xl-12">
            <a onClick={saveinlocal} className="btn-chekout mb-2">
              Continue to Payment Details
            </a>
          </div>
        </div>
      </div>
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
                      proceed1();
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

export default Signup;
