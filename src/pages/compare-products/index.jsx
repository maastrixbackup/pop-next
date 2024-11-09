import React from "react";
import CompareBanner from "../../../components/Compare/CompareBanner";
import Products from "../../../components/Compare/Products";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";


function Compare() {
  const  business  = false;
  return (
    <>
      <div className={business ? "buisness-mobile" : ""}>
        <div className={business ? "buisness" : ""}>
          <Header bussinesspage={business?true:false}/>
          <div className="body-box-margin">
            <CompareBanner />
            <Products />
            <Footer bussinesspage={business?true:false}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Compare;
