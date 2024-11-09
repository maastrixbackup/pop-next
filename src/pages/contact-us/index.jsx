import Form from "../../../components/Contact Us/Form";
import Info from "../../../components/Contact Us/Info";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { axiosGet } from "../../../Methods/Save";
import { APIURL } from "../../../Methods/Fetch";
import { Modal, ModalBody, ModalFooter, Button } from "reactstrap";
import Content from "../../../components/Terms and Conditions/Content";
import { useState } from "react";
import SetPageName from "../../../components/SetPageName";
import MetaContext from "../../../context/MetaContext";

function Index({ pageDetails, metaData }) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const bussiness = false;
  return (
    <>
      <SetPageName name={pageDetails.page_title} />

      <MetaContext {...metaData} />
      <div className={bussiness ? "buisness-mobile" : ""}>
        <Header bussinesspage={bussiness ? true : false} />
        <div class="body-box-margin">
          <Info
            bussiness={bussiness}
            title={pageDetails.title}
            description={pageDetails.description}
            title_one={pageDetails.title_one}
            email={pageDetails.email}
            title_two={pageDetails.title_two}
            email_icon={pageDetails.email_icon}
            address={pageDetails.address}
            address_icon={pageDetails.address_icon}
            contact_no={pageDetails.contact_no}
            contact_icon={pageDetails.contact_icon}
            image_at={pageDetails.image_at}
            image_email={pageDetails.image_email}
            company_address={pageDetails.company_address}
            company_address_desc={pageDetails.company_address_desc}
            headquater={pageDetails.headquater}
            headquater_desc={pageDetails.headquater_desc}
            press_enquiries={pageDetails.press_enquiries}
            press_enquiries_desc={pageDetails.press_enquiries_desc}
            general_enquiries={pageDetails.general_enquiries}
            general_enquiries_desc={pageDetails.general_enquiries_desc}
          />
          <Form
            image_at={pageDetails.image_at}
            image_email={pageDetails.image_email}
            desc_two={pageDetails.desc_two}
            setModal={setModal}
          />
          <Footer bussinesspage={bussiness ? true : false} />
          <Modal
            isOpen={modal}
            toggle={toggle}
            backdrop="static"
            scrollable={true}
          >
            <ModalBody>
              <Content modal={modal} />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => toggle()}>
                Close
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    </>
  );
}
export const getServerSideProps = async () => {
  let url = APIURL() + "contact-page-details";
  let res = await axiosGet(url);
  const pageDetails = res.data[0].response.data[0];
  const metaData = {
    title: pageDetails.page_title ? pageDetails.page_title : "",
    metaTitle: pageDetails.meta_tag ? pageDetails.meta_tag : "",
    metaKeyWords: pageDetails.meta_keyword ? pageDetails.meta_keyword : "",
    metaDesc: pageDetails.meta_desc ? pageDetails.meta_desc : "",
    ogTitle: pageDetails.og_title ? pageDetails.og_title : "",
    ogDesc: pageDetails.og_desc ? pageDetails.og_desc : "",
    ogSiteName: pageDetails.og_site_name ? pageDetails.og_site_name : "",
    twitterCard: pageDetails.twitter_card ? pageDetails.twitter_card : "",
    twitterDesc: pageDetails.twitter_desc ? pageDetails.twitter_desc : "",
    twitterSite: pageDetails.twitter_site ? pageDetails.twitter_site : "",
    twitterTitle: pageDetails.twitter_title ? pageDetails.twitter_title : "",
  };

  return { props: { pageDetails, metaData } };
};

export default Index;
