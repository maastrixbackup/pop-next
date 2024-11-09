import { React, useEffect, useState, useRef } from "react";
import { APIURL } from "../../Methods/Fetch";
import { axiosGet, axiosPost } from "../../Methods/Save";
import PaginationIcons from "../Common/PaginationIcons";
import Fab from "@mui/material/Fab";
import CompareIcon from "@mui/icons-material/Compare";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import MobileModal from "../Mobile/MobileModal";
import MobileFilter from "./MobileFilter";
import { useRouter } from "next/router";
import Image from "next/image";

function Filter(props) {
  const { bussinessPage } = props;
  const [ids, setIds] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const tableRef = useRef();
  const [initialLoad, setInitialLoad] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const [shopProducts, setShopProducts] = useState([]);
  const posts = shopProducts.slice(firstPostIndex, lastPostIndex);
  const [compareProducts, setCompareProducts] = useState([]);
  const [productType, setProductType] = useState([]);
  const [min, setMin] = useState();
  const [max, setMax] = useState();
  const [monthlyCost, setMonthlyCost] = useState([]);
  const [marks, setMarks] = useState([]);
  const [shopMake, setShopMake] = useState([]);
  const [broadBandType, setBroadBandType] = useState([]);
  const [wifiBand, setWifiBand] = useState([]);
  const [wifiUse, setWifiUse] = useState([]);
  const [ethernetSpeed, setEthernetUse] = useState([]);
  const [shopRating, setShopRating] = useState([]);
  const [count, setCount] = useState();
  const [total, setTotal] = useState();
  const [filters, setFilters] = useState({
    category_id: [],
    price: [],
    make: [],
    wifi_use: [],
    broadband_type: [],
    wifi_band: [],
    ethernet_speed: "",
    rate: [],
  });
  const navigate = useRouter();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    var url = APIURL() + "products";
    axiosPost(url).then((response) => {
      // console.log(response.data[0].response);
      setShopProducts(response.data[0].response.data);
      setCount(response.data[0].response.data.count);
      setIds(response.data[0].response.ids);
      setTotal(response.data[0].response.data.total);
    });
  }, []);
  const handleChange = (event, newValue) => {
    setMonthlyCost(newValue);
  };
  function valuetext(value) {
    return `£ ${value}`;
  }
  function valueLabelFormat(value) {
    return `£ ${value}`;
  }
  const handleCompareProducts = (e, post) => {
    const { checked } = e.target;
    var old_list = [...compareProducts];
    var new_list = [];
    if (checked) {
      setCompareProducts((oldArray) => [...oldArray, post]);
    } else {
      new_list = old_list.filter((product) => product != post);
      setCompareProducts(new_list);
    }
  };
  const saveInLocal = (data) => {
    localStorage.setItem("Product", JSON.stringify(data));
    localStorage.setItem("page", "shop");
    localStorage.setItem(
      "upfrontPayment",
      data.direct_price ? data.direct_price : 0
    );
    localStorage.setItem("monthlyTotal", 0);
    localStorage.setItem("startingmonthlyCost", 0);
    localStorage.setItem(
      "initial_installation_price",
      data.direct_price ? data.direct_price : 0
    );

    navigate.push("/address");
  };
  useEffect(() => {
    var data = { ids: ids, ...filters };
    var url = APIURL() + "shop-product-type";
    axiosPost(url, "", "", data).then((response) => {
      setProductType(response.data[0].response.data);
    });
    url = APIURL() + "shop-price";
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
    url = APIURL() + "shop-make";
    axiosPost(url, "", "", data).then((response) => {
      setShopMake(response.data[0].response.data);
    });
    url = APIURL() + "shop-broadband-type";
    axiosPost(url, "", "", data).then((response) => {
      setBroadBandType(response.data[0].response.data);
    });
    url = APIURL() + "shop-wifi-band";
    axiosPost(url, "", "", data).then((response) => {
      setWifiBand(response.data[0].response.data);
    });
    url = APIURL() + "shop-wifi-use";
    axiosPost(url, "", "", data).then((response) => {
      setWifiUse(response.data[0].response.data);
    });
    url = APIURL() + "shop-ethernet-speed";
    axiosPost(url, "", "", data).then((response) => {
      setEthernetUse(response.data[0].response.data);
    });
    url = APIURL() + "shop-rating";
    axiosGet(url).then((response) => {
      setShopRating(response.data[0].response.data);
    });
  }, [ids]);
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
  useEffect(() => {
    var url = APIURL() + `products`;
    var data = {
      ...filters,
    };
    setOpen(true);
    axiosPost(url, "", "", data).then((response) => {
      setShopProducts(response.data[0].response.data);
      setCount(response.data[0].response.count);
      setTotal(response.data[0].response.total);
      setIds(response.data[0].response.ids);
      setOpen(false);
      setCurrentPage(1);
      setInitialLoad(false);
      if (initialLoad != true) tableRef.current.scrollIntoView();
    });
  }, [filters]);
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
        className={
          bussinessPage
            ? "business-mobile-btmsec bg-grays pt-50 pb-140 filter-blue"
            : "bg-grays pt-50 pb-140"
        }
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12 sticky_filter">
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
                        onChange={(e) =>
                          setFilters({ ...filters, rating: e.target.value })
                        }
                      >
                        <option value="direct_price DESC">
                          Price High to low
                        </option>
                        <option value="direct_price ASC">
                          Price Low to High
                        </option>
                      </select>
                      <i
                        className="fas fa-question-circle"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="llorem epsum torent hkhhn ..."
                        data-bs-original-title
                      />
                    </div>
                    <div className="mob-filter-none">
                      <div className="row ">
                        <div className="col-xl-6 col-6 col-sm-6">
                          <select
                            name="rating"
                            className="form-select"
                            onChange={(e) =>
                              setFilters({ ...filters, rating: e.target.value })
                            }
                          >
                            <option value="direct_price DESC">
                              Price High to low
                            </option>
                            <option value="direct_price ASC">
                              Price Low to High
                            </option>
                          </select>
                        </div>
                        <div
                          className="col-xl-6 col-6 col-sm-6"
                          data-bs-toggle="modal"
                          data-bs-target="#filter-modal-mob"
                          style={{ cursor: "pointer" }}
                        >
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
              <div className="left-side-bar">
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
                                filters.make.includes(Number(spclOffer.make))
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
                <div className="left-box">
                  <div className="left-box-title">
                    <h6>Price</h6>
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
              </div>
            </div>
            <div className="col-xl-9" ref={tableRef}>
              <div
                className={
                  bussinessPage
                    ? "portfolio-item row business-shop-box"
                    : "portfolio-item row"
                }
              >
                {posts && posts.length > 0
                  ? posts.map((shopproduct, index) => (
                      <div
                        key={index}
                        className="item samsung col-xl-4 col-md-4"
                      >
                        <div className="tab-item-box-main">
                          <div className="tab-item-img">
                            <Image height={400} width={400} src={shopproduct.image} alt="asd" />
                          </div>
                          <div className="tab-item-title">
                            {/* <h5>{shopproduct.title}</h5> */}
                            <h6>
                              Buy at £
                              {Number(shopproduct.direct_price).toFixed(2)}
                            </h6>
                            <div dangerouslySetInnerHTML={{ __html: shopproduct.description }}></div>
                            <a
                              onClick={() => saveInLocal(shopproduct)}
                              style={{ cursor: "pointer" }}
                              className="check-btn"
                            >
                              Get this deal
                            </a>
                            <div className="left-box-check get-deal-compare">
                              <input
                                type="checkbox"
                                value={shopproduct}
                                checked={
                                  compareProducts.includes(shopproduct)
                                    ? true
                                    : false
                                }
                                name="offer"
                                onChange={(e) =>
                                  handleCompareProducts(e, shopproduct)
                                }
                                id={`compare-${index}`}
                              />
                              <label
                                className="checkbox"
                                htmlFor={`compare-${index}`}
                              >
                                Add to Compare
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  : ""}
              </div>
              {shopProducts.length > postsPerPage ? (
                <PaginationIcons
                  totalposts={shopProducts.length}
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
          className={
            compareProducts.length > 1 ? "extended compare_buttonwa" : "d-none"
          }
          onClick={(e) => {
            localStorage.setItem(
              "compare_products",
              JSON.stringify(compareProducts)
            );

            bussinessPage
              ? navigate.push("/business-compare-products")
              : navigate.push("/compare-products");
          }}
        >
          <CompareIcon sx={{ mr: 1 }} />
          Compare {compareProducts.length} Products
        </Fab>
      </section>
      <MobileFilter
        filters={filters}
        handleFilters={handleFilters}
        monthlyCost={monthlyCost}
        handleChange={handleChange}
        valuetext={valuetext}
        valueLabelFormat={valueLabelFormat}
        min={min}
        max={max}
        marks={marks}
        setFilters={setFilters}
        count={count}
        productType={productType}
        shopMake={shopMake}
        wifiUse={wifiUse}
        wifiBand={wifiBand}
        ethernetSpeed={ethernetSpeed}
        broadBandType={broadBandType}
      />
    </>
  );
}

export default Filter;
