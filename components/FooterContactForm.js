import React from 'react';
import { useRouter } from 'next/router';
import Form from './Form';



const FooterContactForm = () => {
const router = useRouter();

 // Define the pathname of the page where you want to hide the component
 const hiddenPagePaths = ['/about-us','/contact-us','/thank-you'];

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
        <div className='container bottom-form'>
            <div className='row'>
                <div className='col-lg-6 align-self-center'>
                    <div className='form-left'>
                        <span>Contact Us</span>
                        <h3 dangerouslySetInnerHTML={{ __html: getHeaderText() }}></h3>
                        <div className="cont-info">
                            <a href="tel:+170724 47950"><b>T:</b> +1 707 244 7950</a>
                            <a href="mailto:info@frontier.com"><b>E:</b> info@frontier.com</a>
                        </div>
                    </div>
                </div>
                <div className='col-lg-1'></div>
                <div className='col-lg-5'>
                    <Form onSubmit={handleFormSubmit} />
                </div>
            </div>
        </div>
    );
}

export default FooterContactForm;
