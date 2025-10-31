import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
const Index = () => {
    return (
        <>
            <Head>
                <title>My App</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>

            <div className='blog-hero'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-xl-6 align-self-center'>
                            <div className='blog-lates-card-one'>
                                <span>Latest</span>
                                <Link href="#"><h1>AI From A to Z: The Generative AI Glossary for Business Leaders</h1></Link>
                                <div className='pic-poster-blog'>
                                    <Link href="#">
                                        <Image width={64} height={64} src="/img/icons/user-avt.png" alt="user-avt" />
                                        <div className='av-info'>
                                            <div className='av-name'>Ashley Eusanio</div>
                                            <div className='av-date'>June 29, 2023 | 17 min read</div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='col-xl-6 text-center'>
                            <img src="/img/sdie-pop.png" alt="" />
                        </div>

                    </div>
                </div>
            </div>
            <section className='p-top-60 p-bottom-60'>
                <div className="container">
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className="blog-section-title">
                                <h2>Browse by Category</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-12 p-0">
                            <Swiper
                                slidesPerView={1}
                                spaceBetween={10}
                                pagination={{
                                    clickable: true,
                                }}
                                breakpoints={{
                                    640: {
                                        slidesPerView: 1
                                    },
                                    768: {
                                        slidesPerView: 2
                                    },
                                    1024: {
                                        slidesPerView: 2
                                    },
                                    1200: {
                                        slidesPerView: 4
                                    },
                                }}
                                modules={[Pagination]}
                                className="mySwiper mySwiperNew"
                            >
                                <SwiperSlide>
                                    <div className='blog-category-card-one'>
                                        <Link href="#">
                                            <div><img src="/img/icons/icons-01.png" alt="icons" /></div>
                                            <span>Sales</span>
                                        </Link>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className='blog-category-card-one'>
                                        <Link href="#">
                                            <div><img src="/img/icons/icons-02.png" alt="icons" /></div>
                                            <span>Artificial Intelligence</span>
                                        </Link>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className='blog-category-card-one'>
                                        <Link href="#">
                                            <div><img src="/img/icons/icons-03.png" alt="icons" /></div>
                                            <span>Marketing</span>
                                        </Link>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className='blog-category-card-one'>
                                        <Link href="#">
                                            <div><img src="/img/icons/icons-04.png" alt="icons" /></div>
                                            <span>Customer Engagement</span>
                                        </Link>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className='blog-category-card-one'>
                                        <Link href="#">
                                            <div><img src="/img/icons/icons-05.png" alt="icons" /></div>
                                            <span>Commerce</span>
                                        </Link>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className='blog-category-card-one'>
                                        <Link href="#">
                                            <div><img src="/img/icons/icons-01.png" alt="icons" /></div>
                                            <span>Sales</span>
                                        </Link>
                                    </div>
                                </SwiperSlide>

                            </Swiper>
                        </div>
                    </div>
                </div>
            </section>
            <section className='p-top-30 p-bottom-60'>
                <div className="container">
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className="blog-section-title">
                                <h2>Most recent</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className='col-lg-4'>
                            <div className='card-blog-02'>
                                <div className="card-title">
                                    <Link href="#">
                                        <img src="/img/frame-12x.webp" alt="" />
                                        <h3>3 Ways Generative AI Will Help Small Businesses Sell Smarter</h3>
                                    </Link>
                                </div>
                                <div className='card-post-ava'>
                                    <Link href="#">
                                        <Image width={44} height={44} src="/img/icons/user-avt.png" alt="user-avt" />
                                        <div className='av-info'>
                                            <div className='av-name-a'>Ashley Eusanio</div>
                                            <div className='av-date-b'>June 29, 2023 | 17 min read</div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4'>
                            <div className='card-blog-02'>
                                <div className="card-title">
                                    <Link href="#">
                                        <img src="/img/frame-12x.webp" alt="" />
                                        <h3>3 Ways Generative AI Will Help Small Businesses Sell Smarter</h3>
                                    </Link>
                                </div>
                                <div className='card-post-ava'>
                                    <Link href="#">
                                        <Image width={44} height={44} src="/img/icons/user-avt.png" alt="user-avt" />
                                        <div className='av-info'>
                                            <div className='av-name-a'>Ashley Eusanio</div>
                                            <div className='av-date-b'>June 29, 2023 | 17 min read</div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4'>
                            <div className='card-blog-02'>
                                <div className="card-title">
                                    <Link href="#">
                                        <img src="/img/frame-12x.webp" alt="" />
                                        <h3>3 Ways Generative AI Will Help Small Businesses Sell Smarter</h3>
                                    </Link>
                                </div>
                                <div className='card-post-ava'>
                                    <Link href="#">
                                        <Image width={44} height={44} src="/img/icons/user-avt.png" alt="user-avt" />
                                        <div className='av-info'>
                                            <div className='av-name-a'>Ashley Eusanio</div>
                                            <div className='av-date-b'>June 29, 2023 | 17 min read</div>
                                        </div>
                                    </Link>
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
