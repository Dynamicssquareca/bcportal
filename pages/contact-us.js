import React from 'react';
import Head from 'next/head';
import Form from '@/components/Form';
const ContactUs = () => {
    return (
        <>
            <Head>
                <title>Contact us</title>
            </Head>
            
            <div className='common-header-banner m-b-60'>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-lg-8'>
                            <div className='commn-head'>
                                <h1>Contact US</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='contact-main p-t-60 p-b-40'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-6 align-self-center'>
                            <div className='addre-left'>
                                    <h2>Get in touch with us</h2>
                                    <p>Get in touch with us using the form below. We're excited to assist you with all your tiles and stone needs!</p>
                                    <div className='addres-sec'>
                                        <div className='add-list'>
                                            <div className='icons-l'>
                                            <i className="bi bi-house-fill"></i>
                                            </div>
                                            <div className='inf-wigt'>
                                                <h4>Visit A Office</h4>
                                                <p>1545 Capital Dr. Suite 100
                                                Carrollton Tx-75006</p>
                                            </div>
                                        </div>
                                        <div className='add-list'>
                                            <div className='icons-l'>
                                            <i className="bi bi-person-lines-fill"></i>
                                            </div>
                                            <div className='inf-wigt'>
                                                <h4>Phone Number</h4>
                                                <p>+1 858 293 5368</p>
                                            </div>
                                        </div>
                                        <div className='add-list'>
                                            <div className='icons-l'>
                                            <i className="bi bi-envelope-at-fill"></i>
                                            </div>
                                            <div className='inf-wigt'>
                                                <h4>Email Us</h4>
                                                <p>info@stonediscoveruk.com</p>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <div className='addre-right'>
                                <Form />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContactUs;
