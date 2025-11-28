import { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import { Spinner } from 'reactstrap';

/**
 * SubscribeForm (hardened)
 * - Business-only email check (client-side)
 * - Name heuristics (no placeholders/gibberish)
 * - Honeypot field "website"
 * - Parallel EmailJS + API calls; redirect to /thank-you/ if either succeeds
 * - Network/server errors only logged to console; user sees friendly message only if both fail
 *
 * Replace serviceID/templateID/userID and api URL as needed.
 */

const BLOCKED_EMAIL_DOMAINS = new Set([
  'gmail.com','googlemail.com','yahoo.com','yahoo.co.in','ymail.com','hotmail.com',
  'outlook.com','live.com','aol.com','icloud.com','me.com','msn.com',
  'mail.com','gmx.com','qq.com','126.com','163.com',
  'protonmail.com','tutanota.com','fastmail.com',
  'mailinator.com','yopmail.com','10minutemail.com','temp-mail.org','tempmail.net',
  'guerrillamail.com','trashmail.com','getnada.com','maildrop.cc','dispostable.com',
  'mailnesia.com','throwawaymail.com','spamgourmet.com','mintemail.com',
  'mailcatch.com','sharklasers.com','disposablemail.com','spamtrap.io',
  'zoho.com','zoho.in','inbox.com','mail.ru','yandex.com','yandex.ru'
]);

const DISPOSABLE_KEYWORDS = [
  'temp','trash','yopmail','mailinator','10minutemail','guerrilla',
  'disposable','sharklasers','spam','throwaway','tempmail','getnada','maildrop'
];

const COMMON_PLACEHOLDER_NAMES = new Set([
  'test','testuser','tester','admin','administrator','user','demo','abc','abc123','xyz','hello',
  'test company','test name','name','firstname','lastname'
]);

const domainLooksDisposableOrFree = (domain) => {
  if (!domain) return true;
  const lc = domain.toLowerCase();
  if (BLOCKED_EMAIL_DOMAINS.has(lc)) return true;
  for (const kw of DISPOSABLE_KEYWORDS) if (lc.includes(kw)) return true;
  if (!lc.includes('.')) return true;
  return false;
};

const isValidBusinessEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!regex.test(email)) return false;
  const domain = email.trim().toLowerCase().split('@').pop();
  return !domainLooksDisposableOrFree(domain);
};

const isValidName = (name) => {
  if (!name || typeof name !== 'string') return false;
  const cleaned = name.trim();
  if (cleaned.length < 3) return false;
  if (COMMON_PLACEHOLDER_NAMES.has(cleaned.toLowerCase())) return false;
  const allowedRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ'’.\- ]+$/u;
  if (!allowedRegex.test(cleaned)) return false;
  if (!/[aeiouAEIOU]/.test(cleaned)) return false;
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    if (parts.some(p => p.length < 2)) return false;
  } else {
    if (cleaned.length < 3) return false;
  }
  if (cleaned.length > 6) {
    const lettersOnly = cleaned.replace(/[^A-Za-z]/g, '');
    const consonants = lettersOnly.replace(/[aeiouAEIOU]/g, '');
    if (lettersOnly.length > 0 && consonants.length / lettersOnly.length > 0.85) return false;
  }
  return true;
};

