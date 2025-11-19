import { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import { Spinner } from 'reactstrap';

export default function SubscribeForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [pageUrl, setPageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!name.trim()) {
      setError('Full name is required');
      setLoading(false);
      return;
    }

    if (!email.trim()) {
      setError('Email is required');
      setLoading(false);
      return;
    }



    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    const serviceID = 'service_62cljjq';
    const templateID = 'template_h9tgog1';
    const userID = 'W7xNQXQ68tmQ-oKz0';

    const templateParams = {
      from_name: name,
      from_email: email,
      page_url: pageUrl,
    };

    // Run both API calls in parallel for speed
    const [emailResult, apiResult] = await Promise.allSettled([
      emailjs.send(serviceID, templateID, templateParams, userID),
      fetch('https://www.minimallyyours.com/api/zohocrmforceplus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          formtag: 'Subscriber Form',
          currentPageUrl: pageUrl,
        }),
      }),
    ]);

    let emailSuccess = false;
    let apiSuccess = false;
    let emailError = '';
    let apiError = '';

    // Handle EmailJS result
    if (emailResult.status === 'fulfilled') {
      console.log('Email sent successfully');
      emailSuccess = true;
    } else {
      console.error('EmailJS failed:', emailResult.reason);
      emailError = 'Failed to send email via EmailJS.';
    }

    // Handle Zoho API result
    if (apiResult.status === 'fulfilled') {
      try {
        const apiData = await apiResult.value.json();
        console.log('API Response:', apiData);
        if (apiData.success) apiSuccess = true;
        else apiError = apiData.message || 'API returned failure.';
      } catch (err) {
        apiError = 'Invalid API response.';
      }
    } else {
      console.error('API failed:', apiResult.reason);
      apiError = 'Failed to send data to the external API.';
    }

    setLoading(false);

    // Final response handling
    if (emailSuccess && apiSuccess) {
      // setSuccess('Thank you for subscribing!');
      setEmail('');
      setName('');
      setSubmitted(true);
    } else if (!emailSuccess && !apiSuccess) {
      setError('Both EmailJS and API failed. Please try again later.');
    } else if (emailSuccess && !apiSuccess) {
      setError(`Email sent successfully, but ${apiError}`);
    } else if (!emailSuccess && apiSuccess) {
      setError(`Zoho succeeded, but ${emailError}`);
    }
  };

  return (
    <>
       <div id="subscribe" className='m-t-80'>
                <div className='container'>
                    <div className='row justify-content-center'>

                        <div className='col-lg-8 align-self-center'>
                            <div className='subsc-head-right'>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-subscribes">
                                        <div className="row g-3">
                                            <div className="col">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Full Name"
                                                    aria-label="Enter Your Full Name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                            </div>

                                            <div className="col">
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="Enter Your Email"
                                                    aria-label="Enter Your Email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>

                                            <div className="col-12">
                                                <div className='submitscr'>
                                                    <p>After submitting this form your data will be processed by Nineteen Group in accordance with our privacy policy. If you would like to prevent your personal data from being processed in this way, please contact us on data@nineteengroup.com to update your preferences.</p>
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
                                                            <>
                                                                Subscribe Now
                                                            </>
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
