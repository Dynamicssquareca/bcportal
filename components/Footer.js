import React from 'react';
import { useRouter } from 'next/router';
import FooterContactForm from './FooterContactForm';
import FormSubscribe from './FormSubscribe';
import ScrollToTopButton from './ScrollToTopButton';
import Image from 'next/image';
Image

const Footer = ({faq}) => {
    const router = useRouter();
    const { pathname } = router;

    // Define classes based on different routes
    let footerClass = '';

    if (pathname === '/contact-us' || pathname === '/about-us' || pathname === '/thank-you' || pathname=== '/get-quote-now' || pathname=== '/catalog-download') {
        footerClass = 'footer-pad';
    }
    // } else if (pathname === '/page2') {
    //   footerClass = 'page2-footer';
    // } else if (pathname === '/page3') {
    //   footerClass = 'page3-footer';
    // }

    return (
        <>
            <FooterContactForm faq={faq} />
            <div className='footer-subscriber m-t-80'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-6'>
                            <div className='subsc-head'>
                                <div className='sub-it'>
                                    <p>Sales and Support:</p>
                                    <span>+44 161 394 1594</span>
                                </div>
                                <div className='sub-it'>
                                    <p>Or Mail us at:</p>
                                    <span>info@stonediscover.com</span>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6 align-self-center'>
                            <div className='subsc-head-right'>

                                <div className='subsc-head-right-l'>
                                    <h4>Subscribe Us for Offers</h4>
                                </div>
                                <div className='subsc-head-right-r'>
                                    <FormSubscribe />
                                </div>
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
                                    <Image src="/stone-logo.png" alt="stone-logo" width={200} height={30} />
                                    {/* <span>FlexStart</span> */}
                                </a>
                                <p>Stone Discover UK is a trusted wholesale supplier of premium granite memorials, serving the UK with unmatched quality and service. We understand the B2B dynamics of the memorial industry and deliver not just products, but trust, consistency, and partnership. Partner with us for exceptional craftsmanship and competitive pricing you can count on.</p>
                                <div className="social-links mt-3">
                                    {/* <a href="#" className="twitter"><i className="bi bi-twitter"></i></a>
                                    <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
                                    <a href="#" className="instagram"><i className="bi bi-instagram"></i></a> */}
                                    <a href="#" className="linkedin" target='_blank'><i className="bi bi-linkedin"></i></a>
                                </div>
                            </div>
                            <div className="col-lg-2 col-6 footer-links">
                                <h4>Company</h4>
                                <ul>
                                    <li><i className="bi bi-chevron-right"></i> <a href="/about-us/">About us</a></li>
                                    <li><i className="bi bi-chevron-right"></i> <a href="/about-us/">Product</a></li>
                                    <li><i className="bi bi-chevron-right"></i> <a href="/">Blogs</a></li>
                                    <li><i className="bi bi-chevron-right"></i> <a href="/contact-us/">Contact Us</a></li>
                                    <li><i className="bi bi-chevron-right"></i> <a href="/terms-of-use/">Terms of service</a></li>
                                    <li><i className="bi bi-chevron-right"></i> <a href="/privacy-policy/">Privacy policy</a></li>
                                </ul>
                            </div>
                            <div className="col-lg-2 col-6 footer-links">
                                <h4>Our Products</h4>
                                <ul>
                                    <li><i className="bi bi-chevron-right"></i> <a href="/">Tombstones</a></li>
                                    <li><i className="bi bi-chevron-right"></i> <a href="/">Granite</a></li>
                                    <li><i className="bi bi-chevron-right"></i> <a href="/">Marble</a></li>
                                    <li><i className="bi bi-chevron-right"></i> <a href="/">Sandstone</a></li>
                                    <li><i className="bi bi-chevron-right"></i> <a href="/">Limestone</a></li>
                                    <li><i className="bi bi-chevron-right"></i> <a href="/">Quartz</a></li>
                                </ul>

                            </div>
                            <div className="col-lg-4 col-md-12 footer-contact text-center text-md-start">
                                <h4>Usefull</h4>
                                {/* <p><b>Office:</b> 1116, JMD Megapolis, Sector 48, Gurugram, Haryana 122018.</p> */}
                                <p><b>Working Time:</b> Mon-Sat: 8 AM - 5 PM</p>
                                <p><b>Email:</b> info@stonediscover.com</p>
                                {/* <FormSubscribe /> */}
                            </div>

                        </div>
                    </div>

                </div>
                <div className='bottom-footer'>
                    <div className="container">
                        <div className="copyright">© Copyright 2025 Stonediscover UK, Inc. All rights reserved. Various trademarks held by their respective owners.</div>
                    </div>
                </div>
            </footer>
            <ScrollToTopButton />
        </>
    );
}

export default Footer;
