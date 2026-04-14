import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "@/styles/globals.css";
import "@/styles/header.css";
import "@/styles/footer.css";

import Layout from '@/components/Layout';
import CookieConsentBanner from "../components/CookieConsentBanner";
import Script from "next/script"; // ✅ import this

function MyAppWithLayout({ Component, pageProps }) {
  return (
    <>
      {/* Google Analytics Script */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-732BXW16JS"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-732BXW16JS');
        `}
      </Script>

      <Layout faq={pageProps.faq}>
        <Component {...pageProps} />
      </Layout>

      <CookieConsentBanner />
    </>
  );
}

export default MyAppWithLayout;