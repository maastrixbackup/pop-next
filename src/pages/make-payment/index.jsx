import dynamic from "next/dynamic";
const Banner = dynamic(() => import("../../../components/MakePayment/Banner"), {
  ssr: false,
});
const Body = dynamic(() => import("../../../components/MakePayment/Body"), {
  ssr: false,
});
const Footer = dynamic(() => import("../../../components/Footer"), {
  ssr: false,
});
const Header = dynamic(() => import("../../../components/Header"), {
  ssr: false,
});
function MakePayment() {
  const business = false;
  return (
    <>
      <div className={business ? "buisness-mobile" : ""}>
        <div className={business ? "buisness" : ""}>
          <Header bussinesspage={business ? true : false} />
          <div className="body-box-margin">
            <Banner />
            <Body />

            <Footer bussinesspage={business ? true : false} />
          </div>
        </div>
      </div>
    </>
  );
}

export default MakePayment;
