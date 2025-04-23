import React, { useState } from 'react';

import { Offcanvas, OffcanvasHeader, OffcanvasBody } from 'reactstrap';
import DropdownComponent from '@/components/DropdownComponent';
import ModelBoxGetstatrd from './ModelBoxGetstatrd';
const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggles = () => setIsOpen(!isOpen);
  // const [dropdownOpen, setDropdownOpen] = useState(false);
  // const toggles = () => setDropdownOpen(!dropdownOpen);

  const servicesItems = [
    { label: 'Salesforce Implementation', href: '/services/salesforce-implementation/' },
    { label: 'Salesforce Customization', href: '/services/salesforce-customization/' },
    { label: 'Salesforce integration', href: '/services/salesforce-integration/' },
    { label: 'Salesforce Training ', href: '/services/salesforce-training/' },
    { label: 'Salesforce Support', href: '/services/salesforce-support/' },
    { label: 'Salesforce Optimization', href: '/services/salesforce-optimization/' },
  ];

  const solutionsItems = [
    { label: 'Small Business', href: '/solutions/salesforce-small-business/' },
    { label: 'Sales Cloud', href: '/solutions/salesforce-sales-cloud/' },
    { label: 'Service Cloud', href: '/solutions/salesforce-service-cloud/' },
    { label: 'Marketing Cloud', href: '/solutions/salesforce-marketing-cloud/' },
    { label: 'Commerce Cloud', href: '/solutions/salesforce-commerce-cloud/' },
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
          {/* <li className="dropdown dropdown-mega"><a href="#"><span>Services</span> <i className="bi bi-chevron-down"></i></a>
            <ul>
              <li>
                <div className='w-500'>
                <a href="/services/salesforce-implementation/">
                  <p>Salesforce Implementation</p>
                  <span>Experienced team, proven methodology, successful implementations</span>
                </a>
                </div>
                <div className='w-500'>
                <a href="/services/salesforce-customization/">
                  <p>Salesforce Customization</p>
                  <span>Deep Salesforce expertise, tailored solutions, flawless integrations</span>
                </a>
                </div>
                <div className='w-500'>
                <a href="/services/salesforce-integration/">
                  <p>Salesforce Integration</p>
                  <span>Salesforce expertise, tailored solutions, flawless integrations</span>
                </a>
                </div>
                <div className='w-500'>
                <a href="/services/salesforce-training/">
                  <p>Salesforce Training</p>
                  <span>Expert training & ongoing support to maximize Salesforce adoption</span>
                </a>
                </div>
                <div className='w-500'>
                <a href="/services/salesforce-support/">
                  <p>Salesforce Support</p>
                  <span>Expert training & ongoing support to maximize Salesforce adoption</span>
                </a>
                </div>
                <div className='w-500'>
                <a href="/services/salesforce-optimization/">
                  <p>Salesforce Optimization</p>
                  <span>Optimize your Salesforce for maximum efficiency and ROI</span>
                </a>
                </div>
              </li>

            </ul>
          </li>
          <li className="dropdown dropdown-mega"><a href="#"><span>Solutions</span> <i className="bi bi-chevron-down"></i></a>
            <ul>
              <li>
                <a href="/solutions/salesforce-small-business/">
                  <p>Small Business</p>
                  <span>Simple solutions to supercharge your small business</span>
                </a>
                <a href="/solutions/salesforce-sales-cloud/">
                  <p>Sales Cloud</p>
                  <span>The #1 CRM for driving sales pipeline & revenue growth</span>
                </a>
                <a href="/solutions/salesforce-service-cloud/">
                  <p>Service Cloud</p>
                  <span>Deliver exceptional customer service & build stronger relationships</span>
                </a>
                <a href="/solutions/salesforce-marketing-cloud/">
                  <p>Marketing Cloud</p>
                  <span>Automate marketing campaigns & personalize customer journeys</span>
                </a>
                <a href="/solutions/salesforce-commerce-cloud/">
                  <p>Commerce Cloud</p>
                  <span>Power your online store & deliver seamless omnichannel experiences</span>
                </a>
              </li>

            </ul>
          </li> */}
          {/* <li><Link className="nav-link scrollto" href="/services/">Services</Link></li> */}
          {/* <li><Link className="nav-link scrollto" href="/solutions/">Solutions</Link></li> */}
          {/* <li><a className="nav-link scrollto" href="/">Industries</a></li> */}
          {/* <li><a className="nav-link scrollto" href="/">Company</a></li> */}
          <li className="dropdown"><a href="#"><span>Tomb Stone</span> <i className="bi bi-chevron-down"></i></a>
            <ul>
              <li><a href="/">Links 1</a></li>
              <li><a href="/">Links 2</a></li>
              <li><a href="/">Links 4</a></li>
              <li><a href="/">Links 5</a></li>
            </ul>
          </li>
          <li><a className="nav-link scrollto" href="/about-us/">About Us</a></li>
          <li><a className="nav-link" href="/">Blogs</a></li> 
          <li><a className="nav-link scrollto" href="/">Contact Us</a></li>
          {/* <li className="dropdown"><a href="#"><span>Drop Down</span> <i className="bi bi-chevron-down"></i></a>
            <ul>
              <li><a href="#">Drop Down 1</a></li>
              <li className="dropdown"><a href="#"><span>Deep Drop Down</span> <i className="bi bi-chevron-right"></i></a>
                <ul>
                  <li><a href="#">Deep Drop Down 1</a></li>
                  <li><a href="#">Deep Drop Down 2</a></li>
                  <li><a href="#">Deep Drop Down 3</a></li>
                  <li><a href="#">Deep Drop Down 4</a></li>
                  <li><a href="#">Deep Drop Down 5</a></li>
                </ul>
              </li>
              <li><a href="#">Drop Down 2</a></li>
              <li><a href="#">Drop Down 3</a></li>
              <li><a href="#">Drop Down 4</a></li>
            </ul>
          </li>

          <li className="dropdown megamenu"><a href="#"><span>Mega Menu</span> <i className="bi bi-chevron-down"></i></a>
            <ul>
              <li>
                <a href="#">Column 1 link 1</a>
                <a href="#">Column 1 link 2</a>
                <a href="#">Column 1 link 3</a>
              </li>
              <li>
                <a href="#">Column 2 link 1</a>
                <a href="#">Column 2 link 2</a>
                <a href="#">Column 3 link 3</a>
              </li>
              <li>
                <a href="#">Column 3 link 1</a>
                <a href="#">Column 3 link 2</a>
                <a href="#">Column 3 link 3</a>
              </li>
              <li>
                <a href="#">Column 4 link 1</a>
                <a href="#">Column 4 link 2</a>
                <a href="#">Column 4 link 3</a>
              </li>
            </ul>
          </li> */}

        </ul>


        <i className="bi bi-list mobile-nav-toggle" onClick={toggles}></i>
        <div className='navbar-mobile'>
          <Offcanvas isOpen={isOpen} toggle={toggles} className='navbar-mobile'>
            <OffcanvasHeader toggle={toggles}>
              <div className='mobile-logo'>
                <a href="/"><img src="/crm_frontier_logo.png" alt="/crm_frontier_logo" /></a>
              </div>
            </OffcanvasHeader>
            <OffcanvasBody>

              <ul>

                <DropdownComponent id="servicesDropdown" label="Services" items={servicesItems} />
                <DropdownComponent id="solutionsDropdown" label="Solutions" items={solutionsItems} />
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


                {/* <li><a className="getstarted-outline" href="/"><div className='call-btn'><i className="bi bi-telephone-fill"></i><div className='call-r'>Give us a call <span>9876 543 210</span></div></div></a></li>
                <li><a className="getstarted scrollto" href="/">Get Started</a></li> */}
              </ul>

            </OffcanvasBody>
          </Offcanvas>
        </div>
      </nav>


    </>
  );
}

export default Nav;
