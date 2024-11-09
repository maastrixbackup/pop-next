import dynamic from "next/dynamic";
const ZipcodeAddress = dynamic(
  () => import("../../../components/OrderProcess/ZipcodeAddress"),
  {
    ssr: false,
  }
);
import React from "react";

function Index() {
  return <ZipcodeAddress />;
}

export default Index;
