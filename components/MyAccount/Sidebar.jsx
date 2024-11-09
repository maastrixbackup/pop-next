import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { signOut } from "next-auth/react";

function Sidebar(props) {
  const navigate = useRouter();
  const logout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_details");
    localStorage.removeItem("logged_in");
    signOut();
    navigate.push("/");
  };
  const { setTab, userDetails } = props;
  return (
    <>
      <div className="col-lg-3 ">
        <div className="profile-box">
          <div className="profile-icon-content mb-4">
            <Image
              height={200}
              width={200}
              src="/images/profile.png"
              alt="banner_img"
            />
            <div className="profile-text">
              <span>Hello,</span>
              <h3>
                {userDetails
                  ? `${userDetails.first_name} ${userDetails.last_name}`
                  : ""}
              </h3>
            </div>
          </div>
          <div className="profile-category">
            <div className="profile-category-box">
              <div className="icon-cat">
                <i className="fas fa-bags-shopping"></i>
              </div>
              <a
                onClick={(e) => setTab("my-order")}
                style={{ cursor: "pointer" }}
              >
                My Order{" "}
              </a>
            </div>

            <div className="profile-category-box">
              <div className="icon-cat">
                <i className="fal fa-wallet"></i>
              </div>
              <a
                onClick={(e) => setTab("paymybill")}
                style={{ cursor: "pointer" }}
              >
                Pay my bill
              </a>
            </div>
            <div className="profile-category-box">
              <div className="icon-cat">
                <i className="fal fa-wallet"></i>
              </div>
              <a
                onClick={(e) => setTab("invoices")}
                style={{ cursor: "pointer" }}
              >
                View Invoices{" "}
              </a>
            </div>
            {/*<div className="profile-category-box">
              <div className="icon-cat">
                <i className="fad fa-sync-alt"></i>
              </div>
              <Link onClick={(e) => setTab("referrals")}
              style={{ cursor: "pointer" }}>Referrals </Link>
                </div>*/}
            <div className="profile-category-box">
              <div className="icon-cat">
                <i className="fal fa-question-square"></i>
              </div>
              <a
                //onClick={(e) => setTab("tasks")}
                onClick={(e) => setTab("create-akj-task")}
                style={{ cursor: "pointer" }}
              >
                Ask a question - Tasks{" "}
              </a>
            </div>
            <div className="profile-category-box">
              <div className="icon-cat">
                <i className="fal fa-question-square"></i>
              </div>
              <a
                onClick={(e) => setTab("order-list")}
                style={{ cursor: "pointer" }}
              >
                Direct debit details{" "}
              </a>
            </div>
            <div className="profile-category-box">
              <div className="icon-cat">
                <i className="fas fa-user"></i>
              </div>
              <a
                onClick={(e) => setTab("contact-details")}
                style={{ cursor: "pointer" }}
              >
                Contact details{" "}
              </a>
            </div>            
            <div className="profile-category-box">
              <div className="icon-cat">
                <i className="fal fa-sign-out-alt"></i>
              </div>
              <a onClick={(e) => logout()} style={{ cursor: "pointer" }}>
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
