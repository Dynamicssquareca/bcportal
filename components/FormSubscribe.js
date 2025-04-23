import { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import { Spinner } from 'reactstrap';


export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [pageUrl, setPageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // Fetch the current page URL when the component mounts
    setPageUrl(window.location.href);
  }, []);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setError('');
    setSuccess('');
    setLoading(true); // Set loading to true when submitting the form
  
    if (!email) {
      setError('Email is required');
      setLoading(false); // Reset loading state on error
      return;
    }
  
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      setLoading(false); // Reset loading state on error
      return;
    }
  
    const serviceID = 'service_fg00l58';
    const templateID = 'template_25hm17g';
    const userID = 'QyvWavOKod6guRB-s';
    const templateParams = {
      from_email: email,
      page_url: pageUrl,
    };
  
    let emailSuccess = false;
    let apiSuccess = false;
    let emailError = '';
    let apiError = '';
  
    try {
      // Send email via EmailJS
      const emailResponse = await emailjs.send(serviceID, templateID, templateParams, userID);
      console.log('Email sent successfully:', emailResponse.status, emailResponse.text);
      emailSuccess = true; // Set EmailJS success flag
    } catch (err) {
      console.error('Failed to send email. Error:', err); // Log the full error
      if (err.response) {
        // If there is a response in the error object (useful for network-related issues)
        console.error('EmailJS response error:', err.response);
      }
      emailError = 'Failed to send email via EmailJS.';
    }
  
    try {
      // Send data to the external API
      const apiResponse = await fetch('https://www.minimallyyours.com/api/zohocrmforceplus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Subscriber',
          email,
          formtag: 'Subscriber Form', 
          currentPageUrl: pageUrl,
        }),
      });
  
      if (!apiResponse.ok) {
        throw new Error(`API response error: ${apiResponse.statusText}`);
      }
  
      const apiData = await apiResponse.json();
      console.log('API Response:', apiData);
  
      if (apiData.success) {
        apiSuccess = true; // Set API success flag
      } else {
        apiError = apiData.message || 'Failed to send data to the external API.';
      }
    } catch (err) {
      console.error('Failed to send data to the external API:', err); // Log the full error
      if (err.response) {
        console.error('API response error:', err.response);
      }
      apiError = 'Failed to send data to the external API. Please try again later.';
    }
  
    setLoading(false); // Reset loading state after both requests are processed
  
    // Determine the success or failure states
    if (emailSuccess && apiSuccess) {
      setSuccess('Thank you for subscribing!');
      setEmail('');
      setSubmitted(true);
    } else {
      // Mixed success case, display appropriate errors or warnings
      if (!emailSuccess && !apiSuccess) {
        setError('Both email and external API failed. Please try again later.');
      } else if (emailSuccess && !apiSuccess) {
        setError(`Email sent successfully, but ${apiError}`);
      } else if (!emailSuccess && apiSuccess) {
        setError(`Zoho succeeded, but ${emailError}`);
      }
    }
  };
  
  

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-subscribe">
          <div className="input-group mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Enter Your Email"
              aria-label="Enter Your Email"
              aria-describedby="subscribe-button"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="submit"
                id="subscribe-button"
                aria-label="Subscribe"
                disabled={loading} // Disable the button when loading
              >
              {loading ? <Spinner size="sm" color="light" /> : <i className="bi bi-arrow-right"></i>}
              </button> 
            </div>
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
        </div>
      </form>
      {submitted && (
        <div className="thank-you-message">
          Thank you for subscribing!
        </div>
      )}
    </>
  );
}
