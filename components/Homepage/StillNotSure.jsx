import React from "react";

function StillNotSure(props) {
  const { title, desc } = props;
  return (
    <>
      <section className="helping-sec">
        <div className="container">
          <div className="row">
            <div className="col-xl-7 wow fadeInLeftBig" data-wow-delay="0.4s">
              <div className="helping-text">
                <h1>{title}</h1>
                <div dangerouslySetInnerHTML={{ __html: desc }}></div>                
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default StillNotSure;
