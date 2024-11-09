import React from "react";

function Banner(props) {
  const { searchText, setSearchText, resultSec } = props;
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };
  const scroll = (e) => {
    if(e.key === "Enter"){
      resultSec.current.scrollIntoView()
    }
  };
  return (
    <>
      <section className="article-header">
        <div className="container">
          <div className="row align-items-center">
            <div
              className="col-xl-8 wow fadeInRightBig mx-auto"
              data-wow-delay="0.2s"
            >
              <div className="inner-title-small">
                <h3>Frequently Asked Questions?</h3>
                <div className="faq-text-input">
                  <input
                    type="text"
                    className="form-control"
                    placeholder=" Ask us something someting you would like to know..."
                    value={searchText}
                    onChange={handleSearchChange}
                    onKeyDown={scroll}
                  />
                  <i className="fal fa-search" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Banner;
