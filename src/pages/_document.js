import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";


export default function Document() {
  return (
    <Html lang="en">
      <Head>       

        <script
          type="text/javascript"
          src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
          async
        ></script>
        <link
          rel="stylesheet"
          href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
          integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
          crossOrigin="anonymous"
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"
          async
          strategy="beforeInteractive"
        ></Script>
        <Script
          async
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        ></Script>
        <link
          href="https://cdn-images.mailchimp.com/embedcode/classic-071822.css"
          rel="stylesheet"
          type="text/css"
        />
      </Head>

      <body>
        <Main />
        <NextScript />
        <script
          src="https://www.dwin1.com/51999.js"
          type="text/javascript"
          defer="defer"
        ></script>
      </body>

      <script src="/js/menu.js" async />
      <script src="/js/wow.js" async />
      <script
        src="https://image.providesupport.com/js/1k9da3woz02wr0lz9sfhrc27za/safe-standard.js?ps_h=SI8E"
        async
      ></script>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-Z65XK2K459" />

      <noscript>
        <div>
          <a href="https://vm.providesupport.com/1afj8oneinp6f1h1drj7x5x6kx">
            Live Chat
          </a>
        </div>
      </noscript>
      <script
        type="text/javascript"
        src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"
        async
      ></script>
      <noscript>
        <div>
          <a href="https://vm.providesupport.com/account_hash">
            Online Support Chat
          </a>
        </div>
      </noscript>
      <script src="/js/scripts.js" async />
    </Html>
  );
}
