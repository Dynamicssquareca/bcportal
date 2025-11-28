// Form.jsx
import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

/**
 * Form.jsx
 * - Business-email only validation (client-side)
 * - Name heuristics to block placeholders/gibberish
 * - Honeypot field
 * - If EmailJS OR API succeeds -> redirect to /thank-you/
 * - Errors from network/server calls are only logged to console (not shown to user)
 *
 * NOTE: You MUST also enforce server-side validation (server may still accept spam if not hardened).
 * Replace EmailJS IDs if required.
 */

const BLOCKED_EMAIL_DOMAINS = new Set([
  'gmail.com','googlemail.com','yahoo.com','yahoo.co.in','ymail.com','hotmail.com',
  'outlook.com','live.com','aol.com','icloud.com','me.com','msn.com','hotmail.co.uk',
  'hotmail.co.in','mail.com','gmx.com','gmx.co.uk','qq.com','126.com','163.com',
  'protonmail.com','protonmail.ch','tutanota.com','fastmail.com','hushmail.com',
  'mailinator.com','yopmail.com','10minutemail.com','temp-mail.org','tempmail.net',
  'guerrillamail.com','trashmail.com','getnada.com','maildrop.cc','dispostable.com',
  'mailnesia.com','throwawaymail.com','spamgourmet.com','mintemail.com',
  'mailcatch.com','mytemp.email','sharklasers.com','disposablemail.com','spamtrap.io',
  'zoho.com','zoho.in','inbox.com','inbox.lv','aim.com','posteo.de','prodigy.net.mx',
  'mail.ru','yandex.com','yandex.ru','mail.ee','runbox.com','laposte.net',
  'safe-mail.net','email.com','mailbox.org','lavabit.com'
]);

const DISPOSABLE_KEYWORDS = [
  'temp', 'trash', 'yopmail', 'mailinator', '10minutemail',
  'guerrilla', 'disposable', 'sharklasers', 'spam', 'throwaway',
  'tempmail', 'getnada', 'maildrop'
];

const COMMON_PLACEHOLDER_NAMES = new Set([
  'test','testuser','tester','admin','administrator','user','demo','abc','abc123','xyz','hello',
  'test company','test name','name','firstname','lastname'
]);

/* ---------- helpers ---------- */

const domainLooksDisposableOrFree = (domain) => {
  if (!domain) return true;
  const lc = domain.toLowerCase();
  if (BLOCKED_EMAIL_DOMAINS.has(lc)) return true;
  for (const kw of DISPOSABLE_KEYWORDS) {
    if (lc.includes(kw)) return true;
  }
  // company domains normally contain a dot
  if (!lc.includes('.')) return true;
  return false;
};

const isValidBusinessEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!regex.test(email)) return false;
  const domain = email.trim().toLowerCase().split('@').pop();
  if (domainLooksDisposableOrFree(domain)) return false;
  return true;
};

