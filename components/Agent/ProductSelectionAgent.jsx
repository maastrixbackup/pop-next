import { React, useState, useEffect } from "react";
import { APIURL } from "../../Methods/Fetch";
import { axiosGet, axiosPost } from "../../Methods/Save";
import PaginationIcons from "../Common/PaginationIcons";
import Fab from "@mui/material/Fab";
import CompareIcon from "@mui/icons-material/Compare";
import AddressSelectionAgent from "./AddressSelectionAgent";
import ProductTypeSelectionAgent from "./ProductTypeSelectionAgent";
import LocalStorage from "../Homepage/LocalStorage";
import { useRouter } from "next/router";

function ProductSelectionAgent(props) {
  const {
    page,
    type,
    setSelectedProduct,
    setAddonsTab,
    setProductTab,
    userDetails,
    setuserDetails,
    setMonthlyPrice,
    setUpfrontPayment,
    setpenLoader,
    setPage,
    setType,
    setStep,
    setOrderType,
    openLoader,
  } = props;
  var pro_type = type || "consumer";
  const navigate = useRouter();
  const [pageNo, setPageNo] = useState(1);
  const [product, setProduct] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const [availableProducts, setAvailableProducts] = useState([]);
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
  const [allCount, setAllCount] = useState();
  const [availableCount, setAvailableCount] = useState();

  const [total, setTotal] = useState();
  const [chk_add_details, setchk_add_details] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const posts = product.slice(firstPostIndex, lastPostIndex);
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

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
    if (page != "empty" && type != "") {
      if (page != "mobile" && page != "landline") {
        setpenLoader(true);
        var url = APIURL() + `get-agent-all-product-availability`;
        var data = {
          ...chk_add_details,
          search: searchText,
          product_type: type,
          type: page,
        };
        setOpen(true);
        axiosPost(url, "", "", data).then((response) => {
          setpenLoader(false);
          setAllProduct(response.data[0].response.data);
          setAvailableProducts(
            response.data[0].response.data.filter(
              (data) => data.is_available == 1
            )
          );
          setProduct(
            response.data[0].response.data.filter(
              (data) => data.is_available == 1
            )
          );
          setAllCount(response.data[0].response.data.length);
          setAvailableCount(
            response.data[0].response.data.filter(
              (data) => data.is_available == 1
            ).length
          );
          setCount(
            response.data[0].response.data.filter(
              (data) => data.is_available == 1
            ).length
          );
          setTotal(response.data[0].response.total);
          setOpen(false);
        });
      } else {
        setpenLoader(true);
        var url = APIURL() + `${page}-products`;
        var data = {
          search: searchText,
          product_type: type,
        };
        setOpen(true);
        axiosPost(url, "", "", data).then((response) => {
          setpenLoader(false);
          setProduct(response.data[0].response.data);
          setAvailableProducts(response.data[0].response.data);
          setAllCount(response.data[0].response.count);
          setAvailableCount(response.data[0].response.count);
          setCount(response.data[0].response.count);
          setTotal(response.data[0].response.total);
          setOpen(false);
        });
      }
    }
  }, [filters, page, type, searchText, chk_add_details]);
  const saveInLocal = (e, product) => {
    localStorage.setItem("page", page);

    if (page == "broadband") {
      // setpenLoader(true);
      // var data = {
      //   ...chk_add_details,
      //   product_id: product.id,
      //   type: page,
      // };
      // var url = APIURL() + "get-product-availability";
      // axiosPost(url, data).then((response) => {
      //   setpenLoader(false);
      //   if (response.data[0].response.status == "available") {
      setSelectedProduct(product);
      setMonthlyPrice(product.price);
      setUpfrontPayment(product.price);
      localStorage.setItem("Product", JSON.stringify(product));
      localStorage.setItem("monthlyTotal", product.price ? product.price : 0);
      localStorage.setItem(
        "upfrontPayment",
        product.installation_cost ? product.installation_cost : 0
      );
      localStorage.setItem(
        "startingmonthlyCost",
        product.price ? product.price : 0
      );
      localStorage.setItem(
        "initial_installation_price",
        product.installation_cost ? product.installation_cost : 0
      );
      setStep(1);
      setProductTab(false);
      setAddonsTab(true);
    } else {
      setSelectedProduct(product);
      localStorage.setItem("Product", JSON.stringify(product));

      localStorage.setItem("monthlyTotal", product.price ? product.price : 0);
      localStorage.setItem(
        "upfrontPayment",
        product.installation_cost ? product.installation_cost : 0
      );
      localStorage.setItem(
        "startingmonthlyCost",
        product.price ? product.price : 0
      );
      localStorage.setItem(
        "initial_installation_price",
        product.installation_cost ? product.installation_cost : 0
      );
      setMonthlyPrice(product.price);
      setUpfrontPayment(product.price);
      setProductTab(false);
      setAddonsTab(true);
    }
  };
  const viewAll = () => {
    setCount(allCount);
    setProduct(allProduct);
  };
  const viewAvailable = () => {
    setCount(availableCount);
    setProduct(availableProducts);
  };

  return (
    <>
      <AddressSelectionAgent
        userDetails={userDetails}
        setuserDetails={setuserDetails}
        chk_add_details={chk_add_details}
        setchk_add_details={setchk_add_details}
        page={page}
        setpenLoader={setpenLoader}
      />

      {userDetails.address.length > 20 ? (
        <ProductTypeSelectionAgent
          setuserDetails={setuserDetails}
          userDetails={userDetails}
          setPage={setPage}
          setpenLoader={setpenLoader}
          setType={setType}
          page={page}
          type={type}
          setOrderType={setOrderType}
        />
      ) : (
        ""
      )}

      {page && type && userDetails.address.length > 20 ? (
        <section
          className={
            type === "business"
              ? "result-sec pb-50 filter-blue"
              : "result-sec pb-50"
          }
          id="filter_section"
        >
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12">
                <div className="row">
                  <div className="col-xl-3"></div>
                  <div className="col-xl-9">
                    <div className="filter-result">
                      <span>
                        Showing {count} of {total} deals
                      </span>
                      {count == total && (
                        <span>
                          <a
                            className="btn-buy-deal"
                            style={{ cursor: "pointer" }}
                            onClick={viewAvailable}
                          >
                            Show available products
                          </a>
                        </span>
                      )}
                      {count != total && (
                        <span>
                          <a
                            className="btn-buy-deal"
                            style={{ cursor: "pointer" }}
                            onClick={viewAll}
                          >
                            Show All Products
                          </a>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-12">
                <div className="right-side-box">
                  {posts && posts.length > 0
                    ? posts.map((post, index) =>
                        page !== "topdeal" ? (
                          <div key={index} className="right-box">
                            {post.is_available == 1 && (
                              <div className="ribbon ribbon-top-left">
                                <span>Available</span>
                              </div>
                            )}
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
                                {post.contract_length}
                              </div>
                              <div className="third-box">
                                {post.MinDownstreamPeakHour ? (
                                  <div>
                                    <h6>
                                      {post.MinDownstreamPeakHour}
                                      {page == "broadband" && " Mbps"}
                                    </h6>
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
                                      <span key={index}>
                                        {feat.feature_name}
                                      </span>
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
                                      <li>
                                        <a href="#">Potelecom exclusive</a>
                                      </li>
                                      <li>
                                        <a href="#" className="br-cl2">
                                          120 virtual reward card
                                        </a>
                                      </li>
                                      <li>
                                        <a href="#" className="br-cl3">
                                          Broadband provider of the year
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <div className="third-box">
                                <h6>38Mbps</h6>
                                <span>Average UK Speed*</span>
                              </div>
                              <div className="four-box">
                                <h6>
                                  £{Number(post.price).toFixed(2)} / month
                                </h6>
                                <span>Average Speed 38Mbps</span>
                                <span>{post.contract_length} Contract</span>
                              </div>
                            </div>
                          </div>
                        )
                      )
                    : !openLoader && (
                        <div className="row viewAll">
                          <div className="col-lg-8">
                            <h2>No products available at this location</h2>
                          </div>

                          <div className="col-lg-4">
                            <button className="btn-style-one" onClick={viewAll}>
                              View All Products
                            </button>
                          </div>
                        </div>
                      )}
                </div>
                {product.length > postsPerPage ? (
                  <PaginationIcons
                    totalposts={product.length}
                    postsperpage={postsPerPage}
                    setCurrentPage={setCurrentPage}
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
      ) : (
        ""
      )}
    </>
  );
}

export default ProductSelectionAgent;
