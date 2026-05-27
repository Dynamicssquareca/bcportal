import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';


const FormCatlog = ({ onSubmit }) => {
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

    setPageUrl(window.location.href);
    // Fetch IP information when the component mounts
    fetchCountryCodeByIP();
  }, []);



  const fetchCountryCodeByIP = () => {
    fetch(`https://api.ipdata.co?api-key=c87ef34a2d0cd830649eec9a8b2395698490a7baaf414bf95516a3b8`)//https://api.ipdata.co?api-key=c87ef34a2d0cd830649eec9a8b2395698490a7baaf414bf95516a3b8
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch IP information');
        }
        return response.json();
      })
      .then(data => {
        let countryCode = data.country_code.toLowerCase();
        console.log("Country Code:", countryCode); // 
        setDefaultCountryCode(countryCode);
        console.log("Default Country Code:", defaultCountryCode);
      })
      .catch(error => {
        console.error('Error fetching IP information:', error);
        setDefaultCountryCode('us'); // Fallback to 'us' if the API call fails
      });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    //spam boat
    const formData = new FormData(e.target);
    if (formData.get('website')) {
      console.warn("Spam bot detected.");
      return;
    }

    if (!validateForm()) {
      return;
    }

    // Send email using EmailJS
    emailjs.send('service_62cljjq', 'template_pq4kco7', {
      from_name: name,
      from_email: email,
      to_name: 'YOUR_EMAIL_ADDRESS', // Replace with your own email address
      phone_number: phone,
      company_name: company,
      message: message,
      page_url: pageUrl
    }, 'W7xNQXQ68tmQ-oKz0')
      .then((response) => {
        console.log('Email sent successfully:', response);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });


    // Send data to the custom API
    try {
      const response = await fetch('https://www.minimallyyours.com/api/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formName: 'Main Form', // Add your form name
          name: name,
          email: email,
          phone: phone,
          message: message,
          formtag: 'Main Form', // Add the form tag
          currentPageUrl: pageUrl,
          companyname: company,
          defaultCountryName: defaultCountryCode,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit data to the API');
      }

      const apiData = await response.json();
      console.log('Data successfully sent to the API:', apiData);
    } catch (error) {
      console.error('Error submitting data to the API:', error);
    }



    // Simulate form submission delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Show the submission message
    setSubmitted(true);

    // Reset form fields after submission
    setName('');
    setEmail('');
    setPhone('');
    setCompany('');
    setMessage('');

    // Call the onSubmit function passed from the parent component
    onSubmit();

    // Start the redirection timer
    setTimerId(
      setInterval(() => {
        setRedirectTimer(prevTimer => {
          if (prevTimer === 0) {
            clearInterval(timerId);
          }
          return prevTimer - 1;
        });
      }, 1000)
    );
  };

  const validateForm = () => {
    const errors = {};

    if (!name.trim()) {
      errors.name = 'Name is required';
    } else {
      delete errors.name; // Clear the error if the field is not empty
    }

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      errors.email = 'Invalid email format';
    } else {
      delete errors.email; // Clear the error if the field is not empty and valid
    }

    if (!phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!isValidPhoneNumber(phone)) {
      errors.phone = 'Invalid phone number format';
    } else {
      delete errors.phone; // Clear the error if the field is not empty and valid
    }

    // if (!company.trim()) {
    //   errors.company = 'Company name is required';
    // } else {
    //   delete errors.company; 
    // }

    // if (!message.trim()) {
    //   errors.message = 'Message is required';
    // } else {
    //   delete errors.message; 
    // }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const isValidEmail = (email) => {
    // Basic email format validation
    // const emailRegex = /^[a-zA-Z0-9._%+-]+@(?!gmail.com)(?!yahoo.com)(?!hotmail.com)(?!yahoo.co.in)(?!aol.com)(?!live.com)(?!outlook.com)[a-zA-Z0-9_-]+\.[a-zA-Z0-9-.]{2,61}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (phone) => {
    if (phone.trim() === '') {
      return true; // Return true for empty phone number
    }
    // Remove non-digit characters
    const cleanedPhoneNumber = phone.replace(/\D/g, '');
    // Check if the resulting string contains only digits and has a length between 10 and 13 characters
    return /^\d{10,18}$/.test(cleanedPhoneNumber);
  };

  useEffect(() => {
    // Clear the timer when redirectTimer reaches 0
    if (redirectTimer === 0) {
      clearInterval(timerId);
    }
    // Clear the interval when component unmounts
    return () => clearInterval(timerId);
  }, [redirectTimer]);

  return (
    <form className="form-one" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          name="name"
          placeholder=""
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) {
              delete errors.name;
              setErrors({ ...errors });
            }
          }}
          onBlur={() => {
            if (!name.trim()) {
              setErrors({ ...errors, name: 'Name is required' });
            }
          }}
        />
        <label htmlFor="name">Full Name</label>
        {errors.name && <div className="text-danger">{errors.name}</div>}
      </div>
      <div style={{ display: 'none' }}>
        <input
          type="text"
          name="website"
          onChange={() => { }}
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          name="email"
          placeholder=""
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) {
              delete errors.email;
              setErrors({ ...errors });
            }
          }}
          onBlur={() => {
            if (!email.trim()) {
              setErrors({ ...errors, email: 'Email is required' });
            } else if (!isValidEmail(email)) {
              setErrors({ ...errors, email: 'Invalid email format' });
            }
          }}
        />
        <label htmlFor="name">Company Email</label>
        {errors.email && <div className="text-danger">{errors.email}</div>}
      </div>
      <div className="form-group">
        <PhoneInput
          country={defaultCountryCode} // Set default country code
          value={phone}
          onChange={(value, data) => {
            setPhone(value);
            setDefaultCountryCode(data?.name || ""); // Update the default country code
            if (errors.phone) {
              delete errors.phone;
              setErrors({ ...errors });
            }
          }}
          inputClass="form-control" // CSS class for the input
          inputProps={{
            name: 'phone',
            onBlur: () => {
              if (phone.trim() !== '') { // Check if phone number is not empty before validation
                if (!isValidPhoneNumber(phone)) {
                  setErrors({ ...errors, phone: 'Invalid phone number format' });
                } else {
                  delete errors.phone; // Clear error if phone number is valid
                }
              } else {
                delete errors.phone; // Clear error if phone number is empty
              }
            }
          }}
          countryCodeEditable={false}
        />

        {/* <label htmlFor="name">Phone Number</label> */}
        {errors.phone && <div className="text-danger">{errors.phone}</div>}
      </div>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          name="companyname"
          placeholder=""
          value={company}
          onChange={(e) => {
            setCompany(e.target.value);
            if (errors.company) {
              delete errors.company;
              setErrors({ ...errors });
            }
          }}
          onBlur={() => {
            if (!company.trim()) {
              setErrors({ ...errors, company: 'Company name is required' });
            }
          }}
        />
        <label htmlFor="name">Company Name</label>
        {errors.company && <div className="text-danger">{errors.company}</div>}
      </div>
      {/* <div className="form-group mb-4">
        <textarea
          className="form-control"
          name="message"
          placeholder=""
          rows="4"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (errors.message) {
              delete errors.message;
              setErrors({ ...errors });
            }
          }}
          onBlur={() => {
            if (!message.trim()) {
              setErrors({ ...errors, message: 'Message is required' });
            }
          }}
        ></textarea>
        <label htmlFor="name">Message</label>
        {errors.message && <div className="text-danger">{errors.message}</div>}
      </div> */}
      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
        <label className="form-check-label">
          I agree to the
          <a href="/privacy-policy/" target="_blank">
            {' '}
            Privacy Policy{' '}
          </a>
          and
          <a href="/terms-of-use/" target="_blank">
            {' '}
            Terms of Service{' '}
          </a>
          .
        </label>
      </div>
      <div className="m-t-30">
        <button className='btn btn-three' type="submit" disabled={submitted}>
          {submitted ? `Submitting (${redirectTimer})` : 'Download Now'}
        </button>
      </div>
      {submitted && <p>Your form has been submitted!</p>}
    </form>
  );
};

export default FormCatlog;