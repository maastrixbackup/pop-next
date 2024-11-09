import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Image from "next/image";

function LoadingPage() {
  return (
    <>
      <>
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="check-out-logo">
                <Image
                  height={200}
                  width={200}
                  alt="logo"
                  src="/images/logo.png"
                />
              </div>
            </div>
          </div>
        </div>
        <section className="address-form-sec">
          <div className="container">
            <div className="row">
              <div className="col-xl-8 mx-auto">
                <div className="success-address">
                  <h4>We are just finding your address – Please Wait.</h4>
                </div>
                <hr />

                <div className="address-details">
                  <Box
                    sx={{
                      position: "relative",
                      display: "block",
                      textAlign: "center",
                    }}
                  >
                    <CircularProgress />
                  </Box>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    </>
  );
}

export default LoadingPage;
