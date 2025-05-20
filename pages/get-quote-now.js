import React from 'react';
import Head from 'next/head';
import Form from '@/components/Form';
const ContactUs = () => {
    return (
        <>
            <Head>
                <title>Get A Quote</title>
            </Head>

            <div className='common-header-banner'>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-lg-8'>
                            <div className='commn-head'>
                                <h1>Get A Quote</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='contact-main p-t-80 p-b-40'>
                <div className='container'>
                    <div className='row justify-content-center'>
                     
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
