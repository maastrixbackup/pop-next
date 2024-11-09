import React from "react";
import { useEffect } from "react";
import { useRef } from "react";

function ReviewSectionTrustPilot() {
  const ref = useRef(null);
  useEffect(() => {
    // If window.Trustpilot is available it means that we need to load the TrustBox from our ref.
    // If it's not, it means the script you pasted into <head /> isn't loaded  just yet.
    // When it is, it will automatically load the TrustBox.
    if (window.Trustpilot) {
      window.Trustpilot.loadFromElement(ref.current, true);
    }
  }, []);

  return (
    <div className="container-fluid p-0">
      <div className="row">
        <div
          ref={ref}
          className="trustpilot-widget trust_pilot_full_height"
          data-locale="en-GB"
          data-template-id="54ad5defc6454f065c28af8b"
          data-businessunit-id="54736db600006400057bbc3c"
          data-style-height="240px"
          data-style-width="100%"
          data-theme="light"
          data-review-languages="en"
          data-stars="5"
        >
          <a
            href="https://uk.trustpilot.com/review/www.poptelecom.co.uk"
            target="_blank"
            rel="noopener"
          >
            Trustpilot
          </a>
        </div>
      </div>
    </div>
  );
}

export default ReviewSectionTrustPilot;
