import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import CardSliderOne from '@/components/CardSliderOne';
import CardSliderTwo from '@/components/CardSliderTwo';



const BlogIndex = ({ posts, categories }) => {

  // "All" is default; visiblePostsCount controls "Load More"
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [visiblePostsCount, setVisiblePostsCount] = useState(6);

  // Hero: first post; Most Recent: rest of posts (filtered if category selected)
  const latestPost = posts.length > 0 ? posts[0] : null;
  const sidePosts = posts.slice(1, 4);
  const filteredPosts =
    selectedCategory === "all"
      ? posts.length > 1 ? posts.slice(1) : []
      : posts.filter(post => post.category && post.category._id === selectedCategory);
  const visiblePosts = filteredPosts.slice(0, visiblePostsCount);

  const buildImageUrl = (baseUrl, img) => {
    if (!img) return '';
    if (img.startsWith('http')) return img;
    return `${baseUrl.replace(/\/$/, '')}/${img.replace(/^\//, '')}`;
  };

  const getImageUrl = (img) =>
    buildImageUrl(process.env.NEXT_PUBLIC_BLOG_API_Image, img);

  const getProfileImageUrl = (img) =>
    buildImageUrl(process.env.NEXT_PUBLIC_BLOG_API_Image_profilePics, img);

  const getExcerpt = (post) => {
    if (post.excerpt) return post.excerpt;
    if (post.content) {
      const plainText = post.content.replace(/<[^>]+>/g, '');
      return plainText.slice(0, 150) + (plainText.length > 150 ? '...' : '');
    }
    return '';
  };


  const getAuthorName = (post) =>
    post.author && post.author.name ? post.author.name : 'Unknown';

  // Helper function to limit the title to a specific character count (default 50)
  // const limitTitle = (title, limit = 50) => {
  //   return title.length > limit ? title.substring(0, limit) + '...' : title;
  // };



  const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL}blog/`;



  return (
    <>
      <Head>
        <title>Wholesale Memorial Headstones Guides | Stone Discover UK</title>
        <meta
          name="description"
          content="Explore wholesale memorial headstone guides with Stone Discover UK. Resources for funeral trade, stonemasons & retailers to choose the best."
        />
        <link rel="canonical" />
      </Head>
      <div className='bc-home-intro'>
        <section className="news-section py-5 bg-white">
          <div className="container">
            <div className="row g-4 align-items-stretch">
              {/* Left: Main Article */}




              <div className="col-lg-6 d-flex">
                {latestPost && (
                  <Link
                    href={`${latestPost.slug}`}
                    className="card flex-fill card-001"
                  >
                    <Image src={
                      latestPost.imageUrl
                        ? getImageUrl(latestPost.imageUrl)
                        : `${process.env.NEXT_PUBLIC_SITE_URL}img/erp-f-im.jpg`
                    } alt={latestPost.title} className="img-fluid" width={1200} height={628} priority />
                    <div className="card-body d-flex flex-column">
                      <h5 className="fw-bold mb-2 text-dark">
                        {latestPost.title}
                      </h5>
                      <p className="text-muted mb-0" >
                        {latestPost.excerpt}
                      </p>
                    </div>
                  </Link>
                )}
              </div>

              {/* Right: Side Articles */}
              <div className="col-lg-6 d-flex flex-column gap-3">
                {sidePosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={post.slug}
                    className="d-flex align-items-start gap-3 text-decoration-none card-001"
                  >
                    <Image
                      src={
                        post.imageUrl
                          ? getImageUrl(post.imageUrl)
                          : `${process.env.NEXT_PUBLIC_SITE_URL}img/erp-f-im.jpg`
                      }
                      alt={post.title}
                      width={320}
                      height={80}
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

        <section className='slider-wrapper p-b-60'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-12'>
                <div className="fullwidth-slider">
                  <div className="heading-left p-b-20 heading-flex"><h2 className="m-b-30">SaaS Startups</h2> <span><a href="/blog-details/">View all</a></span></div>
                  <CardSliderOne
                    categoryName="Business Central"
                 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='slider-wrapper p-b-60'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-12'>
                <div className="fullwidth-slider fullwidth-slider-colo">
                  <div className="heading-left p-b-20 heading-flex"><h2 className="m-b-30">Product Updates</h2> <span className=''><a style={{ color: '#fff' }} href="#">View all</a></span></div>
                  <CardSliderTwo />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='slider-wrapper p-b-60'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-12'>
                <div className="fullwidth-slider">
                  <div className="heading-left p-b-20 heading-flex"><h2 className="m-b-30">Enterprise SaaS</h2> <span><a href="#">View all</a></span></div>
                  <CardSliderOne  categoryName="Business Central" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='slider-wrapper p-b-60'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-12'>
                <div className="fullwidth-slider fullwidth-slider-colo">
                  <div className="heading-left p-b-20 heading-flex"><h2 className="m-b-30">Cloud & AI</h2> <span className=''><a style={{ color: '#fff' }} href="#">View all</a></span></div>
                  <CardSliderTwo />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='new-cta m-b-60'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-4'>
                <div className='cta-left'>
                  <h3>Subscribe to</h3>
                  <p>Latest industry news, analysis  and valuable insights</p>
                  <a href="#subscribe" className='my-btn'>Subscribe Now</a>
                </div>
              </div>
              <div className='col-lg-8'>
                <div className='cta-right'>
                  <img src="/img/cta-bg.png" alt="cta-bg" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='slider-wrapper p-b-60'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-12'>
                <div className="fullwidth-slider">
                  <div className="heading-left p-b-20 heading-flex"><h2 className="m-b-30">Enterprise SaaS</h2> <span><a href="#">View all</a></span></div>
                  <CardSliderOne />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='slider-wrapper p-b-60'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-12'>
                <div className="fullwidth-slider fullwidth-slider-colo">
                  <div className="heading-left p-b-20 heading-flex"><h2 className="m-b-30">Cloud & AI</h2> <span className=''><a style={{ color: '#fff' }} href="#">View all</a></span></div>
                  <CardSliderTwo />
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

    </>
  );
};



export async function getStaticProps() {
  const blogApi = process.env.NEXT_PUBLIC_BLOG_API_URL;
  const categoryApi = process.env.NEXT_PUBLIC_CATEGORY_API_URL;
  try {
    const [blogRes, categoryRes] = await Promise.all([fetch(blogApi), fetch(categoryApi)]);
    if (!blogRes.ok) throw new Error('Failed to fetch posts');
    const posts = await blogRes.json();
    posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    let categories = [];
    if (categoryRes.ok) {
      categories = await categoryRes.json();
    }
    return { props: { posts, categories }, revalidate: 60 };
  } catch (err) {
    console.error('Error fetching data:', err);
    return { props: { posts: [], categories: [] }, revalidate: 60 };
  }
}

export default BlogIndex;
