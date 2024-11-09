import React from "react";
import Header from "../../../components/Header";
import { useRouter } from "next/router";

function NotAvailable() {
  const navigate = useRouter();
  return (
    <>
      <Header />

      <div className="not-ava-sec">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="not_found_parent">
                <div className="not_found_child">
                  <h1>Address not shown?</h1>

                  <p>
                    If you’re address is not displayed unfortunately we are
                    unable to service you at this time.
                    <br />
                    <br />
                    We aim to make Pop Telecom Broadband available to more homes
                    in the coming months. You’re welcome to come back at any
                    time to check if you’re home is available.
                  </p>
                  <div
                    className="btn btn-primary"
                    onClick={() => navigate.push("/address")}
                  >
                    Go back to Address Selection page.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotAvailable;
