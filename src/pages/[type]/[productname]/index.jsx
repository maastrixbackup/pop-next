import { useRouter } from "next/router";
// import Header from "../../../../components/Header";
// import Banner from "../../../../components/Landing page/Banner";
// import ContactUs from "../../../../components/Landing page/ContactUs";
import Features from "../../../../components/Landing page/Features";
import { APIURL } from "../../../../Methods/Fetch";
import { axiosGet, axiosPost } from "../../../../Methods/Save";
import dynamic from "next/dynamic";
// import Footer from "../../../../components/Footer";

const ContactUs = dynamic(() => import("../../../../components/Landing page/ContactUs"),{
  ssr: false,
});
const Header = dynamic(() => import("../../../../components/Header"),{
  ssr: false,
});
const Footer = dynamic(() => import("../../../../components/Footer"),{
  ssr: false,
});
const Banner = dynamic(() => import("../../../../components/Landing page/Banner"),{
  ssr: false,
});

function Landingpage({ pageDetails, pageDetails1 }) {
  const params = useRouter().query;
  const affName = params.affName;
  const type = params.type;

  return (
    <>
      <Header />
      <div className="body-box-margin">
        <Banner
          product={pageDetails}
          name={pageDetails.name}
          desc={pageDetails.desc}
          product_image={pageDetails.product_image}
          feature={pageDetails.feature}
          price={pageDetails.price}
          affName={affName}
          type={type}
        />
        <Features
          title_one={pageDetails1.title_one}
          desc_one={pageDetails1.desc_one}
          img_one={pageDetails1.img_one}
          product={pageDetails}
        />
        <ContactUs
          title_two={pageDetails1.title_two}
          desc_two={pageDetails1.desc_two}
          contact_btn_name={pageDetails1.contact_btn_name}
          contact_btn_link={pageDetails1.contact_btn_link}
          title_three={pageDetails1.title_three}
          desc_three={pageDetails1.desc_three}
          img_two={pageDetails1.img_two}
          call_btn_link={pageDetails1.call_btn_link}
          call_btn_name={pageDetails1.call_btn_name}
          desc_four={pageDetails1.desc_four}
          btn_name={pageDetails1.btn_name}
          btn_link={pageDetails1.btn_link}
        />
        <Footer />
      </div>
    </>
  );
}
export const getServerSideProps = async (context) => {
  const productname = context.params.productname;
  const affName = context.params.affName;
  const type = context.params.type;
  let pageDetails = {};

  var data = { url: productname, type: type };
  var url = APIURL() + "affiliate-product";
  let res = await axiosPost(url, data);
  if (res.data[0].response.data.length == 0) {
    return {
      notFound: true,
    };
  } else {
    pageDetails = res.data[0].response.data[0];
  }
  data = { url: productname };
  url = APIURL() + "landing-page-details";
  res = await axiosGet(url, data);
  const pageDetails1 = res.data[0].response.data[0];

  if (affName) {
    data = {
      id: pageDetails.id,
      productname: productname,
      affName: affName,
    };
    url = APIURL() + "check-url";
    res = await axiosPost(url, data);
    if (res.data.data == "0") {
      return {
        notFound: true,
      };
    }
  }

  return { props: { pageDetails1, pageDetails } };
};

export default Landingpage;
