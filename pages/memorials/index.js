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
                                <Image src="/img/banner/single-page-001.png" width={563} height={563} alt="single-page-0" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         
            <section className='p-b-80 p-t-40 m-p-06'>
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
                                                    src={getImageUrl(category.categoryicon)}
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
               <section className='about-us-section p-t-40 p-b-40 m-p-05'>
                <div className='container'>
                    <div className='row'>

                        <div className='col-lg-6'>
                            <div className='about-us-content'>
                                <h2>About Memorial Stones</h2>
                                <p>Memorial stones are a long-lasting way to honour the memory of loved ones. These are specially crafted using premium granite stones and are available in a variety of shapes and sizes. Memorial stones reflect individual stories, cultural values, and timeless remembrance.</p>
                                <p>At Stone Discover UK, we supply a complete range of memorial stones, designed to meet diverse needs across the funeral and memorial trade. We offer a wide variety of granite monuments in colours such as Absolute Indian Black, Bahama Blue, Light Grey, Indian Aurora, and Imperial Red, among others. We also offer imported granite options, including Blue Pearl, Olive Green, and South African Impala.</p>
                                <p>Stone Discover UK is a trusted B2B supplier of high-quality granite memorial stones for the UK trade. We work with dealers, wholesalers, memorial retailers, and local authorities to deliver premium monuments at competitive prices.</p>
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
                                                    <h3><img src='/img/icons/faq-icon-01.png' alt='faq-icon' />Direct Manufacturer Advantage</h3>
                                                    {/* <span className={`icon ${open === '1' ? 'open' : 'closed'}`}>
                                                                                                   {open === '1' ? '-' : '+'}
                                                                                               </span> */}
                                                </div>
                                            </AccordionHeader>
                                            <AccordionBody accordionId="1">
                                                <p>We manage our own production facilities in India, allowing us to offer:</p>
                                                <ul>
                                                    <li>Competitive B2B pricing</li>
                                                    <li>Flexible customization options</li>
                                                    <li>Faster Deliveries with smooth logistics</li>
                                                </ul>
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
                                                <p>Our tombstones are crafted from premium-grade Indian granite, renowned for its durability and timeless appeal. Every piece is quality-checked to ensure consistent finishing, accurate dimensions, and enduring aesthetics.</p>

                                            </AccordionBody>
                                        </AccordionItem>
                                        <AccordionItem>
                                            <AccordionHeader targetId="3">
                                                <div className="d-flex justify-content-between align-items-center w-100">
                                                    <h3><img src='/img/icons/faq-icon-04.png' alt='faq-icon' />Bespoke Designs</h3>
                                                    {/* <span className={`icon ${open === '1' ? 'open' : 'closed'}`}>
                                                                                                   {open === '1' ? '-' : '+'}
                                                                                               </span> */}
                                                </div>
                                            </AccordionHeader>
                                            <AccordionBody accordionId="3">
                                                <p>We support customizations including:</p>
                                                <ul>
                                                    <li>Headstones</li>
                                                    <li>Kerbsets</li>
                                                    <li>Vases and Urns</li>
                                                    <li>Angel Memorials</li>
                                                    <li>hildren Memorials</li>
                                                    <li>All with engraving-ready finishes</li>
                                                </ul>
                                            </AccordionBody>
                                        </AccordionItem>
                                        <AccordionItem>
                                            <AccordionHeader targetId="4">
                                                <div className="d-flex justify-content-between align-items-center w-100">
                                                    <h3><img src='/img/icons/faq-icon-03.png' alt='faq-icon' />Seamless Logistics & Delivery</h3>
                                                    {/* <span className={`icon ${open === '1' ? 'open' : 'closed'}`}>
                                                                                                   {open === '1' ? '-' : '+'}
                                                                                               </span> */}
                                                </div>
                                            </AccordionHeader>
                                            <AccordionBody accordionId="4">
                                                <p>With our warehouses located in Liverpool and Southampton, we guarantee:</p>
                                                <ul>
                                                    <li>On-time delivery</li>
                                                    <li>Proper transport coordination</li>
                                                    <li>Hassle-free customs handling</li>
                                                </ul>
                                            </AccordionBody>
                                        </AccordionItem>


                                    </Accordion>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className='p-b-100 p-t-80 m-p-07'>
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
