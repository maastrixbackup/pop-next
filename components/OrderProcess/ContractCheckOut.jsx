import { React, useEffect, useLayoutEffect, useState } from "react";
import InnerPageHeader from "../InnerPageHeader";
// import "../../../Scripts/zipcode.js";
import YourOrders from "../ContractInstallation/YourOrders";
import Addons from "../ContractInstallation/Addons";
import InstallationAddress from "../Common/InstallationAddress";
import {
  Alert,
  Backdrop,
  Box,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import { axiosGet, axiosPost } from "../../Methods/Save";
import { APIURL } from "../../Methods/Fetch";
import { ClearLocalStorage } from "../Homepage/LocalStorage";
import { useRouter } from "next/router";
function ContractCheckout() {
  const navigate = useRouter();
  const orderId  = navigate.query?.params?.orderId;
  const [ids, setIds] = useState([]);
  const [vertical, setvertical] = useState("top");
  const [horizontal, sethori] = useState("right");
  const [signedIn, SetSignedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [addedProducts, setAddedProducts] = useState(
    JSON.parse(localStorage.getItem("addedProducts"))
  );
  const [addedRentalProducts, setAddedRentalProducts] = useState(
    JSON.parse(localStorage.getItem("addedRentalProducts"))
  );
  const [addedCategory, setAddedCategory] = useState(
    JSON.parse(localStorage.getItem("addedCategory"))
  );
  const [addonsParentCategory, setAddonsParentCategory] = useState([]);
  const [addedRentCategory, setAddedRentCategory] = useState(
    JSON.parse(localStorage.getItem("addedRentCategory"))
  );
  const [related_ids, setRelated_Ids] = useState(
    JSON.parse(localStorage.getItem("related_ids"))
  );
  const [rental_ids, setRental_Ids] = useState(
    JSON.parse(localStorage.getItem("rental_ids"))
  );
  const [addons, setAddOns] = useState([]);
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("addonproducts"))
  );
  const [monthlyTotal, setMonthlyTotal] = useState();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [upfrontPayment, setUpfrontPaymnet] = useState();
  const [userDetails, setuserDetails] = useState({});
  const [planDetails, setplanDetails] = useState({});
  const [deliveryPrice, setDeliveryPrice] = useState();
  const [rentalProducts, setRentalProducts] = useState(
    JSON.parse(localStorage.getItem("rentalProducts"))
  );
  useLayoutEffect(() => {
    const fetchData = async () => {
      ClearLocalStorage();
      setLoading(true);
      var url = APIURL() + `continue-order/${orderId}`;

      const result = await axiosGet(url);
      var planDetails = {};
      if (
        result.data.orderDetails.type != "mobile" &&
        result.data.orderDetails.type != "shop" &&
        result.data.orderDetails.type != "landline"
      ) {
        var affiliate_name = "";

        if (localStorage.getItem("affName") != null)
          affiliate_name = localStorage.getItem("affName");
        url = APIURL() + `get-product-availability`;
        var data = {
          ...result.data.orderDetails,
          affiliate_name: affiliate_name,
        };

        const result2 = await axiosPost(url, data);
        planDetails = result2.data[0].response.data;
      } else
        planDetails = {
          ...result.data.product,
        };
      let userData = result.data.userDetails;
      localStorage.setItem("user_details", JSON.stringify(userData));

      let addons = result.data.addonProducts;
      let monthlyPrice = Number(planDetails.price);
      let addons_ids = [];
      let addonsParentCategory = [];
      var upfront = planDetails.upfront_price ? planDetails.upfront_price : 0;
      var initial_installation_price = planDetails.installation_cost
        ? planDetails.installation_cost
        : 0;
      var upfrontPayment = Number(upfront) + Number(initial_installation_price);

      addons.forEach((element) => {
        monthlyPrice += Number(element.price);
        addons_ids.push(element.id);
        addonsParentCategory.push(element.add_cat_id);
      });
      localStorage.setItem("addons", JSON.stringify(addons));
      localStorage.setItem("addons_ids", JSON.stringify(addons_ids));
      localStorage.setItem(
        "addonsParentCategory",
        JSON.stringify(addonsParentCategory)
      );
      localStorage.setItem("startingmonthlyCost", planDetails.price);
      localStorage.setItem("monthlyTotal", monthlyPrice);
      localStorage.setItem("upfrontPayment", upfrontPayment);
      localStorage.setItem("initial_installation_price", upfrontPayment);
      localStorage.setItem("order_id", result.data.orderDetails.orderId);
      localStorage.setItem("checkout_started", true);
      localStorage.setItem("order_initiated", true);
      localStorage.setItem("Product", JSON.stringify(planDetails));
      localStorage.setItem(
        "chk_add_details",
        JSON.stringify(result.data.orderDetails)
      );
      setLoading(false);
    };
    if (orderId) fetchData();
  }, [orderId]);
  const goto = () => {
    var url = APIURL() + "store-order-step";
    var data = {
      order_id: localStorage.getItem("order_id"),
      order_step: "addon",
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

    if (
      !(
        (products && products.length > 0 && addedCategory.includes(2)) ||
        addedCategory.includes(26) ||
        addedCategory.includes(27)
      ) &&
      !(
        (rentalProducts &&
          rentalProducts.length > 0 &&
          addedRentCategory.includes(2)) ||
        addedRentCategory.includes(26) ||
        addedRentCategory.includes(27)
      )
    ) {
      setMessage("Please add at least one Internet Router");
      setOpen(true);
      return;
    }
    localStorage.setItem("deliveryPrice", deliveryPrice ? deliveryPrice : 0);
    localStorage.setItem("upfrontPayment", upfrontPayment ? upfrontPayment : 0);
    localStorage.setItem("addedProducts", JSON.stringify(addedProducts));
    localStorage.setItem(
      "addedRentalProducts",
      JSON.stringify(addedRentalProducts)
    );
    if (products)
      localStorage.setItem("addonproducts", JSON.stringify(products));
    localStorage.setItem("addedCategory", JSON.stringify(addedCategory));
    if (rentalProducts)
      localStorage.setItem("rentalProducts", JSON.stringify(rentalProducts));
    localStorage.setItem(
      "addedRentCategory",
      JSON.stringify(addedRentCategory)
    );
    if (deliveryPrice) localStorage.setItem("deliveryPrice", deliveryPrice);
    localStorage.setItem("monthlyTotal", monthlyTotal ? monthlyTotal : 0);

    navigate.push("/golive");
  };
  useEffect(() => {
    if (localStorage.getItem("user_id") != null) {
      SetSignedIn(true);
    }
  }, []);
  useEffect(() => {
    return () => {
      localStorage.setItem("edit_mode", true);
    };
  }, []);
  useEffect(() => {
    if (!loading) {
      setuserDetails(JSON.parse(localStorage.getItem("user_details")));
      setplanDetails(JSON.parse(localStorage.getItem("Product")));
      setMonthlyTotal(localStorage.getItem("monthlyTotal"));
      setUpfrontPaymnet(localStorage.getItem("upfrontPayment"));
    }
  }, [loading]);

  var bussiness_type = localStorage.getItem("bussiness_type");

  return (
    <>
      {loading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
          onBackdropClick="false"
        >
          <Box
            sx={{ position: "relative", display: "block", textAlign: "center" }}
          >
            <CircularProgress color="inherit" />
          </Box>
        </Backdrop>
      ) : (
        <>
          <InnerPageHeader
            activeTab="contract"
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
                <div className="col-xl-12">
                  <div className="address-title mb-5">
                    <h3>{userDetails?.first_name}, BOOST YOUR PLAN</h3>
                  </div>
                </div>
                <InstallationAddress />
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-xl-8">
                  <Addons
                    data="products"
                    addons={addons}
                    setAddOns={setAddOns}
                    products={products}
                    setProducts={setProducts}
                    monthlyTotal={monthlyTotal}
                    setMonthlyTotal={setMonthlyTotal}
                    upfrontPayment={upfrontPayment}
                    setUpfrontPaymnet={setUpfrontPaymnet}
                    rentalProducts={rentalProducts}
                    setRentalProducts={setRentalProducts}
                    ids={ids}
                    setIds={setIds}
                    setRelated_Ids={setRelated_Ids}
                    related_ids={related_ids}
                    rental_ids={rental_ids}
                    setRental_Ids={setRental_Ids}
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
                  registerandsave={goto}
                  addons={addons}
                  products={products}
                  upfrontPayment={upfrontPayment}
                  setUpfrontPaymnet={setUpfrontPaymnet}
                  setProducts={setProducts}
                  rentalProducts={rentalProducts}
                  deliveryPrice={deliveryPrice}
                  setDeliveryPrice={setDeliveryPrice}
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
              sx={{ width: "100%" }}
            >
              {message}
            </Alert>
          </Snackbar>
        </>
      )}
    </>
  );
}

export default ContractCheckout;
