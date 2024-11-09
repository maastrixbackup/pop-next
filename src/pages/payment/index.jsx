import React from "react";
import dynamic from "next/dynamic";
const DirectDebit = dynamic(
  () => import("../../../components/OrderProcess/DirectDebit"),
  { ssr: false }
);
function index() {
  return <DirectDebit />;
}

export default index;
