import { React, useEffect, useState } from "react";
import InnerPageHeader from "../InnerPageHeader";
import {
  axiosGet,
  axiosPost,
  verifyEmail,
  verifyPhone,
} from "../../Methods/Save";
import Snackbar from "@mui/material/Snackbar";
import Addons from "../ContractInstallation/Addons";
import YourOrders from "../ContractInstallation/YourOrders";
import { Alert, TextField } from "@mui/material";
import { APIURL } from "../../Methods/Fetch";
import InstallationAddress from "../Common/InstallationAddress";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dayjs from "dayjs";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Stack } from "@mui/system";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Image from "next/image";
import { useRouter } from "next/router";

function ContractInstallation() {
  const [loading1, setLoading1] = useState(false);
  const [signedIn, SetSignedIn] = useState(false);
  const [access_id, setAccess_id] = useState("");
  const [checkoutStarted, setCheckoutStarted] = useState(
    localStorage.getItem("checkout_started")
  );
  const [ids, setIds] = useState([]);
  const [addedRentCategory, setAddedRentCategory] = useState([]);
  const [addedCategory, setAddedCategory] = useState(
    JSON.parse(localStorage.getItem("addedCategory"))
  );
  const [related_ids, setRelated_Ids] = useState(
    JSON.parse(localStorage.getItem("related_ids"))
  );
  const [rental_ids, setRental_Ids] = useState(
    JSON.parse(localStorage.getItem("rental_ids"))
  );
  const [pageDetails, setPageDetails] = useState();
  const [deliveryPrice, setDeliveryPrice] = useState();
  const [nodata, setNoData] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [prevOptions, setPrevOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const [addonsParentCategory, setAddonsParentCategory] = useState([]);
  const [discount, setDiscount] = useState();
  const [duplicateEmail, setDuplicateEmail] = useState(false);
  const [priceBeforeDiscount, setPriceBeforeDiscount] = useState();
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState();
  const [vertical, setvertical] = useState("top");
  const [horizontal, sethori] = useState("right");
  const [talkRes, setTalkRes] = useState("right");
  const [openLoader, setpenLoader] = useState(false);
  const [upfrontPayment, setUpfrontPaymnet] = useState();
  const [showCheck1, setShowCheck1] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialog1, setOpenDialog1] = useState(false);
  const [areaCodes, setAreaCodes] = useState([]);
  const [vat, setVat] = useState(0);
  const [addressDetails, setAddressDetails] = useState(
    JSON.parse(localStorage.getItem("chk_add_details"))
  );
  if (localStorage.getItem("address_details") !== null) {
    var address_details = JSON.parse(localStorage.getItem("address_details"));
    // var thorough_fare_number = address_details.building_no.replaceAll(",", "");
    // var thorough_fare_name =
    //   address_details.building_name != ""
    //     ? address_details.building_name.replaceAll(",", "")
    //     : address_details.sub_building.replaceAll(",", "");
    var thorough_fare_number =
      address_details.building_no != ""
        ? address_details.building_no.replaceAll(",", "")
        : address_details.building_name.replaceAll(",", "");
    var thorough_fare_name = address_details.Street.replaceAll(",", "");
  } else {
    thorough_fare_number = "";
    var thorough_fare_name = "";
  }
  const [addedProducts, setAddedProducts] = useState(
    JSON.parse(localStorage.getItem("addedProducts"))
  );
  const [addedRentalProducts, setAddedRentalProducts] = useState(
    JSON.parse(localStorage.getItem("addedRentalProducts"))
  );
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("addonproducts"))
  );
  const [date, setDate] = useState(
    new Date().setFullYear(new Date().getFullYear() - 18)
  );
  const [startDate, setStartDate] = useState(
    new Date().setFullYear(new Date().getFullYear() - 18)
  );

  useEffect(() => {
    if (localStorage.getItem("user_id") != null) {
      SetSignedIn(true);
    }
  }, []);
  useEffect(() => {
    if (page == "landline" && product && product.simwood === 1) {
      var url = APIURL() + "area-codes";
      axiosGet(url).then((response) => {
        setAreaCodes(response.data[0].response.data.items);
      });
    }
  }, [product]);
  const navigate = useRouter();
  const [validatedInputs, setvalidatedInputs] = useState({
    mobile_number: "empty",
    email: "empty",
    landline: "empty",
    prev_address: "empty",
  });

  const [validInputs, setvalidInputs] = useState({
    first_name: "empty",
    last_name: "empty",
    mobile_number: "empty",
    email: "empty",
    address: "empty",
  });
  const [activeTab, setactiveTab] = useState("");
  function handleClick(e) {
    setChecked(true);
    setuserDetails({
      ...userDetails,
      property_type: e.target.title,
    });

    setactiveTab(e.currentTarget.id);
  }
  const [checked, setChecked] = useState(false);
  // useEffect(() => {
  //   if (localStorage.getItem("addon_ids") !== null) {
  //     setIds(JSON.parse(localStorage.getItem("addon_ids")));
  //   }
  //   if (localStorage.getItem("addons") !== null) {
  //     setAddOns(JSON.parse(localStorage.getItem("addons")));
  //   }
  // }, [])

  if (localStorage.getItem("AccessLineID") !== null) {
    var AccessLineID = localStorage.getItem("AccessLineID");
  } else var AccessLineID = "";
  if (localStorage.getItem("address_details") !== null) {
    var address_details = localStorage.getItem("address_details");
  } else var address_details = "";
  if (localStorage.getItem("affName") !== null) {
    var affName = localStorage.getItem("affName");
  } else var affName = "";
  if (localStorage.getItem("page") !== null) {
    var page = localStorage.getItem("page");
  } else var page = "broadband";
  if (localStorage.getItem("Product") !== null) {
    var product = JSON.parse(localStorage.getItem("Product"));
  } else var product = "";
  const register = () => {
    var url = APIURL() + "register";

    var data = { ...userDetails };
    return axiosPost(url, data);
  };
  useEffect(() => {
    var url = APIURL() + "contract-installation-page-details";
    axiosGet(url).then((response) => {
      setPageDetails(response.data[0].response.data[0]);
    });
  }, []);
  useEffect(() => {
    if (product && page != "mobile" && page != "shop" && page != "landline") {
      setpenLoader(true);
      var affiliate_name = "";
      if (localStorage.getItem("affName") != null)
        affiliate_name = localStorage.getItem("affName");
      var data = {
        ...JSON.parse(localStorage.getItem("chk_add_details")),
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
            setAccess_id(
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
    // return;
    setpenLoader(true);

    var address = userDetails.address.split(",");
    var length = address.length;
    if (checkoutStarted) {
      var order_id = localStorage.getItem("order_id");
    }
    var locality = localStorage.getItem("Locality");
    var thoroughfare_name = localStorage.getItem("BuildingName");
    var thoroughfare_number = localStorage.getItem("BuildingNumber");
    var PostCode = localStorage.getItem("PostCode");
    var PostTown = localStorage.getItem("PostTown");
    var acc_line_id =
      AccessLineID && AccessLineID != ""
        ? AccessLineID
        : access_id && access_id != ""
        ? access_id
        : planDetails.AccessLineID;
    var url = APIURL() + "order";
    var data = {
      user_id: "",
      name_title: userDetails.salutation,
      first_name: userDetails.first_name,
      last_name: userDetails.last_name,
      address: userDetails.address,
      city: PostTown ? PostTown : address[length - 2],
      locality: locality,
      country: "UK",
      postcode: PostCode ? PostCode : address[length - 1],
      number: userDetails.mobile_number,
      dob: userDetails.dob,
      dobFormatted: userDetails.dobFormatted,
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
      [page]: product,
      landline_no: userDetails.landline_no,
      // wifi_username: wifiDetails.name,
      // wifi_pw: wifiDetails.password,
      // direct_debit_details: direct_debit_details,
      // fasttrack_connection: fasttrack_price,
      affiliate_name: affName,
      prev_address: userDetails.prev_address,
      order_id: order_id,
      property_type: userDetails.property_type,
      simwood_areacode: userDetails.simwood_areacode
        ? userDetails.simwood_areacode
        : "",
      access_line_id: acc_line_id,
      onr_ref_no: planDetails.ont_ref_no,
      company_name: userDetails.company_name,
      pac_code: userDetails.pac,
      is_consumer: bussiness_type == "true" ? 0 : 1,
      thorough_fare_number: thoroughfare_number,
      thorough_fare_name: thoroughfare_name,
      alk: addressDetails?.alk,
      district_code: addressDetails?.CSSDistrictCode,
    };
    axiosPost(url, data, "header", data)
      .then((response) => {
        if (response.data[0].response.status === "success") {
          localStorage.setItem("Product", JSON.stringify(planDetails));
          localStorage.setItem("order_id", response.data[0].response.order_id);
          localStorage.setItem("checkout_started", true);
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
          // localStorage.setItem("monthlyTotal", monthlyTotal);
          localStorage.setItem("addedProducts", JSON.stringify(addedProducts));
          localStorage.setItem(
            "addedRentalProducts",
            JSON.stringify(addedRentalProducts)
          );
          localStorage.setItem("addedProducts", JSON.stringify(addedProducts));
          localStorage.setItem(
            "addedRentalProducts",
            JSON.stringify(addedRentalProducts)
          );
          if (products)
            localStorage.setItem("addonproducts", JSON.stringify(products));
          if (rentalProducts)
            localStorage.setItem("rentalProducts", JSON.stringify(products));
          localStorage.setItem("monthlyTotal", monthlyTotal ? monthlyTotal : 0);
          if (addons) {
            localStorage.setItem("addons", JSON.stringify(addons));
            localStorage.setItem("addon_ids", JSON.stringify(ids));
            localStorage.setItem(
              "addonsParentCategory",
              JSON.stringify(addonsParentCategory)
            );
          }
          if (userDetails.landline_no.length > 0) {
            localStorage.setItem("upfrontPayment", upfrontPayment);
            if (page != "shop" && page != "mobile")
              navigate.push("/contractcheckout");
            else if (page == "mobile") navigate("/payment");
            else navigate.push("/marketing");
            // setOpenDialog1(true);
          } else {
            localStorage.setItem("upfrontPayment", upfrontPayment);
            if (page != "shop" && page != "mobile")
              navigate.push("/contractcheckout");
            else if (page == "mobile") navigate.push("/payment");
            else navigate.push("/marketing");
          }

          // localStorage.removeItem("_blank");
        }
      })
      .catch(function (error) {
        setpenLoader(false);
      });
  };
  const check = () => {
    if (page != "shop" && page != "mobile" && !checked) {
      setMessage("Please select a property type.");
      setAlertType("error");
      setOpen(true);
      return;
    } else if (
      (activeTab == "probox2" || activeTab == "probox4") &&
      (validInputs.prev_address == false || userDetails.prev_address.length < 8)
    ) {
      setMessage("Please select your Previous address.");
      setOpen(true);
      setvalidatedInputs({ ...validatedInputs, prev_address: false });
      return;
    } else if (userDetails.email.length < 1) {
      setAlertType("error");
      setErrors({ ...errors, email: "Email is required." });
      setMessage("Email is required");
      setOpen(true);
      return;
    } else if (userDetails.last_name.length < 1) {
      setMessage("Last Name is required");
      setErrors({ ...errors, last_name: "Last Name is required." });
      setOpen(true);
      return;
    } else if (
      (page != "mobile" && userDetails.dob.length < 1) ||
      userDetails.dobFormatted == "NaN-NaN-NaN"
    ) {
      setAlertType("error");
      setErrors({
        ...errors,
        dob: "Please enter a valid Dob in DD/MM/YYYY format.",
      });
      setMessage("Please enter a valid Dob in DD/MM/YYYY format");
      setOpen(true);
      return;
    } else if (userDetails.salutation.length < 1) {
      setAlertType("error");

      setMessage("Please select a salutation");
      setOpen(true);
      return;
    } else if (userDetails.mobile_number.length < 1) {
      setAlertType("error");
      setErrors({ ...errors, mobile_number: "Phone Number is required." });
      setMessage("Phone Number is required");
      setOpen(true);
      return;
    } else if (userDetails.first_name.length < 1) {
      setAlertType("error");
      setErrors({ ...errors, first_name: "First Name is required." });
      setMessage("First Name is required");
      setOpen(true);
      return;
    } else if (userDetails.address.length < 1) {
      setAlertType("error");
      setMessage("Address is required");
      setOpen(true);
      return;
    } else if (
      userDetails.mobile_number &&
      userDetails.mobile_number.length > 0 &&
      userDetails.mobile_number.substring(0, 1) != "0"
    ) {
      setAlertType("error");
      setMessage("Mobile Number must start with 0.");
      setOpen(true);
      return;
    } else if (
      page == "landline" &&
      product.simwood === 1 &&
      userDetails.simwood_areacode == ""
    ) {
      setAlertType("error");
      setMessage("Please select an area code.");
      setOpen(true);
      return;
    } else if (
      bussiness_type == "true" &&
      userDetails &&
      userDetails.company_name == ""
    ) {
      setAlertType("error");
      setMessage("Please provide a company name.");
      setOpen(true);
      return;
    }
    // } else if (duplicateEmail == true && signedIn == false) {
    //   setAlertType("error");
    //   setMessage("Account already exists, please login to continue.");
    //   setOpen(true);
    //   return;
    // }
    else proceed();
  };
  const mailChimpRegister = async () => {
    try {
      const url = APIURL() + "create-subscriber";
      const data = {
        email_id: userDetails.email,
        fname: userDetails.first_name,
        lname: userDetails.first_name,
        address: userDetails.address,
        city: userDetails.address.split(",")[3],
        state: userDetails.address.split(",")[0],
        zip: userDetails.address.split(",")[4],
      };
      const result = await axiosPost(url, data);
    } catch (error) {
      console.log(error);
    }
  };
  const proceed = () => {
    setOpenDialog(false);
    mailChimpRegister();

    if (!duplicateEmail) {
      register().then(() => {
        initiateOrder();
      });
    } else {
      initiateOrder();
    }
  };

  const registerandsave = (e) => {
    // uncomment
    // if (errors.email.length > 0) {
    //   setMessage(errors.email);
    //   setOpen(true);
    //   return;
    // }
    // if (errors.mobile_number.length > 0) {
    //   setMessage(errors.mobile_number);
    //   setOpen(true);
    //   return;
    // }
    // if (errors.first_name.length > 0) {
    //   setMessage(errors.first_name);
    //   setOpen(true);
    //   return;
    // }
    // if (errors.last_name.length > 0) {
    //   setMessage(errors.last_name);
    //   setOpen(true);
    //   return;
    // }
    // if (errors.address.length > 0) {
    //   setMessage(errors.address);
    //   setOpen(true);
    //   return;
    // }
    if (userDetails.email.length < 1) {
      setMessage("Email is required");
      setOpen(true);
      return;
    }
    if (userDetails.dob.length < 1) {
      setMessage("Date of birth is required");
      setOpen(true);
      return;
    }
    if (userDetails.mobile_number.length < 1) {
      setMessage("Phone Number is required");
      setOpen(true);
      return;
    }
    if (userDetails.first_name.length < 1) {
      setMessage("First Name is required");
      setOpen(true);
      return;
    }
    if (userDetails.last_name.length < 1) {
      setMessage("Last Name is required");
      setOpen(true);
      return;
    }
    if (userDetails.address.length < 1) {
      setMessage("Address is required");
      setOpen(true);
      return;
    }

    localStorage.setItem("user_details", JSON.stringify(userDetails));
    localStorage.setItem("user_details", JSON.stringify(userDetails));
    // localStorage.setItem("monthlyTotal", monthlyTotal);
    if (userDetails.landline_no == "")
      localStorage.setItem("initalmonthlyTotal", monthlyTotal);
    else {
      localStorage.setItem("initalmonthlyTotal", 0);
      navigate.push("/contractcheckout");

      // setOpenDialog1(true);
    }

    if (addons) localStorage.setItem("addons", JSON.stringify(addons));
    navigate.push("/contractcheckout");
  };
  const initial_errors = {
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    mobile_number: "",
    dob: "",
  };
  const [errors, setErrors] = useState(initial_errors);

  const [userDetails, setuserDetails] = useState(
    JSON.parse(localStorage.getItem("user_details"))
  );
  const [planDetails, setplanDetails] = useState({});
  const [monthlyTotal, setMonthlyTotal] = useState();
  const [rentalProducts, setRentalProducts] = useState(
    JSON.parse(localStorage.getItem("rentalProducts"))
  );
  const handleDateChange = (newValue) => {
    if (newValue != null) {
      if (
        page != "shop" &&
        page != "mobile" &&
        newValue.diff(dayjs().subtract(18, "year"), "day") > 0
      ) {
        setuserDetails({
          ...userDetails,
          dob: null,
          dobFormatted: "",
        });
        setErrors({ ...errors, dob: "You must be 18 years or older." });
        setMessage("You must be 18 years or older.");
        setAlertType("error");
        setOpen(true);
      } else {
        setErrors({ ...errors, dob: "" });

        var newValue1 = `${newValue.$M + 1}-${newValue.$D}-${newValue.$y}`;
        setuserDetails({
          ...userDetails,
          dob: newValue,
          dobFormatted: newValue1,
        });
      }
    } else {
      setErrors({ ...errors, dob: "Please enter a DOB" });
      setuserDetails({
        ...userDetails,
        dob: "",
      });
    }
  };

  useEffect(() => {
    if (localStorage.getItem("Product") !== null) {
      setplanDetails(JSON.parse(localStorage.getItem("Product")));
      setMonthlyTotal(JSON.parse(localStorage.getItem("Product")).price);
      if (JSON.parse(localStorage.getItem("Product")).installation_cost) {
        localStorage.setItem(
          "upfrontPayment",
          Number(upfrontPayment) +
            Number(
              JSON.parse(localStorage.getItem("Product")).installation_cost
            )
        );
      }
    }
    if (localStorage.getItem("connection_info") !== null) {
      setTalkRes(JSON.parse(localStorage.getItem("connection_info")));
    }
  }, []);
  const [addons, setAddOns] = useState([]);
  const handleInputChange = (e) => {
    const { name, value, id } = e.target;
    if (value.length <= 0) {
      setvalidatedInputs({ ...validatedInputs, [name]: false });

      setErrors({ ...errors, [name]: id + " is a Required Field" });
    } else setErrors({ ...errors, [name]: "" });

    setuserDetails({ ...userDetails, [name]: value });
  };
  // useEffect(() => {
  //   localStorage.removeItem("addonproducts");
  //   localStorage.removeItem("addons");
  // }, []);
  // useEffect(() => {
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
  useEffect(() => {
    var url = APIURL() + `get-discount/${page}`;
    axiosGet(url).then((response) => {
      setDiscount(response.data[0].response.data);
    });
  }, []);
  useEffect(() => {
    if (discount) {
      if (discount.discount_type === "fixed") {
        setUpfrontPaymnet(
          Number(localStorage.getItem("upfrontPayment")) -
            Number(discount.discount_amt)
        );
        localStorage.setItem(
          "originalPrice",
          localStorage.getItem("upfrontPayment")
        );
        localStorage.setItem("discount", JSON.stringify(discount));
        setPriceBeforeDiscount(localStorage.getItem("upfrontPayment"));
      }
      if (discount.discount_type === "percentage") {
      }
    }
  }, [discount]);
  var bussiness_type = localStorage.getItem("bussiness_type");

  useEffect(() => {
    if (userDetails.prev_address === "My address is not Listed") {
      navigate.push("/not-available");
    }
    if (userDetails.prev_address.length > 10) {
      setShowCheck1(true);
    }
    if (userDetails.prev_address.length === 0) {
      setPrevOptions([]);
      setOpen1(false);
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
        postcode: userDetails.prev_address,
      };
      var url = APIURL() + "get-address-details";
      if (
        userDetails.prev_address.length > 0 &&
        userDetails.prev_address.length < 9
      ) {
        setPrevOptions([]);
        setOpen1(false);

        setOpen1(true);
        setLoading1(true);
        axiosPost(url, data, headers)
          .then((response) => {
            if (response.status == 200) {
              if (response.data[0].response.status == "success") {
                response.data[0].response.data.map((data) => {
                  if (typeof data.Address.SubBuilding === "undefined")
                    var subbuilding = "";
                  else subbuilding = data.Address.SubBuilding;
                  if (typeof data.Address.BuildingName === "undefined")
                    var b_name = "";
                  else b_name = data.Address.BuildingName + ",";

                  if (typeof data.Address.BuildingNumber === "undefined")
                    var b_no = "";
                  else b_no = data.Address.BuildingNumber;
                  if (typeof data.Address.Locality === "undefined")
                    var b_locality = "";
                  else b_locality = data.Address.Locality + ",";
                  setPrevOptions((prevArray) => [
                    ...prevArray,
                    `${subbuilding} ${b_no} ${b_name} ${b_locality} ${data.Address.Street} , ${data.Address.PostTown} , ${data.Address.PostCode}`,
                  ]);
                  // setAddresses((prevArray) => [
                  //   ...prevArray,
                  //   {
                  //     SubBuilding: subbuilding,
                  //     BuildingNumber: b_no,
                  //     BuildingName: b_name,
                  //     Street: data.Address.Street,
                  //     PostTown: data.Address.PostTown,
                  //     PostCode: data.Address.PostCode,
                  //     CSSDistrictCode: data.Address.CSSDistrictCode,
                  //     ALK: data.Address.ALK,
                  //   },
                  // ]);

                  setLoading1(false);
                  setNoData(false);
                });
              } else {
                setPrevOptions([]);
                setLoading1(false);
                setNoData(true);
              }
            }
          })
          .then(() => {
            setPrevOptions((prevArray) => [
              ...prevArray,
              `My address is not Listed`,
            ]);
          });
      }
    }, 1200);

    return () => clearTimeout(delayDebounceFn);
  }, [userDetails.prev_address]);
  useEffect(() => {
    var url = APIURL() + "business-vat";

    axiosGet(url).then((response) => {
      setVat(response.data[0].response.data);
    });
  }, []);
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

  return (
    <>
      <InnerPageHeader
        activeTab="contract"
        bussiness_type={bussiness_type}
        signedIn={signedIn}
        SetSignedIn={SetSignedIn}
        page={page}
        step={1}
      />
      <section
        className={
          bussiness_type == "true"
            ? "buisness-mobile address-form-sec buisness-mobile2"
            : " address-form-sec"
        }
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="address-title mb-5">
                <h3>
                  Hey {userDetails.first_name ? userDetails.first_name : ""},
                  {page != "shop" && page != "mobile"
                    ? " why not BOOST YOUR PLAN!"
                    : " here's whats in your basket!"}
                </h3>
              </div>
            </div>
            <InstallationAddress />
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xl-8">
              <div className="contract-left-box-sec">
                <div className="contract-title">
                  <h3>
                    Your {page != "shop" && page != "mobile" ? "plan" : "offer"}
                  </h3>
                </div>
                <div className="contract-content-box">
                  <div className="contract-text">
                    <h6>{planDetails.name}</h6>
                    {page != "shop" && page != "mobile" ? (
                      <ul>
                        <li>
                          <div className="font-bold">Includes :</div>
                          <div className="br-btm">Unlimited Usage </div>
                          <div className="br-btm"> Wi - Fi Hub</div>
                        </li>
                        <li
                          className={
                            page == "landline" ||
                            page == "shop" ||
                            page == "mobile"
                              ? "d-none"
                              : ""
                          }
                        >
                          <div className="font-bold">
                            Here are the estimated speeds you will get :
                          </div>
                        </li>
                      </ul>
                    ) : (
                      ""
                    )}

                    <div
                      className={
                        page == "landline" || page == "shop" || page == "mobile"
                          ? "d-none"
                          : "average-speed-box showtwo"
                      }
                    >
                      <div className="speed-box">
                        <div className="speed-box-inner">
                          <div className="speed-box-img">
                            <Image
                              src="/images/wifi.png"
                              alt="wifi"
                              height={400}
                              width={400}
                            />
                          </div>
                          <div className="speed-text">
                            <p>
                              {planDetails.DownstreamPeakHour
                                ? planDetails.DownstreamPeakHour
                                : planDetails.avg_download_speed}{" "}
                              Mbps
                            </p>
                          </div>
                        </div>
                        <p>Your Download speeds</p>
                      </div>
                      <div className="speed-box bg2">
                        <div className="speed-box-inner bg2">
                          <div className="speed-box-img">
                            <Image
                              src="/images/wifi.png"
                              alt="wifi"
                              height={400}
                              width={400}
                            />
                          </div>
                          <div className="speed-text">
                            <p>
                              {" "}
                              {planDetails.UpstreamPeakHour
                                ? planDetails.UpstreamPeakHour
                                : planDetails.avg_upload_speed}{" "}
                              Mbps
                            </p>
                          </div>
                        </div>
                        <p>Your Upload speeds</p>
                      </div>
                      {/*<div className="speed-box bg3">
                        <div className="speed-box-inner bg3">
                          <div className="speed-text">
                            <p className="text-white">
                              {planDetails.ideal_devices}+
                            </p>
                          </div>
                        </div>
                        <p>
                          Ideal for {planDetails.ideal_devices} or more devices
                        </p>
                              </div>*/}
                    </div>
                    {page != "shop" && page != "mobile" ? (
                      <div className="plan-question-text">
                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                          >
                            <p>{pageDetails ? pageDetails.title : ""}</p>
                          </AccordionSummary>
                          <AccordionDetails>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: pageDetails
                                  ? pageDetails.description
                                  : "",
                              }}
                            ></div>
                          </AccordionDetails>
                        </Accordion>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className="contract-left-box-sec">
                <div className="contract-title">
                  <h3>
                    {page != "shop" && page != "mobile"
                      ? "Sign Up"
                      : "Delivery Address"}
                  </h3>
                </div>
                <div className="contract-content-box">
                  <div className="row">
                    {page != "shop" && page != "mobile" ? (
                      <div
                        className={
                          bussiness_type == "true"
                            ? "d-none"
                            : "property-live-in"
                        }
                      >
                        <h4>What type of property do you live in ?</h4>
                        <div className="property-box">
                          <div className="row">
                            <div className="col-xl-3 col-md-4 mb-3">
                              <div
                                className={
                                  activeTab == "probox1"
                                    ? "box-pro1 active"
                                    : "box-pro1"
                                }
                                onClick={handleClick}
                                id="probox1"
                              >
                                <span title="I have owned the home for over 3 years">
                                  {" "}
                                  I have owned the home for over 3 years
                                </span>
                              </div>
                            </div>
                            <div className="col-xl-3 col-md-4 mb-3">
                              <div
                                className={
                                  activeTab == "probox2"
                                    ? "box-pro1 active"
                                    : "box-pro1"
                                }
                                onClick={handleClick}
                                id="probox2"
                              >
                                <span title="I have owned for less than 3 years">
                                  I have owned for less than 3 years
                                </span>
                              </div>
                            </div>
                            <div className="col-xl-3 col-md-4 mb-3">
                              <div
                                className={
                                  activeTab == "probox3"
                                    ? "box-pro1 active"
                                    : "box-pro1"
                                }
                                onClick={handleClick}
                                id="probox3"
                              >
                                <span title="I have been renting over 3 years">
                                  I have been renting over 3 years
                                </span>
                              </div>
                            </div>
                            <div className="col-xl-3 col-md-4 mb-3">
                              <div
                                className={
                                  activeTab == "probox4"
                                    ? "box-pro1 active"
                                    : "box-pro1"
                                }
                                onClick={handleClick}
                                id="probox4"
                              >
                                <span title="I have been renting less than 3 years">
                                  I have been renting less than 3 years
                                </span>
                              </div>
                            </div>
                            {/* ///// Second Input Form //// */}
                            <div
                              className={
                                activeTab === "probox4" ||
                                activeTab === "probox2"
                                  ? "info input-show2"
                                  : "info input-show2 d-none"
                              }
                            >
                              <Autocomplete
                                loading
                                loadingText={
                                  userDetails.prev_address &&
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
                                          validatedInputs.prev_address ===
                                          "empty"
                                            ? "form-control"
                                            : validatedInputs.prev_address ===
                                              false
                                            ? "form-control is-invalid"
                                            : "form-control is-valid"
                                        }
                                        name="address"
                                        placeholder="Enter your Previous postcode or address"
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
                                        style={{ cursor: "pointer" }}
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
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}

                    <div
                      className={
                        bussiness_type == "true" ? "property-live-in" : "d-none"
                      }
                    >
                      <h4>What kind of business do you own?</h4>
                      <div className="property-box">
                        <div className="row">
                          <div className="col-xl-3 col-md-4 mb-3">
                            <div
                              className={
                                activeTab == "probox21"
                                  ? "box-pro1 active"
                                  : "box-pro1"
                              }
                              onClick={handleClick}
                              id="probox21"
                            >
                              <span title="Solo trader"> Solo trader</span>
                            </div>
                          </div>
                          <div className="col-xl-3 col-md-4 mb-3">
                            <div
                              className={
                                activeTab == "probox22"
                                  ? "box-pro1 active"
                                  : "box-pro1"
                              }
                              onClick={handleClick}
                              id="probox22"
                            >
                              <span title="Limited">Limited</span>
                            </div>
                          </div>
                          <div className="col-xl-3 col-md-4 mb-3">
                            <div
                              className={
                                activeTab == "probox23"
                                  ? "box-pro1 active"
                                  : "box-pro1"
                              }
                              onClick={handleClick}
                              id="probox23"
                            >
                              <span title="Partnership">Partnership</span>
                            </div>
                          </div>
                          <div className="col-xl-3 col-md-4 mb-3">
                            <div
                              className={
                                activeTab == "probox24"
                                  ? "box-pro1 active"
                                  : "box-pro1"
                              }
                              onClick={handleClick}
                              id="probox24"
                            >
                              <span title="Llp">Llp</span>
                            </div>
                          </div>
                          <div className="col-xl-3 col-md-4 mb-3">
                            <div
                              className={
                                activeTab == "probox25"
                                  ? "box-pro1 active"
                                  : "box-pro1"
                              }
                              onClick={handleClick}
                              id="probox25"
                            >
                              <span title="Plc">Plc</span>
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
                                userDetails.prev_address &&
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
                                          : validatedInputs.prev_address ===
                                            false
                                          ? "form-control is-invalid"
                                          : "form-control is-valid"
                                      }
                                      name="address"
                                      placeholder="Enter your Previous postcode or address"
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
                                      style={{ cursor: "pointer" }}
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
                        </div>
                      </div>
                    </div>
                    {page == "landline" && product.simwood == 1 ? (
                      <div className="col-xl-12">
                        <div className="mb-3">
                          <select
                            className="form-select form-control"
                            aria-label="Default select example"
                            name="simwood_areacode"
                            value={userDetails.simwood_areacode}
                            onChange={handleInputChange}
                          >
                            <option selected value="">
                              Select your area code
                            </option>
                            {areaCodes && areaCodes.length > 0
                              ? areaCodes.map((areacodeobj, index) => (
                                  <option
                                    key={index}
                                    value={areacodeobj.areaCode}
                                  >
                                    {`0${areacodeobj.areaCode} -${areacodeobj.description}`}
                                  </option>
                                ))
                              : ""}
                          </select>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="property-box-text">
                      <p>
                        Please complete your personal details below to continue
                        your order.
                      </p>
                    </div>
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
                            Select Title
                          </option>
                          <option
                            selected={
                              userDetails.salutation == "Mr" ? true : false
                            }
                            value="Mr"
                          >
                            Mr.
                          </option>
                          <option
                            selected={
                              userDetails.salutation == "Mr" ? true : false
                            }
                            value="Mrs"
                          >
                            Mrs.
                          </option>
                          <option
                            selected={
                              userDetails.salutation == "Ms" ? true : false
                            }
                            value="Ms"
                          >
                            Ms.
                          </option>
                          <option
                            selected={
                              userDetails.salutation == "Miss" ? true : false
                            }
                            value="Miss"
                          >
                            Miss.
                          </option>
                          <option
                            selected={
                              userDetails.salutation == "Dr" ? true : false
                            }
                            value="Dr"
                          >
                            Dr.
                          </option>
                          <option
                            selected={
                              userDetails.salutation == "Rev" ? true : false
                            }
                            value="Rev"
                          >
                            Rev.
                          </option>
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
                          readOnly={signedIn ? true : false}
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
                          readOnly={signedIn ? true : false}
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
                            userDetails.email == "empty"
                              ? "form-control"
                              : errors.email.length > 0 ||
                                !validatedInputs.email
                              ? "form-control is-invalid"
                              : "form-control is-valid"
                          }
                          name="email"
                          value={userDetails.email}
                          onChange={(e) => {
                            handleInputChange(e);
                          }}
                          readOnly={signedIn ? true : false}
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
                            userDetails.mobile_number == "empty"
                              ? "form-control"
                              : errors.mobile_number.length > 0 ||
                                !validatedInputs.mobile_number
                              ? "form-control is-invalid"
                              : "form-control is-valid"
                          }
                          name="mobile_number"
                          id="Mobile Number"
                          value={userDetails.mobile_number}
                          onChange={(e) => {
                            handleInputChange(e);
                          }}
                          readOnly={signedIn ? true : false}
                          onWheel={(event) => event.currentTarget.blur()}
                        />
                        <div className="invalid-feedback">
                          <span>{errors.mobile_number}</span>
                        </div>
                      </div>
                    </div>
                    {page != "shop" && page != "mobile" ? (
                      <div className="col-xl-6 col-md-6 mb-3">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <Stack spacing={3}>
                            <DesktopDatePicker
                              name="dob"
                              className="form-control"
                              label="Select Your Date of Birth"
                              inputFormat="DD/MM/YYYY"
                              value={userDetails.dob}
                              onChange={(newValue) => {
                                handleDateChange(newValue);
                              }}
                              readOnly={signedIn ? true : false}
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
                            />
                          </Stack>
                          <div className="error_class">
                            <span>{errors.dob}</span>
                          </div>
                        </LocalizationProvider>
                        {/*<DatePicker
                        className="form-control"
                        dateFormat="yyyy-MM-dd"
                        selected={date}
                        onChange={(date) => {
                          setDate(date);
                          let day = date.getDate();
                          let month = date.getMonth() + 1;
                          let year = date.getFullYear();
                          setuserDetails({
                            ...userDetails,
                            dob: `${month}-${day}-${year}`,
                          });
                        }}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        maxDate={startDate}
                        dropdownMode="select"
                        withPortal
                      />*/}
                      </div>
                    ) : (
                      ""
                    )}

                    {/*<div className="col-xl-6 col-md-6">
                      <div className="mb-3">
                        <input
                          type="text"
                          placeholder="Referral Code"
                          style={{ "-webkitAppearance": "none", margin: "0" }}
                          className="form-control"
                          name="referral_code"
                          id="referral_code"
                          value={userDetails.referral_code}
                          onChange={(e) => {
                            handleInputChange(e);
                          }}
                        />
                      </div>
                    </div>*/}
                    {bussiness_type == "true" ? (
                      <div className="col-xl-12 col-md-12">
                        <div className="mb-3">
                          <input
                            type="text"
                            placeholder="Company Name"
                            style={{ "-webkitAppearance": "none", margin: "0" }}
                            className={
                              userDetails.company_name == ""
                                ? "form-control"
                                : validatedInputs.company_name == false
                                ? "form-control is-invalid"
                                : "form-control is-valid"
                            }
                            name="company_name"
                            id="Company Name"
                            value={userDetails.company_name}
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                            readOnly={signedIn ? true : false}
                          />
                          <div className="invalid-feedback">
                            <span>{errors.company_name}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}

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

              <Addons
                data="calling"
                addons={addons}
                setAddOns={setAddOns}
                monthlyTotal={monthlyTotal}
                setMonthlyTotal={setMonthlyTotal}
                rentalProducts={rentalProducts}
                setRentalProducts={setRentalProducts}
                setUpfrontPaymnet={setUpfrontPaymnet}
                ids={ids}
                setIds={setIds}
                setRelated_Ids={setRelated_Ids}
                related_ids={related_ids}
                rental_ids={rental_ids}
                setRental_Ids={setRental_Ids}
                products={products}
                setProducts={setProducts}
                addonsParentCategory={addonsParentCategory}
                setAddonsParentCategory={setAddonsParentCategory}
                addedCategory={addedCategory}
                setAddedCategory={setAddedCategory}
                addedRentCategory={addedRentCategory}
                setAddedRentCategory={setAddedRentCategory}
                addedProducts={addedProducts}
                setAddedProducts={setAddedProducts}
                addedRentalProducts={addedRentalProducts}
                setAddedRentalProducts={setAddedRentalProducts}
                setDeliveryPrice={setDeliveryPrice}
              />
            </div>
            <YourOrders
              monthlyTotal={monthlyTotal}
              planDetails={planDetails}
              registerandsave={check}
              addons={addons}
              installation_cost={localStorage.getItem("upfrontPayment")}
              setAddOns={setAddOns}
              upfrontPayment={upfrontPayment}
              rentalProducts={rentalProducts}
              priceBeforeDiscount={priceBeforeDiscount}
              bussiness_type={bussiness_type}
              deliveryPrice={deliveryPrice}
              setDeliveryPrice={setDeliveryPrice}
              shop={page != "shop" && page != "mobile" ? false : true}
              page={page}
              contractPage={true}
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
          severity={alertType}
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
          <CircularProgress color="inherit" />
        </Box>
      </Backdrop>
      <Dialog
        open={openDialog1}
        onClose={(e) => setOpenDialog1(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Congratulations!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            As you have a landline number,you dont have to pay an installation
            cost.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => navigate.push("/contractcheckout")} autoFocus>
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ContractInstallation;
