

import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import Image from 'next/image';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';



// import required modules
import { Navigation } from 'swiper/modules';

const CardSliderOne = () => {

    const prevRef = useRef(null);
    const nextRef = useRef(null);


    return (
        <div>
            <>
                <Swiper
                    slidesPerView={3.5}
                    spaceBetween={30}
                    modules={[Navigation]}
                    onBeforeInit={(swiper) => {
                        // Attach navigation dynamically
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                    }}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    breakpoints={{
                        0: { slidesPerView: 1.2, spaceBetween: 15 },
                        768: { slidesPerView: 2.2, spaceBetween: 20 },
                        992: { slidesPerView: 3.5, spaceBetween: 24 },
                    }}
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
                                <h5>New report warns skills shortages threaten circular economy progress</h5>

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
                                <h5>Pennine Healthcare welcomes students to explore careers in healthcare manufacturing</h5>

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
                <div className="slider-nav position-absolute d-flex gap-2 myswip-n" style={{ right: 30, bottom: "30px" }}>
                    <button ref={prevRef} className="swiper-prev btn-cc">
                        <i className="bi bi-arrow-left"></i>
                    </button>
                    <button ref={nextRef} className="swiper-next  btn-cc">
                        <i className="bi bi-arrow-right"></i>
                    </button>
                </div>
            </>
        </div>
    );
}

export default CardSliderOne;

