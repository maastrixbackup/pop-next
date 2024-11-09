import dynamic from "next/dynamic";
const ThankYou = dynamic(
  () => import("../../../../components/OrderProcess/ThankYou"),
  { ssr: false }
);

function index() {
  return <ThankYou paymentMode="paypal"/>;
}

export default index;
