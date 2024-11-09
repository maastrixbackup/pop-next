import { React, useEffect, useState } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { getSession } from "next-auth/react";

import { Alert } from "@mui/material";
import dynamic from "next/dynamic";
import Snackbar from "@mui/material/Snackbar";
const ContactDetails = dynamic(
  () => import("../../../components/MyAccount/ContactDetails"),
  {
    ssr: false,
  }
);
const Tasks = dynamic(() => import("../../../components/MyAccount/Tasks"), {
  ssr: false,
});
const CreateAkjTask = dynamic(
  () => import("../../../components/MyAccount/CreateAkjTask"),
  {
    ssr: false,
  }
);
const ViewTask = dynamic(
  () => import("../../../components/MyAccount/ViewTask"),
  {
    ssr: false,
  }
);
const MyInvoices = dynamic(
  () => import("../../../components/MyAccount/MyInvoices"),
  {
    ssr: false,
  }
);
const PayMyBill = dynamic(
  () => import("../../../components/MyAccount/PayMyBill"),
  {
    ssr: false,
  }
);
const OrderList = dynamic(
  () => import("../../../components/MyAccount/OrderList"),
  {
    ssr: false,
  }
);
const UpdateDirectDebitDetails = dynamic(
  () => import("../../../components/MyAccount/UpdateDirectDebitDetails"),
  {
    ssr: false,
  }
);
const MyReferral = dynamic(
  () => import("../../../components/MyAccount/MyReferral"),
  {
    ssr: false,
  }
);
const Tickets = dynamic(() => import("../../../components/MyAccount/Tickets"), {
  ssr: false,
});
const MyOrders = dynamic(
  () => import("../../../components/MyAccount/MyOrders"),
  {
    ssr: false,
  }
);
const OrderDetails = dynamic(
  () => import("../../../components/MyAccount/OrderDetails"),
  {
    ssr: false,
  }
);
const Sidebar = dynamic(() => import("../../../components/MyAccount/Sidebar"), {
  ssr: false,
});
const CreateAkjTicket = dynamic(
  () => import("../../../components/MyAccount/CreateAkjTicket"),
  {
    ssr: false,
  }
);
const ViewTicket = dynamic(
  () => import("../../../components/MyAccount/ViewTicket"),
  {
    ssr: false,
  }
);
import { useRouter } from "next/router";
import MetaContext from "../../../context/MetaContext";

function Myaccount() {
  const navigate = useRouter();
  const [tab, setTab] = useState("my-order");
  const [orderNo, setOrderNo] = useState();
  const [ddDetails, setDdDetails] = useState();
  const [monthly_total, setMonthlyTotal] = useState();
  const [vertical, setvertical] = useState("top");
  const [horizontal, sethori] = useState("right");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [alerttype, setAlertType] = useState("");
  const [userDetails, setUserDetails] = useState({});
  // useEffect(() => {
  //   if (localStorage.getItem("logged_in") === null) navigate.push("/login");
  // }, []);
  useEffect(() => {
    setUserDetails(JSON.parse(localStorage.getItem("user_details")));
  }, []);

  return (
    <>
      <MetaContext title="My Account" />

      <Header shoBblueLogo={true} myaccount={true} />
      <div className="body-box-margin">
        <section className="profile-sec">
          <div className="container-fluid">
            <div className="row">
              <Sidebar userDetails={userDetails} tab={tab} setTab={setTab} />
              {tab === "order-details" ? (
                <OrderDetails orderNo={orderNo} setTab={setTab} />
              ) : tab === "my-order" ? (
                <MyOrders setTab={setTab} setOrderNo={setOrderNo} />             
              ) : //  : tab === "create-ticket" ? (
              //   <CreateTicket
              //     setMessage={setMessage}
              //     setOpen={setOpen}
              //     setAlertType={setAlertType}
              //     setTab={setTab}
              //   />
              // )
              tab === "create-akj-ticket" ? (
                <CreateAkjTicket
                  setMessage={setMessage}
                  setOpen={setOpen}
                  setAlertType={setAlertType}
                  setTab={setTab}
                />
              ) : tab === "view-ticket" ? (
                <ViewTicket userDetails={userDetails} setTab={setTab} />
              ) : tab === "contact-details" ? (
                <ContactDetails
                  userDetails={userDetails}
                  setMessage={setMessage}
                  setOpen={setOpen}
                  setAlertType={setAlertType}
                  setTab={setTab}
                />
              ) : tab === "tasks" ? (
                <Tasks setTab={setTab} />
              ) : // : tab === "create-task" ? (
              //   <CreateTask
              //     userDetails={userDetails}
              //     setMessage={setMessage}
              //     setOpen={setOpen}
              //     setAlertType={setAlertType}
              //     setTab={setTab}
              //   />
              // )
              tab === "create-akj-task" ? (
                <CreateAkjTask
                  userDetails={userDetails}
                  setMessage={setMessage}
                  setOpen={setOpen}
                  setAlertType={setAlertType}
                  setTab={setTab}
                />
              ) : tab === "view-task" ? (
                <ViewTask
                  userDetails={userDetails}
                  setMessage={setMessage}
                  setOpen={setOpen}
                  setAlertType={setAlertType}
                  setTab={setTab}
                />
              ) : tab === "invoices" ? (
                <MyInvoices
                  userDetails={userDetails}
                  setMessage={setMessage}
                  setOpen={setOpen}
                  setAlertType={setAlertType}
                  setTab={setTab}
                />
              ) : tab === "paymybill" ? (
                <PayMyBill
                  userDetails={userDetails}
                  setMessage={setMessage}
                  setOpen={setOpen}
                  setAlertType={setAlertType}
                  setTab={setTab}
                  orderNo={orderNo}
                  ddDetails={ddDetails}
                  monthly_total={monthly_total}
                />
              ) : tab === "order-list" ? (
                <OrderList
                  userDetails={userDetails}
                  setMessage={setMessage}
                  setOpen={setOpen}
                  setAlertType={setAlertType}
                  setTab={setTab}
                  setOrderNo={setOrderNo}
                  setDdDetails={setDdDetails}
                  setMonthlyTotal={setMonthlyTotal}
                />
              ) : tab === "update-dd" ? (
                <UpdateDirectDebitDetails
                  userDetails={userDetails}
                  setMainMessage={setMessage}
                  setOpen={setOpen}
                  setAlertType={setAlertType}
                  setTab={setTab}
                  orderNo={orderNo}
                  ddDetails={ddDetails}
                  monthly_total={monthly_total}
                />
              ) : tab === "referrals" ? (
                <MyReferral />
              ) : (
                ""
              )}
            </div>
          </div>
        </section>

        <Footer bussinesspage={true} />
      </div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
        open={open}
        autoHideDuration={6000}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Alert
          onClose={() => {
            setOpen(false);
          }}
          variant="filled"
          severity={alerttype}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/login",
      },
      props: {},
    };
  }
  return {
    props: {},
  };
}

export default Myaccount;
