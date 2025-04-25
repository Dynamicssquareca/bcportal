import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, } from 'reactstrap';
import Form from './Form';



const FooterContactForm = () => {
    const router = useRouter();

    // Define the pathname of the page where you want to hide the component
    const hiddenPagePaths = ['/about-us', '/contact-us', '/thank-you'];

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

    /*accordain coed*/
    const [open, setOpen] = useState('1');
    const toggle = (id) => {
        if (open === id) {
            setOpen();
        } else {
            setOpen(id);
        }
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
                <div className='col-lg-6'>
                    <Form onSubmit={handleFormSubmit} />
                </div>
                <div className='col-lg-6'>
                    <div className='form-left'>
                        <div className='accordion-one'>
                            <Accordion open={open} toggle={toggle}>
                                <AccordionItem>
                                    <AccordionHeader targetId="1">
                                        <div className="d-flex justify-content-between align-items-center w-100">
                                            <h3>What types of memorials do you supply?</h3>
                                            {/* <span className={`icon ${open === '1' ? 'open' : 'closed'}`}>
                                                    {open === '1' ? '-' : '+'}
                                                </span> */}
                                        </div>
                                    </AccordionHeader>
                                    <AccordionBody accordionId="1">
                                        <p>Salesforce integration services are a way to enhance operational harmony by fostering data synchronization and improved collaboration among the various business processes. </p>
                                    </AccordionBody>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionHeader targetId="2">
                                        <div className="d-flex justify-content-between align-items-center w-100">
                                            <h3>Where are your memorials manufactured?</h3>
                                            {/* <span className={`icon ${open === '2' ? 'open' : 'closed'}`}>
                                                    {open === '2' ? '-' : '+'}
                                                </span> */}
                                        </div>
                                    </AccordionHeader>
                                    <AccordionBody accordionId="2">
                                        <p>The timeline for Salesforce integration depends on the complexity and scope of your project. Our team of certified staff do the strategic analysis of your existing workflows and provides a detailed timeline. </p>
                                    </AccordionBody>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionHeader targetId="3">
                                        <div className="d-flex justify-content-between align-items-center w-100">
                                            <h3>Do you supply memorials exclusively to wholesalers?</h3>
                                            {/* <span className={`icon ${open === '3' ? 'open' : 'closed'}`}>
                                                    {open === '3' ? '-' : '+'}
                                                </span> */}
                                        </div>
                                    </AccordionHeader>
                                    <AccordionBody accordionId="3">
                                        <p>Yes, we provide secured integration services by adhering to the standard security protocols. </p>
                                    </AccordionBody>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionHeader targetId="4">
                                        <div className="d-flex justify-content-between align-items-center w-100">
                                            <h3>What materials do you use for your memorials?</h3>
                                            {/* <span className={`icon ${open === '3' ? 'open' : 'closed'}`}>
                                                    {open === '3' ? '-' : '+'}
                                                </span> */}
                                        </div>
                                    </AccordionHeader>
                                    <AccordionBody accordionId="4">
                                        <p>Yes, we provide secured integration services by adhering to the standard security protocols. </p>
                                    </AccordionBody>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionHeader targetId="5">
                                        <div className="d-flex justify-content-between align-items-center w-100">
                                            <h3>Can you customize memorials according to our specifications?</h3>
                                            {/* <span className={`icon ${open === '3' ? 'open' : 'closed'}`}>
                                                    {open === '3' ? '-' : '+'}
                                                </span> */}
                                        </div>
                                    </AccordionHeader>
                                    <AccordionBody accordionId="5">
                                        <p>Yes, we provide secured integration services by adhering to the standard security protocols. </p>
                                    </AccordionBody>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionHeader targetId="6">
                                        <div className="d-flex justify-content-between align-items-center w-100">
                                            <h3>What materials do you use for your memorials?</h3>
                                            {/* <span className={`icon ${open === '3' ? 'open' : 'closed'}`}>
                                                    {open === '3' ? '-' : '+'}
                                                </span> */}
                                        </div>
                                    </AccordionHeader>
                                    <AccordionBody accordionId="6">
                                        <p>Yes, we provide secured integration services by adhering to the standard security protocols. </p>
                                    </AccordionBody>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default FooterContactForm;
