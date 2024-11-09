import React, { useEffect, useState } from "react";
import { APIURL } from "../../Methods/Fetch";
import { axiosGet } from "../../Methods/Save";

function Info(props) {
  const {
    title,
    description,
    title_one,
    email,
    email_icon,
    address,
    address_icon,
    contact_no,
    contact_icon,
    title_two,
    company_address,
    company_address_desc,
    headquater,
    headquater_desc,
    press_enquiries,
    press_enquiries_desc,
    general_enquiries,
    general_enquiries_desc,
    bussiness,
  } = props;
  useEffect(() => {
    var url = APIURL() + "reachus-section";
    axiosGet(url).then((response) => {
      var bussContent = response.data[0].response.data.filter(
        (car) => car.is_business === 1
      );
      var consumerContent = response.data[0].response.data.filter(
        (car) => car.is_business !== 1
      );
      if (bussiness) {
        setPageDetails(bussContent);
      } else setPageDetails(consumerContent);
    });
  }, []);
  const [pageDetails, setPageDetails] = useState([]);

  return (
    <>
      <div>
        <section className="contact-header">
          <div className="container">
            <div className="row align-items-center">
              <div
                className="col-xl-8 wow fadeInRightBig mx-auto"
                data-wow-delay="0.2s"
              >
                <div className="inner-title-small">
                  <h3
                    className="p-2"
                    dangerouslySetInnerHTML={{ __html: title }}
                  ></h3>
                  <div dangerouslySetInnerHTML={{ __html: description }}></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="contact-body">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h1>{title_one}</h1>
              </div>
            </div>
            <div className="row">
              {pageDetails &&
                pageDetails.length > 0 &&
                pageDetails.map((pd,i) => (
                  <div key={i} className="col-lg-4 col-md-4">
                    <div className="support-box-wh contactsup">
                      <i className={pd.reach_icon} />
                      <h4>{pd.reach_title}</h4>
                      <ul>
                        <li>
                          <i className="far fa-phone-alt" /> {pd.reach_phone}
                        </li>
                        <li>
                          <i className="fal fa-clock" /> {pd.reach_time}
                        </li>
                        <li>
                          <i className="fal fa-envelope" /> {pd.reach_email}
                        </li>
                      </ul>
                      <div className="chat-contact-btn">
                        <a href={pd.chat_btn_link} className="btn-style-four">
                          <i className="far fa-phone-alt" /> Call
                        </a>
                        <a href={pd.email_btn_link} className="btn-style-four">
                          <i className="fal fa-envelope" /> Email
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="contact-body2">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="contact-body2-sec">
                  <div className="row">
                    <div className="col-lg-12 text-center">
                      <h1 className="pb-1">{title_two}</h1>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-3 col-md-6 text-center">
                      <h5>{company_address}</h5>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: company_address_desc,
                        }}
                      ></div>
                    </div>
                    <div className="col-lg-3 col-md-6 text-center">
                      <h5>{headquater}</h5>
                      <div
                        dangerouslySetInnerHTML={{ __html: headquater_desc }}
                      ></div>
                    </div>
                    <div className="col-lg-3 col-md-6 text-center">
                      <h5>{press_enquiries}</h5>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: press_enquiries_desc,
                        }}
                      ></div>
                    </div>
                    <div className="col-lg-3 col-md-6 text-center">
                      <h5>{general_enquiries}</h5>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: general_enquiries_desc,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Info;
