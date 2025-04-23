import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html lang="en">
      <Head>
      <link rel="icon" type="image/png" href="/favicon.png" sizes="32x32" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"></link>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet" />
        {/* <meta name="google-site-verification" content="5ew9dq7KIWCUeL8wUVSWwyGqJgg0takYOwYrroSLUMg" />
        <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=G-LFT71NHJVD`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
               window.dataLayer = window.dataLayer || [];   
               function gtag(){dataLayer.push(arguments);}   
               gtag('js', new Date());   
               gtag('config', 'G-3DM14XSK8W');
              `,
            }}
          /> */}
          {/* End Google Analytics tracking code */}
      </Head>
      <body>
        <Main />
        <NextScript />

        {/* <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossorigin="anonymous"></script> */}
          {/* <script src="https://code-eu1.jivosite.com/widget/0vnMaZXeaH" async></script> */}


{/* <script
          dangerouslySetInnerHTML={{
            __html: `window.$zoho=window.$zoho || {};
                     $zoho.salesiq=$zoho.salesiq||{ready:function(){}}`,
          }}
        />
        <script
          id="zsiqscript"
          src="https://salesiq.zohopublic.in/widget?wc=siqcfeea1f5820ab9000343a7b903f7b7ac53297b9dbfd79babb3fd60df230b0f35"
          defer
        ></script> */}



      </body>
    </Html>
  );
}
