import Link from "next/link";
import React from "react";

function ArticleFiber(props) {
  const { deal_title, deal_desc, check_btn_name, check_btn_link } = props;
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
              <Link href={check_btn_link} className="btn-style-radius">
                {check_btn_name}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ArticleFiber;