const isValidName = (name) => {
  if (!name || typeof name !== 'string') return false;
  const cleaned = name.trim();
  if (cleaned.length < 3) return false;
  if (COMMON_PLACEHOLDER_NAMES.has(cleaned.toLowerCase())) return false;
  const allowedRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ'’.\- ]+$/u;
  if (!allowedRegex.test(cleaned)) return false;
  if (!/[aeiouAEIOU]/.test(cleaned)) return false; // require a vowel
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

const isValidPhoneNumber = (phone) => {
  if (!phone || phone.trim() === '') return true; // phone optional
  const cleaned = phone.replace(/\D/g, '');
  return /^\d{7,18}$/.test(cleaned);
};

/* ---------- component ---------- */

const Form = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [redirectTimer, setRedirectTimer] = useState(3);
  const [timerId, setTimerId] = useState(null);
  const [errors, setErrors] = useState({});
  const [defaultCountryCode, setDefaultCountryCode] = useState('us');
  const [pageUrl, setPageUrl] = useState('');

  useEffect(() => {
    setPageUrl(typeof window !== 'undefined' ? window.location.href : '');
    fetchCountryCodeByIP();
    return () => {
      if (timerId) clearInterval(timerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCountryCodeByIP = () => {
    // optional: get country code for phone input
    fetch(`https://api.ipdata.co?api-key=c87ef34a2d0cd830649eec9a8b2395698490a7baaf414bf95516a3b8`)
      .then(res => {
        if (!res.ok) throw new Error('IP fetch failed');
        return res.json();
      })
      .then(data => {
        const cc = (data?.country_code || 'us').toLowerCase();
        setDefaultCountryCode(cc);
      })
      .catch(err => {
        console.warn('IP fetch failed, defaulting to us', err);
        setDefaultCountryCode('us');
      });
  };

  const safeSetErrorsDelete = (key) => {
    setErrors(prev => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!isValidName(name)) {
      newErrors.name = 'Please enter a valid full name (no placeholders or gibberish).';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidBusinessEmail(email)) {
      newErrors.email = 'Only business email addresses are allowed (no Gmail/Yahoo/temporary emails).';
    }

    if (!isValidPhoneNumber(phone)) {
      newErrors.phone = 'Invalid phone number format';
    }

    if (!company.trim()) {
      newErrors.company = 'Company name is required';
    }

    // message optional

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // honeypot
    const formData = new FormData(e.target);
    if (formData.get('website')) {
      console.warn('Honeypot triggered — likely bot.');
      return;
    }

    if (!validateForm()) return;

    setSubmitted(true);

    let emailJsSuccess = false;
    let apiSuccess = false;

    // Try EmailJS first
    try {
      const res = await emailjs.send(
        'service_wg43hnh',     // keep your current IDs or change
        'template_eukiujp',
        {
          from_name: name,
          from_email: email,
          to_name: 'YOUR_EMAIL_ADDRESS',
          phone_number: phone,
          company_name: company,
          message: message,
          page_url: pageUrl,
        },
        'tM-L9poaHjGY70sQI'
      );
      console.log('EmailJS SUCCESS:', res);
      emailJsSuccess = true;
    } catch (err) {
      console.error('EmailJS ERROR:', err);
    }

    // If EmailJS succeeded, redirect immediately
    if (emailJsSuccess) {
      // redirect to thank-you page
      window.location.href = '/thank-you/';
      // window.open('/thank-you/', '_blank');
      return;
    }

    // Try server API next
    try {
      const apiUrl = 'https://www.minimallyyours.com/api/';
      const response = await fetch(apiUrl, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'omit', // change to 'include' if your server relies on cookies
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formName: 'Main Form',
          name,
          email,
          phone,
          message,
          formtag: 'Main Form',
          currentPageUrl: pageUrl,
          companyname: company,
          defaultCountryName: defaultCountryCode,
        }),
      });

      const text = await response.text();
      // try parsing JSON if possible
      let data;
      try { data = JSON.parse(text); } catch (e) { data = { raw: text }; }
      console.log('API RESPONSE:', response.status, data);

      if (response.ok) {
        apiSuccess = true;
      } else {
        // log the server rejection (console only)
        console.error('API returned non-OK status', response.status, data);
      }
    } catch (err) {
      console.error('API ERROR:', err);
    }

    if (apiSuccess) {
      window.location.href = '/thank-you/';
      return;
    }

    // If we reach here, both failed — log and re-enable submit.
    console.error('Both EmailJS and API failed. See logs above.');
    setSubmitted(false);
    // Do NOT show server errors to user (by design per your instruction).
  };

  return (
    <form className="form-one" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          name="name"
          placeholder=""
          value={name}
          onChange={(e) => { setName(e.target.value); if (errors.name) safeSetErrorsDelete('name'); }}
          onBlur={() => { if (!isValidName(name)) setErrors(prev => ({ ...prev, name: 'Please enter a valid full name.' })); }}
        />
        <label htmlFor="name">Full Name</label>
        {errors.name && <div className="text-danger">{errors.name}</div>}
      </div>

      {/* Honeypot */}
      <div style={{ display: 'none' }}>
        <input type="text" name="website" autoComplete="off" onChange={() => {}} />
      </div>

      <div className="form-group">
        <input
          type="email"
          className="form-control"
          name="email"
          placeholder=""
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (errors.email) safeSetErrorsDelete('email'); }}
          onBlur={() => { if (!isValidBusinessEmail(email)) setErrors(prev => ({ ...prev, email: 'Only business email addresses allowed.' })); }}
        />
        <label htmlFor="email">Company Email</label>
        {errors.email && <div className="text-danger">{errors.email}</div>}
      </div>

      <div className="form-group">
        <PhoneInput
          country={defaultCountryCode}
          value={phone}
          onChange={(value, data) => {
            setPhone(value);
            const cc = (data && (data.countryCode || data?.name || '')) || defaultCountryCode;
            if (cc) setDefaultCountryCode(cc.toLowerCase());
            if (errors.phone) safeSetErrorsDelete('phone');
          }}
          inputClass="form-control"
          inputProps={{
            name: 'phone',
            onBlur: () => {
              if (phone && phone.trim() && !isValidPhoneNumber(phone)) {
                setErrors(prev => ({ ...prev, phone: 'Invalid phone number format' }));
              } else {
                safeSetErrorsDelete('phone');
              }
            }
          }}
          countryCodeEditable={false}
        />
        {errors.phone && <div className="text-danger">{errors.phone}</div>}
      </div>

      <div className="form-group">
        <input
          type="text"
          className="form-control"
          name="companyname"
          placeholder=""
          value={company}
          onChange={(e) => { setCompany(e.target.value); if (errors.company) safeSetErrorsDelete('company'); }}
          onBlur={() => { if (!company.trim()) setErrors(prev => ({ ...prev, company: 'Company name is required' })); }}
        />
        <label htmlFor="companyname">Company Name</label>
        {errors.company && <div className="text-danger">{errors.company}</div>}
      </div>

      <div className="form-group mb-4">
        <textarea
          className="form-control"
          name="message"
          placeholder=""
          rows="4"
          value={message}
          onChange={(e) => { setMessage(e.target.value); if (errors.message) safeSetErrorsDelete('message'); }}
        ></textarea>
        <label htmlFor="message">Message</label>
        {errors.message && <div className="text-danger">{errors.message}</div>}
      </div>

      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
        <label className="form-check-label">
          I agree to the
          <a href="/privacy-policy/" target="_blank" rel="noreferrer"> Privacy Policy </a> and
          <a href="/terms-of-use/" target="_blank" rel="noreferrer"> Terms of Service </a>.
        </label>
      </div>

      <div className="m-t-30">
        <button className='btn btn-three' type="submit" disabled={submitted}>
          {submitted ? `Submitting...` : 'Submit'}
        </button>
      </div>

      {submitted && <p className="text-muted">Submitting — please wait...</p>}
    </form>
  );
};

export default Form;
