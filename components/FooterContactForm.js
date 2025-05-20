import React, { useState } from 'react';
import { useRouter } from 'next/router';

import Form from './Form';
import FaqAccordion from './FaqAccordion';



const FooterContactForm = ({faq}) => {
    const router = useRouter();

    // Define the pathname of the page where you want to hide the component
    const hiddenPagePaths = ['/contact-us', '/thank-you','/get-quote-now','/catalog-download'];

    const shouldHideComponent = hiddenPagePaths.includes(router.pathname);
    // Conditionally render the component based on whether it should be hidden
    if (shouldHideComponent) {
        // Return null to hide the component
        return null;
    }
    const getHeaderText = () => {
        switch (router.pathname) {
            case '/':
                return 'Get in touch with our team to <br/> discuss your CRM needs';
            case '/services/salesforce-implementation/':
                return 'Unlock the Power of <br/> CRMforcePlus Today!';
            case '/page3':
                return 'Request Callback for Page 3';
            default:
                return 'Get in touch with our team <br/> to discuss your CRM needs';
        }
    };

    const handleFormSubmit = async () => {
        // Redirect to the thank you page after 5 seconds
        setTimeout(() => {
            router.push('/thank-you');
        }, 3000);
    };



    return (
        <div className='container bottom-form m-t-80'>
            <div className='row justify-content-center'>
                <div className='col-lg-9'>
                    <div className='heading-center p-b-40'>
                        <h2 className='m-b-30'>Frequently Asked <span>Questions</span></h2>
                    </div>

                </div>
            </div>
            <div className='row bg-gray'>
            <div className='col-lg-6 order-1 order-lg-2'>
                    <FaqAccordion faqList={faq} />
                </div>

                <div className='col-lg-6 order-2 order-lg-1'>
                    <Form onSubmit={handleFormSubmit} />
                </div>
               

            </div>
        </div>
    );
}

export default FooterContactForm;
