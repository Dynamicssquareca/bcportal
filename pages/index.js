import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import CardSliderOne from '@/components/CardSliderOne';
import CardSliderTwo from '@/components/CardSliderTwo';
import CardOne from '@/components/CardOne';
import CardTwo from '@/components/CardTwo';

const BlogIndex = ({ posts, categories }) => {

  // CATEGORY FILTER
  const [selectedCategory, setSelectedCategory] =
    useState('all');

  // LOAD MORE
  const [visiblePostsCount, setVisiblePostsCount] =
    useState(6);

  // HERO POST
  const latestPost =
    posts?.[0] || null;

  // SIDE POSTS
  const sidePosts =
    posts?.slice(1, 4) || [];

  // FILTER POSTS
  const filteredPosts =
    selectedCategory === 'all'
      ? posts?.length > 1
        ? posts.slice(1)
        : []
      : posts.filter(
          post =>
            post.category?._id ===
            selectedCategory
        );

  // VISIBLE POSTS
  const visiblePosts =
    filteredPosts.slice(
      0,
      visiblePostsCount
    );

  // IMAGE URL
  const buildImageUrl = (
    baseUrl,
    img
  ) => {

    if (!img) return '';

    if (img.startsWith('http')) {
      return img;
    }

    return `${baseUrl.replace(/\/$/, '')}/${img.replace(/^\//, '')}`;
  };

  // BLOG IMAGE
  const getImageUrl = (img) =>
    buildImageUrl(
      process.env.NEXT_PUBLIC_BLOG_API_Image,
      img
    );

  // PROFILE IMAGE
  const getProfileImageUrl = (img) =>
    buildImageUrl(
      process.env.NEXT_PUBLIC_BLOG_API_Image_profilePics,
      img
    );

  // EXCERPT
  const getExcerpt = (post) => {

    if (post.excerpt) {
      return post.excerpt;
    }

    return '';
  };

  // AUTHOR
  const getAuthorName = (post) =>
    post.author?.name || 'Unknown';

  return (
    <>
      <Head>

        <title>
          Your Trusted Source for
          Microsoft Dynamics News and
          Insights
        </title>

        <meta
          name="description"
          content="Stay updated with the latest Microsoft Dynamics news, expert insights, and in-depth analysis from a trusted independent source."
        />

        <link
          rel="canonical"
          href="https://www.businesscentralpartners.com/"
        />

        <meta
          property="og:locale"
          content="US"
        />

        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:title"
          content="Your Trusted Source for Microsoft Dynamics News and Insights"
        />

        <meta
          property="og:description"
          content="Stay updated with the latest Microsoft Dynamics news, expert insights, and in-depth analysis from a trusted independent source."
        />

        <meta
          property="og:url"
          content="https://www.businesscentralpartners.com/"
        />

        <meta
          property="og:site_name"
          content="Businesscentral"
        />

        <meta
          property="og:image"
          content="https://businesscentralapi.onrender.com/uploads/1763642573840.png"
        />

        <meta
          property="og:image:width"
          content="200"
        />

        <meta
          property="og:image:height"
          content="200"
        />

        <meta
          property="og:image:type"
          content="image/jpeg"
        />

        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:site"
          content="@businesscentral"
        />

        <meta
          name="twitter:title"
          content="Your Trusted Source for Microsoft Dynamics News and Insights"
        />

        <meta
          name="twitter:description"
          content="Stay updated with the latest Microsoft Dynamics news, expert insights, and in-depth analysis from a trusted independent source."
        />

        <meta
          name="twitter:image"
          content="https://businesscentralapi.onrender.com/uploads/1763642573840.png"
        />

      </Head>

      <div className='bc-home-intro'>

        {/* HERO SECTION */}
        <section className="news-section py-5 bg-white">

          <div className="container">

            <div className="row g-4 align-items-stretch">

              {/* HERO */}
              <div className="col-lg-6 d-flex">

                {latestPost && (

                  <Link
                    href={`/${latestPost.slug}`}
                    className="card flex-fill card-001"
                  >

                    <Image
                      src={
                        latestPost.imageUrl
                          ? getImageUrl(
                              latestPost.imageUrl
                            )
                          : `${process.env.NEXT_PUBLIC_SITE_URL}img/erp-f-im.jpg`
                      }
                      alt={latestPost.title}
                      className="img-fluid"
                      width={1200}
                      height={628}
                      priority
                      quality={60}
                    />

                    <div className="card-body d-flex flex-column">

                      <h5 className="fw-bold mb-2 text-dark">
                        {latestPost.title}
                      </h5>

                      <p className="text-muted mb-0">
                        {latestPost.excerpt}
                      </p>

                    </div>

                  </Link>

                )}

              </div>

              {/* SIDE POSTS */}
              <div className="col-lg-6 d-flex flex-column gap-3">

                {sidePosts.map(post => (

                  <Link
                    key={post.slug}
                    href={`/${post.slug}`}
                    className="d-flex align-items-start gap-3 text-decoration-none card-001"
                  >

                    <Image
                      src={
                        post.imageUrl
                          ? getImageUrl(
                              post.imageUrl
                            )
                          : `${process.env.NEXT_PUBLIC_SITE_URL}img/erp-f-im.jpg`
                      }
                      alt={post.title}
                      width={320}
                      height={180}
                      quality={60}
                      loading="lazy"
                      className="rounded-3 object-fit-cover flex-shrink-0"
                    />

                    <div>

                      <h6 className="fw-semibold mb-0 text-dark">
                        {post.title}
                      </h6>

                    </div>

                  </Link>

                ))}

              </div>

            </div>

          </div>

        </section>

        {/* BUSINESS CENTRAL */}
        <section className='slider-wrapper p-b-60'>

          <div className='container'>

            <div className='row'>

              <div className='col-lg-12'>

                <div className="fullwidth-slider-card">

                  <div className="heading-left p-b-20 heading-flex">

                    <h2 className="m-b-30">
                      Business Central
                    </h2>

                    <span>
                      <a href="/category/business-central/">
                        View all
                      </a>
                    </span>

                  </div>

                  <CardOne categoryName="Business Central" />

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* PRODUCT UPDATES */}
        <section className='slider-wrapper p-b-60'>

          <div className='container'>

            <div className='row'>

              <div className='col-lg-12'>

                <div className="fullwidth-slider fullwidth-slider-colo">

                  <div className="heading-left p-b-20 heading-flex">

                    <h2 className="m-b-30">
                      Product Updates
                    </h2>

                    <span>
                      <a
                        style={{
                          color: '#fff'
                        }}
                        href="/category/"
                      >
                        View all
                      </a>
                    </span>

                  </div>

                  <CardSliderTwo />

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* CTA */}
        <section className='new-cta m-b-60'>

          <div className='container'>

            <div className='row'>

              <div className='col-lg-4'>

                <div className='cta-left'>

                  <h3>
                    Subscribe to
                  </h3>

                  <p>
                    Latest industry news,
                    analysis and valuable
                    insights
                  </p>

                  <a
                    href="#subscribe"
                    className='my-btn'
                  >
                    Subscribe Now
                  </a>

                </div>

              </div>

              <div className='col-lg-8'>

                <div className='cta-right'>

                  <img
                    src="/img/cta-bg.png"
                    alt="cta-bg"
                  />

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* CLOUD & AI */}
        <section className='slider-wrapper p-b-60'>

          <div className='container'>

            <div className='row'>

              <div className='col-lg-12'>

                <div className="fullwidth-slider fullwidth-slider-colo">

                  <div className="heading-left p-b-20 heading-flex">

                    <h2 className="m-b-30">
                      Cloud & AI
                    </h2>

                    <span>

                      <a
                        style={{
                          color: '#fff'
                        }}
                        href="/category/"
                      >
                        View all
                      </a>

                    </span>

                  </div>

                  <CardTwo />

                </div>

              </div>

            </div>

          </div>

        </section>

      </div>
    </>
  );
};

