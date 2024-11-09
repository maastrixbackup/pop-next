import React, { useEffect } from "react";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function MobileFilter(props) {
  const {
    filters,
    handleFilters,
    monthlyCost,
    handleChange,
    valuetext,
    valueLabelFormat,
    min,
    max,
    marks,
    setFilters,
    count,
    productType,
    shopMake,
    wifiUse,
    wifiBand,
    ethernetSpeed,
    broadBandType,
    page,
    Protype
  } = props;
useEffect(() => {
}, [])
  return (
    <>
      <div>
        <div
          className="modal fade"
          id="filter-modal-mob"
          tabIndex={-1}
          aria-labelledby="filtermodalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Filter
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <div className="col-xl-3">
                  <div className="left-side-bar">
                    {Protype && Protype.length > 0 ? (
                      <div className="left-box">
                        <div className="left-box-title">
                          <h6>
                            {page == "landline"
                              ? "Hosted"
                              : page == "broadband"
                              ? "Broadband"
                              : page}{" "}
                            Type
                          </h6>
                        </div>
                        <div className="left-box-check">
                          <ul>
                            {" "}
                            {Protype.map((spclOffer, index) => (
                              <li key={index}>
                                <input
                                  type="checkbox"
                                  value={spclOffer.type}
                                  checked={
                                    filters.type.includes(
                                      Number(spclOffer.type)
                                    )
                                      ? true
                                      : false
                                  }
                                  name="type"
                                  onChange={(e) => handleFilters(e)}
                                  id={`type-${index}`}
                                />
                                <label
                                  className="checkbox"
                                  htmlFor={`type-${index}`}
                                >
                                  {spclOffer.name}{" "}
                                  <span>({spclOffer.count})</span>
                                </label>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    {productType && productType.length > 0 ? (
                      <div className="left-box">
                        <div className="left-box-title">
                          <h6>Product Type</h6>
                        </div>
                        <div className="left-box-check">
                          <ul>
                            {" "}
                            {productType.map((spclOffer, index) => (
                              <li key={index}>
                                <input
                                  type="checkbox"
                                  value={spclOffer.category_id}
                                  checked={
                                    filters.category_id.includes(
                                      Number(spclOffer.category_id)
                                    )
                                      ? true
                                      : false
                                  }
                                  name="category_id"
                                  onChange={(e) => handleFilters(e)}
                                  id={`pro_type-${index}`}
                                />
                                <label
                                  className="checkbox"
                                  htmlFor={`pro_type-${index}`}
                                >
                                  {spclOffer.name}{" "}
                                  <span>({spclOffer.count})</span>
                                </label>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    {shopMake && shopMake.length > 0 ? (
                      <div className="left-box">
                        <div className="left-box-title">
                          <h6>Make</h6>
                        </div>
                        <div className="left-box-check">
                          <ul>
                            {" "}
                            {shopMake.map((spclOffer, index) => (
                              <li key={index}>
                                <input
                                  type="checkbox"
                                  value={spclOffer.make}
                                  checked={
                                    filters.make.includes(
                                      Number(spclOffer.make)
                                    )
                                      ? true
                                      : false
                                  }
                                  name="make"
                                  onChange={(e) => handleFilters(e)}
                                  id={`make-${index}`}
                                />
                                <label
                                  className="checkbox"
                                  htmlFor={`make-${index}`}
                                >
                                  {spclOffer.name}{" "}
                                  <span>({spclOffer.count})</span>
                                </label>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="left-box">
                      <div className="left-box-title">
                        <h6>Monthly Cost</h6>
                      </div>
                      <div className="left-box-check">
                        <Box>
                          <Slider
                            value={monthlyCost}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                            getAriaValueText={valuetext}
                            valueLabelFormat={valueLabelFormat}
                            min={min}
                            step={1}
                            max={max}
                            marks={marks}
                            onChangeCommitted={(e, newValue) =>
                              setFilters({
                                ...filters,
                                monthly_cost: newValue,
                              })
                            }
                          />
                        </Box>
                      </div>
                    </div>
                    {wifiUse && wifiUse.length > 0 ? (
                      <div className="left-box">
                        <div className="left-box-title">
                          <h6>Wifi Use</h6>
                        </div>
                        <div className="left-box-check">
                          <ul>
                            {" "}
                            {wifiUse.map((spclOffer, index) => (
                              <li key={index}>
                                <input
                                  type="checkbox"
                                  value={spclOffer.wifi_use}
                                  checked={
                                    filters.wifi_use.includes(
                                      Number(spclOffer.wifi_use)
                                    )
                                      ? true
                                      : false
                                  }
                                  name="wifi_use"
                                  onChange={(e) => handleFilters(e)}
                                  id={`wifi_use-${index}`}
                                />
                                <label
                                  className="checkbox"
                                  htmlFor={`wifi_use-${index}`}
                                >
                                  {spclOffer.name}{" "}
                                  <span>({spclOffer.count})</span>
                                </label>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    {wifiBand && wifiBand.length > 0 ? (
                      <div className="left-box">
                        <div className="left-box-title">
                          <h6>Wifi Band</h6>
                        </div>
                        <div className="left-box-check">
                          <ul>
                            {" "}
                            {wifiBand.map((spclOffer, index) => (
                              <li key={index}>
                                <input
                                  type="checkbox"
                                  value={spclOffer.wifi_band}
                                  checked={
                                    filters.wifi_band.includes(
                                      Number(spclOffer.wifi_band)
                                    )
                                      ? true
                                      : false
                                  }
                                  name="wifi_band"
                                  onChange={(e) => handleFilters(e)}
                                  id={`wifi_band-${index}`}
                                />
                                <label
                                  className="checkbox"
                                  htmlFor={`wifi_band-${index}`}
                                >
                                  {spclOffer.name}{" "}
                                  <span>({spclOffer.count})</span>
                                </label>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    {ethernetSpeed && ethernetSpeed.length > 0 ? (
                      <div className="left-box">
                        <div className="left-box-title">
                          <h6>Ethenet Speed</h6>
                        </div>
                        <div className="left-box-check">
                          <ul>
                            {" "}
                            {ethernetSpeed.map((spclOffer, index) => (
                              <li key={index}>
                                <input
                                  type="checkbox"
                                  value={spclOffer.ethernet_speed}
                                  checked={
                                    filters.ethernet_speed.includes(
                                      Number(spclOffer.ethernet_speed)
                                    )
                                      ? true
                                      : false
                                  }
                                  name="ethernet_speed"
                                  onChange={(e) => handleFilters(e)}
                                  id={`ethernet_speed-${index}`}
                                />
                                <label
                                  className="checkbox"
                                  htmlFor={`ethernet_speed-${index}`}
                                >
                                  {spclOffer.name}{" "}
                                  <span>({spclOffer.count})</span>
                                </label>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    {broadBandType && broadBandType.length > 0 ? (
                      <div className="left-box">
                        <div className="left-box-title">
                          <h6>Broadband Type</h6>
                        </div>
                        <div className="left-box-check">
                          <ul>
                            {" "}
                            {broadBandType.map((spclOffer, index) => (
                              <li key={index}>
                                <input
                                  type="checkbox"
                                  value={spclOffer.broadband_type}
                                  checked={
                                    filters.broadband_type.includes(
                                      Number(spclOffer.broadband_type)
                                    )
                                      ? true
                                      : false
                                  }
                                  name="broadband_type"
                                  onChange={(e) => handleFilters(e)}
                                  id={`broadband_type-${index}`}
                                />
                                <label
                                  className="checkbox"
                                  htmlFor={`broadband_type-${index}`}
                                >
                                  {spclOffer.name}{" "}
                                  <span>({spclOffer.count})</span>
                                </label>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-show"
                  data-bs-dismiss="modal"
                >
                  Show results ({count})
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MobileFilter;
