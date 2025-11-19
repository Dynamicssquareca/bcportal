import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.min.css"
import "@/styles/globals.css";
import "@/styles/header.css"
import "@/styles/footer.css"
import Layout from '@/components/Layout'; // Import your custom layout component
import CookieConsentBanner from "../components/CookieConsentBanner";

// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }


function MyAppWithLayout({ Component, pageProps }) {
 

 {
    return (
      <>
      <Layout faq={pageProps.faq}>
        <Component {...pageProps} />
      </Layout>
       <CookieConsentBanner />
      </>
    );
  }


}

export default MyAppWithLayout;