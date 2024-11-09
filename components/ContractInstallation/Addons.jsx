import { React, useState, useEffect } from "react";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Accordion, Alert } from "@mui/material";
import { axiosGet, axiosPost } from "../../Methods/Save";
import Snackbar from "@mui/material/Snackbar";
import { APIURL } from "../../Methods/Fetch";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import RemoveSharpIcon from "@mui/icons-material/RemoveSharp";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import Image from "next/image";

function Addons(props) {
  const navigate = useRouter();
  const [open, setOpen] = useState(false);
  const [defaultProduct, setDefaultProduct] = useState([]);
  const [defaultRelatedProduct, setDefaultRelatedProduct] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const [vertical, setvertical] = useState("top");
  const [horizontal, sethori] = useState("right");
  const [message, setMessage] = useState("");
  const [alerttype, setAlertType] = useState("");

  var default_products = [];
  var default_products_id = [];
  var default_products_catId = [];
  var default_rental_products = {};

  var {
    setAddOns,
    setMonthlyTotal,
    monthlyTotal,
    addons,
    data,
    products,
    setProducts,
    setUpfrontPaymnet,
    upfrontPayment,
    rentalProducts,
    setRentalProducts,
    setIds,
    ids,
    related_ids,
    setRelated_Ids,
    rental_ids,
    setRental_Ids,
    addonsParentCategory,
    setAddonsParentCategory,
    addedCategory,
    setAddedCategory,
    addedRentCategory,
    setAddedRentCategory,
    setAddedRentalProducts,
    addedRentalProducts,
    setAddedProducts,
    addedProducts,
    setDeliveryPrice,
    agent,
    agentOrder,
  } = props;
  useEffect(() => {
    if (localStorage.getItem("addon_ids") !== null) {
      setIds(JSON.parse(localStorage.getItem("addon_ids")));
    }
    if (localStorage.getItem("addons") !== null) {
      setAddOns(JSON.parse(localStorage.getItem("addons")));
    }
    if (localStorage.getItem("related_ids") !== null) {
      setRelated_Ids(JSON.parse(localStorage.getItem("related_ids")));
    }
    if (localStorage.getItem("addonproducts") !== null) {
      setProducts(JSON.parse(localStorage.getItem("addonproducts")));
    }
    if (localStorage.getItem("rental_ids") !== null) {
      setRental_Ids(JSON.parse(localStorage.getItem("rental_ids")));
    }
    if (localStorage.getItem("rentalProducts") !== null) {
      setRentalProducts(JSON.parse(localStorage.getItem("rentalProducts")));
    }
    if (localStorage.getItem("addonsParentCategory") !== null) {
      setAddonsParentCategory(
        JSON.parse(localStorage.getItem("addonsParentCategory"))
      );
    }
  }, []);
  useEffect(() => {
    var page = localStorage.getItem("page") || "broadband";
    var id = JSON.parse(localStorage.getItem("Product"))?.id;
    if (data === "calling") {
      var url = APIURL() + `addons/${id}/${page}`;
    } else if (data === "products") {
      var url = APIURL() + `related_products/${id}/${page}`;
    }
    axiosGet(url).then((response) => {
      setCallingBundles(response.data[0].response.data);

      if (data === "products" && !agentOrder) {
        if (response.data[0].response.data.length === 0) navigate.push("/goLive");
      }
    });
  }, []);
  const [callingBundles, setCallingBundles] = useState();
  useEffect(() => {
    if (callingBundles && callingBundles.length > 0) {
      var page = localStorage.getItem("page") || "broadband";
      if (page == "broadband") {
        var page = localStorage.getItem("page") || "broadband";
        var id = JSON.parse(localStorage.getItem("Product")).id;
        var url = APIURL() + `default-Product`;
        var data = {
          product_id: id,
          product_type: page,
        };
        axiosPost(url, data).then((response) => {
          // setAddOns(response.data[0].response.addon_data.Subcategory);
          if (response.data[0].response.addon_data.Subcategory) {
            setDefaultProduct((oldArray) => [
              ...oldArray,
              ...response.data[0].response.addon_data.Subcategory,
            ]);
          }
          if (response.data[0].response.related_data.Subcategory)
            setDefaultRelatedProduct((oldArray) => [
              ...oldArray,
              ...response.data[0].response.related_data.Subcategory,
            ]);
        });
      }
    }
  }, [callingBundles]);

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setInitialLoad(false);
    setExpanded(isExpanded === true ? panel : 9999);
  };
  if (localStorage.getItem("monthlyTotal") !== null) {
    var startingmonthlyCost = localStorage.getItem("startingmonthlyCost");
  }
  if (localStorage.getItem("upfrontPayment") !== null) {
    var initial_installation_price = localStorage.getItem(
      "initial_installation_price"
    );
  }
  if (localStorage.getItem("initalmonthlyTotal") !== null) {
    var initalmonthlyTotal = localStorage.getItem("initalmonthlyTotal");
  }
  if (localStorage.getItem("upfrontPayment") !== null) {
    var initialUpfrontPayment = localStorage.getItem("upfrontPayment");
  }

  const removeProduct = (subcat, res) => {
    if (subcat.mandatory == 1) {
      setMessage("Product is mandatory hence cannot be removed");
      setAlertType("error");
      setOpen(true);
      return;
    }
    setMessage("Product removed");
    setAlertType("error");
    setOpen(true);
    setProducts((current) =>
      current.filter((product) => product.id !== subcat.id)
    );
    var ids_list = [...related_ids];
    var new_ids_list = ids_list.filter((id) => id !== subcat.id);
    setRelated_Ids(new_ids_list);
    setRentalProducts((current) =>
      current.filter((product) => product.id !== subcat.id)
    );
    setRental_Ids((id) => id.filter((product) => product !== subcat.id));

    setAddedCategory((addedCategory) =>
      addedCategory.filter((category) => category !== res.category_id)
    );
    setAddedRentCategory((addedCategory) =>
      addedCategory.filter((category) => category !== res.category_id)
    );
    // for (const property in addedProducts) {
    //   console.warn(property);
    // }
    var addpros = {};
    for (const [key, value] of Object.entries(addedProducts)) {
      if (value == subcat.id) {
        continue;
      } else {
        addpros[key] = value;
      }
    }
    setAddedProducts(addpros);
    var addrelpros = {};
    for (const [key, value] of Object.entries(addedRentalProducts)) {
      if (value == subcat.id) {
        continue;
      } else {
        addrelpros[key] = value;
      }
    }
    setAddedRentalProducts(addrelpros);
    // addedProducts.forEach(element => {
    //   console.warn(element);
    // });
    // setAddedProducts((addedProducts) =>
    //   addedProducts.filter((category) => category !== res.Category)
    // );
  };
  const addToExistingProduct = (subcat, res) => {
    setAddedProducts({ ...addedProducts, [res.category_id]: subcat.id });
    setOpen(true);
    setMessage("Added Successfully");
    setAlertType("success");
    setAddedCategory((addedCategory) => [...addedCategory, res.category_id]);
    setProducts((products) => [...products, subcat]);
    setRelated_Ids((oldArray) => [...related_ids, subcat.id]);
    // setUpfrontPaymnet(Number(upfrontPayment) + subcat.direct_price);
  };
  const replaceExistingProductDirect = (subcat, res) => {
    var id = "";
    var rent_id = "";
    var ids_list = [];
    var rental_ids_list = [];

    if (res.category_id in addedProducts) {
      id = addedProducts[res.category_id];
      setAddedProducts({ ...addedProducts, [res.category_id]: subcat.id });
      var new_list = products.filter((product) => product.id !== id);
      setProducts((oldArray) => [...new_list, subcat]);

      // var old_list = [...products];
      [...new_list, subcat].forEach((element) => {
        ids_list.push(element.id);
      });
      setRelated_Ids(ids_list);
    }
    if (res.category_id in addedRentalProducts) {
      rent_id = addedRentalProducts[res.category_id];
      var new_list_rent = rentalProducts.filter(
        (product) => product.id !== rent_id
      );
      // setAddedRentalProducts({
      //   ...addedRentalProducts,
      //   [res.category_id]: subcat.id,
      // });
      [...new_list_rent].forEach((element) => {
        rental_ids_list.push(element.id);
      });
      setRentalProducts((oldArray) => [...new_list_rent]);
      setRental_Ids(rental_ids_list);

      setAddedProducts({ ...addedProducts, [res.category_id]: subcat.id });
      var new_list = products.filter((product) => product.id !== id);
      setProducts((oldArray) => [...new_list, subcat]);

      // var old_list = [...products];
      [...new_list, subcat].forEach((element) => {
        ids_list.push(element.id);
      });
      setRelated_Ids(ids_list);
    }
    setOpen(true);
    setMessage("Replaced Successfully");
    setAlertType("success");
  };
  const replaceExistingProduct = (subcat, res) => {
    var id = "";
    var rent_id = "";
    var ids_list = [];
    var rental_ids_list = [];

    if (res.category_id in addedProducts) {
      id = addedProducts[res.category_id];
      rent_id = addedRentalProducts[res.category_id];
      // setAddedProducts({ ...addedProducts, [res.category_id]: subcat.id });
      var new_list = products.filter((product) => product.id !== id);
      setProducts((oldArray) => [...new_list]);

      // var old_list = [...products];
      [...new_list].forEach((element) => {
        ids_list.push(element.id);
      });
      setRelated_Ids(ids_list);
      var new_list_rent = rentalProducts.filter(
        (product) => product.id !== rent_id
      );
      setAddedRentalProducts({
        ...addedRentalProducts,
        [res.category_id]: subcat.id,
      });
      [...new_list_rent, subcat].forEach((element) => {
        rental_ids_list.push(element.id);
      });
      setRentalProducts((oldArray) => [...new_list_rent, subcat]);
      setRental_Ids(rental_ids_list);
    }
    if (res.category_id in addedRentalProducts) {
      rent_id = addedRentalProducts[res.category_id];
      var new_list_rent = rentalProducts.filter(
        (product) => product.id !== rent_id
      );
      setAddedRentalProducts({
        ...addedRentalProducts,
        [res.category_id]: subcat.id,
      });
      [...new_list_rent, subcat].forEach((element) => {
        rental_ids_list.push(element.id);
      });
      setRentalProducts((oldArray) => [...new_list_rent, subcat]);
      setRental_Ids(rental_ids_list);
    }
    setOpen(true);
    setMessage("Replaced Successfully");
    setAlertType("success");
  };
  const addNewProduct = (subcat, res) => {
    setAddedCategory((addedCategory) => [...addedCategory, res.category_id]);
    setAddedProducts({ ...addedProducts, [res.category_id]: subcat.id });
    setOpen(true);
    setMessage("Added Successfully");
    setAlertType("success");
    setProducts((oldArray) => [...oldArray, subcat]);
    setRelated_Ids((oldArray) => [...oldArray, subcat.id]);
    // setUpfrontPaymnet(Number(initialUpfrontPayment) + Number(subcat.direct_price));
  };
  const addNewRentalProduct = (subcat, res) => {
    setOpen(true);
    setMessage("Added Successfully");
    setAlertType("success");
    setAddedRentCategory((addedCategory) => [
      ...addedCategory,
      res.category_id,
    ]);
    setRentalProducts((oldArray) => [...oldArray, subcat]);
    setAddedRentalProducts({
      ...addedRentalProducts,
      [res.category_id]: subcat.id,
    });
    setRental_Ids((oldArray) => [...oldArray, subcat.id]);
    // setUpfrontPaymnet(Number(upfrontPayment) + subcat.direct_price);
  };
  useEffect(() => {
    var price = 0;
    var del_price = 0;
    if (products) {
      if (products.length > 0) {
        products.forEach((element) => {
          price += element.direct_price;
          del_price += element.delivery_price;
        });
      }
    }
    if (rentalProducts) {
      if (rentalProducts.length > 0) {
        rentalProducts.forEach((element) => {
          del_price += element.delivery_price;
        });
      }
    }

    if (products && data == "products") {
      localStorage.setItem("addonproducts", JSON.stringify(products));
      localStorage.setItem("related_ids", JSON.stringify(related_ids));
      localStorage.setItem("addedCategory", JSON.stringify(addedCategory));
      localStorage.setItem("addedProducts", JSON.stringify(addedProducts));
    }
    setUpfrontPaymnet(
      Number(initial_installation_price) + Number(price) + Number(del_price)
    );
    setDeliveryPrice(del_price);
  }, [products, initial_installation_price, rentalProducts]);
  // useEffect(() => {
  //   var price = 0;

  //   setMonthlyTotal(Number(startingmonthlyCost) + Number(price));
  // useEffect(() => {
  //   if (localStorage.getItem("edit_mode") == null && data == "products") {
  //     localStorage.setItem("addonproducts", JSON.stringify(products));
  //     localStorage.setItem("related_ids", JSON.stringify(related_ids));
  //   }
  // }, [products,localStorage.getItem("edit_mode")]);
  // }, [rentalProducts]);
  const removeAddons_multiple = (subcat) => {
    setOpen(true);
    setMessage("Add-On removed");
    setAlertType("error");
    var ids_list = [...ids];
    var new_ids_list = ids_list.filter((id) => id !== subcat.id);
    var old_list = [...addons];
    var new_list = old_list.filter((addon) => addon.id !== subcat.id);
    setAddOns(new_list);
    setIds(new_ids_list);
    // setMonthlyTotal(monthlyTotal - subcat.price);
  };
  const replaceAddons = (subcat, parent_id) => {
    setOpen(true);
    setMessage("Add-On Replaced");
    setAlertType("success");
    var ids_list = [];

    var old_list = [...addons];
    var new_list = old_list.filter((addon) => addon.category_id !== parent_id);
    new_list.push(subcat);
    new_list.forEach((element) => {
      ids_list.push(element.id);
    });
    setAddOns(new_list);
    setIds(ids_list);
  };
  useEffect(() => {
    var price = 0;
    var del_price = 0;
    if (addons && addons.length > 0) {
      addons.forEach((element) => {
        price += element.price;
      });
    }
    if (rentalProducts) {
      if (rentalProducts.length > 0) {
        rentalProducts.forEach((element) => {
          price += element.price;
        });
      }
    }
    if (rentalProducts && data == "products") {
      localStorage.setItem("rentalProducts", JSON.stringify(rentalProducts));
      localStorage.setItem("rental_ids", JSON.stringify(rental_ids));
      localStorage.setItem(
        "addedRentalProducts",
        JSON.stringify(addedRentalProducts)
      );
      localStorage.setItem(
        "addedRentCategory",
        JSON.stringify(addedRentCategory)
      );
    }
    setMonthlyTotal(Number(startingmonthlyCost) + Number(price));
  }, [addons, rentalProducts]);
  useEffect(() => {
    if (
      data === "calling" &&
      callingBundles &&
      callingBundles.length > 0 &&
      defaultProduct.length > 0 &&
      products.length == 0 &&
      rentalProducts.length == 0
    ) {
      defaultProduct.forEach((dp) => {
        callingBundles.forEach((cb) => {
          if (dp.category_id == cb.category_id) {
            cb.Subcategory.forEach((element) => {
              if (dp.id == element.id) {
                default_products.push(element);
                default_products_id.push(element.id);
                default_products_catId.push(dp.category_id);
              }
            });
          }
        });
      });
      setIds((oldArray) => [...ids, ...default_products_id]);
      setAddOns((oldArray) => [...addons, ...default_products]);
      setAddonsParentCategory((oldArray) => [
        ...addonsParentCategory,
        ...default_products_catId,
      ]);
    }
  }, [defaultProduct, data]);
  useEffect(() => {
    if (
      data === "products" &&
      callingBundles &&
      callingBundles?.length > 0 &&
      defaultRelatedProduct?.length > 0 &&
      products?.length == 0 &&
      rentalProducts?.length == 0
    ) {
      defaultRelatedProduct.forEach((dp) => {
        callingBundles.forEach((cb) => {
          if (dp.category_id == cb.category_id) {
            cb.Subcategory.forEach((element) => {
              if (dp.id == element.id) {
                default_products.push(element);
                default_products_id.push(element.id);
                default_products_catId.push(dp.category_id);
                default_rental_products[dp.category_id] = element.id;
                // default_products_category.push({cb.C}ategory:element.id});
              }
            });
          }
        });
      });
      setAddedRentalProducts(default_rental_products);
      setAddedRentCategory((addedCategory) => [
        ...addedCategory,
        ...default_products_catId,
      ]);
      setRentalProducts((oldArray) => [...oldArray, ...default_products]);
      // setAddedRentalProducts({
      //   ...addedRentalProducts,
      //   [res.Category]: subcat.id,
      // });
      setRental_Ids((oldArray) => [...oldArray, ...default_products_id]);
    }
  }, [defaultRelatedProduct, data]);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const [tab, setTab] = useState(0);

  const handleChange1 = (event, newValue) => {
    setTab(newValue);
  };
  return (
    <>
      {callingBundles && data == "calling"
        ? callingBundles.map((res, index) => (
            <Accordion
              key={index}
              onChange={handleChange(index)}
              expanded={index == expanded ? true : false}
            >
              <AccordionSummary
                expandIcon={
                  index == expanded ? (
                    <RemoveSharpIcon className="addremove" />
                  ) : (
                    <AddSharpIcon className="addremove" />
                  )
                }
              >
                <Typography>{res.Category}</Typography>
              </AccordionSummary>
              <AccordionDetails
                style={{ padding: "0", backgroundColor: "#f6f7f8" }}
              >
                <div className="accordion-body">
                  <Box sx={{ width: "100%" }}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <Tabs
                        value={tab}
                        onChange={handleChange1}
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                      >
                        {res.Subcategory
                          ? res.Subcategory.map((subcat, index) => (
                              <Tab
                                key={index}
                                label={subcat.name}
                                {...a11yProps(index)}
                              />
                            ))
                          : ""}
                      </Tabs>
                    </Box>
                    {res.Subcategory
                      ? res.Subcategory.map((subcat, index) => (
                          <TabPanel key={index} value={tab} index={index}>
                            <div className="row">
                              {/*<div className="addon-img col-lg-2 col-md-3 col-sm-3">
                                <img src={subcat.image ? subcat.image : o2} />
                      </div>*/}
                              <div className="addon-content col-lg-12 col-md-12 col-sm-12">
                                <div className="row">
                                  <div className="col-xl-12">
                                    <div className="row">
                                      <div className="col-xl-9 col-md-9 col-sm-9">
                                        <div className="addon-inner-text-title">
                                          <h4>{subcat.name}</h4>
                                        </div>
                                      </div>

                                      <div className="col-xl-3 col-md-3 col-sm-3">
                                        <p
                                          className="price-data"
                                          style={{
                                            marginBottom: "2px",
                                          }}
                                        >
                                          £
                                          {data == "products"
                                            ? subcat.price
                                            : Number(subcat.price).toFixed(
                                                2
                                              )}{" "}
                                        </p>
                                        {subcat.service_type == "rental" ? (
                                          <p className="price-data">
                                            £{Number(subcat.price).toFixed(2)} /
                                            Months
                                          </p>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-xl-12">
                                    <div className="row">
                                      <div className="col-xl-9 col-md-9 col-sm-9">
                                        <div className="learn-more-box">
                                          <div
                                            className=""
                                            dangerouslySetInnerHTML={{
                                              __html: subcat.description,
                                            }}
                                          ></div>
                                        </div>
                                      </div>
                                      <div className="col-xl-3 col-md-3 col-sm-3">
                                        {addons && addons.length > 0 ? (
                                          res.select_type == "Multiple" ? (
                                            ids.includes(subcat.id) ? (
                                              <a
                                                style={{
                                                  cursor: "pointer",
                                                }}
                                                className="btn-remove"
                                                onClick={(e) => {
                                                  removeAddons_multiple(subcat);
                                                }}
                                              >
                                                Remove
                                              </a>
                                            ) : (
                                              <a
                                                style={{
                                                  cursor: "pointer",
                                                }}
                                                className="btn-add"
                                                onClick={(e) => {
                                                  setOpen(true);
                                                  setMessage(
                                                    "Added Successfully"
                                                  );
                                                  setAlertType("success");

                                                  setAddOns((oldArray) => [
                                                    ...addons,
                                                    subcat,
                                                  ]);
                                                  // setMonthlyTotal(
                                                  //   monthlyTotal + subcat.price
                                                  // );
                                                  setIds((oldArray) => [
                                                    ...ids,
                                                    subcat.id,
                                                  ]);
                                                }}
                                              >
                                                Buy Now
                                              </a>
                                            )
                                          ) : ids.includes(subcat.id) ? (
                                            <a
                                              style={{
                                                cursor: "pointer",
                                              }}
                                              className="btn-remove"
                                              onClick={(e) => {
                                                setAddonsParentCategory([]);
                                                removeAddons_multiple(subcat);
                                              }}
                                            >
                                              Remove
                                            </a>
                                          ) : addonsParentCategory.includes(
                                              res.category_id
                                            ) ? (
                                            <a
                                              className="btn-add"
                                              style={{
                                                cursor: "pointer",
                                              }}
                                              onClick={(e) => {
                                                replaceAddons(
                                                  subcat,
                                                  res.category_id
                                                );
                                              }}
                                            >
                                              Replace
                                            </a>
                                          ) : (
                                            <a
                                              style={{
                                                cursor: "pointer",
                                              }}
                                              className="btn-add"
                                              onClick={(e) => {
                                                setOpen(true);
                                                setMessage(
                                                  "Added Successfully"
                                                );
                                                setAlertType("success");
                                                setAddOns((oldArray) => [
                                                  ...addons,
                                                  subcat,
                                                ]);
                                                setAddonsParentCategory(
                                                  (oldArray) => [
                                                    ...addonsParentCategory,
                                                    res.category_id,
                                                  ]
                                                );
                                                // setMonthlyTotal(
                                                //   monthlyTotal + subcat.price
                                                // );
                                                setIds((oldArray) => [
                                                  ...ids,
                                                  subcat.id,
                                                ]);
                                              }}
                                            >
                                              Buy Now
                                            </a>
                                          )
                                        ) : data == "calling" ? (
                                          <a
                                            style={{
                                              cursor: "pointer",
                                            }}
                                            className="btn-add"
                                            onClick={(e) => {
                                              if (addons.length > 0) {
                                                setOpen(true);
                                                setMessage(
                                                  "Only one add-on is allowed!"
                                                );
                                                setAlertType("error");
                                              } else {
                                                setOpen(true);
                                                setMessage(
                                                  "Added Successfully"
                                                );
                                                setAlertType("success");
                                                setAddOns((oldArray) => [
                                                  ...addons,
                                                  subcat,
                                                ]);
                                                setAddonsParentCategory(
                                                  (oldArray) => [
                                                    ...addonsParentCategory,
                                                    res.category_id,
                                                  ]
                                                );
                                                // setMonthlyTotal(
                                                //   Number(monthlyTotal) +
                                                //     Number(subcat.price)
                                                // );
                                                setIds((oldArray) => [
                                                  ...ids,
                                                  subcat.id,
                                                ]);
                                              }
                                            }}
                                          >
                                            Buy Now
                                          </a>
                                        ) : (
                                          ""
                                        )}
                                        {(products && products.length > 0) ||
                                        (rentalProducts &&
                                          rentalProducts.length > 0) ? (
                                          related_ids.includes(subcat.id) ||
                                          rental_ids.includes(subcat.id) ? (
                                            <div>
                                              <a
                                                style={{
                                                  cursor: "pointer",
                                                }}
                                                className="btn-remove mb-2"
                                                onClick={(e) =>
                                                  removeProduct(subcat, res)
                                                }
                                              >
                                                Remove
                                              </a>
                                            </div>
                                          ) : addedCategory.includes(
                                              res.Category
                                            ) ||
                                            addedRentCategory.includes(
                                              res.Category
                                            ) ? (
                                            <a
                                              style={{
                                                cursor: "pointer",
                                              }}
                                              className="btn-add"
                                              onClick={(e) =>
                                                replaceExistingProduct(
                                                  subcat,
                                                  res
                                                )
                                              }
                                            >
                                              Replace
                                            </a>
                                          ) : subcat.service_type ==
                                            "rental" ? (
                                            <div>
                                              <a
                                                style={{
                                                  cursor: "pointer",
                                                }}
                                                className="btn-add"
                                                onClick={(e) =>
                                                  addNewRentalProduct(
                                                    subcat,
                                                    res
                                                  )
                                                }
                                              >
                                                {subcat.price != 0
                                                  ? "Rent Monthly"
                                                  : "Free"}
                                              </a>
                                              <a
                                                style={{
                                                  cursor: "pointer",
                                                }}
                                                className="btn-add"
                                                onClick={(e) =>
                                                  addToExistingProduct(
                                                    subcat,
                                                    res
                                                  )
                                                }
                                              >
                                                Buy Now
                                              </a>
                                            </div>
                                          ) : data == "products" ? (
                                            <a
                                              style={{
                                                cursor: "pointer",
                                              }}
                                              className="btn-add"
                                              onClick={(e) =>
                                                addToExistingProduct(
                                                  subcat,
                                                  res
                                                )
                                              }
                                            >
                                              Buy Now
                                            </a>
                                          ) : (
                                            ""
                                          )
                                        ) : data == "products" ? (
                                          <div>
                                            {" "}
                                            <a
                                              style={{
                                                cursor: "pointer",
                                              }}
                                              className="btn-add"
                                              onClick={(e) =>
                                                addNewProduct(subcat, res)
                                              }
                                            >
                                              Buy Now
                                            </a>
                                            {subcat.service_type == "rental" ? (
                                              <a
                                                style={{
                                                  cursor: "pointer",
                                                }}
                                                className="btn-add"
                                                onClick={(e) =>
                                                  addNewRentalProduct(
                                                    subcat,
                                                    res
                                                  )
                                                }
                                              >
                                                {subcat.price != 0
                                                  ? "Rent Monthly"
                                                  : "Free"}
                                              </a>
                                            ) : (
                                              ""
                                            )}
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TabPanel>
                        ))
                      : ""}
                  </Box>
                </div>
              </AccordionDetails>
            </Accordion>
          ))
        : ""}
      {callingBundles && callingBundles.length > 0 && data == "products" ? (
        <>
          {agent ? (
            ""
          ) : (
            <div className="addon-main-title">
              <h4>Boost your plan with Pop telecoms best addons</h4>
              <p>
                Choose one of our great packages below to enhance your current
                plan
              </p>
            </div>
          )}

          <div className="contract-left-box-sec">
            {agent ? (
              ""
            ) : (
              <div className="contract-title">
                <h6>Your add ons</h6>
              </div>
            )}

            <div className="contract-content-box">
              <div className="adon-accordian-sec">
                <div className="accordion" id="accordionAddon">
                  {callingBundles
                    ? callingBundles.map((res, index) => (
                        <Accordion
                          key={index}
                          onChange={handleChange(index)}
                          expanded={index == expanded ? true : false}
                        >
                          <AccordionSummary
                            expandIcon={
                              index == expanded ? (
                                <RemoveSharpIcon className="addremove" />
                              ) : (
                                <AddSharpIcon className="addremove" />
                              )
                            }
                          >
                            <Typography>{res.Category}</Typography>
                          </AccordionSummary>
                          <AccordionDetails
                            style={{ padding: "0", backgroundColor: "#f6f7f8" }}
                          >
                            <div className="accordion-body">
                              {res.Subcategory
                                ? res.Subcategory.map((subcat, index) => (
                                    <div key={index} className="addon-box">
                                      <div
                                        class={
                                          subcat.recommended == true
                                            ? "ribbon ribbon-top-left"
                                            : ""
                                        }
                                      >
                                        <span
                                          className={
                                            subcat.recommended == true
                                              ? ""
                                              : "d-none"
                                          }
                                        >
                                          Recommended
                                        </span>
                                      </div>
                                      <div className="row">
                                        <div className="col-lg-2">
                                          <div className="addon-img">
                                            <Image height={400} width={400}
                                              src={
                                                subcat.image ? subcat.image : "/images/o2.png"
                                              }
                                              alt="o2"
                                            />
                                          </div>
                                        </div>
                                        <div className="col-lg-10">
                                          <div className="addon-content">
                                            <div className="row">
                                              <div className="col-xl-12">
                                                <div className="row">
                                                  <div className="col-xl-6 col-md-6">
                                                    <div className="addon-inner-text-title">
                                                      <h4>{subcat.name}</h4>
                                                    </div>
                                                    <div className="learn-more-box">
                                                      <a href="javascript:void(0)">
                                                        Learn more
                                                        <i className="fas fa-chevron-right" />
                                                      </a>
                                                      <div
                                                        className="category-show"
                                                        dangerouslySetInnerHTML={{
                                                          __html: subcat.description,
                                                        }}
                                                      >
                                                        {/*<ul>
                                                      <li>
                                                        Line Only :{" "}
                                                        <span>
                                                          {subcat.line_only ===
                                                          1
                                                            ? "Yes"
                                                            : "No"}
                                                        </span>
                                                      </li>
                                                      <li>
                                                        Standard Broadband :{" "}
                                                        <span>
                                                          {subcat.standard_broadband ===
                                                          1
                                                            ? "Yes"
                                                            : "No"}
                                                        </span>
                                                      </li>
                                                      <li>
                                                        Ultrafast :{" "}
                                                        <span>
                                                          {subcat.ultrafast ===
                                                          1
                                                            ? "Yes"
                                                            : "No"}
                                                        </span>
                                                      </li>
                                                      <li>
                                                        Rural Broadband :{" "}
                                                        <span>
                                                          {subcat.rural_broadband ===
                                                          1
                                                            ? "Yes"
                                                            : "No"}
                                                        </span>
                                                      </li>
                                                      <li>
                                                        Superfast :{" "}
                                                        <span>
                                                          {subcat.superfast ===
                                                          1
                                                            ? "Yes"
                                                            : "No"}
                                                        </span>
                                                      </li>
                                                          </ul>*/}
                                                      </div>
                                                    </div>
                                                  </div>

                                                  <div className="col-xl-6 col-md-6">
                                                    <div className="row">
                                                      <div className="col-xl-6 col-md-6 col-sm-6 col-6">
                                                        {addons &&
                                                        addons.length > 0 ? (
                                                          ids.includes(
                                                            subcat.id
                                                          ) ? (
                                                            <a
                                                              style={{
                                                                cursor:
                                                                  "pointer",
                                                              }}
                                                              className="btn-remove"
                                                              onClick={(e) => {
                                                                setAddonsParentCategory(
                                                                  []
                                                                );
                                                                removeAddons_multiple(
                                                                  subcat
                                                                );
                                                              }}
                                                            >
                                                              Remove
                                                            </a>
                                                          ) : addonsParentCategory.includes(
                                                              res.category_id
                                                            ) ? (
                                                            <a
                                                              className="btn-add"
                                                              style={{
                                                                cursor:
                                                                  "pointer",
                                                              }}
                                                              onClick={(e) => {
                                                                replaceAddons(
                                                                  subcat,
                                                                  res.category_id
                                                                );
                                                              }}
                                                            >
                                                              Replace
                                                            </a>
                                                          ) : data ==
                                                            "addons" ? (
                                                            <a
                                                              style={{
                                                                cursor:
                                                                  "pointer",
                                                              }}
                                                              className="btn-add"
                                                              onClick={(e) => {
                                                                setOpen(true);
                                                                setMessage(
                                                                  "Added Successfully"
                                                                );
                                                                setAlertType(
                                                                  "success"
                                                                );
                                                                setAddOns(
                                                                  (
                                                                    oldArray
                                                                  ) => [
                                                                    ...addons,
                                                                    subcat,
                                                                  ]
                                                                );
                                                                setAddonsParentCategory(
                                                                  (
                                                                    oldArray
                                                                  ) => [
                                                                    ...addonsParentCategory,
                                                                    res.category_id,
                                                                  ]
                                                                );
                                                                // setMonthlyTotal(
                                                                //   monthlyTotal +
                                                                //     subcat.price
                                                                // );
                                                                setIds(
                                                                  (
                                                                    oldArray
                                                                  ) => [
                                                                    ...ids,
                                                                    subcat.id,
                                                                  ]
                                                                );
                                                              }}
                                                            >
                                                              {Number(
                                                                subcat.direct_price
                                                              ) != 0
                                                                ? "Buy Now"
                                                                : "Free"}
                                                            </a>
                                                          ) : (
                                                            ""
                                                          )
                                                        ) : data ==
                                                          "calling" ? (
                                                          <a
                                                            style={{
                                                              cursor: "pointer",
                                                            }}
                                                            className="btn-add"
                                                            onClick={(e) => {
                                                              if (
                                                                addons.length >
                                                                0
                                                              ) {
                                                                setOpen(true);
                                                                setMessage(
                                                                  "Only one add-on is allowed!"
                                                                );
                                                                setAlertType(
                                                                  "error"
                                                                );
                                                              } else {
                                                                setOpen(true);
                                                                setMessage(
                                                                  "Added Successfully"
                                                                );
                                                                setAlertType(
                                                                  "success"
                                                                );
                                                                setAddOns(
                                                                  (
                                                                    oldArray
                                                                  ) => [
                                                                    ...addons,
                                                                    subcat,
                                                                  ]
                                                                );
                                                                setAddonsParentCategory(
                                                                  (
                                                                    oldArray
                                                                  ) => [
                                                                    ...addonsParentCategory,
                                                                    res.category_id,
                                                                  ]
                                                                );
                                                                // setMonthlyTotal(
                                                                //   Number(monthlyTotal) +
                                                                //     Number(subcat.price)
                                                                // );
                                                                setIds(
                                                                  (
                                                                    oldArray
                                                                  ) => [
                                                                    ...ids,
                                                                    subcat.id,
                                                                  ]
                                                                );
                                                              }
                                                            }}
                                                          >
                                                            {Number(
                                                              subcat.direct_price
                                                            ) != 0
                                                              ? "Buy Now"
                                                              : "Free"}
                                                          </a>
                                                        ) : (
                                                          ""
                                                        )}
                                                        {(products &&
                                                          products.length >
                                                            0) ||
                                                        (rentalProducts &&
                                                          rentalProducts.length >
                                                            0) ? (
                                                          related_ids.includes(
                                                            subcat.id
                                                          ) ||
                                                          rental_ids.includes(
                                                            subcat.id
                                                          ) ? (
                                                            <div>
                                                              <a
                                                                style={{
                                                                  cursor:
                                                                    "pointer",
                                                                }}
                                                                className="btn-remove mb-2"
                                                                onClick={(e) =>
                                                                  removeProduct(
                                                                    subcat,
                                                                    res
                                                                  )
                                                                }
                                                              >
                                                                Remove
                                                              </a>
                                                            </div>
                                                          ) : addedCategory.includes(
                                                              res.category_id
                                                            ) ||
                                                            addedRentCategory.includes(
                                                              res.category_id
                                                            ) ? (
                                                            <>
                                                             
                                                              <a
                                                                style={{
                                                                  cursor:
                                                                    "pointer",
                                                                }}
                                                                className="btn-add"
                                                                onClick={(e) =>
                                                                  replaceExistingProduct(
                                                                    subcat,
                                                                    res
                                                                  )
                                                                }
                                                              >
                                                                Replace
                                                              </a>
                                                              <a
                                                                style={{
                                                                  cursor:
                                                                    "pointer",
                                                                }}
                                                                className="btn-add"
                                                                onClick={(e) =>
                                                                  replaceExistingProductDirect(
                                                                    subcat,
                                                                    res
                                                                  )
                                                                }
                                                              >
                                                                Replace
                                                              </a>
                                                            </>
                                                          ) : subcat.service_type ==
                                                            "rental" ? (
                                                            <div>
                                                              <a
                                                                style={{
                                                                  cursor:
                                                                    "pointer",
                                                                }}
                                                                className="btn-add"
                                                                onClick={(e) =>
                                                                  addNewRentalProduct(
                                                                    subcat,
                                                                    res
                                                                  )
                                                                }
                                                              >
                                                                {subcat.price !=
                                                                0
                                                                  ? "Rent Monthly"
                                                                  : "Free"}
                                                              </a>
                                                              <a
                                                                style={{
                                                                  cursor:
                                                                    "pointer",
                                                                }}
                                                                className="btn-add"
                                                                onClick={(e) =>
                                                                  addToExistingProduct(
                                                                    subcat,
                                                                    res
                                                                  )
                                                                }
                                                              >
                                                                {Number(
                                                                  subcat.direct_price
                                                                ) != 0
                                                                  ? "Buy Now"
                                                                  : "Free"}
                                                              </a>
                                                            </div>
                                                          ) : (
                                                            <a
                                                              style={{
                                                                cursor:
                                                                  "pointer",
                                                              }}
                                                              className="btn-add"
                                                              onClick={(e) =>
                                                                addToExistingProduct(
                                                                  subcat,
                                                                  res
                                                                )
                                                              }
                                                            >
                                                              {Number(
                                                                subcat.direct_price
                                                              ) != 0
                                                                ? "Buy Now"
                                                                : "Free"}
                                                            </a>
                                                          )
                                                        ) : data ==
                                                          "products" ? (
                                                          <div>
                                                            <a
                                                              style={{
                                                                cursor:
                                                                  "pointer",
                                                              }}
                                                              className="btn-add"
                                                              onClick={(e) =>
                                                                addNewRentalProduct(
                                                                  subcat,
                                                                  res
                                                                )
                                                              }
                                                            >
                                                              {Number(
                                                                subcat.price
                                                              ) != 0
                                                                ? "Rent Monthly"
                                                                : "Free"}
                                                            </a>
                                                            {subcat.service_type ==
                                                            "rental" ? (
                                                              <a
                                                                style={{
                                                                  cursor:
                                                                    "pointer",
                                                                }}
                                                                className="btn-add"
                                                                onClick={(e) =>
                                                                  addNewProduct(
                                                                    subcat,
                                                                    res
                                                                  )
                                                                }
                                                              >
                                                                {subcat.direct_price !=
                                                                0
                                                                  ? "Buy Now"
                                                                  : "Free"}
                                                              </a>
                                                            ) : (
                                                              ""
                                                            )}
                                                          </div>
                                                        ) : (
                                                          ""
                                                        )}
                                                      </div>
                                                      <div className="col-xl-6 col-md-6 col-sm-6 col-6">
                                                        {subcat.service_type ==
                                                        "rental" ? (
                                                          <p className="price-data">
                                                            £
                                                            {Number(
                                                              subcat.price
                                                            ).toFixed(2)}{" "}
                                                            / Month
                                                          </p>
                                                        ) : (
                                                          ""
                                                        )}
                                                        <p
                                                          className="price-data"
                                                          style={{
                                                            marginBottom: "2px",
                                                          }}
                                                        >
                                                          £
                                                          {data == "products"
                                                            ? Number(
                                                                subcat.direct_price
                                                              ).toFixed(2)
                                                            : Number(
                                                                subcat.direct_price
                                                              ).toFixed(2)}{" "}
                                                        </p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))
                                : ""}
                            </div>
                          </AccordionDetails>
                        </Accordion>
                      ))
                    : ""}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}

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
    </>
  );
}

export default Addons;
