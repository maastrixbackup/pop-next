import { React, useState, useEffect } from "react";
import { axiosPost, verifyEmail, verifyPhone } from "../../Methods/Save";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
// import { APIURL } from "../../../Methods/Fetch";
// import LoadingPage from "../../../components/ZipcodeAddress/LoadingPage";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import dayjs from "dayjs";
import TrustPilot from "../TrustPilot";
import InnerPageHeader from "../InnerPageHeader";
import { APIURL } from "../../Methods/Fetch";
import LoadingPage from "../ZipcodeAddress/LoadingPage";
import { useRouter } from "next/router";

function ZipcodeAddress() {
  const navigate = useRouter();
  const [message, setMessage] = useState("");
  const [second, setSecond] = useState(false);
  const [page, setPage] = useState();
  const [openpopup, setOpenPopup] = useState(false);
  const [openSpinner, setOpenSpinner] = useState(false);

  const [vertical, setvertical] = useState("top");
  const [horizontal, sethori] = useState("right");
  const [duplicateEmail, setDuplicateEmail] = useState(false);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [openLoader, setOpenLoader] = useState(true);
  const [openLoader1, setOpenLoader1] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  const [showCheck1, setShowCheck1] = useState(false);
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [showLandLine, setShowLandLine] = useState(false);
  const [nodata, setNoData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);

  const [options, setOptions] = useState([]);
  const [addresses, setAddresses] = useState([]);

  const [validInputs, setvalidInputs] = useState({
    first_name: "empty",
    last_name: "empty",
    mobile_number: "empty",
    email: "empty",
    address: "empty",
  });
  const [validatedInputs, setvalidatedInputs] = useState({
    mobile_number: "empty",
    email: "empty",
    landline: "empty",
    prev_address: "empty",
    address: "empty",
  });
  const [activeTab1, setactiveTab1] = useState("");
  const [activeTab, setactiveTab] = useState("");
  const [product, setProduct] = useState();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const proceed = () => {
    toggle();
    // Proceed();

    navigate.push("/contractinstallation");
  };
  var newValue1 = `${dayjs().subtract(19, "year").$M + 1}-${
    dayjs().subtract(19, "year").$D
  }-${dayjs().subtract(19, "year").$y}`;
  const [userDetails, setuserDetails] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    email: "",
    address: "",
    prev_address: "",
    dob: `${dayjs().subtract(19, "year").$M + 1}-${
      dayjs().subtract(19, "year").$D
    }-${dayjs().subtract(19, "year").$y}`,
    dobFormatted: newValue1,
    landline_no: "",
    referral_code: "",
    property_type: "",
    salutation: "",
    simwood_areacode: "",
    company_name: "",
    pac: "",
  });
  const [signedIn, SetSignedIn] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const saveinLocal = (e) => {
    if (
      userDetails.mobile_number.length > 0 &&
      validatedInputs.mobile_number == false
    ) {
      setvalidatedInputs({ ...validatedInputs, mobile_number: false });
      setMessage("Please select a Valid Mobile Number.");
      setOpenPopup(true);
      e.preventDefault();
    }
    //  else if (
    //   (activeTab == "probox2" || activeTab == "probox4") &&
    //   (validInputs.prev_address == false || userDetails.prev_address.length < 8)
    // )
    // {
    //   setMessage("Please select your Previous address.");
    //   setOpenPopup(true);
    //   e.preventDefault();
    //   setvalidatedInputs({ ...validatedInputs, prev_address: false });
    // }
    // else if (
    //   activeTab1 == "show1" &&
    //   (validatedInputs.landline_no == false ||
    //     validatedInputs.landline_no == "empty")
    // )
    // {
    //   e.preventDefault();
    //   setvalidatedInputs({ ...validatedInputs, landline_no: false });
    // }
    // else if (duplicateEmail == true && signedIn == false) {
    //   // setvalidatedInputs({ ...validatedInputs, email: false });
    //   setMessage("Account already exists, please login to continue.");
    //   setOpenPopup(true);
    //   e.preventDefault();
    // }
    else if (userDetails.email.length > 0 && validatedInputs.email == false) {
      setvalidatedInputs({ ...validatedInputs, email: false });
      setMessage("Please select a Valid E-mail Address.");
      setOpenPopup(true);
      e.preventDefault();
    } else if (
      validInputs.address == false ||
      userDetails.address == "" ||
      userDetails.address.length < 8
    ) {
      setMessage("Please select a proper address.");
      setOpenPopup(true);

      setvalidInputs({ ...validInputs, address: false });
      e.preventDefault();
    } else if (
      userDetails.mobile_number &&
      userDetails.mobile_number.length > 0 &&
      userDetails.mobile_number.substring(0, 1) != "0"
    ) {
      setMessage("Mobile Number must start with 0.");
      setOpenPopup(true);
      e.preventDefault();
    } else if (
      userDetails.mobile_number &&
      userDetails.mobile_number.length > 0 &&
      userDetails.mobile_number.length <= 10
    ) {
      setMessage(
        "Please enter a valid 10 digit mobile number or remove the entry."
      );
      setOpenPopup(true);
      e.preventDefault();
    } else if (
      userDetails.landline_no &&
      userDetails.landline_no.length > 0 &&
      userDetails.landline_no.length <= 10
    ) {
      setMessage(
        "Please enter a valid 10 digit landline number or remove the entry."
      );
      setOpenPopup(true);
      e.preventDefault();
    } else if (
      userDetails.landline_no.substring(0, 2) &&
      userDetails.landline_no.substring(0, 2) != "01" &&
      userDetails.landline_no.substring(0, 2) != "02" &&
      userDetails.landline_no.substring(0, 2) != "07"
    ) {
      setMessage("Landline Number must start with '01' or '02' or '07'");
      setOpenPopup(true);
      e.preventDefault();
    }
    // else if (activeTab1 === "show1" && userDetails.landline_no.length > 5) {
    //   localStorage.setItem("user_details", JSON.stringify(userDetails));
    //   var navurl = "";
    //   if (page) navurl = "/contractinstallation";
    //   else navurl = "/productpricespeed";
    //   if ((!page || page == "broadband") && product) {
    //     setOpenLoader(true);
    //     var data = {
    //       ...JSON.parse(localStorage.getItem("chk_add_details")),
    //       product_id: product.id,
    //     };
    //     var url = APIURL() + "get-product-availability";
    //     axiosPost(url, data).then((response) => {
    //       setOpenLoader(false);
    //       if (response.data[0].response.status == "available") {
    //         localStorage.setItem(
    //           "connection_info",
    //           JSON.stringify(response.data[0].response.data)
    //         );
    //         toggle();
    //         userDetails.landline_no !== ""
    //           ? localStorage.setItem("installation_cost", 0)
    //           : localStorage.setItem(
    //               "installation_cost",
    //               product.installation_cost
    //             );
    //       } else {
    //         // setOpenMessage(true);
    //       }
    //     });
    //   } else navigate(navurl);
    // }
    else {
      localStorage.setItem("user_details", JSON.stringify(userDetails));
      Proceed();
      // setOpenDialog(true);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("user_id") != null) {
      SetSignedIn(true);
    }
  }, []);
  useEffect(() => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (
      userDetails.email.length > 0 &&
      regex.test(userDetails.email) === true
    ) {
      var checkemailurl = APIURL() + "checkemail";
      var data = {
        email: userDetails.email,
      };
      axiosPost(checkemailurl, data)
        .then((response) => {
          setDuplicateEmail(false);
          localStorage.removeItem("duplicate-email");
        })
        .catch(function (error) {
          setDuplicateEmail(true);
          localStorage.setItem("duplicate-email", true);
        });
    }
  }, [userDetails.email]);
  const Proceed = () => {
    var affiliate_name = "";
    if (localStorage.getItem("affName") != null)
      affiliate_name = localStorage.getItem("affName");
    setOpenDialog(false);
    if (product) {
      setOpenLoader1(true);

      var data = {
        ...JSON.parse(localStorage.getItem("chk_add_details")),
        product_id: product.id,
        type: page,
        affiliate_name: affiliate_name,
      };
      var navurl = "";
      if (page) navurl = "/contractinstallation";
      else navurl = "/productpricespeed";
      if (page != "mobile" && page != "shop" && page != "landline") {
        var url = APIURL() + "get-product-availability";
        axiosPost(url, data).then((response) => {
          setOpenLoader1(false);
          if (response.data[0].response.status == "available") {
            setProduct(response.data[0].response.data);
            localStorage.setItem(
              "Product",
              JSON.stringify(response.data[0].response.data)
            );
            localStorage.setItem(
              "AccessLineID",
              response.data[0].response.data.AccessLineID
            );
            navigate.push("/contractinstallation");
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
            setOpenPopup(true);
            setTimeout(() => {
              navigate.push("/productpricespeed");
            }, 2000);
            // setOpenMessage(true);
          }
        });
      } else navigate.push(navurl);
    } else {
      localStorage.setItem("user_details", JSON.stringify(userDetails));
      var url = "";
      if (page) url = "/productpricespeed";
      else url = "/productpricespeed";
      navigate.push(url);
    }
    // navigate("/productpricespeed");
  };

  useEffect(() => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (userDetails.email.length > 0) {
      if (regex.test(userDetails.email) === true) {
        setvalidInputs({ ...validInputs, email: true });

        // verifyEmail(userDetails.email).then((response) => {
        //   if (response.data.Items[0].ResponseCode == "Valid") {
        //     setvalidatedInputs({ ...validatedInputs, email: true });
        //     setvalidInputs({ ...validInputs, email: true });
        //   } else setvalidatedInputs({ ...validatedInputs, email: false });
        // });
      }
    }
  }, [userDetails.email]);
  // useEffect(() => {
  //   if (userDetails.landline_no.length > 0) {
  //     verifyPhone(userDetails.landline_no).then((response) => {
  //       if (response.data.Items[0].IsValid == "Yes") {
  //         setvalidatedInputs({ ...validatedInputs, landline_no: true });
  //         setvalidInputs({ ...validInputs, landline_no: true });
  //         setuserDetails({
  //           ...userDetails,
  //           landline_no: userDetails.landline_no,
  //         });
  //       } else setvalidatedInputs({ ...validatedInputs, landline_no: false });
  //     });
  //   }
  // }, [userDetails.landline_no]);
  // useEffect(() => {
  //   if (userDetails.mobile_number.length >= 10) {
  //     verifyPhone(userDetails.mobile_number).then((response) => {
  //       if (response.data.Items[0].IsValid == "Yes") {
  //         setvalidatedInputs({ ...validatedInputs, mobile_number: true });
  //         setvalidInputs({ ...validInputs, mobile_number: true });
  //       } else setvalidatedInputs({ ...validatedInputs, mobile_number: false });
  //     });
  //   }
  // }, [userDetails.mobile_number]);
  const dontProceed = () => {
    setOpenDialog(false);
  };
  function handleClick(e) {
    setChecked(true);
    setactiveTab(e.currentTarget.id);
  }
  function handleClick1(e) {
    setChecked1(true);
    setactiveTab1(e.currentTarget.id);
  }
  const changeLandlineNumber = (e) => {
    const { name, value } = e.target;
    if (value.length == 2) {
      if (page != "mobile") {
        if (
          value.toString() != "01" &&
          value.toString() != "02" &&
          value.toString() != "07"
        ) {
          setMessage("Landline Number must start with '01' or '02' or '07'");
          setOpenPopup(true);
          return;
        } else {
          setuserDetails({ ...userDetails, [name]: value });
          if (value.length > 0) {
            setvalidInputs({ ...validInputs, [name]: true });
          } else setvalidInputs({ ...validInputs, [name]: false });
        }
      } else {
        if (
          value.toString() != "01" &&
          value.toString() != "02" &&
          value.toString() != "07"
        ) {
          setMessage("Mobile Number must start with '01' or '02' or '07'");
          setOpenPopup(true);
          return;
        } else {
          setuserDetails({ ...userDetails, [name]: value });
          if (value.length > 0) {
            setvalidInputs({ ...validInputs, [name]: true });
          } else setvalidInputs({ ...validInputs, [name]: false });
        }
      }
    } else {
      setuserDetails({ ...userDetails, [name]: value });
      if (value.length > 0) {
        setvalidInputs({ ...validInputs, [name]: true });
      } else setvalidInputs({ ...validInputs, [name]: false });
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "mobile_number") {
      if (value.length == 1 && value != 0) {
        setMessage("The mobile number must start with 0");
        setOpenPopup(true);
        return;
      }
    }
    if (name == "first_name" || name == "last_name") {
      const result = value.replace(/[^a-z ]/gi, "");
      setuserDetails({ ...userDetails, [name]: result });
    } else setuserDetails({ ...userDetails, [name]: value });
    if (value.length > 0) {
      setvalidInputs({ ...validInputs, [name]: true });
    } else setvalidInputs({ ...validInputs, [name]: false });
  };
  useEffect(() => {
    if (userDetails.address === "My address is not Listed") {
      navigate.push("/not-available");
    }
    if (userDetails.address.length > 10) {
      var sb = userDetails.address.slice(
        userDetails.address.indexOf("'") + 1,
        userDetails.address.lastIndexOf("'")
      );
      var bno = userDetails.address.slice(
        userDetails.address.indexOf("`") + 1,
        userDetails.address.lastIndexOf("`")
      );
      setShowLandLine(true);
      setShowCheck(true);
    }
    if (userDetails.address.length === 0) {
      setOptions([]);
      setOpen(false);
    }
    // var data = {
    //   Key: "XR84-ED47-AN72-BF81",
    //   Text: userDetails.address,
    //   Container: "GB|RM|ENG|3BS-E3",
    //   Countries: "GBR",
    //   Limit: 10,
    //   Origin: "",
    //   Language: "en-gb",
    // };

    // var url =
    //   "https://api.addressy.com/Capture/Interactive/Find/v1.10/json3.ws";
    // axiosPost(url, data).then((response) => {
    //   console.log("response", response);
    //   if (response.data.Items.length > 0) {
    //     if (response.data.Items[0].Type == "Postcode") {
    //       console.log("valid");
    //     } else {
    //       console.log("invalid");
    //     }
    //   } else console.log("invalid");
    // });
    const delayDebounceFn = setTimeout(() => {
      const headers = {
        Accept: "application/json",
        Authorization: "Bearer POPTELECOM@987612",
      };

      var data = {
        postcode: userDetails.address,
      };
      var url = APIURL() + "get-address-details";
      if (userDetails.address.length > 0 && userDetails.address.length < 9) {
        setOptions([]);
        setOpen(false);

        setOpen(true);
        setLoading(true);
        axiosPost(url, data, headers)
          .then((response) => {
            setOpenLoader(false);
            if (response.status == 200) {
              if (response.data[0].response.status == "success") {
                response.data[0].response.data.map((data) => {
                  if (typeof data.Address.SubBuilding === "undefined")
                    var subbuilding = "";
                  else subbuilding = data.Address.SubBuilding + ",";
                  if (typeof data.Address.BuildingName === "undefined")
                    var b_name = "";
                  else b_name = data.Address.BuildingName + ",";

                  if (typeof data.Address.BuildingNumber === "undefined")
                    var b_no = "";
                  else b_no = data.Address.BuildingNumber + ",";
                  if (typeof data.Address.Locality === "undefined")
                    var b_locality = "";
                  else b_locality = data.Address.Locality + ",";
                  if (typeof data.Address.Street === "undefined")
                    var b_Street = "";
                  else b_Street = data.Address.Street + ",";
                  setOptions((prevArray) => [
                    ...prevArray,
                    `${subbuilding} ${b_no} ${b_name} ${b_Street} ${b_locality} ${data.Address.PostTown} , ${data.Address.PostCode}`,
                  ]);
                  setAddresses((prevArray) => [
                    ...prevArray,
                    {
                      SubBuilding: subbuilding,
                      BuildingNumber: b_no,
                      BuildingName: b_name,
                      Locality: b_locality,
                      Street: b_Street,
                      PostTown: data.Address.PostTown,
                      PostCode: data.Address.PostCode,
                      CSSDistrictCode: data.Address.CSSDistrictCode,
                      ALK: data.Address.ALK,
                      uprn: data.UPRN,
                    },
                  ]);

                  setLoading(false);
                  setNoData(false);
                });
              } else {
                setOptions([]);
                setLoading(false);
                setNoData(true);
              }
            }
          })
          .then(() => {
            setOptions((prevArray) => [
              ...prevArray,
              `My address is not Listed`,
            ]);
          });
      }
    }, 1200);

    return () => clearTimeout(delayDebounceFn);
  }, [userDetails.address]);
  const onAddressChange = (e) => {
    setuserDetails({
      ...userDetails,
      address: e.target.value,
    });
    setOptions([]);
  };
  useEffect(() => {
    if (
      userDetails.address.length > 20 &&
      userDetails.address != "My address is not Listed"
    ) {
      var filtered = addresses.filter(
        (data) =>
          `${data.SubBuilding} ${data.BuildingNumber} ${data.BuildingName} ${data.Street} ${data.Locality} ${data.PostTown} , ${data.PostCode}` ===
          userDetails.address
      );
      if (filtered.length > 0) {
        filtered && filtered.length > 0 && filtered[0].uprn
          ? localStorage.setItem("uprn", filtered[0].uprn)
          : localStorage.setItem("uprn", "");
        var locality_storage = filtered[0].Locality;
        var split_locality = locality_storage.split(",").join("");

        var thorough_fare_name =
          filtered[0].BuildingName && filtered[0].BuildingName != ""
            ? filtered[0].BuildingName
            : filtered[0].SubBuilding;
        var split_thorough_fare_name = thorough_fare_name.split(",").join("");
        var thorough_fare_number = filtered[0].BuildingNumber;
        var split_thorough_fare_number = thorough_fare_number
          .split(",")
          .join("");
        localStorage.setItem("BuildingName", split_thorough_fare_name);
        localStorage.setItem("BuildingNumber", split_thorough_fare_number);

        localStorage.setItem("Locality", split_locality);
        localStorage.setItem("PostCode", filtered[0].PostCode);
        localStorage.setItem("PostTown", filtered[0].PostTown);

        var data = {
          building_name: filtered[0].BuildingName,
          sub_building: filtered[0].SubBuilding,
          building_no: filtered[0].BuildingNumber,
          locality: filtered[0].Locality,
          postcode: filtered[0].PostCode,
          Street: filtered[0].Street,
        };
      }

      if (data) localStorage.setItem("address_details", JSON.stringify(data));
      if (page != "mobile" && page != "shop" && page != "landline") {
        setOpenSpinner(true);
        var url = APIURL() + "check-address";
        axiosPost(url, data).then((response) => {
          setOpenSpinner(false);
          var cat_id = 0;
          if (localStorage.getItem("category_id") != null) {
            cat_id = localStorage.getItem("category_id");
          }
          if (response.data[0].response.data[0].Address != null) {
            var tosave = {
              postcode: response.data[0].response.data[0].Address.PostCode,
              CSSDistrictCode:
                response.data[0].response.data[0].Address.CSSDistrictCode,
              alk: response.data[0].response.data[0].Address.ALK,
              category: cat_id,
            };
          } else {
            var tosave = {
              postcode: response.data[0].response.data[0].PostCode,
              CSSDistrictCode:
                response.data[0].response.data[0].CSSDistrictCode,
              alk: response.data[0].response.data[0].ALK,
              category: cat_id,
            };
          }
          localStorage.setItem("chk_add_details", JSON.stringify(tosave));
          localStorage.removeItem("category_id");
        });
      }
    }
  }, [userDetails.address]);

  useEffect(() => {
    if (localStorage.getItem("user_details") != null) {
      setuserDetails({
        ...JSON.parse(localStorage.getItem("user_details")),
        address: "",
      });
      if (localStorage.getItem("PostCode") != null) {
        setuserDetails({
          ...userDetails,
          ...JSON.parse(localStorage.getItem("user_details")),
          address: localStorage.getItem("PostCode"),
        });
      } else {
        setuserDetails({
          ...userDetails,
          ...JSON.parse(localStorage.getItem("user_details")),
          address: "",
        });
      }
    } else if (localStorage.getItem("PostCode") != null) {
      setuserDetails({
        ...userDetails,
        address: localStorage.getItem("PostCode"),
      });
    }
    if (localStorage.getItem("Product") != null) {
      setProduct(JSON.parse(localStorage.getItem("Product")));
    }
    if (localStorage.getItem("page") != null) {
      setPage(localStorage.getItem("page"));
    } else setOpenLoader(false);
  }, []);
  var bussiness_type = localStorage.getItem("bussiness_type");

  if (localStorage.getItem("PostCode") != null && openLoader) {
    return <LoadingPage />;
  }
  return (
    <>
      <InnerPageHeader
        activeTab="address"
        bussiness_type={bussiness_type}
        signedIn={signedIn}
        SetSignedIn={SetSignedIn}
        step={0}
        page={page}
      />
      <div className={bussiness_type == "true" ? "buisness-mobile2" : ""}>
        <div
          className={
            bussiness_type == "true" ? "container buisness-mobile" : "container"
          }
        ></div>

        <section className="address-form-sec">
          <div className="container">
            <div className="row">
              <div className="col-xl-8 mx-auto">
                <div className="success-address">
                  <h4>Choose your address</h4>
                  <Autocomplete
                    loading
                    loadingText={
                      userDetails.address.length > 0 ? (
                        loading === true ? (
                          <Box
                            sx={{
                              position: "relative",
                              display: "block",
                              textAlign: "center",
                            }}
                          >
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
                    open={open}
                    onOpen={() => {
                      if (userDetails.address.length > 0) {
                        setOpen(true);
                      } else setOptions([]);
                    }}
                    onClose={() => setOpen(false)}
                    onChange={(event, value) => {
                      setuserDetails({ ...userDetails, address: value });
                      if (value.length > 0) {
                        setvalidInputs({ ...validInputs, address: true });
                      } else setvalidInputs({ ...validInputs, address: false });
                    }}
                    sx={{}}
                    id="custom-input-demo"
                    options={options}
                    renderInput={(params) => (
                      <div ref={params.InputProps.ref}>
                        <div className="input-address active">
                          <input
                            {...params.inputProps}
                            type="text"
                            autoComplete="chrome-off"
                            className={
                              validatedInputs.address === "empty"
                                ? "form-control"
                                : validatedInputs.address === false
                                ? "form-control is-invalid"
                                : "form-control is-valid"
                            }
                            name="address"
                            placeholder="Enter your postcode or address"
                            value={userDetails.address}
                            onChange={(e) => onAddressChange(e)}
                          />
                          <a
                            href="#"
                            className={showCheck ? "" : "d-none"}
                            onClick={() => {
                              setuserDetails({
                                ...userDetails,
                                address: "",
                              });
                              setOptions([]);
                              setShowCheck(false);
                            }}
                          >
                            Change
                          </a>
                        </div>
                      </div>
                    )}
                  />
                </div>
                <hr />
                {page != "shop" ? (
                  <div style={{ marginBottom: "10px" }}>
                    <div className="ln-tr-input" style={{}}>
                      <input
                        type="text"
                        className={
                          validatedInputs.landline_no == "empty"
                            ? "form-control"
                            : validatedInputs.landline_no == false
                            ? "form-control is-invalid"
                            : "form-control is-valid"
                        }
                        placeholder={
                          page != "mobile"
                            ? "Enter the landline number you want to keep"
                            : "Enter your mobile number you want to keep"
                        }
                        name="landline_no"
                        value={userDetails.landline_no}
                        onChange={changeLandlineNumber}
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {page == "mobile" &&
                userDetails &&
                userDetails.landline_no &&
                userDetails.landline_no.length >= 10 ? (
                  <div style={{ marginBottom: "10px" }}>
                    <div className="ln-tr-input" style={{}}>
                      <input
                        type="text"
                        className={
                          validatedInputs.pac == "empty"
                            ? "form-control"
                            : validatedInputs.pac == false
                            ? "form-control is-invalid"
                            : "form-control is-valid"
                        }
                        placeholder="Enter the PAC Code"
                        name="pac"
                        value={userDetails.pac}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <div className="address-details">
                  <h4>Your Details</h4>
                  <div className="row">
                    <div className="col-xl-6">
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="First name"
                          name="first_name"
                          value={userDetails.first_name}
                          onChange={handleChange}
                          readOnly={signedIn ? true : false}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Last name"
                          name="last_name"
                          value={userDetails.last_name}
                          onChange={handleChange}
                          readOnly={signedIn ? true : false}
                        />
                      </div>
                    </div>
                    <div className="col-xl-12">
                      <div className="mb-3">
                        <input
                          type="number"
                          className={
                            validatedInputs.mobile_number == "empty"
                              ? "form-control"
                              : validatedInputs.mobile_number == false
                              ? "form-control is-invalid"
                              : "form-control is-valid"
                          }
                          placeholder="Mobile phone"
                          name="mobile_number"
                          value={userDetails.mobile_number}
                          onChange={handleChange}
                          onWheel={(event) => event.currentTarget.blur()}
                          readOnly={signedIn ? true : false}
                        />
                      </div>
                    </div>
                    <div className="col-xl-12">
                      <div className="mb-3">
                        <input
                          type="text"
                          className={
                            validatedInputs.email == "empty"
                              ? "form-control"
                              : validatedInputs.email == false
                              ? "form-control is-invalid"
                              : "form-control is-valid"
                          }
                          placeholder="Email"
                          name="email"
                          value={userDetails.email}
                          onChange={handleChange}
                          readOnly={signedIn ? true : false}
                        />
                      </div>
                    </div>
                    <div className="col-xl-12">
                      <div className="mb-3">
                        <a
                          style={{ cursor: "pointer" }}
                          className="btn-style-two"
                          onClick={saveinLocal}
                        >
                          Continue
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="star-img">
                    <TrustPilot fullWidth={true} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
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
      {product ? (
        <Modal isOpen={modal} toggle={toggle} backdrop="static">
          <ModalHeader>
            Congratulations! This product is available for your location.
          </ModalHeader>
          <ModalBody>
            <h3>Details for {product.name}:</h3>
            <p>Download Speed: {product.DownstreamPeakHour} </p>
            <p>Upload Speed : {product.UpstreamPeakHour} </p>
            <p>Contract Length : {product.contract_length} </p>
            <p>Price : {product.price} </p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => proceed()}>
              Continue
            </Button>
          </ModalFooter>
        </Modal>
      ) : (
        ""
      )}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLoader1}
        onBackdropClick="false"
      >
        <Box
          sx={{ position: "relative", display: "block", textAlign: "center" }}
        >
          <h1 style={{ color: "white" }}>Please wait.</h1>
          <h2 style={{ color: "white", width: "600px" }}>
            We are checking if the selected product is available at your
            location.
          </h2>
          <CircularProgress color="inherit" />
        </Box>
      </Backdrop>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openSpinner}
        onBackdropClick="false"
      >
        <Box
          sx={{ position: "relative", display: "block", textAlign: "center" }}
        >
          <CircularProgress color="inherit" />
        </Box>
      </Backdrop>
      <Dialog
        open={openDialog}
        onClose={(e) => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you own a landline?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You have chosen not to enter an telephone Number.If you continue you
            may have to pay for an installation charge.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={dontProceed}>Disagree</Button>
          <Button onClick={Proceed} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ZipcodeAddress;
