import { React, useState, useEffect } from "react";
import { APIURL } from "../../Methods/Fetch";
import { axiosGet, axiosPost } from "../../Methods/Save";
import PaginationIcons from "../Common/PaginationIcons";
import Fab from "@mui/material/Fab";
import CompareIcon from "@mui/icons-material/Compare";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";

function MobileModal(props) {
  const {
    spclOffers,
    filters,
    handleFilters,
    mobileNetworks,
    monthlyCost,
    handleChange,
    valuetext,
    valueLabelFormat,
    min,
    max,
    marks,
    setFilters,
    dataFilter,
    minute,
    contracts,
    textOffers,
    count,
    mobileData,
    page,
    Protype,
    packages
  } = props;
  return (
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
                                filters.type.includes(Number(spclOffer.type))
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
                              {spclOffer.name} <span>({spclOffer.count})</span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  ""
                )}                
                {packages && packages.length > 0 ? (
                  <div className="left-box">
                    <div className="left-box-title">
                      <h6>Products</h6>
                    </div>
                    <div className="left-box-check">
                      <ul>
                        {" "}
                        {packages.map((spclOffer, index) => (
                          <li key={index}>
                            <input
                              type="checkbox"
                              value={spclOffer.package}
                              checked={
                                filters.package.includes(
                                  Number(spclOffer.package)
                                )
                                  ? true
                                  : false
                              }
                              name="package"
                              onChange={(e) => handleFilters(e)}
                              id={`package-${index}`}
                            />
                            <label
                              className="checkbox"
                              htmlFor={`package-${index}`}
                            >
                              {spclOffer.name} <span>({spclOffer.count})</span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {spclOffers && spclOffers.length > 0 ? (
                  <div className="left-box">
                    <div className="left-box-title">
                      <h6>Special Offers</h6>
                    </div>
                    <div className="left-box-check">
                      <ul>
                        {" "}
                        {spclOffers.map((spclOffer, index) => (
                          <li key={index}>
                            <input
                              type="checkbox"
                              value={spclOffer.offer}
                              checked={
                                filters.offer.includes(Number(spclOffer.offer))
                                  ? true
                                  : false
                              }
                              name="offer"
                              onChange={(e) => handleFilters(e)}
                              id={`offer-${index}`}
                            />
                            <label
                              className="checkbox"
                              htmlFor={`offer-${index}`}
                            >
                              {spclOffer.name} <span>({spclOffer.count})</span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {mobileNetworks && mobileNetworks.length > 0 ? (
                  <div className="left-box">
                    <div className="left-box-title">
                      <h6>{page == "topdeal" ? "Type" : "Network"}</h6>
                    </div>
                    <div className="left-box-check">
                      <ul>
                        {mobileNetworks.map((network, index) => (
                          <li key={index}>
                            <input
                              type="checkbox"
                              value={network.service_provider_id}
                              checked={
                                filters.service_provider_id.includes(
                                  Number(network.service_provider_id)
                                )
                                  ? true
                                  : false
                              }
                              name="service_provider_id"
                              onChange={(e) => handleFilters(e)}
                              id={`service_provider_id-${index}`}
                            />
                            <label
                              className="checkbox"
                              htmlFor={`service_provider_id-${index}`}
                            >
                              {network.name} <span>({network.count})</span>
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
                      <p>Please drag slider to filter by price</p>
                      <Slider
                        sx={{
                          width: "90%",
                          padding: "13px 0",
                          textAlign: "center",
                          margin: "auto auto 20px auto",
                        }}
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

                {mobileData && mobileData.length > 0 ? (
                  <div className="left-box">
                    <div className="left-box-title">
                      <h6>Data</h6>
                    </div>
                    <div className="left-box-check">
                      <ul>
                        {" "}
                        {mobileData.map((mobData, index) => (
                          <li key={index}>
                            <span
                              className={
                                filters.data.includes(Number(mobData.data))
                                  ? "data-bg bg-primary"
                                  : "data-bg"
                              }
                              name="data"
                              onClick={(e) => dataFilter(mobData.data)}
                              style={{ cursor: "pointer" }}
                            >
                              {mobData.name}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {minute && minute.length > 0 ? (
                  <div className="left-box">
                    <div className="left-box-title">
                      <h6>Minutes</h6>
                    </div>
                    <div className="left-box-check">
                      <ul>
                        {minute.map((minute, index) => (
                          <li key={index}>
                            <input
                              type="checkbox"
                              value={minute.minute}
                              checked={
                                filters.minute.includes(Number(minute.minute))
                                  ? true
                                  : false
                              }
                              name="minute"
                              onChange={(e) => handleFilters(e)}
                              id={`minute-${index}`}
                            />
                            <label
                              className="checkbox"
                              htmlFor={`minute-${index}`}
                            >
                              {minute.name} <span>({minute.count})</span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {contracts && contracts.length > 0 ? (
                  <div className="left-box">
                    <div className="left-box-title">
                      <h6>Contract</h6>
                    </div>
                    <div className="left-box-check">
                      <ul>
                        {contracts.map((contract, index) => (
                          <li key={index}>
                            <input
                              type="checkbox"
                              value={contract.contract}
                              checked={
                                filters.contract.includes(
                                  Number(contract.contract)
                                )
                                  ? true
                                  : false
                              }
                              name="contract"
                              onChange={(e) => handleFilters(e)}
                              id={`contract-${index}`}
                            />
                            <label
                              className="checkbox"
                              htmlFor={`contract-${index}`}
                            >
                              {contract.name} <span>({contract.count})</span>
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
  );
}

export default MobileModal;
