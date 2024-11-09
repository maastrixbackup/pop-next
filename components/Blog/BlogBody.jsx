import { React, useEffect, useState } from "react";
import { APIURL } from "../../Methods/Fetch";
import { axiosPost } from "../../Methods/Save";
import PaginationIcons from "../Common/PaginationIcons";
import HelpAndSupportSidebar from "../HelpAndSupportSidebar";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

function BlogBody(props) {
  const params = useRouter().query;
  const { search } = params;
  const navigate = useRouter();
  const [pageNo, setPageNo] = useState(1);
  const { art_id, setRefresh, refresh } = props;
  const [category, setCategory] = useState();

  const [blogProducts, setBlogProducts] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("articles_category") != null) {
      setCategory(JSON.parse(localStorage.getItem("articles_category")));
    }
  }, [refresh]);
  useEffect(() => {
    if (localStorage.getItem("articles_category") == null) {
      var searchText = localStorage.getItem("searchText");

      var data = {
        search: searchText != null ? searchText : search,
      };
      var url = APIURL() + "blog-search";
      axiosPost(url, data).then((response) => {
        setBlogProducts(response.data[0].response.data);
        localStorage.removeItem("search_text");
      });
    } else {
      if (category) {
        var data = {
          cat_id: category.id,
        };
        var url = APIURL() + "blog";
        axiosPost(url, data).then((response) => {
          setBlogProducts(response.data);
        });
      }
    }
  }, [search, category]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const posts = blogProducts.slice(firstPostIndex, lastPostIndex);
  const saveInLocal = (article) => {
    // localStorage.setItem("blog-featured-article", JSON.stringify(article));
    // var para = article.title.toLowerCase().split(" ").join("-");
    var category = article.category[0].category_name
      .toLowerCase()
      .split(" ")
      .join("-");

    navigate.push(`/help-support/${category}/${article.url}`);
  };
  return (
    <>
      <section className="article-main-body">
        <div className="container">
          <div className="row">
            <div className="col-xl-9 col-lg-9">
              <div className="row">
                {posts && posts.length > 0 ? (
                  posts.map((blogProduct, index) => (
                    <div className="col-lg-6 mb-3" key={index}>
                      <div className="blog-box">
                        <div className="bolg-img">
                          <Image height={400} width={400} src={blogProduct.image} alt="blogProduct" />
                        </div>
                        <div className="blog-content">
                          <h4
                            style={{ cursor: "pointer" }}
                            onClick={(e) => saveInLocal(blogProduct)}
                          >
                            {blogProduct.title}
                          </h4>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: blogProduct.description,
                            }}
                          ></div>
                        </div>
                        <div className="btn-blog">
                          <a
                            onClick={(e) => saveInLocal(blogProduct)}
                            style={{ cursor: "pointer" }}
                            className="btn-style-five"
                          >
                            Read more
                          </a>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center">
                    <h2 className="text-danger">No articles found</h2>
                  </div>
                )}
                {blogProducts.length > postsPerPage ? (
                  <PaginationIcons
                    totalposts={blogProducts.length}
                    postsperpage={postsPerPage}
                    setCurrentPage={setCurrentPage}
                    setPage={setPageNo}
                    page={pageNo}
                  />
                ) : (
                  ""
                )}
              </div>
              <div className="article-main-body-left-backto">
                <div className="article-main-body-left-backto1">
                  <Link href="/help-support">
                    <i className="fas fa-chevron-circle-left" /> Back to Help
                    &amp; Support
                  </Link>
                </div>
              </div>
            </div>
            <HelpAndSupportSidebar setRefresh={setRefresh} refresh={refresh} />
          </div>
        </div>
      </section>
    </>
  );
}

export default BlogBody;
