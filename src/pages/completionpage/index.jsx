import dynamic from "next/dynamic";
const CompletionPage = dynamic(
  () => import("../../../components/OrderProcess/CompletionPage"),
  { ssr: false }
);
function index() {
  return <CompletionPage />;
}

export default index;
