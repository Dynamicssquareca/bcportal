import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import CardSliderOne from '@/components/CardSliderOne';
import CardSliderTwo from '@/components/CardSliderTwo';

const BlogIndex = () => {


  return (
    <>
      <Head>
        <title>Wholesale Memorial Headstones Guides | Stone Discover UK</title>
        <meta
          name="description"
          content="Explore wholesale memorial headstone guides with Stone Discover UK. Resources for funeral trade, stonemasons & retailers to choose the best."
        />
        <link rel="canonical" />
      </Head>
      <div className='bc-home-intro card'>
        <section className="news-section py-5 bg-white">
          <div className="container">
            <div className="row g-4 align-items-stretch">
              {/* Left: Main Article */}
              <div className="col-lg-6 d-flex">
                <Link
                  href="#"
                  className="card flex-fill"
                >
                  <Image
                    src="/img/demo-1.jpg"
                    alt="Main News"
                    width={800}
                    height={370}
                    className="card-img-top object-fit-cover"
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="fw-bold mb-2 text-dark">
                      Daily Manufacturing News Digest – the industry stories you
                      should be aware of today
                    </h5>
                    <p className="text-muted mb-0">
                      Wendy Graham is the first woman Plant Manager in the 97 years
                      of Ford’s iconic Dagenham site, coming 57 years after its women
                      factory workers famously went on strike in a demand for
                      equal...
                    </p>
                  </div>
                </Link>
              </div>

              {/* Right: Side Articles */}
              <div className="col-lg-6 d-flex flex-column gap-3">
                {/* Article 1 */}
                <Link
                  href="#"
                  className="d-flex align-items-start gap-3 text-decoration-none"
                >
                  <Image
                    src="/img/demo-2.jpg"
                    alt="News 1"
                    width={320}
                    height={80}
                    className="rounded-3 object-fit-cover flex-shrink-0"
                  />
                  <div>
                    <h6 className="fw-semibold mb-0 text-dark">
                      Daily Manufacturing News Digest – the industry stories you
                      should be aware of today
                    </h6>
                  </div>
                </Link>

                {/* Article 2 */}
                <Link
                  href="#"
                  className="d-flex align-items-start gap-3 text-decoration-none"
                >
                  <Image
                    src="/img/demo-3.jpg"
                    alt="News 2"
                    width={320}
                    height={80}
                    className="rounded-3 object-fit-cover flex-shrink-0"
                  />
                  <div>
                    <h6 className="fw-semibold mb-0 text-dark">
                      New report warns skills shortages threaten circular economy
                      progress
                    </h6>
                  </div>
                </Link>

                {/* Article 3 */}
                <Link
                  href="#"
                  className="d-flex align-items-start gap-3 text-decoration-none"
                >
                  <Image
                    src="/img/demo-4.jpg"
                    alt="News 3"
                    width={320}
                    height={80}
                    className="rounded-3 object-fit-cover flex-shrink-0"
                  />
                  <div>
                    <h6 className="fw-semibold mb-0 text-dark">
                      Pennine Healthcare welcomes students to explore careers in
                      healthcare manufacturing
                    </h6>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className='slider-wrapper p-b-60'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-12'>
                <div className="fullwidth-slider">
                  <div className="heading-left p-b-20 heading-flex"><h2 className="m-b-30">SaaS Startups</h2> <span><a href="#">View all</a></span></div>
                  <CardSliderOne />
                </div>
              </div>
            </div>
          </div>
        </section>

         <section className='slider-wrapper p-b-60'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-12'>
                <div className="fullwidth-slider fullwidth-slider-colo">
                  <div className="heading-left p-b-20 heading-flex"><h2 className="m-b-30">Product Updates</h2> <span className=''><a style={{color:'#fff'}} href="#">View all</a></span></div>
                   <CardSliderTwo />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='slider-wrapper p-b-60'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-12'>
                <div className="fullwidth-slider">
                  <div className="heading-left p-b-20 heading-flex"><h2 className="m-b-30">Enterprise SaaS</h2> <span><a href="#">View all</a></span></div>
                  <CardSliderOne />
                </div>
              </div>
            </div>
          </div>
        </section>

         <section className='slider-wrapper p-b-60'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-12'>
                <div className="fullwidth-slider fullwidth-slider-colo">
                  <div className="heading-left p-b-20 heading-flex"><h2 className="m-b-30">Cloud & AI</h2> <span className=''><a style={{color:'#fff'}} href="#">View all</a></span></div>
                   <CardSliderTwo />
                </div>
              </div>
            </div>
          </div>
        </section>
       
      </div>

    </>
  );
};



export default BlogIndex;
