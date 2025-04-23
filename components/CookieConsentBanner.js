// CookieConsentBanner.js

import React from 'react';
import CookieConsent from 'react-cookie-consent';

const CookieConsentBanner = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      cookieName="myCookieConsent"
      style={{ background: "#ffffff",color:'#000',zIndex:'9999999999',boxShadow:'15px 0px 9px #00000017',fontSize:'15px',paddingLeft:"20px"}}
      buttonStyle={{background:'var(--primary)', color: "#fff", fontSize: "13px",padding:'8px 15px',borderRadius:'5px' }}
      expires={150}
    >
       We use cookies on our website to give you the most relevant experience
          by remembering your preferences and repeat visits. By clicking "Accept",
          you consent to the use of ALL the cookies. Do not sell my personal
          information.
    </CookieConsent>
  );
};

export default CookieConsentBanner;
