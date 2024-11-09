import Image from "next/image";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";

function TrustPilotCustomerSection() {
  const ref = useRef(null);
  useEffect(() => {
    if (window.Trustpilot) {
      window.Trustpilot.loadFromElement(ref.current, true);
    }
  }, []);
  return (
    <div className="row">
      <div
        ref={ref}
        className="trustpilot-widget"
        data-locale="en-GB"
        data-template-id="53aa8807dec7e10d38f59f32"
        data-businessunit-id="54736db600006400057bbc3c"
        data-style-height="150px"
        data-theme="light"
      >
        <a
          href="https://uk.trustpilot.com/review/www.poptelecom.co.uk"
          target="_blank"
          rel="noopener"
        >
          Trustpilot
        </a>
      </div>
      <div className="col-lg-10">
        <div className="progress mb-4">
          <div
            className="progress-bar progress-bar-striped barColor"
            style={{ width: "80%" }}
            aria-valuenow={80}
          >
            <img src="/images/progress-img1.png" alt="image" />
          </div>
        </div>
      </div>
      <div className="col-lg-10">
        <div className="progress mb-4">
          <div
            className="progress-bar progress-bar-striped barColor5"
            style={{ width: "60%" }}
            aria-valuenow={60}
          >
            {/* <img src={vodafone} alt="image" /> */}
          </div>
        </div>
      </div>
      <div className="col-lg-10">
        <div className="progress mb-4">
          <div
            className="progress-bar progress-bar-striped barColor4"
            style={{ width: "50%" }}
            aria-valuenow={60}
          >
            {/* <img src={bt} alt="image" /> */}
          </div>
        </div>
      </div>
      <div className="col-lg-10">
        <div className="progress mb-4">
          <div
            className="progress-bar progress-bar-striped barColor2"
            style={{ width: "30%" }}
            aria-valuenow={60}
          >
            {/* <img src={progressimg2} alt="image" /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrustPilotCustomerSection;
