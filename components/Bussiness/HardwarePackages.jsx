import React from "react";
import SkeletonComponent from "../Common/SkeletonComponent";
import Link from "next/link";
import Image from "next/image";

function HardwarePackages(props) {
  const {
    package_header,
    package_title,
    tab_one_title1,
    tab_one_title2,
    tab_one_desc1,
    tab_one_desc2,
    tab_one_img1,
    tab_two_title1,
    tab_two_desc1,
    tab_two_img1,
    tab_one_img2,
    tab_three_title1,
    tab_three_desc1,
    tab_three_img1,
    tab_name1,
    tab_name2,
    tab_name3,
    tab_one_btn_link2,
    tab_one_btn_name2,
    tab_one_btn_link1,
    tab_one_btn_name1,
    tab_two_btn_name1,
    tab_two_btn_link1,
    tab_three_btn_name1,
    tab_three_btn_link1,
  } = props;
  return (
    <>
      <section className="hardware-tab-sec">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="title-buisness">
                <div dangerouslySetInnerHTML={{ __html: package_header }}></div>
                <div dangerouslySetInnerHTML={{ __html: package_title }}></div>
              </div>
            </div>
            <div className="col-xl-12">
              <div className="tab-box">
                <ul className="nav nav-tabs">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-bs-toggle="tab"
                      href="#tabdel"
                    >
                      {tab_name1}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="#tabpro">
                      {tab_name2}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="#tabcom">
                      {tab_name3}
                    </a>
                  </li>
                </ul>
              </div>
              <div className="tab-content-data">
                <div className="tab-content">
                  <div className="tab-pane active" id="tabdel">
                    <div className="row">
                      <div className="col-xl-6">
                        {tab_one_img1 ? (
                          <div className="hardware-package-img">
                            <Image height={400} width={400} src={tab_one_img1} alt="banner_img" />
                          </div>
                        ) : (
                          <SkeletonComponent color="#666c73" />
                        )}
                      </div>
                      <div className="col-xl-6">
                        <div className="buisness-connected-content">
                          <h4>{tab_one_title1}</h4>
                          <div
                            dangerouslySetInnerHTML={{ __html: tab_one_desc1 }}
                          ></div>
                          <Link
                            href={tab_one_btn_link1}
                            className="buisness-btn-one"
                          >
                            {tab_one_btn_name1}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane " id="tabpro">
                    <div className="row">
                      <div className="col-xl-6">
                        {tab_two_img1 ? (
                          <div className="hardware-package-img">
                            <Image height={400} width={400} src={tab_two_img1} alt="banner_img" />
                          </div>
                        ) : (
                          <SkeletonComponent color="#666c73" />
                        )}
                      </div>
                      <div className="col-xl-6">
                        <div className="buisness-connected-content">
                          <h4>{tab_two_title1}</h4>
                          <div
                            dangerouslySetInnerHTML={{ __html: tab_two_desc1 }}
                          ></div>
                          <Link
                            href={tab_two_btn_link1}
                            className="buisness-btn-one"
                          >
                            {tab_two_btn_name1}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane " id="tabcom">
                    <div className="row">
                      <div className="col-xl-6">
                        {tab_three_img1 ? (
                          <div className="hardware-package-img">
                            <Image height={400} width={400} src={tab_three_img1} alt="banner_img" />
                          </div>
                        ) : (
                          <SkeletonComponent color="#666c73" />
                        )}
                      </div>
                      <div className="col-xl-6">
                        <div className="buisness-connected-content">
                          <h4>{tab_three_title1}</h4>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: tab_three_desc1,
                            }}
                          ></div>
                          <Link
                            href={tab_three_btn_link1}
                            className="buisness-btn-one"
                          >
                            {tab_three_btn_name1}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="spacer30px"></div>
      <section className="buisness-connected-sec">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-5 col-md-6">
                {tab_one_img2 ? (
                  <div className="business-connected-img">
                    <Image height={400} width={400} src={tab_one_img2} alt="banner_img" />
                  </div>
                ) : (
                  <SkeletonComponent color="#666c73" />
                )}
            </div>
            <div className="col-xl-7 col-md-6">
              <div className="buisness-connected-content">
                <h4>{tab_one_title2}</h4>
               <div dangerouslySetInnerHTML={{ __html:tab_one_desc2 }}></div>
                <Link href={tab_one_btn_link2} className="buisness-btn-one">
                  {tab_one_btn_name2}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HardwarePackages;