// STATIC PROPS
export async function getStaticProps() {

  const blogApi =
    process.env.NEXT_PUBLIC_BLOG_API_URL;

  const categoryApi =
    process.env.NEXT_PUBLIC_CATEGORY_API_URL;

  try {

    const [
      blogRes,
      categoryRes
    ] = await Promise.all([
      fetch(blogApi),
      fetch(categoryApi)
    ]);

    if (!blogRes.ok) {
      throw new Error(
        'Failed to fetch posts'
      );
    }

    // RAW POSTS
    const rawPosts =
      await blogRes.json();

    // OPTIMIZED POSTS
    const posts = rawPosts
      .map(post => ({

        _id: post._id ?? null,

        slug: post.slug ?? '',

        title: post.title ?? '',

        excerpt: post.excerpt ?? '',

        imageUrl: post.imageUrl ?? null,

        createdAt: post.createdAt ?? null,

        author: {
          name:
            post.author?.name ?? '',
          slug:
            post.author?.slug ?? '',
        },

        category: post.category
  ? {
      _id:
        post.category?._id ?? null,

      name:
        post.category?.name ?? '',

      slug:
        post.category?.slug ?? '',
    }
  : null

      }))
      .sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      );

    // OPTIMIZED CATEGORIES
    let categories = [];

    if (categoryRes.ok) {

      categories =
        (
          await categoryRes.json()
        ).map(cat => ({
          _id: cat._id,
          name: cat.name,
          slug: cat.slug
        }));

    }

    return {

      props: {
        posts,
        categories
      },

      revalidate: 60

    };

  } catch (err) {

    console.error(
      'Error fetching data:',
      err
    );

    return {

      props: {
        posts: [],
        categories: []
      },

      revalidate: 60

    };

  }
}

export default BlogIndex;