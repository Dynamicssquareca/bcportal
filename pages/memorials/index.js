import React, { useState } from 'react';
import Head from 'next/head';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, } from 'reactstrap';
import ModelBox from '@/components/ModelBox';
import Image from 'next/image';

export const getStaticProps = async () => {
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_PRODUCT_CATEGORY_API_URL)
        if (!res.ok) {
            throw new Error('Failed to fetch categories');
        }
        const categories = await res.json()

        return {
            props: {
                categories,
                error: null,  // No error if data is fetched successfully
            },
            revalidate: 60,
        }
    } catch (error) {
        console.error('Error fetching categories:', error)
        return {
            props: {
                categories: [],
                error: 'Failed to load categories. Please try again later.',  // Set error message
            },
        }
    }
}
const getImageUrl = (img) =>
    img ? `${process.env.NEXT_PUBLIC_IMAGE}/${img}` : '/img/webpages/product-01.jpg'

const Index = ({ categories }) => {

    /*accordian code*/
    const [open, setOpen] = useState('1');
    const toggle = (id) => {
        if (open === id) {
            setOpen();
        } else {
            setOpen(id);
        }
    };

    return (
        <>
            <Head>
                <title>memorials</title>
                <meta name="description" content="This is a single page example." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className='hero-banner-two' style={{ backgroundImage: 'url("/img/banner/hero-banner-02.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-6 align-self-end'>
                            <div className='hero-banner-two-head '>
                                <h1>Memorials <span> Stone</span></h1>
                                <p>Trusted Tombstone Supplier for Global B2B Partners</p>
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <div className='hero-banner-two-image'>
                                <img src="/img/banner/single-page-01.png" alt="single-page-0" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className='about-us-section p-t-80 p-b-40'>
                <div className='container'>
                    <div className='row'>

                        <div className='col-lg-6'>
                            <div className='about-us-content'>
                                <h2>About Headstones</h2>
                                <p>Headstones are a great way to offer a lasting tribute to the lives of loved ones. They are generally made of durable materials like granite and bronze, in different shapes and sizes such as square top, check top, arc top, round top, half round top, ogee top, half ogee top and many more. Each memorial can be customized in terms of shape, color, finish, inscription, and other options to reflect the individual’s legacy.</p>
                                <p>At Stone Discover UK, we specialize in the design, fabrication, and wholesale supply of premium headstone memorials tailored for B2B clients. Monument retailers looking for premium quality granite headstones can contact us to partner or purchase in bulk . We receive orders across the UK, with our warehouses based in Liverpool and Southampton.</p>
                                <a href='/about-us/' className='btn btn-four m-t-30'>Read More</a>
                            </div>
                        </div>

                        <div className='col-lg-6'>
                            <div className='about-us-image'>
                                <img src='/img/webpages/about-us-pic.png' alt='About Us' className='img-fluid' />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='p-b-80'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-12'>
                            <div className='heading-left p-b-20'>
                                <h2 className='m-b-30'>Our Categories</h2>
                            </div>
                        </div>
                    </div>
                    <div className='row g-3 sliding-row-05'>
                        {categories.length > 0 ? (
                                categories.map((category) => (
                                    <div className="col-lg-3 sliding-col-05" key={category.id}>
                                        <div className="card-06">
                                            <div className="card-06-item">
                                                <a href={`/memorials/${category.slug}/`}>
                                                    <Image
                                                        src={getImageUrl(category.image)}
                                                        alt={category.name}
                                                        className="img-fluid"
                                                        width={300}
                                                        height={300}
                                                    />
                                                    <span>{category.title}</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))
                         ) : (
                            <p>No categories available.</p>
                        )}
                    </div>
                </div>
            </section>

            <section className='partner-section'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-12'>
                            <div className='heading-left p-b-20'>
                                <h2 className='m-b-30'>Why Partner with Us?</h2>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-lg-6'>
                            <div className='partner-pic'>
                                <img src='/img/webpages/partent-side-pic.jpg' alt='partent-side-pic' />
                            </div>
                        </div>
                        <div className='col-lg-6 align-self-center'>
                            <div className='form-left'>
                                <div className='accordion-one accordion-one-product'>
                                    <Accordion open={open} toggle={toggle}>
                                        <AccordionItem>
                                            <AccordionHeader targetId="1">
                                                <div className="d-flex justify-content-between align-items-center w-100">
                                                    <h3><img src='/img/icons/faq-icon-01.png' alt='faq-icon' />What types of memorials do you supply?</h3>
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
                                                    <h3><img src='/img/icons/faq-icon-02.png' alt='faq-icon' />Consistent Quality, Every Time</h3>
                                                    {/* <span className={`icon ${open === '1' ? 'open' : 'closed'}`}>
                                                    {open === '1' ? '-' : '+'}
                                                </span> */}
                                                </div>
                                            </AccordionHeader>
                                            <AccordionBody accordionId="2">
                                                <p>Salesforce integration services are a way to enhance operational harmony by fostering data synchronization and improved collaboration among the various business processes. </p>
                                            </AccordionBody>
                                        </AccordionItem>
                                        <AccordionItem>
                                            <AccordionHeader targetId="3">
                                                <div className="d-flex justify-content-between align-items-center w-100">
                                                    <h3><img src='/img/icons/faq-icon-03.png' alt='faq-icon' />Custom Shapes & Sizes</h3>
                                                    {/* <span className={`icon ${open === '1' ? 'open' : 'closed'}`}>
                                                    {open === '1' ? '-' : '+'}
                                                </span> */}
                                                </div>
                                            </AccordionHeader>
                                            <AccordionBody accordionId="3">
                                                <p>Salesforce integration services are a way to enhance operational harmony by fostering data synchronization and improved collaboration among the various business processes. </p>
                                            </AccordionBody>
                                        </AccordionItem>
                                        <AccordionItem>
                                            <AccordionHeader targetId="4">
                                                <div className="d-flex justify-content-between align-items-center w-100">
                                                    <h3><img src='/img/icons/faq-icon-04.png' alt='faq-icon' />Seamless Logistics & Delivery</h3>
                                                    {/* <span className={`icon ${open === '1' ? 'open' : 'closed'}`}>
                                                    {open === '1' ? '-' : '+'}
                                                </span> */}
                                                </div>
                                            </AccordionHeader>
                                            <AccordionBody accordionId="4">
                                                <p>Salesforce integration services are a way to enhance operational harmony by fostering data synchronization and improved collaboration among the various business processes. </p>
                                            </AccordionBody>
                                        </AccordionItem>

                                    </Accordion>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className='p-b-100 p-t-80'>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-lg-9'>
                            <div className='heading-center p-b-40'>
                                <h2 className='m-b-30'>Memorial Collection <span>Crafted</span> for All</h2>
                                <p>We offer a wide range of expertly crafted memorial designs to suit every need and occasion. From classic headstones and kerbsets to elegant bench and heart memorials, our collection also includes vases, urns, angel tributes, and dedicated children’s memorials. Each piece is made with care, precision, and a deep respect for the memories it honors. Contact us directly for competitive quotes and tailored solutions.</p>
                            </div>
                        </div>
                    </div>
                    <div className='row g-2 sliding-row'>
                        <div className='col-lg-2 col-md-4 sliding-col'>
                            <div className='card-04'>
                                <div className='card-04-item text-center'>
                                    <a href="/">
                                        <img src='/img/webpages/pic-07.jpg' alt='About Us' className='img-fluid' />
                                        <h4>Bench</h4>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-2 col-md-4 sliding-col'>
                            <div className='card-04'>
                                <div className='card-04-item text-center'>
                                    <a href="/">
                                        <img src='/img/webpages/pic-08.jpg' alt='About Us' className='img-fluid' />
                                        <h4>Kerbsets</h4>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-2 col-md-4 sliding-col'>
                            <div className='card-04'>
                                <div className='card-04-item text-center'>
                                    <a href="/">
                                        <img src='/img/webpages/pic-09.jpg' alt='About Us' className='img-fluid' />
                                        <h4>Flower Vases</h4>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-2 col-md-4 sliding-col'>
                            <div className='card-04'>
                                <div className='card-04-item text-center'>
                                    <a href="/">
                                        <img src='/img/webpages/pic-10.jpg' alt='About Us' className='img-fluid' />
                                        <h4>Urns</h4>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-2 col-md-4 sliding-col'>
                            <div className='card-04'>
                                <div className='card-04-item text-center'>
                                    <a href="/">
                                        <img src='/img/webpages/pic-11.jpg' alt='About Us' className='img-fluid' />
                                        <h4>Angle Heqadstones</h4>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-2  col-md-4 sliding-col'>
                            <div className='card-04'>
                                <div className='card-04-item text-center'>
                                    <a href="/">
                                        <img src='/img/webpages/pic-12.jpg' alt='About Us' className='img-fluid' />
                                        <h4>Children Memorial</h4>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='p-t-20'>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-lg-9'>
                            <div className='heading-center p-b-40'>
                                <h2 className='m-b-30'>Join Hands with a Reliable <span>Tombstone Supplier</span></h2>
                                <p>Whether you’re a high-volume buyer or expanding your product line, our team is here to support your growth. We understand the B2B dynamics of the memorial industry and deliver not just products—but trust, consistency, and partnership.</p>
                            </div>
                            <div className='button-center-new text-center'>
                                <ModelBox className='btn-three' headerText="Scale Your Store! " buttonText="Request a Quote" />
                                <ModelBox className='btn-four' headerText="Scale Your Store! " buttonText="Request Catalogue" />

                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className='p-b-30 p-t-80'>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-lg-9'>
                            <div className='heading-center p-b-40'>
                                <h2 className='m-b-30'>Why Choose Us?</h2>
                                <p>Whether you’re a high-volume buyer or expanding your product line, our team is here to support your growth. We understand the B2B dynamics of the memorial industry and deliver not just products—but trust, consistency, and partnership.</p>
                            </div>

                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-lg-12'>
                            <div className='card-05'>
                                <div className='card-05-item'>
                                    <img src='/img/icons/icons-1.png' alt='About Us' className='img-fluid' />
                                    <span>Quality Craftmanship</span>
                                </div>
                                <div className='card-05-item'>
                                    <img src='/img/icons/icons-2.png' alt='About Us' className='img-fluid' />
                                    <span>Nationwide Delivery</span>
                                </div>
                                <div className='card-05-item'>
                                    <img src='/img/icons/icons-3.png' alt='About Us' className='img-fluid' />
                                    <span>24*7 Customer Service</span>
                                </div>
                                <div className='card-05-item'>
                                    <img src='/img/icons/icons-4.png' alt='About Us' className='img-fluid' />
                                    <span>Custom Designs</span>
                                </div>
                                <div className='card-05-item'>
                                    <img src='/img/icons/icons-5.png' alt='About Us' className='img-fluid' />
                                    <span>Experienced Masons</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}

export default Index;
