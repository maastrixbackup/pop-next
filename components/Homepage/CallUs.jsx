import { React, useEffect, useState } from "react";
import { axiosGet } from "../../Methods/Save";
import { APIURL } from "../../Methods/Fetch";
// import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import dynamic from 'next/dynamic'
 
const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false,
})
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Link from "next/link";
import Image from "next/image";


function CallUs({facility}) {
  // const [facility, setFacility] = useState([]);
  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#9524a2",
      color: "#fff",
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }));
  const options = {
    margin: 10,
    autoplay: false,
    dots: true,
    nav: false,
    // animateIn: "fadeInLeft",
    // autoplay: true,
    autoplayTimeout: 10000,
    responsive: {
      0: {
        items: 1,
      },

      600: {
        items: 1,
      },

      1024: {
        items: 3,
      },

      1366: {
        items: 3,
      },
    },
  };

  // useEffect(() => {
  //   var url = APIURL() + "facility-details";
  //   axiosGet(url).then((response) => {
  //     setFacility(response.data[0].response.data);
  //   });
  // }, []);
  return (
    <>
      <section className="contact-top-sec">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-xl-6 col-md-6 col-4">
              <div className="call-man-top">
                <div className="call-man-icon">
                  <Image height={400} width={400} src="/images/call.png" alt="image" />
                </div>
                <div className="call-man-text">
                  <span>Call Us </span>
                  <a href="tel:+03435386666">0343 5386666</a>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-md-6 col-8">
              <div className="product-list-top">
                <ul>
                  <li>
                    <LightTooltip title="Tv" placement="top">
                      <Link href="/tv">
                        <Image height={400} width={400} src="/images/tv.png" alt="image" />
                        <span>TV</span>
                      </Link>
                    </LightTooltip>
                  </li>
                  <li>
                    <LightTooltip title="BroadBand" placement="top">
                      <Link href="/broadband">
                        <Image height={400} width={400} src="/images/wifi.png" alt="image" />
                        <span>Broadband</span>
                      </Link>
                    </LightTooltip>
                  </li>
                  <li>
                    <LightTooltip title="Sim only" placement="top">
                      <Link href="/mobile">
                        <Image height={400} width={400} src="/images/sim.png" alt="image" />
                        <span>Sim Only Deals</span>
                      </Link>
                    </LightTooltip>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bill-speed-sec ptb-50">
        <div className="container">
          <div className="row">
            {facility && facility.length > 0 ? (
              <OwlCarousel className="owl-theme" {...options}>
                {facility.map((faci, index) => (
                  <Link key={index} href={faci.url ? faci.url : "/"}>
                    <div
                      key={index}
                      className="wow fadeInLeftBig"
                      data-wow-delay={
                        index == 0 ? "0.4s" : index == 1 ? "0.8s" : "1.2s"
                      }
                    >
                      <div className="bill-speed-box">
                        <Image height={400} width={400} src={faci.image} alt="image" />
                        <h3>{faci.title}</h3>
                        <h4>{faci.sub_heading}</h4>
                        <div
                          dangerouslySetInnerHTML={{ __html: faci.description }}
                        ></div>
                      </div>
                    </div>
                  </Link>
                ))}
              </OwlCarousel>
            ) : (
              ""
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default CallUs;
