import React from "react";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import Body from "../../../components/MakePayment/Body";
import Banner from "../../../components/MakePayment/Banner";

function MakePayment() {
  const  business  = true;
  return (
    <>
      <div className={business ? "buisness-mobile" : ""}>
        <div className={business ? "buisness" : ""}>
          <Header bussinesspage={business ? true : false} />
          <div className="body-box-margin">
            <Banner />
            <Body />

            <Footer bussinesspage={business ? true : false} />
          </div>
        </div>
      </div>
    </>
  );
}

export default MakePayment;
