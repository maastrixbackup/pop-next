import { React, useRef, useEffect } from "react";

function TrustPilot(props) {
  const { fullWidth, theme } = props;
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
    <>
      <div
        ref={ref} // We need a reference to this element to load the TrustBox in the effect.
        className="trustpilot-widget"
        data-locale="en-GB"
        data-template-id="5419b6ffb0d04a076446a9af"
        data-businessunit-id="54736db600006400057bbc3c"
        data-style-height="20px"
        data-style-width="100%"
        data-theme={theme ? theme : "light"}
        style={{
          textAlign: "left",
          margin: "0",
          display: "block",
          maxWidth: fullWidth ? "100%" : "420px",
        }}
      >
        <a
          href="https://www.trustpilot.com/review/example.com"
          target="_blank"
          rel="noopener"
        >
          {" "}
          Trustpilot
        </a>
      </div>
    </>
  );
}

export default TrustPilot;
