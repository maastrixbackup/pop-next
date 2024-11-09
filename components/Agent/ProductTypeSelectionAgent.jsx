import React from "react";

function ProductTypeSelectionAgent(props) {
  const {
    setPage,
    setType,
    setuserDetails,
    userDetails,
    page,
    setOrderType,
    type,
  } = props;
  const protypesel = (e) => {
    const { value } = e.target;
    setPage(value);
  };
  const protypesel1 = (e) => {
    const { value } = e.target;
    if (value == "upgrade") setOrderType("upgrade");
    else if (value == "CLN") setOrderType("CLN");
    else setOrderType("new");
    if (value == "business") {
      localStorage.setItem("bussiness_type", true);
    } else {
      localStorage.removeItem("bussiness_type");
    }
    setType(value);
  };
  return (
    <>
      <div className="col-xl-8 mx-auto mt-4 mb-4">
        <div className="success-address">
          <h4>Product Type</h4>
          <div className="row">
            <div className="col-xl-6">
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => protypesel(e)}
              >
                <option selected value="empty">
                  Product
                </option>
                <option
                  selected={page == "broadband" ? true : ""}
                  value="broadband"
                >
                  Broadband
                </option>
                <option
                  selected={page == "landline" ? true : ""}
                  value="landline"
                >
                  Landline
                </option>
                <option selected={page == "mobile" ? true : ""} value="mobile">
                  Mobile
                </option>
                {/*<option value="">Shop</option> */}
              </select>
            </div>
            <div className="col-xl-6">
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => protypesel1(e)}
              >
                <option selected value="">
                  Type
                </option>
                <option
                  selected={type == "consumer" ? true : ""}
                  value="consumer"
                >
                  Consumer
                </option>
                <option
                  selected={type == "business" ? true : ""}
                  value="business"
                >
                  Business
                </option>
                <option
                  selected={type == "upgrade" ? true : ""}
                  value="upgrade"
                >
                  Upgrade
                </option>
                <option value="CLN">CLN</option>
                <option value="Affiliate">Affiliate</option>
              </select>
            </div>
          </div>
          {page == "mobile" || page == "broadband" ? (
            <div className="row mt-4">
              <div className="col-xl-6">
                <input
                  type="text"
                  placeholder="LandLine Number"
                  className="form-control"
                  name="landline_no"
                  id="LandLineNumber"
                  value={userDetails.landline_no}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setuserDetails({ ...userDetails, [name]: value });
                  }}
                />
              </div>
              {page == "mobile" && (
                <div className="col-xl-6">
                  <input
                    type="text"
                    placeholder="PAC code"
                    className="form-control"
                    name="pac"
                    id="LandLineNumber"
                    value={page == "mobile" ? userDetails.pac : ""}
                    onChange={(e) => {
                      const { name, value } = e.target;
                      setuserDetails({ ...userDetails, [name]: value });
                    }}
                  />
                </div>
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default ProductTypeSelectionAgent;
