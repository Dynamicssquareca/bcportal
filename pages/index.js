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
                <meta property="og:site_name" content="CRM Frontier " />
                <meta property="og:image" content="https://www.stonediscover.co.uk/img/feature/customization.jpg" />
                <meta property="og:image:width" content="200" />
                <meta property="og:image:height" content="200" />
                <meta property="og:image:type" content="image/jpg" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@CRM Frontier" />
                <meta name="twitter:title" content="Wholesale Memorial Headstones in the UK | Stone Discover UK" />
                <meta name="twitter:description" content="Buy high-quality memorial headstones at wholesale prices in the UK. Ideal for funeral homes, stone retailers, and fabricators. Contact Stone Discover UK today." />
                <meta name="twitter:image" content="https://www.stonediscover.co.uk/img/feature/customization.jpg" />
            </Head>

      <div className="hero-banner-one">
        <Image
          src="/img/banner/hero-banner-three.png"
          alt="Hero Banner"
          fill
          style={{ objectFit: 'cover', objectPosition: 'bottom' }}
          priority
          className='desh-top'
        />
        <Image
          src="/img/banner/mobile-bg.png"
          alt="Hero Banner"
          fill
          className='mobile-top'
          style={{ objectFit: 'cover', objectPosition: 'center bottom' }}
          priority
        />

        {/* Content over the image */}
        <div className="relative z-10">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-lg-9 text-center">
                <div className="hero-banner-content">
                  <h1>
                    Welcome to <span>Stone Discover</span> UK
                  </h1>
                  <p>
                    We specialize in creating premium quality memorial headstones and gravestones using the finest granite
                  </p>
                  <div className="hero-banner-btn">
                    <ModelBox className="btn-three" headerText="Scale Your Store!" buttonText="Get Quote Now" />
                    {/* <ModelBox className="btn-transparent" headerText="Scale Your Store!" buttonText="Request Catalogue" /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className='quote-us-section'>
        <div className='container'>
          <div className='row align-items-center justify-content-center'>
            <div className='col-lg-12 text-center'>
              <div className='quote-us-content'>
                <p>We proudly serve dealers and wholesalers across the UK, offering memorial stones in bulk quantities that are carefully designed and produced in our industries to meet the highest quality standards for the customers.</p>

              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='about-us-section p-b-40'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-6'>
              <div className='about-us-content'>
                <h2>About Us</h2>
                <p>Stone Discover UK is a trusted name in the memorial industry, dedicated to supplying memorial stones all over the United Kingdom. Whether you are looking for an Ogee, Kerb set, Heart-shaped, or Angel memorial, we have a wide range of memorials to suit all kinds of needs.</p>

                <p>Our skilled professionals ensure that each piece is thoughtfully designed and crafted with care and precision, reflecting the memory of the deceased. We also do custom designs by adding memorial flower vases and graveside ornaments to add a personal touch to the memorial.</p>
                <p>With warehouses in Liverpool and Southampton, we ensure safe packaging and prompt delivery. Please feel free to visit our showrooms for any queries or further guidance.</p>
                <a href='/about-us/' className='btn btn-four m-t-30'>Read More</a>
              </div>
            </div>

            <div className='col-lg-6'>
              <div className='about-us-image'>
                <Image src='/img/webpages/about-us-pic.png' alt='About Us' className='img-fluid' width={553} height={545} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='p-t-40 p-b-40 m-p-30'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-4 d-flex'>
              <div className='card-01'>
                <Image src='/img/icons/add-location-alt.png' alt='Our Location' className='img-fluid' width={48} height={49} />
                <h3>UK Presence</h3>
                <p>We are based in Liverpool and Southampton, where we maintain a large inventory of catalog items for immediate delivery. As the largest stockist of headstones in the UK. Our manufacturing facility is located in Alinagar, Chetlapotham, Telangana, Southern India.</p>
              </div>
            </div>
            <div className='col-lg-4 d-flex'>
              <div className='card-01'>
                <Image src='/img/icons/delivery-truck-speed.png' alt='Seamless Delivery' className='img-fluid' width={48} height={49} />
                <h3>Quick Turnaround</h3>
                <p>We keep standard catalogue items in stock for quick delivery. If you need special bespoke designs or made-to-order items, we have one of the fastest delivery times in the industry, taking just 7 to 8 weeks from our factory in India.</p>
              </div>
            </div>
            <div className='col-lg-4 d-flex'>
              <div className='card-01'>
                <Image src='/img/icons/handyman.png' alt='Timeless Craftsmanship' className='img-fluid' width={48} height={49} />
                <h3>Timeless Craftsmanship</h3>
                <p>Our factory in India is powered by skilled craftsmen who expertly create memorials in any bespoke design you need. Every piece is made using the finest granite and detail-focused workmanship.</p>
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
                    <Image src='/img/webpages/pic-01.png' alt='Book Headstone' className='img-fluid' width={256} height={471} />
                    <h3>Book Headstone</h3>
                  </a>
                </div>
                <div className='card-02-item'>
                  <a href="/memorials/heart-headstones/">
                    <Image src='/img/webpages/pic-02.png' alt='Heart Headstone' className='img-fluid' width={256} height={471} />
                    <h3>Heart Headstone</h3>
                  </a>
                </div>
                <div className='card-02-item'>
                  <a href="/memorials/headstones/">
                    <Image src='/img/webpages/pic-03.png' alt='Headstones' className='img-fluid' width={256} height={471} />
                    <h3>Headstones</h3>
                  </a>
                </div>
                <div className='card-02-item'>
                  <a href="/memorials/angel-headstones/">
                    <Image src='/img/webpages/pic-04.png' alt='Angels Headstone' className='img-fluid' width={256} height={471} />
                    <h3>Angels Headstone</h3>
                  </a>
                </div>
                <div className='card-02-item'>
                  <a href="/memorials/vases/">
                    <Image src='/img/webpages/pic-05.png' alt='Vases' className='img-fluid' width={256} height={471} />
                    <h3>Vases</h3>
                  </a>
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
                  <a href="/memorials/">
                    <Image src='/img/webpages/pic-07.jpg' alt='About Us' className='img-fluid' width={210} height={210} />
                    <h4>Bench</h4>
                  </a>
                </div>
              </div>
            </div>
            <div className='col-lg-2 col-md-4 sliding-col'>
              <div className='card-04'>
                <div className='card-04-item text-center'>
                  <a href="/memorials/">
                    <Image src='/img/webpages/pic-08.jpg' alt='About Us' className='img-fluid' width={210} height={210} />
                    <h4>Kerbsets</h4>
                  </a>
                </div>
              </div>
            </div>
            <div className='col-lg-2 col-md-4 sliding-col'>
              <div className='card-04'>
                <div className='card-04-item text-center'>
                  <a href="/memorials/">
                    <Image src='/img/webpages/pic-09.jpg' alt='About Us' className='img-fluid' width={210} height={210} />
                    <h4>Flower Vases</h4>
                  </a>
                </div>
              </div>
            </div>
            <div className='col-lg-2 col-md-4 sliding-col'>
              <div className='card-04'>
                <div className='card-04-item text-center'>
                  <a href="/memorials/">
                    <Image src='/img/webpages/pic-10.jpg' alt='About Us' className='img-fluid' width={210} height={210} />
                    <h4>Urns</h4>
                  </a>
                </div>
              </div>
            </div>
            <div className='col-lg-2 col-md-4 sliding-col'>
              <div className='card-04'>
                <div className='card-04-item text-center'>
                  <a href="/memorials/">
                    <Image src='/img/webpages/pic-11.jpg' alt='About Us' className='img-fluid' width={210} height={210} />
                    <h4>Angle Headstone</h4>
                  </a>
                </div>
              </div>
            </div>
            <div className='col-lg-2  col-md-4 sliding-col'>
              <div className='card-04'>
                <div className='card-04-item text-center'>
                  <a href="/memorials/">
                    <Image src='/img/webpages/pic-12.jpg' alt='About Us' className='img-fluid' width={210} height={210} />
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
