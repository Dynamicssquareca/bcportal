import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Nav from './Nav';
import Image from 'next/image';
import CategoryNav from './CategoryNav';

const Header = () => {
    const [isFixed, setIsFixed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > 100) { // Adjust this value as needed
            setIsFixed(true);
          } else {
            setIsFixed(false);
          }
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);


    return (
        <>
            {/* <header id="header" className={`header ${isFixed ? 'fixed header-scrolled' : ''}`}> */}
              <div className='fixed-header'>
                <header id="header" className="header">
                <div className="container p-d-20 d-flex align-items-center justify-content-between">
                    <a href="/" className="logo d-flex align-items-center">
                        <Image src="/bc-partner-logo.png" alt="bc-partner-logo" width={180} height={49} />
                    </a>
                    <Nav />
                   
                </div>
            </header>
             <CategoryNav />
              </div>
        </>
    );
}

export default Header;
