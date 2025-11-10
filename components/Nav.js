import React, { useState } from 'react';

import { Offcanvas, OffcanvasHeader, OffcanvasBody } from 'reactstrap';
import DropdownComponent from '@/components/DropdownComponent';
import ModelBoxGetstatrd from './ModelBoxGetstatrd';
import BlogSearch from './BlogSearch';
import MobileSearchBar from './MobileSearchBar';
const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggles = () => setIsOpen(!isOpen);
  // const [dropdownOpen, setDropdownOpen] = useState(false);
  // const toggles = () => setDropdownOpen(!dropdownOpen);

  const servicesItems = [
    { label: 'Item-1', href: '/' },
    { label: 'Item-2', href: '/' },
    { label: 'Item-3', href: '/' },
    { label: 'Item-4', href: '/' },
    { label: 'Item-5', href: '/' },
    { label: 'Item-6', href: '/' },
  ];

  const solutionsItems = [
    { label: 'Item-1', href: '/' },
    { label: 'Item-2', href: '/' },
    { label: 'Item-3', href: '/' },
    { label: 'Item-4', href: '/' },
    { label: 'Item-5', href: '/' },
    { label: 'Item-6', href: '/' },
  ];

  const resourceItems = [
    { label: 'About Us', href: '/about-us/' },
    { label: 'Blogs', href: '/blogs/' },
    { label: 'Why Us', href: '/why-us/' },
    { label: 'Partners', href: '/partner/' },
    { label: 'Careers', href: '/career/' },
  ];




  return (

    <>
      <nav id="navbar" className="navbar">
        <ul>
          
          <li className="dropdown"><a href="/memorials/"><span>Log In</span> <i className="bi bi-chevron-down"></i></a>
            <ul>
              <li><a href="#">Susil</a></li>
              <li><a href="/memorials/angel-headstone/">Dashboard</a></li>
              <li><a href="/memorials/headstones/">Settings</a></li>
              <li><a href="/memorials/urns/">Sign Out</a></li>
            </ul>
          </li>
        </ul>
        <div className='serc-nav'>
           <BlogSearch />
           {/* <MobileSearchBar /> */}
        </div>

        <i className="bi bi-list mobile-nav-toggle" onClick={toggles}></i>
        <div className='navbar-mobile'>
          <Offcanvas isOpen={isOpen} toggle={toggles} className='navbar-mobile'>
            <OffcanvasHeader toggle={toggles}>
              <div className='mobile-logo'>
                <a href="/"><img img src="/log-white.png" alt="bc-partner-logo" width={150}  /></a>
              </div>
            </OffcanvasHeader>
            <OffcanvasBody>

              <ul>

                {/* <DropdownComponent id="servicesDropdown" label="Drop Down" items={servicesItems} />
                <DropdownComponent id="solutionsDropdown" label="Drop Down" items={solutionsItems} /> */}
                {/* <DropdownComponent label="Resources" items={resourceItems} /> */}
                <li><a className="nav-link scrollto" href="/about-us/">About US</a></li>
                <li><a className="nav-link" href="/blog/">Blogs</a></li>
                {/* <Dropdown nav isOpen={dropdownOpen} toggle={toggles}>
                  <DropdownToggle nav caret>
                    Resources
                  </DropdownToggle>
                  <DropdownMenu>
                    <ul>
                      <li><a href="/about-us/">About Us</a></li>
                      <a href="/why-us/">Why Us</a>
                      <a href="/partner/">Partners</a>
                      <a href="/career/">Careers</a>
                    </ul>
                  </DropdownMenu>
                </Dropdown> */}

                {/* <li className="dropdown"><a href="#"><span>Resources</span> <i className="bi bi-chevron-down"></i></a>
                  <ul>
                    <li><a href="/about-us/">About Us</a></li>
                    <a href="/why-us/">Why Us</a>
                    <a href="/partner/">Partners</a>
                    <a href="/career/">Careers</a>
                  </ul>
                  
                </li> */}
                <li><a className="nav-link scrollto" href="/contact-us/">Contact Us</a></li>

              </ul>

            </OffcanvasBody>
          </Offcanvas>
        </div>
      </nav>


    </>
  );
}

export default Nav;
