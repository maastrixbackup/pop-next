import { React, useState } from "react";
import Pagination from "@mui/material/Pagination";

function PaginationIcons(props) {
  const { totalposts, postsperpage, setCurrentPage, tableRef, page, setPage } =
    props;
  let pages = [];
  for (let index = 1; index <= Math.ceil(totalposts / postsperpage); index++) {
    pages.push(index);
  }
  const handleChange = (event, value) => {
    setCurrentPage(value);
    setPage(value);
    tableRef && tableRef.current.scrollIntoView();
  };
  return (
    <>
      <Pagination
        color="primary"
        count={pages.length}
        page={page}
        onChange={handleChange}
        showFirstButton
        showLastButton
        style={{ float: "right" }}
      />
    </>
  );
}

export default PaginationIcons;
