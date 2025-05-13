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

const ProductPage = ({ product, relatedProducts, error }) => {
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

  return (
    <>
      <Head>
         <title>{product.metaTitle || product.title}</title>
      </Head>
      <div className='container m-t-40'>
        <div className='row'>
          <div className='col-lg-12'>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item"><a href={`/memorials/${product.category.slug}/`}>{product.category.title}</a></li>
                <li className="breadcrumb-item active" aria-current="page">{product.metaTitle || product.title}</li>
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
                                <ImageMagnifier src="/test-image.jpg" alt='my'
                                    zoomScale={2} sliderRef={sliderRef} />
                            </div>
                        </div>
                        <div className='col-lg-7'>
                            <div className='single-product-details'>
                                <div className='product-title m-b-30'>
                                    <h1 className='m-b-15'>{product.title}</h1>
                                  
                                    <div dangerouslySetInnerHTML={{ __html: product.description }}></div>
                                </div>
                                <div className='product-size-info '>
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
                                </div>
                                <div class="m-t-40 m-b-30"> <ModelBox className='btn-three' headerText="Scale Your Store! " buttonText="Request a Quote " />
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
                                                            <p>The Black Granite Upright Weeping Angel Headstone offers a timeless tribute to a loved one’s memory. This black angel stone is made from high-quality, durable black granite. It features an angel sitting in a kneeling posture, with wings softly curved around the side, representing eternal mourning and protection. The angel’s expressions and its sitting posture offer a sense of great relief and peace, ideal for conveying heartfelt remembrance.</p>
                                                            <p>At Stone Discover, Angel Memorials are crafted with premium quality granite, carved with professional stone masons, and further shaped, and polished to give their best appearance. You can also get them customized in terms of names, images, and epitaphs. This design is available for custom bulk orders and tailored size requirements. You can simply click here to register with us and share your requirements. Our sales professionals will reach out to you and solve your all queries regarding the product. We will help you select the best memorial for your loved one as per your budget and preferences.</p>
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








      <div className="container py-5">
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
      </div>




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
