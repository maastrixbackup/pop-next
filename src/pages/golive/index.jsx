import dynamic from "next/dynamic";
const GoLive = dynamic(
  () => import("../../../components/OrderProcess/Golive"),
  { ssr: false }
);
function index() {
  return <GoLive />;
}

export default index;
