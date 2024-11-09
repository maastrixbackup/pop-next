import React from "react";
import AddressInput from "../Homepage/AddressInput";
import TrustPilot from "../../components/TrustPilot";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import SkeletonComponent from "../Common/SkeletonComponent";
import Link from "next/link";
import Image from "next/image";

function BussinessBanner(props) {
  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#0b6ff6",
      color: "#fff",
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }));
  const { banner_header, banner_title, banner_img,phone } = props;
  return (
    <>
      <section className="buisness-banner"  style={{
                    backgroundImage: `url(${banner_img})`,
                    backgroundSize: "450px",
                    backgroundPosition: "right 54px bottom",
                  }}>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-8">
                <div className="buisness-content">
                  <div dangerouslySetInnerHTML={{ __html: banner_header }}></div>
                  <div dangerouslySetInnerHTML={{ __html: banner_title }}></div>
                  <div
                    className="banner-inputform mb-4"
                    style={{ marginTop: 40 }}
                  >
                    <AddressInput page="tv" />
                  </div>
                  <TrustPilot />
                </div>
              </div>
              <div className="col-xl-4 wow fadeInRightBig" data-wow-delay="0.8s">
                {banner_img ? (
                  <div className="banner-img">
                    <Image height={400} width={400} src={banner_img} alt="banner_img" />
                  </div>
                ) : (
                  <SkeletonComponent color="#125ecf62" />
                )}
              </div>
            </div>
          </div>
      </section>
      <section className="contact-top-sec">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-xl-6 col-md-6">
              <div className="call-man-text">
                <span>Get in touch</span>
                <a href={`tel:${phone}`}>{phone}</a>
              </div>
            </div>
            <div className="col-xl-6 col-md-6">
              <div className="product-list-top">
                <ul>
                  <li>
                    <LightTooltip title="VOIP" placement="top">
                      <Link href="/business-landline">
                        <Image height={400} width={400} src="/images/whatsapp.png" alt="image" />
                        <span>VOIP</span>
                      </Link>
                    </LightTooltip>
                  </li>
                  <li>
                    <LightTooltip title="Mobile" placement="top">
                      <Link href="/business-mobile">
                        <Image height={400} width={400} src="/images/smartphone.png" alt="image" />
                        <span>Mobile</span>
                      </Link>
                    </LightTooltip>
                  </li>
                  <li>
                    <LightTooltip title="Broadband" placement="top">
                      <Link href="/business-broadband">
                        <Image height={400} width={400} src="/images/wifi-wh.png" alt="image" />
                        <span>Broadband</span>
                      </Link>
                    </LightTooltip>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default BussinessBanner;
