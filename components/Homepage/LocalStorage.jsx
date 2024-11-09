import React, { useEffect } from "react";
export const ClearLocalStorage = () => {
  localStorage.removeItem("checkout_started");
  localStorage.removeItem("installation_cost");
  localStorage.removeItem("rentalProducts");
  localStorage.removeItem("directDebitDetails");
  localStorage.removeItem("fasttrack_price");
  localStorage.removeItem("fasttrack_connection");
  localStorage.setItem("addonproducts", JSON.stringify([]));
  localStorage.setItem("related_ids", JSON.stringify([]));
  localStorage.setItem("rental_ids", JSON.stringify([]));
  localStorage.setItem("rentalProducts", JSON.stringify([]));
  localStorage.setItem("addedCategory", JSON.stringify([]));
  localStorage.setItem("addedRentCategory", JSON.stringify([]));
  localStorage.setItem("addedProducts", JSON.stringify([]));
  localStorage.setItem("addedRentalProducts", JSON.stringify([]));
  localStorage.removeItem("order_no");
  localStorage.removeItem("deliveryPrice");
  localStorage.removeItem("accountInfo");
  localStorage.removeItem("Product");
  localStorage.removeItem("duplicate-email");
  localStorage.removeItem("addons");
  localStorage.removeItem("payment_details");
  localStorage.removeItem("upfrontPayment");
  localStorage.removeItem("monthlyTotal");
  localStorage.removeItem("directdebit");
  localStorage.removeItem("initalmonthlyTotal");
  localStorage.removeItem("page");
  localStorage.removeItem("wifiDetails");
  localStorage.removeItem("payment_completed");
  localStorage.removeItem("originalPrice");
  localStorage.removeItem("discount");
  localStorage.removeItem("order_initiated");
  localStorage.removeItem("PostCode");
  localStorage.removeItem("connection_info");
  localStorage.removeItem("goLiveDate");
  localStorage.removeItem("chk_add_details");
  localStorage.removeItem("order_id");
  localStorage.removeItem("address_details");
  localStorage.removeItem("paymentPage");
  localStorage.removeItem("addon_ids");
  localStorage.removeItem("addons");
  localStorage.removeItem("vatUpfront");
  localStorage.removeItem("vatMonthly");
  localStorage.removeItem("addonsParentCategory");
  localStorage.removeItem("startingmonthlyCost");
  localStorage.removeItem("initial_installation_price");
  localStorage.removeItem("urpn");
  localStorage.removeItem("AccessLineID");
  localStorage.removeItem("appointment_note");
  localStorage.removeItem("appointment_slot");
  localStorage.removeItem("uprn");
  localStorage.removeItem("marketing_preference");
  localStorage.removeItem("paymentCompleted");
  localStorage.removeItem("affName");
  localStorage.removeItem("successPaymentDetails");
  localStorage.removeItem("affProduct");
  localStorage.removeItem("paymentDone");
};

function LocalStorage() {
  useEffect(() => {
    ClearLocalStorage();
  }, []);
  return <></>;
}

export default LocalStorage;
