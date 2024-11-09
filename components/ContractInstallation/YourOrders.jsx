import { React, useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import { APIURL } from "../../Methods/Fetch";
import { axiosGet } from "../../Methods/Save";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SessionTimeout from "../../Methods/SessionTimeout";

function YourOrders(props) {
  const [vertical, setvertical] = useState("top");
  const [checkoutStarted, setCheckoutStarted] = useState(
    localStorage.getItem("checkout_started")
  );
  const [horizontal, sethori] = useState("right");
  const [vat, setVat] = useState(20);
  var {
    planDetails,
    registerandsave,
    addons,
    monthlyTotal,
    products,
    data,
    upfrontPayment,
    rentalProducts,
    priceBeforeDiscount,
    thankYoupage,
    lastPage,
    deliveryPrice,
    fasttrack_price,
    shop,
    contractPage,
    active,
    page,
  } = props;
  var bussiness_type = localStorage.getItem("bussiness_type");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [alerttype, setAlertType] = useState("");

  if (localStorage.getItem("discount") !== null) {
    var discount = JSON.parse(localStorage.getItem("discount"));
  }
  if (!priceBeforeDiscount && localStorage.getItem("originalPrice") !== null) {
    priceBeforeDiscount = localStorage.getItem("originalPrice");
  }
  if (localStorage.getItem("installation_cost") !== null) {
    var initial_installation_price = localStorage.getItem("installation_cost");
  }
  if (localStorage.getItem("goLiveDate") !== null) {
    var goLiveDate = JSON.parse(localStorage.getItem("goLiveDate"));
  }
  // localStorage.removeItem("fasttrack_price")

  // if (localStorage.getItem("fasttrack_price") !== null) {
  //   fasttrack_price = localStorage.getItem("fasttrack_price");
  // }

  if (!fasttrack_price) {
    if (localStorage.getItem("fasttrack_price") !== null) {
      fasttrack_price = localStorage.getItem("fasttrack_price");
    }
  }
  if (!deliveryPrice) {
    if (localStorage.getItem("deliveryPrice") !== null) {
      deliveryPrice = localStorage.getItem("deliveryPrice");
    }
  }
  if (!addons) {
    if (localStorage.getItem("addons") !== null) {
      addons = JSON.parse(localStorage.getItem("addons"));
    }
  }
  // if (!products) {
  //   if (localStorage.getItem("addonproducts") !== null) {
  //     products = JSON.parse(localStorage.getItem("addonproducts"));
  //   }
  // }
  if (!rentalProducts) {
    if (localStorage.getItem("rentalProducts") !== null) {
      rentalProducts = JSON.parse(localStorage.getItem("rentalProducts"));
    }
  }
  if (!monthlyTotal) {
    if (localStorage.getItem("monthlyTotal") !== null) {
      monthlyTotal = localStorage.getItem("monthlyTotal");
    }
  }
  if (!upfrontPayment) {
    if (localStorage.getItem("upfrontPayment") !== null) {
      upfrontPayment = localStorage.getItem("upfrontPayment");
    }
  }
  if (!planDetails) {
    if (localStorage.getItem("Product") !== null) {
      planDetails = JSON.parse(localStorage.getItem("Product"));
    }
  }
  var userDetails = JSON.parse(localStorage.getItem("user_details"));
  useEffect(() => {
    if (bussiness_type == "true") {
      var url = APIURL() + "business-vat";
      axiosGet(url);
    }
  }, []);
  useEffect(() => {
    var monthy_cost = (
      Number(monthlyTotal) +
      (vat / 100) * Number(monthlyTotal)
    ).toFixed(2);
    var upfront_total = (
      Number(upfrontPayment) +
      Number(upfrontPayment) * (vat / 100)
    ).toFixed(2);
    localStorage.setItem("vatMonthly", monthy_cost);
    localStorage.setItem("vatUpfront", upfront_total);
  }, []);

  return (
    <>
      {checkoutStarted && !thankYoupage ? <SessionTimeout /> : ""}

      <div
        className={data == "completionpage" ? "col-xl-8 mx-auto" : "col-xl-4"}
      >
        <div className="contract-right-box-sec sticky-top">
          <div className="order-title">
            <p>YOUR ORDER</p>
          </div>
          <div className="order-amount-box">
            {data === "payment" || (shop && !contractPage) ? (
              <div className="order-amount-box">
                <div className="or-amt-title">
                  <div>
                    <h6>Your Address</h6>
                    <p className="mb-2">{userDetails.address}</p>
                    {!shop ? (
                      <div>
                        <h6>Your go live date</h6>
                        <p className="mb-2">{goLiveDate}</p>
                      </div>
                    ) : (
                      ""
                    )}
                    <h6>Your {shop ? "product" : "plan"}</h6>
                    <div className="plan-edit-flex mb-2">
                      <p>{planDetails.name} </p>
                    </div>
                    {shop ? (
                      ""
                    ) : (
                      <div>
                        <div className="plan-edit-flex">
                          <h6>Your contract</h6>
                          <span>
                            <a href="#">
                              <i
                                className="fas fa-info-circle"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Contract length"
                              />
                            </a>
                          </span>
                        </div>
                        <div className="plan-edit-flex mb-2">
                          <p>{planDetails.contract_length}</p>
                        </div>
                        <h6>Your monthly price</h6>
                        <p className="mb-2">
                          £{Number(monthlyTotal).toFixed(2)} per month
                        </p>
                      </div>
                    )}

                    {data != "payment" ? (
                      <div className="plan-edit-flex">
                        <h6>{shop ? "Delivery charge" : "Your set-up fee"}</h6>
                      </div>
                    ) : (
                      ""
                    )}
                    {data != "payment" ? (
                      <p className="mb-2">
                        £{Number(upfrontPayment).toFixed(2)}{" "}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            {data != "payment" ? (
              <div>
                <div>
                  <Accordion defaultExpanded={true}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      className="accordion_details_uma"
                    >
                      <div className="or-amt-title">
                        <h6>What You Pay Today :</h6>
                        {priceBeforeDiscount ? (
                          <div>
                            <h5
                              style={{
                                textDecoration: "line-through",
                                color: "red",
                              }}
                            >
                              £{Number(priceBeforeDiscount).toFixed(2)}
                            </h5>
                            <h5>£{Number(upfrontPayment).toFixed(2)}</h5>
                          </div>
                        ) : bussiness_type == "true" ? (
                          <h5>
                            £
                            {(
                              Number(upfrontPayment) +
                              Number(upfrontPayment) * (vat / 100)
                            ).toFixed(2)}
                          </h5>
                        ) : (
                          <h5>£{Number(upfrontPayment).toFixed(2)}</h5>
                        )}
                      </div>
                    </AccordionSummary>
                    <AccordionDetails className="accordion_details_uma">
                      {planDetails && planDetails.installation_cost ? (
                        <div className="or-amt-title">
                          <span>Activation:</span>
                          <span>
                            {" "}
                            £{Number(planDetails.installation_cost).toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                      {page == "mobile" && (
                        <div className="or-amt-title">
                          <span>1st Months Line Rental in Advance :</span>
                          <span>£{Number(upfrontPayment).toFixed(2)}</span>
                        </div>
                      )}
                      {initial_installation_price ? (
                        <div className="or-amt-title">
                          <span>Installation Cost </span>
                        </div>
                      ) : (
                        ""
                      )}
                      {deliveryPrice ? (
                        <div className="or-amt-title">
                          <span>Delivery :</span>
                          <span>£{Number(deliveryPrice).toFixed(2)}</span>
                        </div>
                      ) : (
                        ""
                      )}

                      {discount ? (
                        <div className="or-amt-title">
                          <span>Discount : </span>
                          <span>{discount.title}</span>
                          <span style={{ color: "red" }}>
                            - £{discount.discount_amt}
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                      {products && products.length > 0
                        ? products.map((item, i) => (
                            <div key={i} className="t-link-flex">
                              <p>{item.name}</p>
                              <span>
                                £{Number(item.direct_price).toFixed(2)}
                              </span>
                            </div>
                          ))
                        : ""}
                      {active != "show" && fasttrack_price ? (
                        <div>
                          <div className="or-amt-title">
                            <span>FastTrack Connection : </span>
                            <span> £{Number(fasttrack_price).toFixed(2)}</span>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      {bussiness_type == "true" ? (
                        <div>
                          <div className="or-amt-title">
                            <span>Vat ({vat} %): </span>

                            <div>
                              <span>
                                £
                                {(Number(upfrontPayment) * (vat / 100)).toFixed(
                                  2
                                )}
                              </span>
                            </div>
                          </div>
                          <div className="or-amt-title">
                            <span>Total : </span>

                            <div>
                              <span>
                                £
                                {(
                                  Number(upfrontPayment) +
                                  Number(upfrontPayment) * (vat / 100)
                                ).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </AccordionDetails>
                  </Accordion>
                </div>
              </div>
            ) : (
              ""
            )}
            {data != "finalPage" ? (
              <div>
                {shop ? (
                  ""
                ) : (
                  <Accordion defaultExpanded={true}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      className="accordion_details_uma"
                    >
                      <div className="or-amt-title">
                        <h6>Monthly Total :</h6>
                        {bussiness_type == "true" ? (
                          <h5>
                            £
                            {(
                              Number(monthlyTotal) +
                              (vat / 100) * Number(monthlyTotal)
                            ).toFixed(2)}
                          </h5>
                        ) : (
                          <h5>£{Number(monthlyTotal).toFixed(2)}</h5>
                        )}
                      </div>
                    </AccordionSummary>
                    <AccordionDetails className="accordion_details_uma">
                      <div className="or-amt-title">
                        <span>{planDetails.name} :</span>
                        <span>£{Number(planDetails.price).toFixed(2)}</span>
                      </div>
                      {bussiness_type == "true" ? (
                        <div>
                          <div className="or-amt-title">
                            <h6>Vat ({vat} %):</h6>
                            <h5>
                              {" "}
                              £{" "}
                              {((vat / 100) * Number(monthlyTotal)).toFixed(2)}
                            </h5>
                          </div>
                          <div className="or-amt-title">
                            <h6>Total :</h6>
                            <h5>
                              £
                              {(
                                Number(monthlyTotal) +
                                (vat / 100) * Number(monthlyTotal)
                              ).toFixed(2)}
                            </h5>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="or-amt-title">
                        <div>
                          <ul>
                            {planDetails
                              ? planDetails.feature
                                ? planDetails.feature.map(
                                    (feature_item, index) => (
                                      <li key={index}>
                                        {feature_item.feature_name}
                                      </li>
                                    )
                                  )
                                : ""
                              : ""}
                            {planDetails.DownstreamPeakHour ||
                            planDetails.avg_download_speed ? (
                              <li>
                                Your Download speeds:{" "}
                                <b>
                                  {planDetails.DownstreamPeakHour
                                    ? planDetails.DownstreamPeakHour
                                    : planDetails.avg_download_speed}{" "}
                                  Mbps
                                </b>
                              </li>
                            ) : (
                              ""
                            )}
                            {planDetails.DownstreamPeakHour ||
                            planDetails.avg_upload_speed ? (
                              <li>
                                Your Upload speeds:{" "}
                                <b>
                                  {planDetails.UpstreamPeakHour
                                    ? planDetails.UpstreamPeakHour
                                    : planDetails.avg_upload_speed}{" "}
                                  Mbps
                                </b>
                              </li>
                            ) : (
                              ""
                            )}
                            {/*{planDetails.ideal_devices ? (
                        <li>
                          Ideal for <b>{planDetails.ideal_devices}</b> or
                          more devices
                        </li>
                      ) : (
                        ""
                      )}*/}
                          </ul>
                        </div>
                      </div>
                      {addons && addons.length > 0 ? (
                        <div className="or-amt-title">
                          <div className="flex-omit">
                            <h6>Calling Bundle</h6>
                            {addons.map((addon, i) => (
                              <div key={i} className="t-link-flex">
                                <p>{addon.name}</p>
                                <p>£{addon.price.toFixed(2)}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="or-amt-title">
                        <div className="flex-omit">
                          <h6>Additional Extras</h6>
                          <p className="mt-3 mb-2">
                            Minimum {planDetails.contract_length} contract
                          </p>
                          {rentalProducts && rentalProducts.length > 0
                            ? rentalProducts.map((item, i) => (
                                <div key={i} className="t-link-flex">
                                  <p>
                                    {item.name} <b>Rental</b>
                                  </p>
                                  <span>£{Number(item.price).toFixed(2)}</span>
                                </div>
                              ))
                            : ""}
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                )}
              </div>
            ) : (
              ""
            )}

            {data || lastPage ? (
              ""
            ) : (
              <div className="or-amt-title">
                <div>
                  <span className="mb-2">
                    {!deliveryPrice
                      ? "Proceed to checkout"
                      : `Equipment Delivery Charge/New Line Installation:£ ${deliveryPrice.toFixed(
                          2
                        )}`}
                  </span>

                  <a
                    style={{ cursor: "pointer" }}
                    onClick={registerandsave}
                    className="btn-chekout mb-2"
                  >
                    {shop ? "Checkout Page" : "Next Step"}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
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
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default YourOrders;
