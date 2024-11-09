import { React, useEffect, useRef, useState } from "react";
// import OwlCarousel from "react-owl-carousel";
// import "owl.carousel/dist/assets/owl.carousel.css";
import { APIURL } from "../../Methods/Fetch";
import { axiosGet } from "../../Methods/Save";
// import ReviewSectionTrustPilot from "./ReviewSectionTrustPilot";
import dynamic from "next/dynamic";
const ReviewSectionTrustPilot = dynamic(() => import('./ReviewSectionTrustPilot'), {
  ssr:false,
})

function Reviewsection(props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  

  const { title, desc } = props;
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    var url = APIURL() + "testimonial-details";
    axiosGet(url).then((response) => {
      setReviews(response.data[0].response.data);
    });
  }, []);
  return (
    <>
      <section className="tetimonial-sec">
        <div className="container">
          <div className="row">
            <div
              className="col-xl-12 wow fadeInLeftBig"
              data-wow-duration="1.5s"
              data-wow-delay="0.2s"
            >
              <span className="sub-title3">{title}</span>
              <div className="title">
                <div dangerouslySetInnerHTML={{ __html: desc }}></div>
              </div>
            </div>
          </div>
        </div>
        <ReviewSectionTrustPilot />
      </section>
    </>
  );
}

export default Reviewsection;
