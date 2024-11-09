import React from "react";
import AddressInput from "../Homepage/AddressInput";


function FiberSection(props) {
  const { experience_title, experience_desc } = props;
  return (
    <>
      <section className="fiber-sec articlefiber">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="fiber-box">
                <h2 className="wow fadeInLeftBig" data-wow-delay="0.4s">
                  {experience_title}
                </h2>
                <div dangerouslySetInnerHTML={{ __html:experience_desc }}></div>
                <div className="banner-inputform">
                <AddressInput page="broadband" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default FiberSection;
