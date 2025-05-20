import React from 'react';
import Head from 'next/head';
import FormCatlog from '@/components/FormCatlog';
const ContactUs = () => {
    return (
        <>
            <Head>
                <title>Catalog Download</title>
            </Head>

            <div className='common-header-banner'>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-lg-8'>
                            <div className='commn-head'>
                                <h1>Catalog Download</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='contact-main p-t-40 p-b-40'>
                <div className='container'>
                    <div className='row'>
                         <div className='contact-main p-t-20 p-b-40'>
                <div className='container'>
                    <div className='row justify-content-center'>
                     
                        <div className='col-lg-6'>
                            <div className='addre-right'>
                                <FormCatlog />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContactUs;
