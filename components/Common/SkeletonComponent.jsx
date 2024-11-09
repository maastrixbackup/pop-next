import { Skeleton } from "@mui/material";
import React from "react";

function SkeletonComponent({color}) {
  return (
    <>
      <Skeleton
        className="fullwidth_skeleton"
        sx={{ bgcolor: color }}
        variant="rectangular"
        height={100}
      />
    </>
  );
}

export default SkeletonComponent;
