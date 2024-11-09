import { React, useState } from "react";
import HelpAndSupportSidebar from "../HelpAndSupportSidebar";
import Link from "next/link";

function ArticleContent({article}) {
  const [refresh, setRefresh] = useState(false);



  return (
    <>
      <div>
        <section className="article-header">
          <div className="container">
            <div className="row align-items-center">
              <div
                className="col-xl-12 wow fadeInRightBig"
                data-wow-delay="0.2s"
              >
                <h1>{article.title}</h1>
              </div>
            </div>
          </div>
        </section>
        <section className="article-main-body">
          <div className="container">
            <div className="row">
              <div className="col-xl-9 col-lg-8 article-right-padgap">
                {article.video ? (
                  <video width="100%" src={article.video} controls></video>
                ) : (
                  ""
                )}
                {/*{article.url ? (
                  <ReactPlayer url={article.url} controls={true} />
                ) : (
                  ""
                )}*/}
                <div
                  className="article-main-body-left"
                  dangerouslySetInnerHTML={{ __html: article.article_body }}
                ></div>

                <div className="article-main-body-left-backto">
                  <div className="article-main-body-left-backto1">
                    <Link href="/help-support">
                      <i className="fas fa-chevron-circle-left" /> Back to Help
                      &amp; Support
                    </Link>
                  </div>
                </div>
              </div>
              <HelpAndSupportSidebar
                setRefresh={setRefresh}
                refresh={refresh}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default ArticleContent;
