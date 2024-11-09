import { useRouter } from "next/router";
import { React, useEffect, useState } from "react";

function Products() {
  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem("compare_products")));
  }, []);
  const [products, setProducts] = useState([]);
  const removeProduct = (product) => {
    var old_list = [...products];
    var new_list = old_list.filter((old_pro) => old_pro !== product);
    setProducts(new_list);
  };
  const navigate = useRouter();
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

  return (
    <>
      <section className="business-mobile-btmsec ptb-50">
        <div className="container">
          <div className="row">
            <div className="col-lg-12" >
              <button
                onClick={(e) => {
                  localStorage.removeItem("compare_products");
                  navigate.push("/shop");
                }}
                style={{ cursor: "pointer",float: "right" }}
                className="btn-style-one"
              >
                <i className="fi-rs-headset mr-5" />
                Go back
              </button>
            </div>
            <div className="col-lg-12">
              <div className="table-design1">
                <table
                  className="table table-bordered"
                  cellPadding={0}
                  cellSpacing={0}
                  width="100%;"
                >
                  <thead>
                    <tr className="br-none">
                      <th width="25%" />

                      {products.length > 0
                        ? products.map((product, index) => (
                            <th
                              key={index}
                              align="center"
                              width="25%"
                              className="img-box"
                            >
                              <img src={product.image} alt="banner_img" />
                            </th>
                          ))
                        : ""}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th align="center" className="br-radius-td-top">
                        Name
                      </th>
                      {products.length > 0
                        ? products.map((product, index) => (
                            <td
                              key={index}
                              align="center"
                              className="title-product"
                            >
                              {product.name}
                            </td>
                          ))
                        : ""}
                    </tr>
                    <tr>
                      <th align="center">Price</th>
                      {products.length > 0
                        ? products.map((product, index) => (
                            <td key={index} align="center">
                              £ {Number(product.direct_price).toFixed(2)}
                            </td>
                          ))
                        : ""}
                    </tr>
                    <tr>
                      <th align="center">Category</th>
                      {products.length > 0
                        ? products.map((product, index) => (
                            <td key={index} align="center">
                              {product.category}
                            </td>
                          ))
                        : ""}
                    </tr>
                    <tr>
                      <th align="center">Make</th>
                      {products.length > 0
                        ? products.map((product, index) => (
                            <td key={index} align="center">
                              {product.make}
                            </td>
                          ))
                        : ""}
                    </tr>
                    <tr>
                      <th align="center">WiFi Bands</th>
                      {products.length > 0
                        ? products.map((product, index) => (
                            <td key={index} align="center">
                              {product.wifi_bands}
                            </td>
                          ))
                        : ""}
                    </tr>
                    <tr>
                      <th align="center">WiFi Use</th>
                      {products.length > 0
                        ? products.map((product, index) => (
                            <td key={index} align="center">
                              {product.wifi_use}
                            </td>
                          ))
                        : ""}
                    </tr>
                    <tr>
                      <th align="center" />
                      {products.length > 0
                        ? products.map((product, index) => (
                            <td key={index} align="center">
                              <button
                                onClick={(e) => saveInLocal(product)}
                                className="btn-style-one"
                              >
                                <i className="fi-rs-headset mr-5" />
                                Buy now
                              </button>
                            </td>
                          ))
                        : ""}
                    </tr>
                    <tr>
                      <th />
                      {products.length > 0
                        ? products.map((product, index) => (
                            <td key={index} align="center">
                              <a
                                onClick={() => {
                                  removeProduct(product);
                                }}
                                style={{ cursor: "pointer" }}
                              >
                                <i className="fas fa-trash-alt mx-2 text-danger" />
                                <span className="text-danger">Remove</span>
                              </a>
                            </td>
                          ))
                        : ""}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Products;
