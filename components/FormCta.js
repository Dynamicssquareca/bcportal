// FormCta.jsx
import React, { useState, useEffect, useRef } from 'react';
import emailjs from 'emailjs-com';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import axios from 'axios';

/**
 * Hardened CTA form:
 * - Honeypot ("website")
 * - Business-email only (client-side)
 * - Name heuristics (no placeholders/gibberish)
 * - Try EmailJS first, then API -> redirect to /thank-you/ if either works
 * - All network/server errors logged to console only
 *
 * NOTE: Must still validate on server side; client checks improve UX only.
 */

/* ---------------- blocklists & helpers ---------------- */

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

const domainLooksDisposableOrFree = (domain) => {
  if (!domain) return true;
  const lc = domain.toLowerCase();
  if (BLOCKED_EMAIL_DOMAINS.has(lc)) return true;
  for (const kw of DISPOSABLE_KEYWORDS) if (lc.includes(kw)) return true;
  if (!lc.includes('.')) return true; // suspicious single-label domain
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
    if (lettersOnly.length > 0 && (consonants.length / lettersOnly.length) > 0.85) return false;
  }
  return true;
};

const isValidPhoneNumber = (phone) => {
  if (!phone || phone.trim() === '') return true; // optional phone
  const cleaned = phone.replace(/\D/g, '');
  return /^\d{7,18}$/.test(cleaned);
};

/* ---------------- component ---------------- */

const FormCta = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [redirectTimer, setRedirectTimer] = useState(3);
  const timerRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [defaultCountryCode, setDefaultCountryCode] = useState('us');
  const [pageUrl, setPageUrl] = useState('');

  useEffect(() => {
    setPageUrl(typeof window !== 'undefined' ? window.location.href : '');
    fetchCountryCodeByIP();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCountryCodeByIP = () => {
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

    if (!isValidName(name)) newErrors.name = 'Please enter a valid full name.';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!isValidBusinessEmail(email)) newErrors.email = 'Only business email addresses are allowed.';
    if (!isValidPhoneNumber(phone)) newErrors.phone = 'Invalid phone number';
    // company optional in this variant; uncomment if required:
    // if (!company.trim()) newErrors.company = 'Company name is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const startRedirectTimer = () => {
    setRedirectTimer(3);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setRedirectTimer(prev => {
        if (prev <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const safeResetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setCompany('');
    setMessage('');
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    if (formData.get('website')) {
      console.warn('Honeypot triggered — bot likely.');
      return;
    }

    if (!validateForm()) return;

    setSubmitted(true);

    let emailJsSuccess = false;
    let apiSuccess = false;

    // 1) Try EmailJS
    try {
      const res = await emailjs.send(
        'service_62cljjq',    // your service ID
        'template_pq4kco7',   // your template ID
        {
          from_name: name,
          from_email: email,
          to_name: 'YOUR_EMAIL_ADDRESS',
          phone_number: phone,
          company_name: company,
          message: message,
          page_url: pageUrl,
        },
        'W7xNQXQ68tmQ-oKz0'   // your user/public key
      );
      console.log('EmailJS SUCCESS:', res);
      emailJsSuccess = true;
    } catch (err) {
      console.error('EmailJS ERROR:', err);
    }

    // If EmailJS worked -> redirect immediately
    if (emailJsSuccess) {
      startRedirectTimer();
      // small delay so timer shows briefly (optional)
      setTimeout(() => {
        window.location.href = '/thank-you/';
      }, 700);
      return;
    }

    // 2) Try server API using axios
    try {
      const apiUrl = 'https://www.minimallyyours.com/api/';
      const axiosResp = await axios.post(apiUrl, {
        formName: 'Main Form',
        name,
        email,
        phone,
        message,
        formtag: 'CTA Form',
        currentPageUrl: pageUrl,
        companyname: company,
        defaultCountryName: defaultCountryCode,
      }, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000, // 10s
      });

      console.log('API SUCCESS:', axiosResp.status, axiosResp.data);
      apiSuccess = true;
    } catch (err) {
      // axios error: log details to console only
      if (err.response) {
        // server returned a non-2xx
        console.error('API ERROR (response):', err.response.status, err.response.data);
      } else if (err.request) {
        // no response received
        console.error('API ERROR (no response):', err.message || err);
      } else {
        console.error('API ERROR:', err.message || err);
      }
    }

    if (apiSuccess) {
      startRedirectTimer();
      setTimeout(() => {
        window.location.href = '/thank-you/';
      }, 700);
      return;
    }

    // Both failed — log and re-enable submit (no visible error shown to user)
    console.error('Both EmailJS and API failed — check logs above.');
    setSubmitted(false);
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

      {/* honeypot */}
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
          onBlur={() => { /* optional: validate */ }}
        />
        <label htmlFor="companyname">Company Name</label>
        {errors.company && <div className="text-danger">{errors.company}</div>}
      </div>

      <div className="form-group mb-5">
        <textarea
          className="form-control"
          name="message"
          placeholder=""
          rows="3"
          value={message}
          onChange={(e) => { setMessage(e.target.value); if (errors.message) safeSetErrorsDelete('message'); }}
        />
        <label htmlFor="message">Message</label>
        {errors.message && <div className="text-danger">{errors.message}</div>}
      </div>

      <div className="mb-4 form-check">
        <input type="checkbox" checked readOnly className="form-check-input" id="exampleCheck1" />
        <label className="form-check-label">
          I agree to the
          <a href="/privacy-policy/" target="_blank" rel="noreferrer"> Privacy Policy </a> and
          <a href="/terms-of-use/" target="_blank" rel="noreferrer"> Terms of Service </a>.
        </label>
      </div>

      <button className='btn btn-three' type="submit" disabled={submitted}>
        {submitted ? `Submitting (${redirectTimer})` : 'Submit'}
      </button>

      {submitted && redirectTimer > 0 && <p className="text-muted mt-2">Submitted — redirecting in {redirectTimer}s...</p>}
    </form>
  );
};

export default FormCta;
