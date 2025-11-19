import React from 'react';
import Head from 'next/head';

const CookiePolicy = () => {
  return (
     <>
            <Head>
                <title>cookie-policy</title>
            </Head>
            <div className='common-header-banner'>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-lg-8'>
                            <div className='commn-head'>
                                <h1>Cookie Policy</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='common-wraper-one p-t-60 p-b-20'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-12'>
                            <div className='common-wraper-one-info'>
                                <h2>Introduction</h2>
                                <p>Welcome to Stone Discover. We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, and safeguard your information.</p>
                                <p><strong>Information We Collect</strong></p>
                                <ul>
                                    <li><strong>Personal Information</strong>: Name, address, email, and phone number.</li>
                                    <li><strong>Payment Information</strong>: Credit card details, billing address.</li>
                                    <li><strong>Usage Data</strong>: Information on how you interact with our website.</li>
                                </ul>
                                <p><strong>How We Use Your Information</strong></p>
                                <ul>
                                    <li>To process transactions.</li>
                                    <li>To improve customer service.</li>
                                    <li>For marketing purposes, with your consent.</li>
                                </ul>
                                <p><strong>Data Security</strong></p>
                                <p>We implement a variety of security measures to maintain the safety of your personal information.</p>
                                <p><strong>Third-Party Disclosure</strong></p>
                                <p>We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties.</p>
                                <p><strong>Cookies</strong></p>
                                <p>We use cookies to enhance your experience on our website. You can choose to disable cookies through your browser settings.</p>
                                <p><strong>Your Rights</strong></p>
                                <p>You have the right to access, modify, or delete your personal information at any time.</p>
                                <p><strong>Changes to This Policy</strong></p>
                                <p>We reserve the right to modify this policy at any time, so please review it frequently.</p>
                                <p><strong>Contact Us</strong></p>
                                <p>For any questions regarding this privacy policy, you may contact us using the information below:</p>
                                <ul>
                                    <li><strong>Email</strong>: <a href="mailto:info@stonediscover.com">info@stonediscover.com</a></li>
                                    <li><strong>Phone</strong>: <strong>+91 9667584700</strong></li>
                                </ul>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
  );
}

export default CookiePolicy;
