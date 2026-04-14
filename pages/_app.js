import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "@/styles/globals.css";
import "@/styles/header.css";
import "@/styles/footer.css";

import Layout from '@/components/Layout';
import CookieConsentBanner from "../components/CookieConsentBanner";
import Script from "next/script";

// ✅ FONT HERE (correct place)
import { Poppins, Open_Sans } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
  variable: "--font-poppins",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300","400","500","600","700","800"],
  variable: "--font-open-sans",
  display: "swap",
});

function MyAppWithLayout({ Component, pageProps }) {
  return (
    <>
      {/* ✅ APPLY AT ROOT (VERY IMPORTANT) */}
      <main className={`${poppins.variable} ${openSans.variable}`}>

        {/* Google Analytics */}
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
      </main>
    </>
  );
}

export default MyAppWithLayout;