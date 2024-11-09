

function Content({pageDetails,pageDataDetails}) {


  return (
    <>
      <div>
        <section className="article-header">
          <div className="container">
            <div className="row align-items-center">
              <div
                className="col-xl-8 wow fadeInRightBig mx-auto"
                data-wow-delay="0.2s"
              >
                <div className="inner-title-small">
                  <h3>Privacy Policy</h3>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="privacy-box-sec">
          <div className="container">
            {pageDetails && pageDetails.length > 0
              ? pageDetails.map((pageDetail, index) => (
                  <div key={index} className="mb-8">
                    <h3 className="mb-2">{pageDetail.title}</h3>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: pageDetail.description,
                      }}
                    ></div>
                  </div>
                ))
              : ""}
          </div>
        </section>
      </div>
    </>
  );
}

export default Content;