export default function SubscribeForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState(''); // invisible bot trap
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [pageUrl, setPageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPageUrl(typeof window !== 'undefined' ? window.location.href : '');
  }, []);

  const validateEmailSimple = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Honeypot check: if filled, treat as bot and silently return
    if (honeypot && honeypot.trim() !== '') {
      console.warn('Honeypot filled — likely bot.');
      setLoading(false);
      return;
    }

    // Basic client-side validations (friendly messages)
    if (!isValidName(name)) {
      setError('Please enter your full name');
      setLoading(false);
      return;
    }

    if (!email.trim()) {
      setError('Email is required');
      setLoading(false);
      return;
    }

    if (!validateEmailSimple(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    if (!isValidBusinessEmail(email)) {
      // friendly message shown to user
      setError('Please use your business email address (no Gmail/Yahoo/temporary emails).');
      setLoading(false);
      return;
    }

    // Prepare EmailJS and API calls in parallel
    const serviceID = 'service_wg43hnh';     // replace if needed
    const templateID = 'template_1xd4x75';   // replace if needed
    const userID = 'tM-L9poaHjGY70sQI';     // replace if needed

    const templateParams = {
      from_name: name,
      from_email: email,
      page_url: pageUrl,
    };

    // Kick off both calls in parallel, don't short-circuit — we want whichever succeeds
    const emailPromise = emailjs.send(serviceID, templateID, templateParams, userID);

    const apiPromise = fetch('https://www.minimallyyours.com/api/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        formtag: 'Subscriber Form',
        currentPageUrl: pageUrl,
      }),
    });

    const [emailResult, apiResult] = await Promise.allSettled([emailPromise, apiPromise]);

    let emailSuccess = false;
    let apiSuccess = false;
    let emailErr = null;
    let apiErr = null;

    if (emailResult.status === 'fulfilled') {
      console.log('EmailJS succeeded:', emailResult.value);
      emailSuccess = true;
    } else {
      console.error('EmailJS failed:', emailResult.reason);
      emailErr = emailResult.reason;
    }

    if (apiResult.status === 'fulfilled') {
      // parse API response carefully
      try {
        const text = await apiResult.value.text();
        let data;
        try { data = JSON.parse(text); } catch (e) { data = { raw: text }; }
        console.log('API response:', data);
        // consider success when HTTP 2xx
        if (apiResult.value.ok) apiSuccess = true;
        else apiErr = data?.message || data?.error || `HTTP ${apiResult.value.status}`;
      } catch (err) {
        console.error('Error parsing API response:', err);
        apiErr = err;
      }
    } else {
      console.error('API request failed:', apiResult.reason);
      apiErr = apiResult.reason;
    }

    setLoading(false);

    // If either succeeded, redirect to thank-you page and log errors only in console
    if (emailSuccess || apiSuccess) {
      // Clear fields (so page state clean)
      setName('');
      setEmail('');
      setSubmitted(true);
      console.log('Submission result: emailSuccess=', emailSuccess, 'apiSuccess=', apiSuccess);
      if (emailErr) console.error('EmailJS error (non-blocking):', emailErr);
      if (apiErr) console.error('API error (non-blocking):', apiErr);

      // Redirect user to thank-you page (per your request)
      window.location.href = '/thank-you/';
      // window.open('/thank-you/', '_blank');
      return;
    }

    // Both failed — show one friendly message and log details
    console.error('Both EmailJS and API failed:', { emailErr, apiErr });
    setError('Something went wrong. Please try again later.');
    setSubmitted(false);
  };

  return (
    <>
      <div id="subscribe" className="m-t-80">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 align-self-center">
              <div className="subsc-head-right">
                <form onSubmit={handleSubmit}>
                  <div className="form-subscribes">
                    <div className="row g-3">
                      <div className="col-12 col-sm-6">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Full Name"
                          aria-label="Enter Your Full Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>

                      <div className="col-12 col-sm-6">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter Your Email"
                          aria-label="Enter Your Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      {/* honeypot field — hidden from users but visible to bots */}
                      <div style={{ display: 'none' }}>
                        <input
                          type="text"
                          name="website"
                          value={honeypot}
                          onChange={(e) => setHoneypot(e.target.value)}
                          autoComplete="off"
                        />
                      </div>

                      <div className="col-12">
                        <div className="submitscr">
                          <p>
                            After submitting this form your data will be processed by Nineteen Group in accordance with our&nbsp;
                            <a href="/privacy-policy/" target="_blank" rel="noreferrer">privacy policy</a>. If you would like to prevent your personal data from being processed in this way, please contact us on data@nineteengroup.com to update your preferences.
                          </p>

                          <button
                            type="submit"
                            id="subscribe-button"
                            className="btn"
                            disabled={loading}
                          >
                            {loading ? (
                              <>
                                Subscribing... <Spinner size="sm" color="light" />
                              </>
                            ) : (
                              <>Subscribe Now</>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {error && <div className="alert alert-danger mt-3">{error}</div>}
                    {success && <div className="alert alert-success mt-3">{success}</div>}
                  </div>
                </form>

                {submitted && (
                  <div className="thank-you-message text-success mt-4">
                    Thank you for subscribing!
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
