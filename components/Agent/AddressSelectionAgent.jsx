import { React, useState, useEffect } from "react";
import { axiosPost, verifyEmail, verifyPhone } from "../../Methods/Save";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { APIURL } from "../../Methods/Fetch";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import LocalStorage from "../Homepage/LocalStorage";

function AddressSelectionAgent(props) {
  const {
    setAddressTab,
    setProductTab,
    userDetails,
    setuserDetails,
    chk_add_details,
    setchk_add_details,
    page,
    setpenLoader,
  } = props;
  const [message, setMessage] = useState("");
  const [second, setSecond] = useState(false);
  const [openpopup, setOpenPopup] = useState(false);

  const [vertical, setvertical] = useState("top");
  const [horizontal, sethori] = useState("right");
  const [openDialog, setOpenDialog] = useState(false);
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
  const [prevOptions, setPrevOptions] = useState([]);

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
    landline_no: "empty",
    prev_address: "empty",
    address: "empty",
  });
  const [activeTab1, setactiveTab1] = useState("");
  const [activeTab, setactiveTab] = useState("");
  const [product, setProduct] = useState();
  const [modal, setModal] = useState(false);
  const onAddressChange = (e) => {
    setuserDetails({
      ...userDetails,
      address: e.target.value,
    });
    setOptions([]);
  };
  useEffect(() => {
    // if (userDetails.address === "My address is not Listed") {
    //   navigate("/not-available");
    // }
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
    //   if (response.data.Items.length > 0) {
    //     if (response.data.Items[0].Type == "Postcode") {
    //     } else {
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
                  else subbuilding = data.Address.SubBuilding;
                  if (typeof data.Address.BuildingName === "undefined")
                    var b_name = "";
                  else b_name = data.Address.BuildingName + ",";

                  if (typeof data.Address.BuildingNumber === "undefined")
                    var b_no = "";
                  else b_no = data.Address.BuildingNumber;
                  setOptions((prevArray) => [
                    ...prevArray,
                    `${subbuilding} ${b_no} ${b_name} ${data.Address.Street} , ${data.Address.PostTown} , ${data.Address.PostCode}`,
                  ]);
                  setAddresses((prevArray) => [
                    ...prevArray,
                    {
                      SubBuilding: subbuilding,
                      BuildingNumber: b_no,
                      BuildingName: b_name,
                      Street: data.Address.Street,
                      PostTown: data.Address.PostTown,
                      PostCode: data.Address.PostCode,
                      CSSDistrictCode: data.Address.CSSDistrictCode,
                      ALK: data.Address.ALK,
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
  useEffect(() => {
    if (
      userDetails.address.length > 20 &&
      userDetails.address != "My address is not Listed"
    ) {
      var filtered = addresses.filter(
        (data) =>
          `${data.SubBuilding} ${data.BuildingNumber} ${data.BuildingName} ${data.Street} , ${data.PostTown} , ${data.PostCode}` ===
          userDetails.address
      );
      if (filtered.length > 0) {
        var data = {
          building_name: filtered[0].BuildingName,
          sub_building: filtered[0].SubBuilding,
          building_no: filtered[0].BuildingNumber,
          postcode: filtered[0].PostCode,
        };
        var thorough_fare_name = filtered[0].BuildingName && filtered[0].BuildingName != ""?filtered[0].BuildingName:filtered[0].SubBuilding;
        var split_thorough_fare_name = thorough_fare_name.split(",").join("");
        var thorough_fare_number = filtered[0].BuildingNumber;
        var split_thorough_fare_number = thorough_fare_number
          .split(",")
          .join("");
        localStorage.setItem("BuildingName", split_thorough_fare_name);
        localStorage.setItem("BuildingNumber", split_thorough_fare_number);
      }
      setpenLoader(true);
      var url = APIURL() + "check-address";
      axiosPost(url, data).then((response) => {
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
            CSSDistrictCode: response.data[0].response.data[0].CSSDistrictCode,
            alk: response.data[0].response.data[0].ALK,
            category: cat_id,
          };
        }
        localStorage.setItem("addressDetails", JSON.stringify(tosave));
        setchk_add_details(tosave);
        setpenLoader(false);
      });
    }
  }, [userDetails.address]);

  return (
    <>
      <LocalStorage />

      <div className="col-xl-8 mx-auto">
        <div className="success-address">
          <h4>Choose your address</h4>
          <Autocomplete
            loading
            loadingText={
              userDetails.address.length > 0 ? (
                loading === true ? (
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
      </div>
    </>
  );
}

export default AddressSelectionAgent;
