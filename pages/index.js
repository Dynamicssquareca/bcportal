import React, { useState, useRef } from 'react';
import Head from 'next/head';
import ModelBox from '@/components/ModelBox';
import Image from 'next/image';
export default function Home() {




  return (
    <>
      <Head>
        <title>Wholesale Memorial Headstones in the UK | Stone Discover UK</title>
        <meta
          name="description"
          content="Buy high-quality memorial headstones at wholesale prices in the UK. Ideal for funeral homes, stone retailers, and fabricators. Contact Stone Discover UK today."
        />
        <link rel="canonical" href="https://www.stonediscover.co.uk/" />
        <meta property="og:locale" content="US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Wholesale Memorial Headstones in the UK | Stone Discover UK" />
        <meta property="og:description" content="Buy high-quality memorial headstones at wholesale prices in the UK. Ideal for funeral homes, stone retailers, and fabricators. Contact Stone Discover UK today." />
        <meta property="og:url" content="https://www.stonediscover.co.uk/" />
        <meta property="og:site_name" content="Stone Discover UK" />
        <meta property="og:image" content="https://www.stonediscover.co.uk/img/stone-home-o.jpeg" />
        <meta property="og:image:width" content="200" />
        <meta property="og:image:height" content="200" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Stone Discover UK" />
        <meta name="twitter:title" content="Wholesale Memorial Headstones in the UK | Stone Discover UK" />
        <meta name="twitter:description" content="Buy high-quality memorial headstones at wholesale prices in the UK. Ideal for funeral homes, stone retailers, and fabricators. Contact Stone Discover UK today." />
        <meta name="twitter:image" content="https://www.stonediscover.co.uk/img/stone-home-o.jpeg" />
      </Head>

      <div className="hero-banner-one">
        <Image
          src="/img/banner/main-bg.jpg"
          alt="Hero Banner"
          fill
          style={{ objectFit: 'cover', objectPosition: 'bottom' }}
          priority
          className='desh-top'
        />

        {/* Content over the image */}
        <div className="relative z-10">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-lg-12 text-center">
                <div className="hero-banner-content">
                  <h1>Trusted Wholesale Granite Headstones Supplier</h1>
                  <p>A Leading Granite Monuments Manufacturer and Exporter from India </p>
                  <div className="hero-banner-btn">
                    <ModelBox className="btn-three" headerText="Scale Your Store!" buttonText="Get Quote Now" />
                    {/* <ModelBox className="btn-transparent" headerText="Scale Your Store!" buttonText="Request Catalogue" /> */}
                  </div>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-12'>
                <div className='over-img'>
                  <Image
                  src="/img/banner/Granite-Headstones-Monuments.png"
                  alt="Hero Banner"
                  width={1024}
                  height={368}
                  className='mobile-new'
                  priority
                />
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      

      <section className='about-us-section p-b-40'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-6 align-self-center'>
              <div className='about-us-content'>
                <h2>The legacy of <span>Stone Discover</span></h2>
                <p>Stone Discover is the largest manufacturer and supplier of premium quality memorial granite headstones since 1984. We offer a complete range of natural stones in various forms, including headstone monuments, gravestones, memorials, and grave markers.</p>
                <p>Our granite monuments are carefully selected, handcrafted, and sourced from quarries and factories owned by the MPG Group India, ensuring the highest quality standards. We pride ourselves on providing exceptional customer service, timely delivery, and competitive prices.</p>
                <div className='d-flex-grd'>
                  <div className='grif-list'>
                    <span>38+</span>
                    <p>Years of Expertise</p>
                  </div>
                  <div className='grif-list'>
                    <span>70+</span>
                    <p>Countries</p>
                  </div>
                  <div className='grif-list'>
                    <span>38+</span>
                    <p>Memorial Shipped Annually</p>
                  </div>
                </div>
                <a href='/about-us/' className='btn btn-four m-t-30' >Read More<span className="sr-only">about Stone Discover</span></a>
              </div>
            </div>

            <div className='col-lg-6'>
              <div className='about-us-image'>
                <Image src='/img/webpages/about-main.png' alt='About Us' className='img-fluid' width={670} height={589} />
              </div>
            </div>
          </div>
        </div>
      </section>


     
      <section className='products-section-one m-p-02'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12 text-center'>
              <div className='heading-center p-b-40'>
                <h2 className='m-b-20'>Any <span> Design</span>, Size, Color</h2>

              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='card-02'>
                <div className='card-02-item'>
                  <a href="/memorials/book-headstones/">
                    <Image src='/img/webpages/pic-01.png' alt='Balck Granite Book Headstone' className='img-fluid' width={256} height={471} />
                    <h3>Book Headstone</h3>
                  </a>
                </div>
                <div className='card-02-item'>
                  <a href="/memorials/heart-headstones/">
                    <Image src='/img/webpages/pic-02.png' alt='Balck Granite Heart Headstone' className='img-fluid' width={256} height={471} />
                    <h3>Heart Headstone</h3>
                  </a>
                </div>
                <div className='card-02-item'>
                  <a href="/memorials/headstones/">
                    <Image src='/img/webpages/pic-03.png' alt='Balck Granite Headstones' className='img-fluid' width={256} height={471} />
                    <h3>Headstones</h3>
                  </a>
                </div>
                <div className='card-02-item'>
                  <a href="/memorials/angel-headstone/">
                    <Image src='/img/webpages/pic-04.png' alt='Balck Granite Angels Headstone' className='img-fluid' width={256} height={471} />
                    <h3>Angels Headstone</h3>
                  </a>
                </div>
                <div className='card-02-item'>
                  <a href="/memorials/vases/">
                    <Image src='/img/webpages/pic-05.png' alt='Balck Granite Vases' className='img-fluid' width={256} height={471} />
                    <h3>Vases</h3>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-lg-9'>
              <div className='heading-center p-b-40'>
                <h2 className='m-b-30'>Pillars of Strength</h2>
                <p>Whether you’re a high-volume buyer or expanding your product line, our team is here to support your growth. We understand the B2B dynamics of the memorial industry and deliver not just products—but trust, consistency, and partnership.</p>
              </div>

            </div>
          </div>

          <div className='row'>
            <div className='col-lg-12'>
              <div className='card-05'>
                <div className='card-05-item'>
                  <Image src='/img/icons/icons-1.png' alt='About Us' className='img-fluid' width={58} height={76} />
                  <span>Finest Quality Stones</span>
                  <p>We ensure that each headstone is crafted with great attention to detail</p>
                </div>
                <div className='card-05-item'>
                  <Image src='/img/icons/icons-2.png' alt='About Us' className='img-fluid' width={58} height={76} />
                  <span>Competitive Prices</span>
                  <p>Get Quality Headstones at the Best Rates!</p>
                </div>
                <div className='card-05-item'>
                  <Image src='/img/icons/icons-3.png' alt='About Us' className='img-fluid' width={58} height={76} />
                  <span>On-time Delivery</span>
                  <p>Ensuring Your Headstones Arrive When You Need Them!</p>
                </div>
                <div className='card-05-item'>
                  <Image src='/img/icons/icons-4.png' alt='About Us' className='img-fluid' width={58} height={76} />
                  <span>Bulk Order</span>
                  <p>Streamline Your Business with Our Premium Headstones!</p>
                </div>
                <div className='card-05-item'>
                  <Image src='/img/icons/icons-5.png' alt='About Us' className='img-fluid' width={58} height={76} />
                  <span>Shipping Worldwide</span>
                  <p>Delivering Quality Headstones Everywhere!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='content-section-two p-b-80 p-t-100 m-p-03'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-6 align-items-center'>
              <div className='left-card-01-img'>
                <Image src='/img/webpages/pic-06.png' alt='About Us' className='img-fluid' width={553} height={545} />
              </div>
            </div>
            <div className='col-lg-6 d-flex'>
              <div className='card-03'>
                <ul>
                  <li className='m-b-20'>
                    <h3 className='m-b-20'>Memorial Wholesaler</h3>
                    <p>We supply memorials to monument suppliers, wholesalers, and fabricators throughout the UK. As the largest stockist of granite headstones in the country, we are known for our reliable delivery service and exceptional quality.</p>
                  </li>
                  <li className='m-b-20'>
                    <h3 className='m-b-20'>Premium Granite Colors</h3>
                    <p>We offer a variety of premium granite colors, including Absolute Indian Black, Bahama Blue, Indian Aurora, Indian Impala, Imperial Red, Light Grey Granite, and many more. Imported varieties such as Black Pearl, Olive Green, and South African Impala are also available for bespoke designs.</p>
                  </li>
                  <li>
                    <h3 className='m-b-20'>Bespoke Designs</h3>
                    <p>We are able to produce monuments of any custom dimensions, finishes, and engraving options to meet your local market needs. We can also replicate the design in a variety of granite colors depending on availability and preference.</p>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>

      </section>

      <section className='p-b-100 m-p-04'>
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
                  <a href="/memorials/benches/">
                    <img src='/img/webpages/pic-07.jpg' alt='About Us' className='img-fluid' />
                    <h4>Bench</h4>
                  </a>
                </div>
              </div>
            </div>
            <div className='col-lg-2 col-md-4 sliding-col'>
              <div className='card-04'>
                <div className='card-04-item text-center'>
                  <a href="/memorials/kerb-sets/">
                    <img src='/img/webpages/pic-08.jpg' alt='About Us' className='img-fluid' />
                    <h4>Kerbsets</h4>
                  </a>
                </div>
              </div>
            </div>
            <div className='col-lg-2 col-md-4 sliding-col'>
              <div className='card-04'>
                <div className='card-04-item text-center'>
                  <a href="/memorials/vases/">
                    <img src='/img/webpages/pic-09.jpg' alt='About Us' className='img-fluid' />
                    <h4>Flower Vases</h4>
                  </a>
                </div>
              </div>
            </div>
            <div className='col-lg-2 col-md-4 sliding-col'>
              <div className='card-04'>
                <div className='card-04-item text-center'>
                  <a href="/memorials/urns/">
                    <img src='/img/webpages/pic-10.jpg' alt='About Us' className='img-fluid' />
                    <h4>Urns</h4>
                  </a>
                </div>
              </div>
            </div>
            <div className='col-lg-2 col-md-4 sliding-col'>
              <div className='card-04'>
                <div className='card-04-item text-center'>
                  <a href="/memorials/angel-headstone/">
                    <img src='/img/webpages/pic-11.jpg' alt='About Us' className='img-fluid' />
                    <h4>Angle Headstones</h4>
                  </a>
                </div>
              </div>
            </div>
            <div className='col-lg-2  col-md-4 sliding-col'>
              <div className='card-04'>
                <div className='card-04-item text-center'>
                  <a href="/memorials/childrens-headstones/">
                    <img src='/img/webpages/pic-12.jpg' alt='About Us' className='img-fluid' />
                    <h4>Children Memorial</h4>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className='p-t-80'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-lg-9'>
              <div className='heading-center p-b-40'>
                <h2 className='m-b-30'>Join Hands with a Reliable <span>Tombstone Supplier</span></h2>
                <p>Whether you’re a high-volume buyer or expanding your product line, our team is here to support your growth. We understand the B2B dynamics of the memorial industry and deliver not just products—but trust, consistency, and partnership.</p>
              </div>
              <div className='button-center-new text-center'>
                <a href='/' className='btn btn-three'>Request a Quote</a>
                <a href='/' className='btn btn-four'>Request Catalogue</a>

              </div>
            </div>
          </div>
        </div>
      </section> */}
      <section className='p-b-30'>
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
                  <Image src='/img/icons/icons-1.png' alt='About Us' className='img-fluid' width={58} height={76} />
                  <span>Quality Craftmanship</span>
                </div>
                <div className='card-05-item'>
                  <Image src='/img/icons/icons-2.png' alt='About Us' className='img-fluid' width={58} height={76} />
                  <span>Nationwide Delivery</span>
                </div>
                <div className='card-05-item'>
                  <Image src='/img/icons/icons-3.png' alt='About Us' className='img-fluid' width={58} height={76} />
                  <span>24*7 Customer Service</span>
                </div>
                <div className='card-05-item'>
                  <Image src='/img/icons/icons-4.png' alt='About Us' className='img-fluid' width={58} height={76} />
                  <span>Custom Designs</span>
                </div>
                <div className='card-05-item'>
                  <Image src='/img/icons/icons-5.png' alt='About Us' className='img-fluid' width={58} height={76} />
                  <span>Experienced Masons</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className='faq'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-lg-9'>
              <div className='heading-center p-b-40'>
                <h2 className='m-b-30'>Frequently Asked <span>Questions</span></h2>
              </div>

            </div>
          </div>
        </div>
      </section> */}



    </>
  );
}
