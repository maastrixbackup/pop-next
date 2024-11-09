"use client";
import { React, useEffect, useLayoutEffect, useState } from "react";

import Hamburger from "hamburger-react";
import SessionTimeout from "../Methods/SessionTimeout";
import { axiosGet } from "../Methods/Save";
import { APIURL } from "../Methods/Fetch";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

function Header(props) {
  const [isOpen, setOpen] = useState(false);
  const [path, setPath] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [addmenuItems, setAddMenuItems] = useState([]);
  const { bussinesspage, myaccount, mobileOpen, shoBblueLogo } = props;
  const [loggendIn, setLoggedIn] = useState(false);
  // useEffect(() => {
  //   if (localStorage.getItem("user_details") !== null) {
  //     var user_details = JSON.parse(localStorage.getItem("user_details"));
  //     user_details = { ...user_details, address: "" };
  //     localStorage.setItem("user_details", JSON.stringify(user_details));
  //   }
  // }, []);
  useLayoutEffect(() => {
    const fetchData = async () => {
      var url = "";
      if (bussinesspage) {
        url = APIURL() + "menu-bar/business";
      } else url = APIURL() + "menu-bar";
      const res = await axiosGet(url);
      setMenuItems(res.data[0].response.data);
      setAddMenuItems(res.data[0].response.add_data);
    };
    fetchData();
  }, [bussinesspage]);
  // useEffect(() => {
  //   if (bussinesspage) {
  //     let link = document.querySelector("link[rel~='icon']");
  //     if (!link) {
  //       link = document.createElement("link");
  //       link.rel = "icon";
  //       document.getElementsByTagName("head")[0].appendChild(link);
  //     }
  //     link.href = "/images/blue-favicon.ico";
  //   }
  // }, []);
  useEffect(() => {
    if (localStorage.getItem("logged_in") !== null) {
      setLoggedIn(true);
    } else setLoggedIn(false);
  }, []);
  useEffect(() => {
    bussinesspage
      ? localStorage.setItem("bussiness_type", true)
      : localStorage.setItem("bussiness_type", false);
  }, []);
  // useEffect(() => {
  //   const script = document.createElement("script");

  //   script.src = "js/menu.js";
  //   script.async = true;

  //   document.body.appendChild(script);

  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);
  useEffect(() => {
    var url = window.location.pathname.split("/");
    setPath(url[url.length - 1]);
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      const sticky = document.querySelector(".header-sticky");
      const scroll = window.scrollY;

      if (scroll >= 100) {
        sticky.classList.add("fixedhead");
      } else {
        sticky.classList.remove("fixedhead");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      {bussinesspage ? (
        <Head>
          <link rel="icon" href="/images/blue-favicon.ico" />
        </Head>
      ) : (
        <Head>
          <link rel="icon" href="/images/favicon.ico" />
        </Head>
      )}
      {loggendIn == true ? <SessionTimeout /> : ""}
      <header className="header-sticky innerheader">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="head-bar ">
                <div className="logo">
                  <Link href={bussinesspage ? "/business" : "/"}>
                    <Image
                      height={400}
                      width={400}
                      src={
                        bussinesspage || shoBblueLogo
                          ? "/images/blue-logo.png"
                          : "/images/logo.png"
                      }
                      alt="logo"
                    />
                  </Link>
                  <div className="mobile_responsive">
                    <Hamburger toggled={isOpen} toggle={setOpen} />
                  </div>
                </div>
                {!myaccount ? (
                  bussinesspage ? (
                    <div className="header-menu">
                      <div className="menu">
                        <nav id="cssmenu" className="head_btm_menu">
                          <ul className="desktop_responsive">
                            {menuItems &&
                              menuItems.map((menuItem, index) => (
                                <li
                                  className={
                                    path == menuItem.url ? "active" : ""
                                  }
                                  key={index}
                                >
                                  <Link href={`/${menuItem.url}`}>
                                    {menuItem.title}
                                  </Link>
                                </li>
                              ))}
                            <li className={path == "/" ? "active" : ""}>
                              <Link href="/">Consumer</Link>
                            </li>
                          </ul>
                        </nav>
                      </div>
                      <div className="head-btn desktop_responsive">
                        <Link
                          className="btn-style-login mx-2"
                          href={"/business-make-payment"}
                        >
                          <i className="fal fa-credit-card" /> Pay Bill
                        </Link>
                      </div>
                      <div className="head-btn desktop_responsive">
                        <Link
                          className="btn-style-login mx-2"
                          href={loggendIn ? "/my-account" : "/login"}
                        >
                          {" "}
                          <i className="fal fa-user" />{" "}
                          {loggendIn ? "My Account" : "Login"}
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="header-menu">
                      <div className="menu">
                        <nav id="cssmenu" className="head_btm_menu">
                          <ul className="desktop_responsive">
                            {menuItems &&
                              menuItems.map((menuItem, index) => (
                                <li
                                  className={
                                    path == menuItem.url ? "active" : ""
                                  }
                                  key={index}
                                >
                                  <Link href={`/${menuItem.url}`}>
                                    {menuItem.title}
                                  </Link>
                                </li>
                              ))}
                            <li className={path == "business" ? "active" : ""}>
                              <Link href="/business">Business</Link>
                            </li>
                          </ul>
                        </nav>
                      </div>
                      <div className="head-btn desktop_responsive">
                        <Link
                          className="btn-style-login mx-2"
                          href={"/make-payment"}
                        >
                          <i className="fal fa-credit-card" /> Pay Bill
                        </Link>
                      </div>
                      <div className="head-btn desktop_responsive">
                        <Link
                          className="btn-style-login mx-2"
                          href={loggendIn ? "/my-account" : "/login"}
                        >
                          {" "}
                          <i className="fal fa-user" />{" "}
                          {loggendIn ? "My Account" : "Login"}
                        </Link>
                      </div>
                    </div>
                  )
                ) : (
                  ""
                )}
                {!myaccount ? (
                  bussinesspage ? (
                    <div className="header-menu mobile_responsive">
                      <div className="menu">
                        <nav
                          id="cssmenu"
                          className="head_btm_menu small-screen mobile_responsive"
                        >
                          <ul className={isOpen ? "" : "d-none"}>
                            {menuItems &&
                              menuItems.map((menuItem, index) => (
                                <li
                                  className={
                                    path == menuItem.url ? "active" : ""
                                  }
                                  key={index}
                                >
                                  <Link href={`/${menuItem.url}`}>
                                    {menuItem.title}
                                  </Link>
                                </li>
                              ))}
                          </ul>
                        </nav>
                      </div>
                      <div className="row ">
                        <div className="col-md-6">
                          <div className="head-btn mobile_responsive">
                            <Link
                              className="btn-style-login mx-2"
                              href={"/business-make-payment"}
                            >
                              <i className="fal fa-credit-card" /> Pay Bill
                            </Link>
                            <Link
                              className="btn-style-login mx-2"
                              href={loggendIn ? "/my-account" : "/login"}
                            >
                              {" "}
                              <i className="fal fa-user" />{" "}
                              {loggendIn ? "My Account" : "Login"}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="header-menu mobile_responsive">
                      <div className="menu">
                        <nav
                          id="cssmenu"
                          className="head_btm_menu small-screen mobile_responsive"
                        >
                          <ul className={isOpen ? "" : "d-none"}>
                            {menuItems &&
                              menuItems.map((menuItem, index) => (
                                <li
                                  className={
                                    path == menuItem.url ? "active" : ""
                                  }
                                  key={index}
                                >
                                  <Link href={`/${menuItem.url}`}>
                                    {menuItem.title}
                                  </Link>
                                </li>
                              ))}
                          </ul>
                        </nav>
                      </div>
                      <div className="row ">
                        <div className="col-md-6">
                          <div className="head-btn mobile_responsive">
                            <Link
                              className="btn-style-login mx-2"
                              href={"/make-payment"}
                            >
                              <i className="fal fa-credit-card" /> Pay Bill
                            </Link>
                            <Link
                              className="btn-style-login mx-2"
                              href={loggendIn ? "/my-account" : "/login"}
                            >
                              {" "}
                              <i className="fal fa-user" />{" "}
                              {loggendIn ? "My Account" : "Login"}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
