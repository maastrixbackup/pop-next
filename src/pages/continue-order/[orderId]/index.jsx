import dynamic from "next/dynamic";
import React from "react";
const ContractInstallation = dynamic(
  () => import("../../../../components/OrderProcess/ContractInstallation"),
  { ssr: false }
);

function index() {
  return <ContractInstallation />;
}

export default index;
