import React from "react";

function BlogHeader(props) {
  const { category,title } = props;
  return (
    <>
      <section className="article-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-12 wow fadeInRightBig" data-wow-delay="0.2s">
              <h1>Showing results for : {category ? category.title : title}</h1>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default BlogHeader;
