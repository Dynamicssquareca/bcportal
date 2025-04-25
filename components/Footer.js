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
            <div className='footer-subscriber m-t-80'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-7'>
                            <div className='subsc-head'>
                               <div className='sub-it'>
                                <p>Sales and Support:</p>
                                <span>+91 966 7584 700</span>
                               </div>
                               <div className='sub-it'>
                                <p>Or Mail us at:</p>
                                <span>info@stonediscover.co.uk</span>
                               </div>
                            </div>
                        </div>
                        <div className='col-lg-5 align-self-center'>
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
                                <p>Stone Discover – Largest manufacturer & supplier of Tombstone & Natural stone since 1984. We offer a wide range of Monuments such as Headstone, Angel Memorial, Plaques, Bench, Vases, Urns, Columbarium in various stones and natural stone in Granite, Marble from India. We also include sandstone and limestone in our offerings.</p>
                                <div className="social-links mt-3">
                                    {/* <a href="#" className="twitter"><i className="bi bi-twitter"></i></a>
                                    <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
                                    <a href="#" className="instagram"><i className="bi bi-instagram"></i></a> */}
                                    <a href="https://www.linkedin.com/company/crm-frontier/" className="linkedin" target='_blank'><i className="bi bi-linkedin"></i></a>
                                </div>
                            </div>
                            <div className="col-lg-2 col-6 footer-links">
                                <h4>Company</h4>
                                <ul>
                                    <li><i className="bi bi-chevron-right"></i> <a href="/about-us/">About us</a></li>
                                    <li><i className="bi bi-chevron-right"></i> <a href="/about-us/">Product</a></li>
                                    <li><i className="bi bi-chevron-right"></i> <a href="/blog/">Blogs</a></li>
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
                                <h4>Address:</h4>
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
