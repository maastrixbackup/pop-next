import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
function InstallationAddress() {
  const [page, setPage] = useState("");
  const [user_details, setUserDetails] = useState({});
  useEffect(() => {
    if (localStorage.getItem("page") != null) {
      setPage(localStorage.getItem("page"));
    }
  }, []);
  const editAddress = () => {
    localStorage.setItem(
      "user_details",
      JSON.stringify({ ...user_details, address: "" })
    );
  };
  useEffect(() => {
    setUserDetails(JSON.parse(localStorage.getItem("user_details")));
  }, []);
  return (
    <>
      <div className="col-xl-12">
        <div className="contract-top-box-sec">
          <div className="address-home-title">
            {" "}
            <i className="fas fa-home-lg" />
            {page == "mobile" || page == "shop"
              ? "Delivery Address"
              : "Installation address"}
            : <strong>{user_details?.address}</strong>
          </div>
          <div>
            <Link onClick={editAddress} href="/address" className="edit-btn">
              Edit address <i className="fal fa-edit" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default InstallationAddress;
