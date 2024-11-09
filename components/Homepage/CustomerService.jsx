import dynamic from 'next/dynamic' 
const TrustPilotCustomerSection = dynamic(() => import('./TrustPilotCustomerSection'), {
  ssr: false,
})


const CustomerService = (props) => {
 
  const { title, desc } = props;
  return (
    <>
      <section className="service-slider-sec ptb-50">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="title">
                <h1>{title}</h1>
                <div dangerouslySetInnerHTML={{ __html: desc }}></div>
              </div>
             <TrustPilotCustomerSection />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CustomerService;
