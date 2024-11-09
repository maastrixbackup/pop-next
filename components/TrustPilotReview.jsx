import { React, useRef, useEffect } from "react";

function TrustPilotReview() {
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
    <div
      ref={ref}
      className="trustpilot-widget"
      data-locale="en-GB"
      data-template-id="56278e9abfbbba0bdcd568bc"
      data-businessunit-id="54736db600006400057bbc3c"
      data-style-height="52px"
      data-style-width="100%"
 
    >
      <a
        href="https://uk.trustpilot.com/review/www.poptelecom.co.uk"
        target="_blank"
        rel="noopener"
      >
        Trustpilot
      </a>
    </div>
  );
}

export default TrustPilotReview;
