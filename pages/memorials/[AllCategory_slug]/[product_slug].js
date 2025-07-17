import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Head from 'next/head';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import Image from 'next/image';
import 'swiper/css/thumbs';
import ImageMagnifier from '@/components/ImageMagnifier';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, } from 'reactstrap';
// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import ModelBox from '@/components/ModelBox';

const getImageUrl = (img) =>
  img ? `${process.env.NEXT_PUBLIC_IMAGE}/${img}` : '/img/webpages/product-01.jpg';

const ProductPage = ({ product, relatedProducts, specifications, error }) => {
  if (error) {
    return <div className="container py-5 text-center">Error loading product. Please try again later.</div>;
  }

  const sliderRef = useRef(null);  // Reference to the Swiper 
  const [open, setOpen] = useState('1');
  const [openone, setOpenone] = useState('');
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  const toggles = (id) => {
    if (openone === id) {
      setOpenone();
    } else {
      setOpenone(id);
    }
  };
  const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL}memorials/${product.category.slug}/${product.slug}/`;
  const CanImageUrl = (img) => {
    if (!img) return '';
    if (img.startsWith('http')) return img;
    return `${process.env.NEXT_PUBLIC_IMAGE.replace(/\/$/, '')}/${img.replace(/^\//, '')}`;
  };
  return (
    <>
      <Head>
        <title>{product.metaTitle || product.title}</title>
        <meta name="description" content={product.metaDescription || product.excerpt || ''} />
        <link rel="canonical" href={canonicalUrl} />
        {product.metaKeywords && <meta name="keywords" content={product.metaKeywords} />}
        <meta property="og:title" content={product.metaTitle || product.title} />
        <meta property="og:description" content={product.metaDescription || product.excerpt || ''} />
         <meta property="og:site_name" content="Stone Discover UK" />
        <meta
          property="og:image"
          content={
            product.featuredimage
              ? CanImageUrl(product.featuredimage)
              : `${process.env.NEXT_PUBLIC_SITE_URL}img/stone-og-inne.jpg`
          }
        />
      </Head>
      <div className='container m-t-40'>
        <div className='row'>
          <div className='col-lg-12'>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/memorials/">Memorial Stones</a></li>
                <li className="breadcrumb-item"><a href={`/memorials/${product.category.slug}/`}>{product.category.title}</a></li>
                <li className="breadcrumb-item active" aria-current="page">{product.Title || product.title}</li>
              </ol>
            </nav>

          </div>
        </div>
      </div>

      <div className='product-page-wrap p-t-40'>
        <div className='container'>
          <div className='row'>



            <div className='col-lg-5'>
              <div className='product-pic' ref={sliderRef}>
                <ImageMagnifier src={getImageUrl(product.images?.[0])} alt={product.title}
                  zoomScale={2} sliderRef={sliderRef} />


              </div>
            </div>
            <div className='col-lg-7'>
              <div className='single-product-details'>
                <div className='product-title m-b-30'>
                  <h1 className='m-b-15'>{product.title}</h1>

                  <div dangerouslySetInnerHTML={{ __html: product.metaDescription }}></div>
                </div>
                {/* <div className='product-size-info '>
                  <ul>
                    <li>
                      <span className='p-name'>Color</span>
                      <span className='p-n-s'>:</span>
                      <span className='p-info'>High Quality Black Granite</span>
                    </li>
                    <li>
                      <span className='p-name'>Origin</span>
                      <span className='p-n-s'>:</span>
                      <span className='p-info'>India</span>
                    </li>
                    <li>
                      <span className='p-name'>Size</span>
                      <span className='p-n-s'>:</span>
                      <span className='p-info'>Size: Top 24″x6″x28″ Base 28″x10″x6″</span>
                    </li>
                    <li>
                      <span className='p-name'>Finish	</span>
                      <span className='p-n-s'>:</span>
                      <span className='p-info'>Polished Fully Carved</span>
                    </li>
                    <li>
                      <span className='p-name'>Price</span>
                      <span className='p-n-s'>:</span>
                      <span className='p-info'>Get a Quote</span>
                    </li>
                  </ul>
                </div> */}
                <div className='product-size-info'>
                  {product.specifications?.length > 0 ? (
                    <ul>
                      {product.specifications.map((item) => (
                        <li key={item._id}>
                          <span className='p-name'>{item.label}</span>
                          <span className='p-n-s'>:</span>
                          <span className='p-info'>{item.value}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No specifications available.</p>
                  )}
                </div>
                <div className="m-t-40 m-b-30"> <ModelBox className='btn-three' headerText="Scale Your Store! " buttonText="Request a Quote " />
                </div>

                <div className='product-dis'>
                  <div className='form-left'>
                    <div className='accordion-one'>
                      <Accordion open={openone} toggle={toggles}>
                        <AccordionItem>
                          <AccordionHeader targetId="01">
                            <div className="d-flex justify-content-between align-items-center w-100">
                              <h3>Description</h3>
                            </div>
                          </AccordionHeader>
                          <AccordionBody accordionId="01">
                            <div className='prodct-detils-body'>
                              <div dangerouslySetInnerHTML={{ __html: product.description }}></div>
                            </div>
                          </AccordionBody>
                        </AccordionItem>

                      </Accordion>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <section className='p-t-100 p-t-40'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-lg-9'>
              <div className='heading-center p-b-40'>
                <h2 className='m-b-30'>Realted Products</h2>
              </div>
            </div>
          </div>
          <div className='row g-4 sliding-row'>


            {relatedProducts?.length > 0 ? (
              relatedProducts.slice(0, 4).map((rel) => (
                <div className="col-lg-3 col-md-4 sliding-col" key={rel._id}>

                  <div className='card-04'>
                    <div className='card-04-item text-center'>
                      <a href={`/memorials/${product.category.slug}/${rel.slug}`}>
                        <Image
                          src={getImageUrl(rel.images?.[0])}
                          alt={rel.title}
                          width={300}
                          height={250}
                          className="img-fluid"
                        />
                        <h4>{rel.title}</h4>
                      </a>
                    </div>
                  </div>


                </div>
              ))
            ) : (
              <p>No related products found.</p>
            )}

          </div>
        </div>
      </section>



      <section className='p-b-100 p-t-100 m-p-07'>
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
                  <Image src='/img/icons/icons-1.png' alt='About Us' width={58} height={76} className='img-fluid' />
                  <span>Quality Craftmanship</span>
                </div>
                <div className='card-05-item'>
                  <Image src='/img/icons/icons-2.png' alt='About Us' width={58} height={76} className='img-fluid' />
                  <span>Nationwide Delivery</span>
                </div>
                <div className='card-05-item'>
                  <Image src='/img/icons/icons-3.png' alt='About Us' width={58} height={76} className='img-fluid' />
                  <span>24*7 Customer Service</span>
                </div>
                <div className='card-05-item'>
                  <Image src='/img/icons/icons-4.png' alt='About Us' width={58} height={76} className='img-fluid' />
                  <span>Custom Designs</span>
                </div>
                <div className='card-05-item'>
                  <Image src='/img/icons/icons-5.png' alt='About Us' width={58} height={76} className='img-fluid' />
                  <span>Experienced Masons</span>
                </div>
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
                <h2 className='m-b-30'>Popular Granite <span>Varieties</span> We Offer</h2>
              </div>
            </div>
          </div>
          <div className='row g-2 sliding-row'>
            <div className='col-lg-2 col-md-4 sliding-col'>
              <div className='card-04'>
                <div className='card-04-item text-center'>
                  <a href="/contact-us/">
                    <Image src='/img/webpages/pic-13.jpg' alt='Absolute Black' width={210} height={210} className='img-fluid' />
                    <h4>Absolute Black</h4>
                  </a>
                </div>
              </div>
            </div>
            <div className='col-lg-2 col-md-4 sliding-col'>
              <div className='card-04'>
                <div className='card-04-item text-center'>
                  <a href="/contact-us/">
                    <Image src='/img/webpages/pic-14.jpg' alt='Bahama Blue' width={210} height={210} className='img-fluid' />
                    <h4>Bahama Blue</h4>
                  </a>
                </div>
              </div>
            </div>
            <div className='col-lg-2 col-md-4 sliding-col'>
              <div className='card-04'>
                <div className='card-04-item text-center'>
                  <a href="/contact-us/">
                    <Image src='/img/webpages/pic-15.jpg' alt='Indian Aurora' width={210} height={210} className='img-fluid' />
                    <h4>Indian Aurora</h4>
                  </a>
                </div>
              </div>
            </div>
            <div className='col-lg-2 col-md-4 sliding-col'>
              <div className='card-04'>
                <div className='card-04-item text-center'>
                  <a href="/contact-us/">
                    <Image src='/img/webpages/pic-16.jpg' alt='Imperial Red' width={210} height={210} className='img-fluid' />
                    <h4>Imperial Red</h4>
                  </a>
                </div>
              </div>
            </div>
            <div className='col-lg-2 col-md-4 sliding-col'>
              <div className='card-04'>
                <div className='card-04-item text-center'>
                  <a href="/contact-us/">
                    <Image src='/img/webpages/pic-17.jpg' alt='Jurpana' width={210} height={210} className='img-fluid' />
                    <h4>Jurpana</h4>
                  </a>
                </div>
              </div>
            </div>
            <div className='col-lg-2  col-md-4 sliding-col'>
              <div className='card-04'>
                <div className='card-04-item text-center'>
                  <a href="/contact-us/">
                    <Image src='/img/webpages/pic-18.jpg' alt='Kuppam Green' width={210} height={210} className='img-fluid' />
                    <h4>Kuppam Green</h4>
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
                <a className='btn-four btn-four-cc' href="/catalog-download">Request Catalogue</a>

              </div>
            </div>
          </div>
        </div>
      </section>





      {/* <div className="container py-5">
        <h1>{product.title}</h1>
        <div className="mb-4">
          <Image
            src={getImageUrl(product.images?.[0])}
            alt={product.title}
            width={500}
            height={400}
            className="img-fluid"
          />
        </div>

        <h2>Related Products</h2>
        <div className="row">
          {relatedProducts?.length > 0 ? (
            relatedProducts.map((rel) => (
              <div className="col-md-3" key={rel._id}>
                <a href={`/memorials/${rel.categorySlug}/${rel.slug}`}>
                  <Image
                    src={getImageUrl(rel.images?.[0])}
                    alt={rel.title}
                    width={300}
                    height={250}
                    className="img-fluid"
                  />
                  <p>{rel.title}</p>
                </a>
              </div>
            ))
          ) : (
            <p>No related products found.</p>
          )}
        </div>
      </div> */}




    </>
  );
};

export default ProductPage;

export async function getStaticPaths() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_PRODUCTS_API_URL}`);
    const data = await res.json();

    const paths = data?.map((product) => ({
      params: {
        AllCategory_slug: product.categorySlug || 'unknown-category',
        categorslug: product.categorySlug || 'unknown-category',
        product_slug: product.slug,
      },
    })) || [];

    return { paths, fallback: 'blocking' };
  } catch (error) {
    console.error('Error in getStaticPaths:', error);
    return { paths: [], fallback: 'blocking' };
  }
}

export async function getStaticProps(context) {
  const { product_slug } = context.params;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_PRODUCTS_DETAILS_API_URL}/${product_slug}`);
    if (!res.ok) throw new Error('Failed to fetch product details');

    const { product, relatedProducts } = await res.json();

    return {
      props: {
        product,
        relatedProducts: relatedProducts || [],
        faq:
          product.faqs && product.faqs.length > 1
            ? product.faqs
            : product.category?.faqs && product.category.faqs.length > 1
              ? product.category.faqs
              : null,
      },
      revalidate: 60, // ISR
    };
  } catch (err) {
    console.error('Error in getStaticProps:', err);
    return {
      props: {
        error: true,
      },
    };
  }
}
