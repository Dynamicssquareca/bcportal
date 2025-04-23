import React, { useState, useRef } from 'react';
import Head from 'next/head';

export default function Home() {




  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>

      <div className='hero-banner-one' style={{ backgroundImage: 'url("/img/banner/hero-banner-01.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' ,backgroundRepeat: 'no-repeat' }}>
        <div className='container'>
          <div className='row align-items-center justify-content-center'>
            <div className='col-lg-9 text-center'>
              <div className='hero-banner-content'>
                <h1>Welcome to <span>Stone Discover</span> UK</h1>
                <p>We specialize in creating premium quality memorial headstones and gravestones using the finest granite</p>
                <div className='hero-banner-btn'>
                <a className='btn btn-three'>Get Quotes</a>
                <a className='btn bbtn-transparent'>Request Catalogue</a>
                </div>
                
              </div>
            </div>
          </div>
        </div>

      </div>



    </>
  );
}
