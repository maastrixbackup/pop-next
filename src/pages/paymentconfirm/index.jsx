import dynamic from "next/dynamic";
const FinalPage = dynamic(
  () => import("../../../components/OrderProcess/PaymentPage"),
  { ssr: false }
);
function index() {
  return <FinalPage />;
}

export default index;
