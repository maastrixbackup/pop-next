import React from "react";
import dynamic from "next/dynamic";
const ContractCheckOut = dynamic(
  () => import("../../../components/OrderProcess/ContractCheckOut"),
  { ssr: false }
);

function index() {
  return <ContractCheckOut />;
}

export default index;
