import React from "react";
import Header from "../../components/Header";
import Image from "next/image";
import Link from "next/link";

function Notfound() {
  return (
    <div>
      <Header />
      <section className="error-sec-box">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="error-box">
                <Image
                  height={400}
                  width={400}
                  src="/images/404.jpg"
                  alt="404"
                />
                <div className="text-error">
                  <p>We are not able to find what you are looking for.</p>
                </div>
                <Link href="/" className="btn-style-one">
                  <i className="fal fa-home-lg me-2" />
                  Go to home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Notfound;
