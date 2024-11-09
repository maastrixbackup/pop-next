"use client";
import { React, useEffect, useState } from "react";

const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});
import dynamic from "next/dynamic";

const AddressInput = dynamic(() => import("./AddressInput"), { ssr: false });
import Bubbles from "../Bubbles";
import { Skeleton } from "@mui/material";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Image from "next/image";

const options = {
  loop: true,
  margin: 10,
  items: 1,
  autoplay: true,
  dots: false,
  nav: true,
  // animateIn: "fadeInLeft",
  autoplayTimeout: 10000,
};

function HomepageSlider({ banners }) {
  return (
    <>
      {banners && banners.length > 0 ? (
        <div className="slider">
          <Bubbles />
          <OwlCarousel className="owl-theme" {...options}>
            {banners.map((banner, index) => (
              <div className="item" key={index}>
                <div
                  className="cover"                  
                >
                  <Image
                    src={banner.image}
                    alt={`banner${index}`}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    className="bannerImg"
                  />
                  <div className="container">
                    <div className="header-content">
                      <div className="banner-content">
                        <div
                          dangerouslySetInnerHTML={{ __html: banner.title }}
                        ></div>
                        <div
                          className="title2"
                          dangerouslySetInnerHTML={{
                            __html: banner.description,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </OwlCarousel>
          <AddressInput homepage={true} />
        </div>
      ) : (
        <>
          <div className="container" style={{ marginTop: "100px" }}>
            <div className="row">
              <div className="col-xl-8">
                <Skeleton
                  className="fullwidth_skeleton"
                  animation="wave"
                  variant="text"
                  sx={{ fontSize: "5rem" }}
                />
                <Skeleton
                  className="fullwidth_skeleton"
                  animation="wave"
                  variant="text"
                  sx={{ fontSize: "1rem" }}
                />
                <Skeleton
                  className="fullwidth_skeleton"
                  animation="wave"
                  variant="text"
                  sx={{ fontSize: "5rem" }}
                />
                <Skeleton
                  className="fullwidth_skeleton"
                  animation="wave"
                  variant="text"
                  sx={{ fontSize: "1rem" }}
                />
                <Skeleton
                  className="fullwidth_skeleton"
                  animation="wave"
                  variant="text"
                  sx={{ fontSize: "1rem" }}
                />
              </div>
              <div className="col-xl-4 desktop_responsive">
                <Skeleton
                  className="fullwidth_skeleton"
                  sx={{ marginBottom: "20px" }}
                  variant="circular"
                  width={400}
                  height={400}
                  animation="wave"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default HomepageSlider;
