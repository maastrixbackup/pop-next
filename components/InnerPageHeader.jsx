import React, { useEffect, useState } from "react";
// import profile from "../images/profile.png";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ShopInnerPageHeader from "./ShopInnerPageHeader";
import Link from "next/link";
import Image from "next/image";
import MetaContext from "../context/MetaContext";
import { signOut } from "next-auth/react";

function InnerPageHeader(props) {
  const { activeTab, bussiness_type, signedIn, SetSignedIn, step, page } =
    props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const logout = () => {
    setAnchorEl(null);
    localStorage.removeItem("logged_in");
    localStorage.removeItem("user_id");
    SetSignedIn(false);
    signOut();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [userDetails, setUserDetails] = useState();
  useEffect(() => {
    if (localStorage.getItem("user_details") !== null) {
      setUserDetails(JSON.parse(localStorage.getItem("user_details")));
    }
  }, []);
  return (
    <>
      <MetaContext title="Order Process" />

      <header
        className={
          bussiness_type == "true"
            ? "checkout-sec-header buisness-mobile2"
            : "checkout-sec-header"
        }
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="head-bar">
                <div className="row align-items-center">
                  <div className="col-xl-2 col-md-2">
                    <div className="check-out-logo">
                      <Link href={bussiness_type == "true" ? "/business" : "/"}>
                        <Image
                          height={300}
                          width={300}
                          src={
                            bussiness_type == "true"
                              ? "/images/blue-logo.png"
                              : "/images/logo.png"
                          }
                        />
                      </Link>
                    </div>
                  </div>

                  {page == "shop" || page == "mobile" ? (
                    <div className="col-xl-7 col-md-7 desktop_responsive">
                      <ShopInnerPageHeader step={step} />
                    </div>
                  ) : (
                    <div className="col-xl-7 col-md-7 desktop_responsive">
                      {activeTab != "address" ? (
                        <div className="menu">
                          <nav id="cssmenu" className="head_btm_menu">
                            <ul>
                              <li
                                className={
                                  activeTab == "priceSpeed" ? "active" : ""
                                }
                              >
                                <a href="#">Speed</a>
                              </li>
                              <li
                                className={
                                  activeTab == "contract" ? "active" : ""
                                }
                              >
                                <a href="#">Contract</a>
                              </li>
                              <li
                                className={
                                  activeTab == "goLive" ? "active" : ""
                                }
                              >
                                <a href="#">Go Live</a>
                              </li>
                              <li
                                className={
                                  activeTab == "payment" ? "active" : ""
                                }
                              >
                                <a href="#">Payment</a>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  )}

                  {signedIn == true ? (
                    <div className="col-xl-3 col-md-3">
                      <Button
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                      >
                        <div className="innerpage_header_uma">
                          <Image
                            height={400}
                            width={400}
                            src="/images/profile.png"
                            alt="prf"
                          />
                          <span>
                            Hi,{" "}
                            {userDetails
                              ? `${userDetails.first_name} ${userDetails.last_name}`
                              : ""}
                            <KeyboardArrowDownIcon />
                          </span>
                        </div>
                      </Button>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem onClick={handleClose}>
                          <Link className="" href={"/my-account"}>
                            {" "}
                            My Account
                          </Link>
                        </MenuItem>
                        <MenuItem onClick={logout}>Logout</MenuItem>
                      </Menu>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default InnerPageHeader;
