import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Nav from './Nav';
import Image from 'next/image';

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
            <header id="header" className={`header ${isFixed ? 'fixed header-scrolled' : ''}`}>
                <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
                    <a href="/" className="logo d-flex align-items-center">
                        <Image src="/stone-logo.png" alt="stone-logo" width={200} height={30} />
                    </a>
                    <Nav />
                </div>
            </header>
        </>
    );
}

export default Header;
