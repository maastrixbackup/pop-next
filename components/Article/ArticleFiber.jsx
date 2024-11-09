import Link from "next/link";
import React from "react";

function ArticleFiber(props) {
  const { deal_desc, deal_title, deal_btn_link } = props;
  return (
    <>
      <section className="articlefiber-full1">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <h2 className="wow fadeInLeftBig" data-wow-delay="0.4s">
                {deal_title}
              </h2>
              <div dangerouslySetInnerHTML={{ __html: deal_desc }}></div>
              <Link href={deal_btn_link} className="btn-style-radius">
                Choose
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ArticleFiber;
