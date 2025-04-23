import React from 'react';
import { useRouter } from 'next/router';
import FooterContactForm from './FooterContactForm';
import FormSubscribe from './FormSubscribe';
import ScrollToTopButton from './ScrollToTopButton';
import Image from 'next/image';
Image

const Footer = () => {
    const router = useRouter();
    const { pathname } = router;

    // Define classes based on different routes
    let footerClass = '';

    if (pathname === '/contact-us' || pathname === '/about-us' || pathname === '/thank-you') {
        footerClass = 'footer-pad';
    }
    // } else if (pathname === '/page2') {
    //   footerClass = 'page2-footer';
    // } else if (pathname === '/page3') {
    //   footerClass = 'page3-footer';
    // }

    return (
        <>
            <FooterContactForm />
            <footer id="footer" className="footer">
                <div className={`footer-top ${footerClass}`}>
                    <div className='container'>
                        <div className='row'>
                            <div className="col-lg-4 col-md-12 footer-info">
                                <a href="/" className="logo d-flex align-items-center">
                                    <Image src="/stone-logo.png" alt="stone-logo" width={200} height={30} />
                                    {/* <span>FlexStart</span> */}
                                </a>
                                <p>CRM Frontier goes beyond CRM. Our certified experts unlock explosive growth for businesses with future-proof Salesforce solutions, crafting seamless customer experiences that drive results.</p>
                                <div className="social-links mt-3">
                                    {/* <a href="#" className="twitter"><i className="bi bi-twitter"></i></a>
                                    <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
                                    <a href="#" className="instagram"><i className="bi bi-instagram"></i></a> */}
                                    <a href="https://www.linkedin.com/company/crm-frontier/" className="linkedin" target='_blank'><i className="bi bi-linkedin"></i></a>
                                </div>
                            </div>
                            <div className="col-lg-2 col-6 footer-links">
                                <h4>Quick Links</h4>
                                <ul>
                                    <li><i className="bi bi-chevron-right"></i> <a href="/">Home</a></li>
                                    <li><i className="bi bi-chevron-right"></i> <a href="/about-us/">About us</a></li>
                                    <li><i className="bi bi-chevron-right"></i> <a href="/blog/">Blogs</a></li>
                                    <li><i className="bi bi-chevron-right"></i> <a href="/contact-us/">Contact Us</a></li>
                                    <li><i className="bi bi-chevron-right"></i> <a href="/terms-of-use/">Terms of service</a></li>
                                    <li><i className="bi bi-chevron-right"></i> <a href="/privacy-policy/">Privacy policy</a></li>
                                </ul>
                            </div>
                            <div className="col-lg-2 col-6 footer-links">
                                <h4>Services</h4>
                                <ul>
                                    <li><i className="bi bi-chevron-right"></i> <a href="/services/salesforce-implementation/">Salesforce Implementation</a></li>
                                    <li><i className="bi bi-chevron-right"></i> <a href="/services/salesforce-customization/">Salesforce Customization</a></li>
                                    <li><i className="bi bi-chevron-right"></i> <a href="/services/salesforce-integration/">Salesforce Integration</a></li>
                                    <li><i className="bi bi-chevron-right"></i> <a href="/services/salesforce-training/">Salesforce Training</a></li>
                                    <li><i className="bi bi-chevron-right"></i> <a href="/services/salesforce-support/">Salesforce Support</a></li>
                                    <li><i className="bi bi-chevron-right"></i> <a href="/services/salesforce-optimization/">Salesforce Optimization</a></li>
                                    
                                </ul>

                            </div>
                            <div className="col-lg-4 col-md-12 footer-contact text-center text-md-start">
                                <h4>Subscribe our Newsletter</h4>
                                <FormSubscribe />
                            </div>

                        </div>
                    </div>

                </div>
                <div className='bottom-footer'>
                    <div className="container">
                        <div className="copyright">© Copyright 2025 CRM Frontier, Inc. All rights reserved. Various trademarks held by their respective owners.</div>
                    </div>
                </div>
            </footer>
            <ScrollToTopButton />
        </>
    );
}

export default Footer;
