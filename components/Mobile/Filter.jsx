import { React, useState, useEffect, useRef } from "react";
import { APIURL } from "../../Methods/Fetch";
import { axiosGet, axiosPost } from "../../Methods/Save";
import PaginationIcons from "../Common/PaginationIcons";
import Fab from "@mui/material/Fab";
import CompareIcon from "@mui/icons-material/Compare";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import MobileModal from "./MobileModal";
import { useRouter } from "next/router";

function Filter(props) {
  const { page, type } = props;
  const [pageNo, setPageNo] = useState(1);
  var pro_type = type || "consumer";
  const navigate = useRouter();
  const tableRef = useRef();
  const [product, setProduct] = useState([]);
  const [ids, setIds] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const [Protype, setProtype] = useState([]);
  const [packages, setPackages] = useState([]);
  const [mobileNetworks, setMobileNetworks] = useState([]);
  const [monthlyCost, setMonthlyCost] = useState([]);
  const [minute, setMinute] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [textOffers, setTextOffers] = useState([]);
  const [spclOffers, setSpclOffers] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [compareProducts, setCompareProducts] = useState([]);
  const [sort, setSort] = useState();
  const [mobileData, setMobileData] = useState([]);
  const [min, setMin] = useState();
  const [max, setMax] = useState();
  const [count, setCount] = useState();
  const [total, setTotal] = useState();
  const [Includes, setIncludes] = useState();
  const [sms, setSms] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const posts = product.slice(firstPostIndex, lastPostIndex);
  const [open, setOpen] = useState(false);

  const [marks, setMarks] = useState([]);
  function valuetext(value) {
    return `£ ${value}`;
  }
  function valueLabelFormat(value) {
    return `£ ${value}`;
  }

  const handleClose = () => {
    setOpen(false);
  };
  const [filters, setFilters] = useState({
    service_provider_id: [],
    offer: [],
    monthly_cost: [],
    data: [],
    minute: [],
    contract: [],
    rating: "",
    text_offer: [],
    type: [],
    Includes: [],
    package: [],
    sms: [],
  });
  const handleChange = (event, newValue) => {
    setMonthlyCost(newValue);
  };
  const handleFilters = (e) => {
    const { name, value } = e.target;
    var old_list = [...filters[name]];
    var new_list = [];
    if (filters[name].indexOf(Number(value)) >= 0) {
      new_list = old_list.filter((present_id) => present_id !== Number(value));
    } else {
      new_list = [...old_list, Number(value)];
    }
    setFilters({
      ...filters,
      [name]: new_list,
    });
  };
  const [mobileOpen, setMobileOpen] = useState(false);

  // useEffect(() => {
  //   if (window.innerWidth < 767) setMobileOpen(true);
  //   else setMobileOpen(false);
  // }, [window.innerWidth]);
  const dataFilter = (data) => {
    var old_list = [...filters["data"]];
    var new_list = [];
    if (filters["data"].indexOf(Number(data)) >= 0) {
      new_list = old_list.filter((present_id) => present_id !== Number(data));
    } else {
      new_list = [...old_list, Number(data)];
    }
    setFilters({
      ...filters,
      ["data"]: new_list,
    });
  };
  useEffect(() => {
    var url = APIURL() + `${page}-products`;
    var data = {
      ...filters,
      product_type: pro_type,
    };
    setOpen(true);
    axiosPost(url, "", "", data).then((response) => {
      setProduct(response.data[0].response.data);
      setCount(response.data[0].response.count);
      setTotal(response.data[0].response.total);
      setIds(response.data[0].response.ids);
      setOpen(false);
      setCurrentPage(1);
      setInitialLoad(false);
      if (initialLoad == false) {
        tableRef.current.scrollIntoView();
      }
    });
  }, [filters]);
  useEffect(() => {
    var url = APIURL() + `${page}-monthly-cost/${pro_type}`;
    axiosGet(url).then((response) => {
      var numbers = [
        response.data[0].response.min_data,
        response.data[0].response.max_data,
      ];
      setMin(Number(response.data[0].response.min_data));
      setMax(Number(response.data[0].response.max_data));
      setMonthlyCost(numbers);
      setMarks([
        {
          value: Number(response.data[0].response.min_data),
          label: `£ ${Number(response.data[0].response.min_data)}`,
        },
        {
          value: Number(response.data[0].response.max_data),
          label: `£ ${Number(response.data[0].response.max_data)}`,
        },
      ]);
    });
  }, []);
  useEffect(() => {
    var data = { ids: ids, ...filters };
    var url = APIURL() + `${page}-type/${pro_type}`;
    axiosPost(url, "", "", data).then((response) => {
      setProtype(response.data[0].response.data);
    });
    var url = APIURL() + `${page}-networks/${pro_type}`;
    axiosPost(url, "", "", data).then((response) => {
      setMobileNetworks(response.data[0].response.data);
    });
    // url = APIURL() + `${page}-monthly-cost/${pro_type}`;
    // axiosGet(url).then((response) => {
    //   var numbers = [
    //     response.data[0].response.min_data,
    //     response.data[0].response.max_data,
    //   ];
    //   setMin(Number(response.data[0].response.min_data));
    //   setMax(Number(response.data[0].response.max_data));
    //   setMonthlyCost(numbers);
    //   setMarks([
    //     {
    //       value: Number(response.data[0].response.min_data),
    //       label: `£ ${Number(response.data[0].response.min_data)}`,
    //     },
    //     {
    //       value: Number(response.data[0].response.max_data),
    //       label: `£ ${Number(response.data[0].response.max_data)}`,
    //     },
    //   ]);
    // });
    url = APIURL() + `${page}-includes/${pro_type}`;
    axiosGet(url).then((response) => {
      setIncludes(response.data[0].response.data);
    });
    url = APIURL() + `${page}-minute/${pro_type}`;
    axiosPost(url, "", "", data).then((response) => {
      setMinute(response.data[0].response.data);
    });
    url = APIURL() + `${page}-contract-length/${pro_type}`;
    axiosPost(url, "", "", data).then((response) => {
      setContracts(response.data[0].response.data);
    });
    url = APIURL() + `${page}-texts-offers/${pro_type}`;
    axiosGet(url).then((response) => {
      setTextOffers(response.data[0].response.data);
    });
    url = APIURL() + `${page}-special-offers/${pro_type}`;
    axiosPost(url, "", "", data).then((response) => {
      setSpclOffers(response.data[0].response.data);
    });
    url = APIURL() + `${page}-rating/${pro_type}`;
    axiosGet(url).then((response) => {
      setSorting(response.data[0].response.data);
    });
    url = APIURL() + `${page}-data/${pro_type}`;
    axiosPost(url, "", "", data).then((response) => {
      setMobileData(response.data[0].response.data);
    });
    url = APIURL() + `${page}-package/${pro_type}`;
    axiosPost(url, "", "", data).then((response) => {
      setPackages(response.data[0].response.data);
    });
    url = APIURL() + `${page}-sms/${pro_type}`;
    axiosPost(url, "", "", data).then((response) => {
      setSms(response.data[0].response.data);
    });
  }, [ids]);
  const saveInLocal = (e, data) => {
    localStorage.setItem("Product", JSON.stringify(data));
    if (page == "topdeal") localStorage.setItem("page", data.package);
    else localStorage.setItem("page", page);
    var upfront = data.upfront_price ? data.upfront_price : 0;
    var initial_installation_price = data.installation_cost
      ? data.installation_cost
      : 0;
    var upfrontPayment = Number(upfront) + Number(initial_installation_price);
    localStorage.setItem(
      "upfrontPayment",
      upfrontPayment
    );
    localStorage.setItem("monthlyTotal", data.price ? data.price : 0);
    localStorage.setItem("startingmonthlyCost", data.price ? data.price : 0);
    localStorage.setItem(
      "initial_installation_price",
      upfrontPayment
    );
    navigate.push("/address");
  };
  useEffect(() => {
    const handleScroll = () => {
      const sticky = document.querySelector(".sticky_filter");
      const resultSec = document.querySelector(".result-sec");
      const ghodaAnda = document.querySelector(".ghoda_anda");
      const scroll = window.scrollY;

      if (window.innerWidth < 800) {
        if (scroll >= 1100 && scroll <= 4530) {
          sticky && sticky.classList.add("sticky_uma");
          resultSec && resultSec.classList.add("filter_margin_top");
          ghodaAnda && ghodaAnda.classList.add("filter_margin_top");
          ghodaAnda && ghodaAnda.classList.remove("d-none");
        } else {
          resultSec && resultSec.classList.remove("filter_margin_top");
          ghodaAnda && ghodaAnda.classList.remove("filter_margin_top");
          ghodaAnda && ghodaAnda.classList.add("d-none");
          sticky && sticky.classList.remove("sticky_uma");
        }
      } else {
        if (scroll >= 1100 && scroll <= 2700) {
          sticky && sticky.classList.add("sticky_uma");
          resultSec && resultSec.classList.add("filter_margin_top");
        } else {
          sticky && sticky.classList.remove("sticky_uma");
          resultSec && resultSec.classList.remove("filter_margin_top");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      const sticky = document.querySelector(".sticky_filter3");
      const scroll = window.scrollY;

      if (window.innerWidth < 800) {
        if (scroll >= 450 && scroll <= 1600) {
          sticky.classList.add("sticky_uma");
        } else {
          sticky.classList.remove("sticky_uma");
        }
      } else {
        if (scroll >= 450 && scroll <= 1450) {
          sticky.classList.add("sticky_uma");
        } else {
          sticky.classList.remove("sticky_uma");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <section
        ref={tableRef}
        className={
          type === "business"
            ? "business-mobile-btmsec result-sec pb-50 filter-blue"
            : "result-sec pb-50"
        }
        id="filter_section"
      >
        <div className="container-fluid">
          <div className="row">
            <div
              className={
                page == "topdeal"
                  ? "col-xl-12 sticky_filter3"
                  : "col-xl-12 sticky_filter"
              }
            >
              <div className="row">
                <div className="col-xl-3">
                  <div className="filter-result desktop_responsive">
                    <span>Filter Your Result</span>
                  </div>
                </div>
                <div className="col-xl-9">
                  <div className="filter-result">
                    <span className="desktop_responsive">
                      Showing {count} of {total} deals
                    </span>
                    <div className="sort-by-flex desktop_responsive">
                      <p>Sort By</p>
                      <select
                        name="rating"
                        className="form-select"
                        onChange={(e) => {
                          setFilters({ ...filters, rating: e.target.value });
                        }}
                      >
                        <option value="">Recommended</option>
                        <option value="price DESC">Price High to low</option>
                        <option value="price ASC">Price Low to High</option>
                        {page == "broadband" ? (
                          <option value="avg_download_speed ASC">
                            Speed Low to High
                          </option>
                        ) : (
                          ""
                        )}
                        {page == "broadband" ? (
                          <option value="avg_download_speed DESC">
                            Speed High to low
                          </option>
                        ) : (
                          ""
                        )}
                      </select>
                      <i
                        className="fas fa-question-circle"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="llorem epsum torent hkhhn ..."
                        data-bs-original-title
                      />
                    </div>
                    <div
                      className={
                        page == "topdeal"
                          ? "mob-filter-none sticky_filter3"
                          : "mob-filter-none sticky_filter"
                      }
                    >
                      <div className="row ">
                        <div className="col-lg-4 col-md-4">
                          <span>
                            Showing {count} of {total} deals
                          </span>
                        </div>
                        <div className="col-lg-4 col-md-4">
                          <select
                            name="rating"
                            className="form-select"
                            onChange={(e) =>
                              setFilters({ ...filters, rating: e.target.value })
                            }
                          >
                            {page == "broadband" ? (
                              <option value="avg_download_speed ASC">
                                Speed Low to High
                              </option>
                            ) : (
                              ""
                            )}
                            {page == "broadband" ? (
                              <option value="avg_download_speed DESC">
                                Speed High to low
                              </option>
                            ) : (
                              ""
                            )}

                            <option value="price DESC">
                              Price High to low
                            </option>
                            <option value="price ASC">Price Low to High</option>
                          </select>
                        </div>
                        <div className="col-lg-4 col-md-4">
                          <div className="filter-btn-mobile">
                            <a
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#filter-modal-mob"
                            >
                              <i className="fad fa-sliders-h" />
                              Filter
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 desktop_responsive">
              <div className="left-side-bar sticky_filter2">
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
                {/*{Includes && Includes.length > 0 ? (
                  <div className="left-box">
                    <div className="left-box-title">
                      <h6>Includes</h6>
                    </div>
                    <div className="left-box-check">
                      <ul>
                        {" "}
                        {Includes.map((spclOffer, index) => (
                          <li key={index}>
                            <input
                              type="checkbox"
                              value={spclOffer}
                              checked={
                                filters.Includes.includes(Number(spclOffer))
                                  ? true
                                  : false
                              }
                              name="includes"
                              onChange={(e) => handleFilters(e)}
                              id={`includes-${index}`}
                            />
                            <label
                              className="checkbox"
                              htmlFor={`includes-${index}`}
                            >
                              {spclOffer} <span>({spclOffer.count})</span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  ""
                )}*/}
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

                {sms && sms.length > 0 ? (
                  <div className="left-box">
                    <div className="left-box-title">
                      <h6>Sms</h6>
                    </div>
                    <div className="left-box-check">
                      <ul>
                        {sms.map((sms, index) => (
                          <li key={index}>
                            <input
                              type="checkbox"
                              value={sms.sms}
                              checked={
                                filters.sms.includes(Number(sms.sms))
                                  ? true
                                  : false
                              }
                              name="sms"
                              onChange={(e) => handleFilters(e)}
                              id={`sms-${index}`}
                            />
                            <label
                              className="checkbox"
                              htmlFor={`sms-${index}`}
                            >
                              {sms.name} <span>({sms.count})</span>
                            </label>
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

                {/*{textOffers && textOffers.length > 0 ? (
                  <div className="left-box">
                    <div className="left-box-title">
                      <h6>Texts</h6>
                    </div>
                    <div className="left-box-check">
                      <ul>
                        {textOffers.map((textoffer, index) => (
                          <li key={index}>
                            <input
                              type="checkbox"
                              value={textoffer.text_offer}
                              checked={
                                filters.text_offer.includes(
                                  Number(textoffer.text_offer)
                                )
                                  ? true
                                  : false
                              }
                              name="text_offer"
                              onChange={(e) => handleFilters(e)}
                              id={`text_offer-${index}`}
                            />
                            <label
                              className="checkbox"
                              htmlFor={`text_offer-${index}`}
                            >
                              {textoffer.name} <span>({textoffer.count})</span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  ""
                )}*/}
              </div>
            </div>
            <div className="mobile_responsive">
              {product.length > postsPerPage ? (
                <PaginationIcons
                  totalposts={product.length}
                  postsperpage={postsPerPage}
                  setCurrentPage={setCurrentPage}
                  tableRef={tableRef}
                  setPage={setPageNo}
                  page={pageNo}
                />
              ) : (
                ""
              )}
            </div>
            <div className="col-xl-9">
              <div className="right-side-box">
                {posts
                  ? posts.map((post, index) =>
                      page !== "topdeal" ? (
                        <div key={index} className="right-box">
                          <div className="right-box-flex">
                            <h5>{post.name}</h5>
                            <div className="left-box-check compare-flex">
                              <a
                                style={{ cursor: "pointer" }}
                                onClick={(e) => saveInLocal(e, post)}
                                className="btn-buy-deal"
                              >
                                BUY NOW
                              </a>
                            </div>
                          </div>
                          <div className="right-box-contract">
                            <div className="first-box list-box">
                              <h6>Contract length</h6>
                              <h6>Package</h6>
                              <ul>
                                {post.offer
                                  ? post.offer.map((offer, index) => (
                                      <li key={index}>{offer.offer_name}</li>
                                    ))
                                  : ""}
                              </ul>
                            </div>
                            <div className="second-box">
                              <h6>{post.contract_length}</h6>
                            </div>
                            <div className="third-box">
                              {post.avg_download_speed ? (
                                <div>
                                  <h6>{post.avg_download_speed}{page == "broadband" && " Mbps"}</h6>
                                  <span>Average UK Speed*</span>
                                </div>
                              ) : post.mob_data ? (
                                <div>
                                  <h6>{post.mob_data}</h6>
                                  <span>Data*</span>
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="four-box">
                              <h6>
                                £{Number(post.price).toFixed(2)}{" "}
                                {type === "business"
                                  ? "+VAT per month"
                                  : "per month"}
                              </h6>
                              {post.avg_download_speed ? (
                                <span>
                                  Average Speed {post.avg_download_speed}
                                </span>
                              ) : (
                                ""
                              )}

                              {post.feature
                                ? post.feature.map((feat, index) => (
                                    <span key={index}>{feat.feature_name}</span>
                                  ))
                                : ""}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div key={index} className="right-box">
                          <div className="right-box-flex">
                            <h5> {post.name}</h5>
                            <div className="left-box-check compare-flex">
                              <a
                                style={{ cursor: "pointer" }}
                                onClick={(e) => saveInLocal(e, post)}
                                className="btn-buy-deal"
                              >
                                BUY NOW
                              </a>
                            </div>
                          </div>
                          <div className="right-box-contract grid-v2">
                            <div className="first-box">
                              <div className="c-length-box">
                                <div className="c-length-box-flex">
                                  <div className="c-length-text">
                                    <h6>Contract length</h6>
                                    <h6>Package</h6>
                                  </div>
                                  <div className="c-length-text">
                                    <h6>{post.contract_length}</h6>
                                    <div>
                                      <i className="fal fa-plane" />
                                      <i className="fal fa-phone-alt" />
                                      <i className="fad fa-wifi" />
                                    </div>
                                  </div>
                                </div>
                                <div className="c-length-box1">
                                  <ul>
                                    {post.feature
                                      ? post.feature.map((feat, index) => (
                                          <li key={index}>
                                            <a href="#">{feat.feature_name}</a>
                                          </li>
                                        ))
                                      : ""}
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="third-box">
                              {post.avg_download_speed ? (
                                <div>
                                  <h6>{post.avg_download_speed}</h6>
                                  <span>Average UK Speed*</span>
                                </div>
                              ) : post.mob_data ? (
                                <div>
                                  <h6>{post.mob_data}</h6>
                                  <span>Data*</span>
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="four-box">
                              <h6>
                                £{Number(post.price).toFixed(2)}{" "}
                                {type === "business"
                                  ? "+VAT per month"
                                  : "per month"}
                              </h6>
                              {post.avg_download_speed ? (
                                <span>
                                  Average Speed {post.avg_download_speed}
                                </span>
                              ) : (
                                ""
                              )}

                              {post.feature
                                ? post.feature.map((feat, index) => (
                                    <span key={index}>{feat.feature_name}</span>
                                  ))
                                : ""}
                            </div>
                          </div>
                        </div>
                      )
                    )
                  : ""}
              </div>
              {product.length > postsPerPage ? (
                <PaginationIcons
                  totalposts={product.length}
                  postsperpage={postsPerPage}
                  setCurrentPage={setCurrentPage}
                  tableRef={tableRef}
                  setPage={setPageNo}
                  page={pageNo}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <Fab
          variant="extended"
          className={compareProducts.length > 1 ? "extended" : "d-none"}
          onClick={(e) => {
            localStorage.setItem(
              "compare_products",
              JSON.stringify(compareProducts)
            );
            navigate.push("/compare-products");
          }}
          style={{
            position: "fixed",
            bottom: "20px",
            left: "20px",
            backgroundColor: "#ec1b60",
            color: "#fff",
          }}
        >
          <CompareIcon sx={{ mr: 1 }} />
          Compare {compareProducts.length} Products
        </Fab>
      </section>
      <MobileModal
        spclOffers={spclOffers}
        filters={filters}
        handleFilters={handleFilters}
        mobileNetworks={mobileNetworks}
        monthlyCost={monthlyCost}
        handleChange={handleChange}
        valuetext={valuetext}
        valueLabelFormat={valueLabelFormat}
        min={min}
        max={max}
        marks={marks}
        setFilters={setFilters}
        dataFilter={dataFilter}
        minute={minute}
        contracts={contracts}
        textOffers={textOffers}
        count={count}
        mobileData={mobileData}
        Protype={Protype}
        packages={packages}
        page={page}
      />
    </>
  );
}

export default Filter;
