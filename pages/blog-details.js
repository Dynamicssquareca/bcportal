import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import parse from 'html-react-parser';


const BlogPost = () => {


  return (
    <>
      <Head>
        <title>Blog test</title>

      </Head>




      <section className='bg--bb'>
        <div className="container crm-blog-head">
          {/* Breadcrumb */}

          <div className="row">
            {/* Main Content (8 columns) */}
            <div className="col-lg-8">
              <div className='main-section p-30'>
                {/* Post Header */}
                <div className='blog-head'>
                  <h1>Daily Manufacturing News Digest – the industry stories you should be aware of today</h1>
                  <div className='combo-sect'>
                    <div className="d-flex blog-author">
                      <span>
                        By Nish Patrick
                      </span>
                      <span className="mx-2">|</span>
                      <span>11/09/2025</span>
                    </div>
                    <div className="mb-4 post-sharing">
                      <span>Share: </span>
                      <Link href={`https://www.facebook.com/sharer/sharer.php?u=}`}>Facebook</Link>
                      {" | "}
                      <Link href={`https://twitter.com/intent/tweet?url=}`}>Twitter</Link>
                      {" | "}
                      <Link href={`https://www.linkedin.com/shareArticle?mini=true&url=}`}>LinkedIn</Link>
                    </div>
                  </div>
                </div>

                <div className='post-feture-image'>
                  <Image
                    src="/img/demo-1.jpg"
                    alt=""
                    width={800}
                    height={400}
                    priority // Ensures faster loading for LCP
                    quality={75} // Reduce image size
                    loading="eager" // Load immediately
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                </div>

                {/* <div className="mt-3 post-content-main">
                  {parse(modifiedContent, options)}
                </div> */}
                <div
                  className="mt-3 post-content-main">
                  <p>Wendy Graham is the first woman Plant Manager in the 97 years of Ford’s iconic Dagenham site, oming 57 years after its women factory workers famously went on strike in a demand for equal…</p>
                  <p>In this week's Microsoft Dynamics Partner News Roundup:
                    Dynamics Square UK helps safety equipment manufacturer automate core processes using Microsoft Dynamics 365 ERP
                    Order Fulfillment Worksheet for Business Central released</p>
                  <p>Strategix acquires Youngblood Consulting to strengthen data automation, business intelligence capabilities
                    Nine resellers join Insight Works to boost Business Central integration
                    Dynamics Square UK helps safety equipment manufacturer automate core processes using Microsoft Dynamics 365 ERP
                    Dynamics Square UK recently set up Dynamics 365 Business Central for a major safety equipment manufacturer. This helped the company automate important day-to-day tasks and run its production process more efficiently.
                    “The PPE manufacturing industry requires a perfect blend of efficiency, compliance, and safety," said Nitesh Sharma, head of business development, Dynamics Square UK. "Our goal was to deliver an intelligent ERP solution that not only streamlines daily operations but also provides actionable data to improve productivity and quality control."</p>
                  <p>This implementation is an important move toward modernizing how things are done in the personal protective equipment (PPE) industry, where accuracy and compliance are critical, according to the companies.
                    Order Fulfillment Worksheet for Business Central released
                    Insight Works, a D365BC ISV, has released a new app called Order Fulfillment Worksheet. This tool helps warehouse teams manage orders more efficiently, focus on orders that can be shipped right away, and automate parts of the fulfillment process.</p>
                  <p>Because it works directly inside D365BC, the order fulfillment worksheet replaces slow, manual steps with faster, data-driven ones, helping teams avoid delays caused by missing stock and keeping shipments moving smoothly, according to the company. With this app, warehouse staff can easily see which orders are ready to go and fulfill them without hassle.</p>
                  <p>"Warehouse teams shouldn't waste time guessing which orders can ship," said Brian Neufeld, director of Marketing at Insight Works. "Order Fulfillment Worksheet gives them a clear answer in seconds, freeing them to focus on getting products out the door."</p>

                  <div className='locked-info'>
                    <div className='icons'>
                      <img src="/img/crown.png" alt="crown" />
                    </div>
                    <div className='info-log'>
                      <h4>FREE Membership Required to View Full Content:</h4>
                      <p>Joining MSDynamicsWorld.com gives you free, unlimited access to news, analysis, white papers, case studies, product brochures, and more. You can also receive periodic email newsletters with the latest relevant articles and content updates. <a href='#'>Learn more about us here</a></p>
                      <div className='d-flex gp-2'>
                        <a href="" className='btn-ascc'>Get FullAccess</a>
                        <a href="" className='normal-link'>Or Login</a>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Author Profile Card */}
                {/* <div className="card card-avt my-5">
                  <div className="card-body">
                    <Link href={`/author/${post.author.slug || post.author._id}`}>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BLOG_API_Image_profilePics.replace(/\/$/, '')}/${post.author.profilePic}`}
                        alt={post.author.name}
                        className="rounded-circle me-3"
                        style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                        width={60}
                        height={60}
                      />
                      <div className='card-avt-det'>
                        <h4>{post.author.name}</h4>
                        <p>{post.author.aboutus}</p>

                      </div>
                    </Link>

                  </div>
                </div> */}
                {/* Related Posts Section */}

              </div>
            </div>
            {/* Sidebar (4 columns): Table of Contents & Categories */}

          </div>

        </div>
      </section>
    </>
  );
};



export default BlogPost;
