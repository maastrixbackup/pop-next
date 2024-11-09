import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductSelectionAgent from "../../../../../components/Agent/ProductSelectionAgent";
import Signup from "../../../../../components/Agent/Signup";
import PaymentPageAgent from "../../../../../components/Agent/PaymentPageAgent";
import { Alert, Backdrop, CircularProgress, Snackbar } from "@mui/material";
import { Box } from "@mui/system";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import YourOrders from "../../../../../components/ContractInstallation/YourOrders";
import ThankYouAgent from "../../../../../components/Agent/ThankYouAgent";
import { APIURL } from "../../../../../Methods/Fetch";
import { axiosPost } from "../../../../../Methods/Save";
import Addons from "../../../../../components/ContractInstallation/Addons";
import MetaContext from "../../../../../context/MetaContext";

function AgentOrder(props) {
  // useEffect(() => {
  //   localStorage.clear();
  // }, []);
  const params = useParams();

  const [ids, setIds] = useState([]);
  const [related_ids, setRelated_Ids] = useState([]);
  const [rental_ids, setRental_Ids] = useState([]);
  const [addonsParentCategory, setAddonsParentCategory] = useState([]);
  const [addedCategory, setAddedCategory] = useState([]);
  const [addedRentCategory, setAddedRentCategory] = useState([]);
  const [addedProducts, setAddedProducts] = useState([]);
  const [addedRentalProducts, setAddedRentalProducts] = useState([]);
  const [deliveryPrice, setDeliveryPrice] = useState();

  const [vertical, setvertical] = useState("top");
  const [horizontal, sethori] = useState("right");
  const [step, setStep] = useState(0);
  const { agentid, orderId } = params;
  const [alertType, setAlertType] = useState();
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [openLoader, setpenLoader] = useState(false);

  const [productTab, setProductTab] = useState(true);
  const [orderType, setOrderType] = useState("new");
  const [addonsTab, setAddonsTab] = useState(false);
  const [relatedProductTab, setRelatedProductTab] = useState(false);
  const [paymentTab, setPaymentTab] = useState(false);
  const [thankYouTab, setThankYouTab] = useState(false);
  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const [monthlyCost, setMonthlyCost] = useState();
  const [upfrontPayment, setUpfrontPayment] = useState();
  const [addons, setAddOns] = useState([]);
  const [rentalProducts, setRentalProducts] = useState([]);
  const [userDetails, setuserDetails] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    email: "",
    address: "",
    prev_address: "",
    dob: "",
    landline_no: "",
    pac: "",
  });
  const [wifiDetails, setWifiDetails] = useState({
    name: "",
    password: "",
  });
  const [page, setPage] = useState("empty");
  const [type, setType] = useState("");
  useEffect(() => {
    setAddedRentalProducts(
      JSON.parse(localStorage.getItem("addedRentalProducts"))
    );
  }, []);

  const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
    ...(ownerState.active && {
      color: "#784af4",
    }),
    "& .QontoStepIcon-completedIcon": {
      color: "#784af4",
      zIndex: 1,
      fontSize: 18,
    },
    "& .QontoStepIcon-circle": {
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: "currentColor",
    },
  }));

  function QontoStepIcon(props) {
    const { active, completed, className } = props;

    return (
      <QontoStepIconRoot ownerState={{ active }} className={className}>
        {completed ? (
          <Check className="QontoStepIcon-completedIcon" />
        ) : (
          <div className="QontoStepIcon-circle" />
        )}
      </QontoStepIconRoot>
    );
  }

  QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
  };

  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor:
        theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
      borderRadius: 1,
    },
  }));

  const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
      backgroundImage:
        "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
      boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    }),
    ...(ownerState.completed && {
      backgroundImage:
        "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    }),
  }));

  function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
      1: <i className="fas fa-broadcast-tower"></i>,
      2: <GroupAddIcon />,
      3: <i className="fas fa-shopping-basket"></i>,
      4: <i className="fas fa-thumbs-up"></i>,
    };

    return (
      <ColorlibStepIconRoot
        ownerState={{ completed, active }}
        className={className}
      >
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }

  ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
  };

  const steps = [
    "Select Address and Product",
    "Select Addons and sign up",
    "Payment Page",
    "Order Completed",
  ];
  const goToPayment = () => {
    setRelatedProductTab(true);
    setAddonsTab(false);
    setProductTab(false);
    setStep(2);
    localStorage.setItem("addons-agents", JSON.stringify(addons));
  };
  useEffect(() => {
    if (orderId) {
      setOpen(true);
      var url = APIURL() + `order/details`;
      var data = {
        order_id: orderId,
      };
      axiosPost(url, data).then((response) => {
        setuserDetails({
          ...userDetails,
          address: response.data[0].response.order.address,
          dob: response.data[0].response.order.dob,
          email: response.data[0].response.order.email,
          first_name: response.data[0].response.order.first_name,
          landline_no: response.data[0].response.order.landline,
          last_name: response.data[0].response.order.last_name,
          mobile_number: response.data[0].response.order.number,
          prev_address: response.data[0].response.order.prev_address,
        });
        localStorage.setItem("order_id", orderId);
        setUpfrontPayment(
          response.data[0].response.data[0].installation_cost
            ? response.data[0].response.data[0].installation_cost
            : 0
        );
        setMonthlyCost(response.data[0].response.data[0].price);
        setProduct(response.data[0].response.data[0]);
        setOpen(false);

        setProductTab(false);
        setPaymentTab(true);
        console.warn("response", response);
      });
    }
  }, []);
  var installation_cost = 0;
  useEffect(() => {
    installation_cost = localStorage.getItem("upfrontPayment");
  }, []);
  return (
    <>
      <MetaContext title="Agent Order" />

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
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLoader}
        onBackdropClick="false"
      >
        <Box
          sx={{ position: "relative", display: "block", textAlign: "center" }}
        >
          <CircularProgress color="inherit" />
        </Box>
      </Backdrop>
      <section className="appointment_page mt-4">
        <div className="container">
          <div className="row">
            <Stack sx={{ width: "100%" }} spacing={4}>
              <Stepper
                alternativeLabel
                activeStep={step}
                connector={<ColorlibConnector />}
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel StepIconComponent={ColorlibStepIcon}>
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Stack>
            <div className="col-lg-12 col-md-12 mt-4">
              {productTab ? (
                <ProductSelectionAgent
                  page={page}
                  setSelectedProduct={setProduct}
                  setProductTab={setProductTab}
                  setAddonsTab={setAddonsTab}
                  userDetails={userDetails}
                  setuserDetails={setuserDetails}
                  setMonthlyPrice={setMonthlyCost}
                  setUpfrontPayment={setUpfrontPayment}
                  openLoader={openLoader}
                  setpenLoader={setpenLoader}
                  setPage={setPage}
                  setType={setType}
                  type={type}
                  setStep={setStep}
                  setOrderType={setOrderType}
                />
              ) : addonsTab ? (
                <div className="row agent_order">
                  <div className="col-xl-8">
                    <h6>Addons</h6>
                    <Addons
                      data="calling"
                      addons={addons}
                      setAddOns={setAddOns}
                      monthlyTotal={monthlyCost}
                      setMonthlyTotal={setMonthlyCost}
                      rentalProducts={rentalProducts}
                      setRentalProducts={setRentalProducts}
                      setUpfrontPaymnet={setUpfrontPayment}
                      ids={ids}
                      setIds={setIds}
                      setRelated_Ids={setRelated_Ids}
                      related_ids={related_ids}
                      rental_ids={rental_ids}
                      setRental_Ids={setRental_Ids}
                      products={products}
                      setProducts={setProducts}
                      addonsParentCategory={addonsParentCategory}
                      setAddonsParentCategory={setAddonsParentCategory}
                      addedCategory={addedCategory}
                      setAddedCategory={setAddedCategory}
                      addedRentCategory={addedRentCategory}
                      setAddedRentCategory={setAddedRentCategory}
                      addedProducts={addedProducts}
                      setAddedProducts={setAddedProducts}
                      addedRentalProducts={addedRentalProducts}
                      setAddedRentalProducts={setAddedRentalProducts}
                      setDeliveryPrice={setDeliveryPrice}
                      agent={true}
                      selectedProduct={product}
                    />
                    <h6 className="mt-3">Related Products</h6>
                    <Addons
                      agentOrder={true}
                      data="products"
                      addons={addons}
                      setAddOns={setAddOns}
                      monthlyTotal={monthlyCost}
                      setMonthlyTotal={setMonthlyCost}
                      rentalProducts={rentalProducts}
                      setRentalProducts={setRentalProducts}
                      setUpfrontPaymnet={setUpfrontPayment}
                      ids={ids}
                      setIds={setIds}
                      setRelated_Ids={setRelated_Ids}
                      related_ids={related_ids}
                      rental_ids={rental_ids}
                      setRental_Ids={setRental_Ids}
                      products={products}
                      setProducts={setProducts}
                      addonsParentCategory={addonsParentCategory}
                      setAddonsParentCategory={setAddonsParentCategory}
                      addedCategory={addedCategory}
                      setAddedCategory={setAddedCategory}
                      addedRentCategory={addedRentCategory}
                      setAddedRentCategory={setAddedRentCategory}
                      addedProducts={addedProducts}
                      setAddedProducts={setAddedProducts}
                      addedRentalProducts={addedRentalProducts}
                      setAddedRentalProducts={setAddedRentalProducts}
                      setDeliveryPrice={setDeliveryPrice}
                      agent={true}
                      selectedProduct={product}
                    />
                  </div>

                  <YourOrders
                    monthlyTotal={monthlyCost}
                    planDetails={product}
                    registerandsave={goToPayment}
                    addons={addons}
                    products={products}
                    setProducts={setProducts}
                    installation_cost={installation_cost}
                    setAddOns={setAddOns}
                    upfrontPayment={upfrontPayment}
                    rentalProducts={rentalProducts}
                    priceBeforeDiscount=""
                    deliveryPrice={deliveryPrice}
                    setDeliveryPrice={setDeliveryPrice}
                  />
                </div>
              ) : relatedProductTab ? (
                <Signup
                  userDetails={userDetails}
                  setuserDetails={setuserDetails}
                  wifiDetails={wifiDetails}
                  setWifiDetails={setWifiDetails}
                  setRelatedProductTab={setRelatedProductTab}
                  setPaymentTab={setPaymentTab}
                  setAlertType={setAlertType}
                  setMessage={setMessage}
                  setOpen={setOpen}
                  addons={addons}
                  product={product}
                  page={page}
                  type={type}
                  upfrontPayment={upfrontPayment}
                  setUpfrontPayment={setUpfrontPayment}
                  setpenLoader={setpenLoader}
                  monthlyTotal={monthlyCost}
                  agent_id={agentid}
                  orderType={orderType}
                />
              ) : paymentTab ? (
                <div className="row">
                  <div className="col-xl-8">
                    <PaymentPageAgent
                      userDetails={userDetails}
                      addons={addons}
                      relatedProducts={products}
                      rentalProducts={rentalProducts}
                      upfrontPayment={upfrontPayment}
                      monthlyTotal={monthlyCost}
                      setStep={setStep}
                      agent_id={agentid}
                      setThankYouTab={setThankYouTab}
                      setPaymentTab={setPaymentTab}
                      setpenLoader={setpenLoader}
                      type={type}
                    />
                  </div>
                  <YourOrders
                    monthlyTotal={monthlyCost}
                    planDetails={product}
                    registerandsave=""
                    addons={addons}
                    installation_cost={installation_cost}
                    setAddOns={setAddOns}
                    upfrontPayment={upfrontPayment}
                    rentalProducts={rentalProducts}
                    priceBeforeDiscount=""
                    lastPage={true}
                  />
                </div>
              ) : thankYouTab ? (
                <ThankYouAgent
                  setStep={setStep}
                  monthlyTotal={monthlyCost}
                  planDetails={product}
                  registerandsave=""
                  addons={addons}
                  installation_cost={localStorage.getItem("upfrontPayment")}
                  setAddOns={setAddOns}
                  upfrontPayment={upfrontPayment}
                  rentalProducts={rentalProducts}
                  priceBeforeDiscount=""
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AgentOrder;
