
import React, { useState } from 'react';
import Head from 'next/head';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, } from 'reactstrap';
import Image from 'next/image';
import ModelBox from '@/components/ModelBox';
import { useRouter } from 'next/router';
const getImageUrl = (img) =>
  img ? `${process.env.NEXT_PUBLIC_IMAGE}/${img}` : '/img/webpages/product-01.jpg'

const getImageUrlBanner = (img) =>
  img ? `${process.env.NEXT_PUBLIC_IMAGE}/${img}` : '/img/webpages/product-01.jpg'

const CategoryPage = ({ category, products, faq, error }) => {
  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  if (!category) {
    return <p className="text-warning">Category not found.</p>;
  }

  /*accordian code*/
  const [open, setOpen] = useState('1');
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };
  /*meta code*/

  const router = useRouter();
  const { AllCategory_slug } = router.query;

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  if (!category) {
    return <p className="text-warning">Category not found.</p>;
  }

  const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL}memorials/${category.slug}/`;
  const CanImageUrl = (img) => {
    if (!img) return '';
    if (img.startsWith('http')) return img;
    return `${process.env.NEXT_PUBLIC_IMAGE.replace(/\/$/, '')}/${img.replace(/^\//, '')}`;
  };

  return (
    <>
      <Head>
        <title>{category.metaTitle || category.title}</title>
        <meta name="description" content={category.metaDescription || category.excerpt || ''} />
        <link rel="canonical" href={canonicalUrl} />
        {category.metaKeywords && <meta name="keywords" content={category.metaKeywords} />}
        <meta property="og:title" content={category.metaTitle || category.title} />
        <meta property="og:description" content={category.metaDescription || category.excerpt || ''} />
        <meta
          property="og:image"
          content={
            category.featuredimage
              ? CanImageUrl(category.featuredimage)
              : `${process.env.NEXT_PUBLIC_SITE_URL}img/banner/home-main-banner.png`
          }
        />
      </Head>

      <div className='hero-banner-two' style={{ backgroundImage: 'url("/img/banner/hero-banner-02.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-6 align-self-end'>
              <div className='hero-banner-two-head '>
                <h1><span>{category.title}</span></h1>
                <p>Trusted Tombstone Supplier for Global B2B Partners</p>
              </div>
            </div>
            <div className='col-lg-6'>
              <div className='hero-banner-two-image'>
                <Image
                  width={563}
                  height={563}
                  src={getImageUrlBanner(category.image)}
                  alt={category.title}
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className='about-us-section p-t-80 p-b-40 p-t-40'>
        <div className='container'>
          <div className='row'>

            <div className='col-lg-6'>
              <div className='about-us-content'>
                <h2>About {category.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: category.description }}>{ }</div>
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



      <div className="container py-4 m-p-08">

        <div className="row mt-4">
          <div className='col-lg-12'>
            <div className='about-us-content'>
              <h2>Our Products</h2>
            </div>


          </div>
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <div className="col-lg-3 sliding-col-05" key={product._id}>
                <div className="card-06">
                  <div className="card-06-item">
                    <a href={`/memorials/${category.slug}/${product.slug}`}>
                      <Image
                        width={300}
                        height={200}
                        src={getImageUrl(product.images?.[0])}
                        alt={product.title}
                        className="img-fluid"
                      />
                      <span>{product.title}</span>
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <p className="text-muted">No products found in this category.</p>
            </div>
          )}

        </div>
      </div>

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

      <section className='p-t-20 '>
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


      <section className='p-b-30 p-t-80 m-p-09'>
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
};

export const getStaticPaths = async () => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_PRODUCT_CATEGORY_API_URL);
    const data = await res.json();

    const paths = data?.map((cat) => ({
      params: { AllCategory_slug: cat.slug },
    }));

    return {
      paths: paths || [],
      fallback: 'blocking',
    };
  } catch (error) {
    console.error("Error generating paths:", error.message);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

export const getStaticProps = async ({ params }) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DETSILS_URL}/${params.AllCategory_slug}`);
    const data = await res.json();

    if (!data || !data.category || !data.products) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        category: data.category,
        products: data.products,
        faq: data.category.faqs || null,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Failed to load category details:", error.message);
    return {
      props: {
        category: null,
        products: [],
        faq: null,
        error: 'Something went wrong while loading this page.',
      },
      revalidate: 60,
    };
  }
};

export default CategoryPage;
