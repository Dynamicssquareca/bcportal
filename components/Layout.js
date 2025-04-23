
import Header from "./Header";// Import your header component
import Footer from './Footer'; // Import your footer component
import CookieConsentBanner from "./CookieConsentBanner";

function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      {/* <Footer /> */}
      {/* <CookieConsentBanner /> */}
    </>
  );
}

export default Layout;
