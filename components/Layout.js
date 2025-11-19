"use client"; // optional in pages router, but needed if using hooks like useRouter

import { useRouter } from "next/router";
import Header from "./Header";
import Footer from "./Footer";
import FormSubscribe from "./FormSubscribe";
// import CookieConsentBanner from "./CookieConsentBanner";

function Layout({ children, faq }) {
  const router = useRouter();

  // URLs where you want to HIDE the FormSubscribe component
  const hiddenPaths = [
    "/thank-you",
    "/contact",
  ];

  // Also hide on nested paths (like /dashboard/settings)
  const shouldHideForm = hiddenPaths.some((path) =>
    router.pathname.startsWith(path)
  );

  return (
    <>
      <Header />
      <main>{children}</main>

      {/* Only show FormSubscribe if not hidden */}
      {!shouldHideForm && <FormSubscribe />}

      <Footer faq={faq} />
      {/* <CookieConsentBanner /> */}
    </>
  );
}

export default Layout;
