"use client";
import React, { useState } from "react";
import CookieConsent from "react-cookie-consent";
import Cookies from "js-cookie";

export default function CookieConsentBanner() {
  const [showModal, setShowModal] = useState(false);
  const [cookieSettings, setCookieSettings] = useState({
    analytics: true,
    marketing: true,
    functional: true, // Always allowed typically
  });

  const handleAccept = () => {
    console.log("✅ User accepted all cookies");
    Cookies.set("cookie_consent", "all", { expires: 180 });
    // Load analytics/tracking scripts here
  };

  const handleDecline = () => {
    console.log("❌ User declined cookies");
    Cookies.set("cookie_consent", "none", { expires: 180 });
  };

  const handleSavePreferences = () => {
    console.log("⚙️ User saved preferences:", cookieSettings);
    Cookies.set("cookie_consent", JSON.stringify(cookieSettings), {
      expires: 180,
    });
    setShowModal(false);
  };

  return (
    <>
      {/* Cookie Banner */}
      <CookieConsent
        location="bottom"
        buttonText="Accept All"
        declineButtonText="Decline"
        enableDeclineButton
        cookieName="myAwesomeCookieName2"
        onAccept={handleAccept}
        onDecline={handleDecline}
        style={{
          background: "#2b373b",
          color: "white",
          textAlign: "left",
          padding: "15px 20px",
        }}
        buttonStyle={{
          background: "#23122bff",
          color: "#fff",
          fontSize: "13px",
          borderRadius: "5px",
          padding: "8px 16px",
        }}
        declineButtonStyle={{
          background: "transparent",
          color: "#000000ff",
          fontSize: "13px",
          borderRadius: "5px",
          padding: "8px 16px",
          border:'1px solid #23122bff'
        }}
      >We use cookies on our website to give you the most relevant experience
        by remembering your preferences and repeat visits. By clicking "Accept",
        you consent to the use of ALL the cookies. Do not sell my personal
        information.{" "}
        <button
          onClick={() => setShowModal(true)}
          style={{
            background: "#b9b9b9ff",
            color: "#000000ff",
            border: "none",
            borderRadius: "5px",
            padding: "8px 16px",
            cursor: "pointer",
            margin:'15px 0px -10px',
            display:'block'
          }}
        >
          Optional Cookies
        </button>
      </CookieConsent>

      {/* Optional Cookies Modal */}
      {showModal && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            background: "rgba(0,0,0,0.6)",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1050,
          }}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            style={{ maxWidth: "600px" }}
          >
            <div className="modal-content p-4 rounded-3 shadow">
              <h5 className="mb-3">Manage Cookie Preferences</h5>
              <p className="text-muted" style={{ fontSize: "14px" }}>
                Choose which cookies you’d like to enable:
              </p>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="functional"
                  checked={cookieSettings.functional}
                  onChange={(e) =>
                    setCookieSettings({
                      ...cookieSettings,
                      functional: e.target.checked,
                    })
                  }
                />
                <label className="form-check-label" htmlFor="functional" style={{fontSize:'13px' ,marginBottom:'5px'}}>
                  Functional Cookies (Required)
                </label>
                <p style={{fontSize:'13px' , paddingLeft:'13px'}}>
                  These cookies are essential for the website to function properly. They enable basic features like
                  page navigation, security, and access to protected areas. The website cannot function properly
                  without these cookies.
                </p>
              </div>

              <div className="form-check mt-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="analytics"
                  checked={cookieSettings.analytics}
                  onChange={(e) =>
                    setCookieSettings({
                      ...cookieSettings,
                      analytics: e.target.checked,
                    })
                  }
                />
                <label className="form-check-label" htmlFor="analytics" style={{fontSize:'13px' ,marginBottom:'5px'}}>
                  Analytics Cookies
                </label>
                <p style={{fontSize:'13px', paddingLeft:'13px'}}>Analytical cookies help us improve our website by collecting and reporting information on its usage.</p>
              </div>

              <div className="form-check mt-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="marketing"
                  checked={cookieSettings.marketing}
                  onChange={(e) =>
                    setCookieSettings({
                      ...cookieSettings,
                      marketing: e.target.checked,
                    })
                  }
                />
                <label className="form-check-label" htmlFor="marketing" style={{fontSize:'13px' ,marginBottom:'5px'}}>
                  Marketing Cookies
                </label>
                <p style={{fontSize:'13px', paddingLeft:'13px'}}>Marketing cookies are used to track visitors across websites to allow publishers to display relevant and engaging advertisements. By enabling marketing cookies, you grant permission for personalized advertising across various platforms.</p>
                
              </div>

              <div className="d-flex justify-content-end mt-4">
                <button
                  className="btn btn-secondary me-2"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" style={{backgroundColor:'#d73d3d',border:'none'}} onClick={handleSavePreferences}>
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
     
    </>
  );
}
