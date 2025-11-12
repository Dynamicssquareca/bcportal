import React from 'react';
import { useRouter } from 'next/router';
import FooterContactForm from './FooterContactForm';
import FormSubscribe from './FormSubscribe';
import ScrollToTopButton from './ScrollToTopButton';
import Image from 'next/image';
Image

const Footer = ({ faq }) => {
    const router = useRouter();
    const { pathname } = router;

    // Define classes based on different routes
    let footerClass = '';

    if (pathname === '/contact-us' || pathname === '/about-us' || pathname === '/thank-you' || pathname === '/get-quote-now' || pathname === '/catalog-download') {
        footerClass = 'footer-pad';
    }
    // } else if (pathname === '/page2') {
    //   footerClass = 'page2-footer';
    // } else if (pathname === '/page3') {
    //   footerClass = 'page3-footer';
    // }

    return (
        <>
            {/* <FooterContactForm faq={faq} /> */}
            <div id="subscribe" className='m-t-80'>
                <div className='container'>
                    <div className='row justify-content-center'>
                       
                        <div className='col-lg-8 align-self-center'>
                            <div className='subsc-head-right'>
                                    <FormSubscribe />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer id="footer" className="footer">
                <div className={`footer-top ${footerClass}`}>
                    <div className='container'>
                        <div className='row'>
                            <div className="col-lg-4 col-md-12 footer-info">
                                <a href="/" className="logo d-flex align-items-center">
                                    <img src="/log-white.png" alt="bc-partner-logo" />
                                    {/* <span>FlexStart</span> */}
                                </a>
                          
                            </div>
                            <div className='col-lg-8 align-self-center'>
                                <div className='footer-nav'>
                                    <a href="#">About The Manufacturer</a>
                                    <span>|</span>
                                    <a href="#">Contact Us</a>
                                    <span>|</span>
                                    <a href="#">Privacy Policy</a>
                                    <span>|</span>
                                    <a href="#">Terms of Use</a>
                                    <span>|</span>
                                    <a href="#">Cookies Policy</a>
                                </div>
                            </div>
                        
                        </div>
                    </div>

                </div>
                <div className='bottom-footer'>
                    <div className="container">
                        <div className="copyright">© Copyright 2025 websitename UK, Inc. All rights reserved. Various trademarks held by their respective owners.</div>
                    </div>
                </div>
            </footer>
            <ScrollToTopButton />
        </>
    );
}

export default Footer;
