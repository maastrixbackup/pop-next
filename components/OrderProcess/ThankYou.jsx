import React, { useEffect } from "react";
import Footer from "../Footer";
import Header from "../Header";
import Content from "../ThankYou/Content";

function ThankYou({ paymentMode }) {
  return (
    <>
      <Header />
      <div className="body-box-margin">
        <Content paymentMode={paymentMode} />
        <Footer />
      </div>
    </>
  );
}

export default ThankYou;
