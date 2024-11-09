import { React, useState } from "react";
import { APIURL } from "../../../Methods/Fetch";
import Snackbar from "@mui/material/Snackbar";
import { axiosGet, axiosPost } from "../../../Methods/Save";
import { Alert } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import LoginSection from "../../../components/Login/LoginSection";
import ForgetPasswordSection from "../../../components/Login/ForgetPasswordSection";
import VerifyOtp from "../../../components/Login/VerifyOtp";
import { useEffect } from "react";
import Title from "../../../components/Title";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import MetaContext from "../../../context/MetaContext";
import SetPageName from "../../../components/SetPageName";
import { signIn } from "next-auth/react";

function Login({ pageDetails, metaData }) {
  const navigate = useRouter();
  const [openLoader, setOpenLoader] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [open, setOpen] = useState(false);
  const [vertical, setvertical] = useState("top");
  const [horizontal, sethori] = useState("right");
  const [message, setMessage] = useState("");
  const [valid, setValid] = useState({
    email: "",
    password: "",
  });
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [fgtPwTab, setFgtPwTab] = useState(false);
  const [otpTab, setOtpTab] = useState(false);
  const handleClose = () => {
    setOpenLoader(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
    if (value.length > 0) setValid({ ...valid, [name]: true });
  };
  const login = async () => {
    if (loginDetails.email.length > 0 && loginDetails.password.length > 0) {
      setOpenLoader(true);
      const { email, password } = loginDetails;
      var url = APIURL() + "login";
      var data = {
        email: email,
        password: password,
      };
      axiosPost(url, data)
        .then( async (response) => {
          localStorage.setItem("user_id", response.data.user_id);
          localStorage.setItem(
            "user_details",
            JSON.stringify({ ...response.data.user_data, simwood_areacode: "" })
          );
          localStorage.setItem(
            "user_data",
            JSON.stringify(response.data.user_data)
          );
          setAlertType("success");
          setMessage("Otp has been sent to your resistered mobile number.");
          setOpen(true);
          localStorage.setItem("logged_in", true);

          //setOtpTab(true);
          setOpenLoader(false);

          await signIn("credentials", {
            redirect: false,
            email: email,
          });
          navigate.push("/my-account");
        })
        .catch(function (error) {
          setAlertType("error");
          setMessage(error.response.data.message);
          if (error.response.data.message.includes("Password")) {
            setValid({ ...valid, password: false });
          }
          if (error.response.data.message.includes("UserID")) {
            setValid({ ...valid, email: false });
          }
          setOpen(true);
          setOpenLoader(false);
        });
    } else if (loginDetails.email.length === 0) {
      setMessage("Please enter Your Username");
      setValid({ ...valid, email: false });
      setOpen(true);
    } else if (loginDetails.password.length === 0) {
      setMessage("Please enter Your Password");
      setValid({ ...valid, password: false });
      setOpen(true);
    }
  };

  return (
    <>
      <MetaContext {...metaData} />

      <SetPageName name="login" />
      <div className="login-page tab-box">
        <div className="container-fluid p-0">
          <div className="row">
            <div
              className="col-lg-6 col-md-12 bg-img"
              style={{
                backgroundImage: `url(${pageDetails.image})`,
                backgroundSize: "cover",
              }}
            >
              <div className="informeson">
                <div className="logo">
                  <Link href="/">
                    <Image
                      height={300}
                      width={300}
                      src="/images/logo.png"
                      alt="logo"
                    />
                  </Link>
                </div>
                <div
                  className="animated-text"
                  dangerouslySetInnerHTML={{ __html: pageDetails.title }}
                ></div>
                <div
                  dangerouslySetInnerHTML={{ __html: pageDetails.description }}
                ></div>
              </div>
            </div>
            {fgtPwTab ? (
              <ForgetPasswordSection setFgtPwTab={setFgtPwTab} />
            ) : otpTab ? (
              <VerifyOtp setOtpTab={setOtpTab} loginDetails={loginDetails} />
            ) : (
              <LoginSection
                loginDetails={loginDetails}
                handleChange={handleChange}
                valid={valid}
                login={login}
                setFgtPwTab={setFgtPwTab}
                setOtpTab={setOtpTab}
              />
            )}
          </div>
        </div>
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
          severity={alertType}
          sx={{ width: "100%", background: "#ec1a5f", color: "#fff" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLoader}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
export const getServerSideProps = async () => {
  let url = APIURL() + "login-page-details";
  let res = await axiosGet(url);
  const pageDetails = res.data[0].response.data[0];
  const metaData = {
    title: pageDetails.page_title ? pageDetails.page_title : "",
    metaTitle: pageDetails.meta_tag ? pageDetails.meta_tag : "",
    metaKeyWords: pageDetails.meta_keyword ? pageDetails.meta_keyword : "",
    metaDesc: pageDetails.meta_desc ? pageDetails.meta_desc : "",
    ogTitle: pageDetails.og_title ? pageDetails.og_title : "",
    ogDesc: pageDetails.og_desc ? pageDetails.og_desc : "",
    ogSiteName: pageDetails.og_site_name ? pageDetails.og_site_name : "",
    twitterCard: pageDetails.twitter_card ? pageDetails.twitter_card : "",
    twitterDesc: pageDetails.twitter_desc ? pageDetails.twitter_desc : "",
    twitterSite: pageDetails.twitter_site ? pageDetails.twitter_site : "",
    twitterTitle: pageDetails.twitter_title ? pageDetails.twitter_title : "",
  };

  return { props: { pageDetails, metaData } };
};

export default Login;
