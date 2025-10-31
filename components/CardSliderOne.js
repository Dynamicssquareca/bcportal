

import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import Image from 'next/image';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';



// import required modules
import { Pagination } from 'swiper/modules';

const CardSliderOne = () => {
    return (
        <div>
            <>
                <Swiper
                    slidesPerView={4}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <div className='card-2'>
                            <Link
                                href="#"
                                className=""
                            >
                                <Image
                                    src="/img/demo-2.jpg"
                                    alt="News 1"
                                    width={320}
                                    height={80}
                                    className="rounded-3 object-fit-cover flex-shrink-0"
                                />
                                <h5>Daily Manufacturing News Digest – the industry stories you should be aware of today</h5>

                            </Link>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='card-2'>
                            <Link
                                href="#"
                                className=""
                            >
                                <Image
                                    src="/img/demo-2.jpg"
                                    alt="News 1"
                                    width={320}
                                    height={80}
                                    className="rounded-3 object-fit-cover flex-shrink-0"
                                />
                                <h5>Daily Manufacturing News Digest – the industry stories you should be aware of today</h5>

                            </Link>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='card-2'>
                            <Link
                                href="#"
                                className=""
                            >
                                <Image
                                    src="/img/demo-2.jpg"
                                    alt="News 1"
                                    width={320}
                                    height={80}
                                    className="rounded-3 object-fit-cover flex-shrink-0"
                                />
                                <h5>Daily Manufacturing News Digest – the industry stories you should be aware of today</h5>

                            </Link>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='card-2'>
                            <Link
                                href="#"
                                className=""
                            >
                                <Image
                                    src="/img/demo-2.jpg"
                                    alt="News 1"
                                    width={320}
                                    height={80}
                                    className="rounded-3 object-fit-cover flex-shrink-0"
                                />
                                <h5>Daily Manufacturing News Digest – the industry stories you should be aware of today</h5>

                            </Link>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='card-2'>
                            <Link
                                href="#"
                                className=""
                            >
                                <Image
                                    src="/img/demo-2.jpg"
                                    alt="News 1"
                                    width={320}
                                    height={80}
                                    className="rounded-3 object-fit-cover flex-shrink-0"
                                />
                                <h5>Daily Manufacturing News Digest – the industry stories you should be aware of today</h5>

                            </Link>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='card-2'>
                            <Link
                                href="#"
                                className=""
                            >
                                <Image
                                    src="/img/demo-2.jpg"
                                    alt="News 1"
                                    width={320}
                                    height={80}
                                    className="rounded-3 object-fit-cover flex-shrink-0"
                                />
                                <h5>Daily Manufacturing News Digest – the industry stories you should be aware of today</h5>

                            </Link>
                        </div>
                    </SwiperSlide>

                </Swiper>
            </>
        </div>
    );
}

export default CardSliderOne;

