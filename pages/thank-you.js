import Head from 'next/head';
import React from 'react';
const ThankYou = () => {
    return (
        <>
        <Head>
            <title>Thank You | CRM Frontier</title>
            <meta
                    name="description"
                    content=""
                />
            <link rel="canonical" href="https://www.crmfrontier.com/thank-you/" />
        </Head>

        <section className="hero">
        <div id="hero"></div>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-9">
                    <div className="hero-content">
                        <h1>Thank You !</h1>
                       <p>Thanks for getting in touch - someone will contact you soon!</p>
                       <a className="btn btn-prime" href='/'>Back to Home</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
    );
}

export default ThankYou;
