import React from "react";
import dynamic from "next/dynamic";
const Marketing = dynamic(
  () => import("../../../components/OrderProcess/Marketting"),
  { ssr: false }
);
function index() {
  return <Marketing />;
}

export default index;
