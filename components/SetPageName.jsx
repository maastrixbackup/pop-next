import React from "react";
import { useEffect } from "react";

function SetPageName({name}) {
  useEffect(() => {
    localStorage.setItem("page", name);
  }, [name]);
  return <></>;
}

export default SetPageName;
