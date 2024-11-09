function Content({ pageDetails }) {
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
                  <h3>{pageDetails.title}</h3>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="privacy-box-sec">
          <div className="container">
            <div
              className="terms-condition"
              dangerouslySetInnerHTML={{ __html: pageDetails.description }}
            ></div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Content;
