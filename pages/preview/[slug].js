import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import parse from 'html-react-parser';

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

const BlogPost = ({ post, relatedPosts, relatedHeading, categories, error }) => {
  const router = useRouter();
  const [activeHeading, setActiveHeading] = useState(null);

  if (router.isFallback) {
    return <div className="container py-5">Loading...</div>;
  }
  if (!post) return <p>Post not found</p>;

  const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL}blog/${post.slug}/`;

  const getImageUrl = (img) => {
    if (!img) return '';
    if (img.startsWith('http')) return img;
    return `${process.env.NEXT_PUBLIC_BLOG_API_Image.replace(/\/$/, '')}/${img.replace(/^\//, '')}`;
  };

  // Build modified content with injected h2 IDs and construct TOC using custom ID format (tb-XX)
  const { modifiedContent, tableOfContents } = useMemo(() => {
    let toc = [];
    let count = 0;
    const contentWithIds = post.content.replace(/<h2>(.*?)<\/h2>/g, (match, p1) => {
      count++;
      const id = `tb-${count.toString().padStart(2, '0')}`; // e.g. tb-01, tb-02...
      toc.push({ id, title: p1 });
      return `<h2 id="${id}">${p1}</h2>`;
    });
    return { modifiedContent: contentWithIds, tableOfContents: toc };
  }, [post.content]);

  // Use IntersectionObserver to update the active heading in TOC
  useEffect(() => {
    const headings = document.querySelectorAll('h2[id^="tb-"]');
    if (!headings.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveHeading(entry.target.id);
        }
      });
    }, { rootMargin: '0px 0px -80% 0px' });
    headings.forEach(heading => observer.observe(heading));
    return () => {
      headings.forEach(heading => observer.unobserve(heading));
    };
  }, [modifiedContent]);


  // Use html-react-parser to convert <img> tags inside post content to Next.js <Image> components.
  const options = {
    replace: domNode => {
      if (domNode.name === 'img') {
        const { src, alt, width, height } = domNode.attribs;
        return (
          <Image
            src={getImageUrl(src)}
            alt={alt || 'Post image'}
            width={width ? parseInt(width) : 800}
            height={height ? parseInt(height) : 400}
            layout="responsive"
          />
        );
      }
    }
  };


  return (
    <>
      <Head>
        <title>{post.metaTitle || post.title}</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content={post.metaDescription || post.excerpt || ''} />
        {post.metaKeywords && <meta name="keywords" content={post.metaKeywords} />}
        <meta property="og:title" content={post.metaTitle || post.title} />
        <meta property="og:description" content={post.metaDescription || post.excerpt || ''} />
        <meta
          property="og:image"
          content={
            post.metaimage
              ? getImageUrl(post.metaimage)
              : `${process.env.NEXT_PUBLIC_SITE_URL}img/banner/home-main-banner.png`
          }
        />
        <link rel="canonical" href={canonicalUrl} />
      </Head>




      <section className='bg--bb'>
        <div className="container crm-blog-head">
          {/* Breadcrumb */}
          <div className="breadcrumb-list">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link href="/">Home</Link></li>
              <li className="breadcrumb-item"><a href="/blog">Blog</a></li>
              <li className="breadcrumb-item active" aria-current="page">{post.readtimes || ' '} min reading in  — {post.category && post.category.slug ? (
                <Link href={`/blog/category/${post.category.slug}`}><span>{post.category.title}</span></Link>
              ) : (
                "Uncategorized"
              )}</li>
            </ol>
          </div>
          <div className="row">
            {/* Main Content (8 columns) */}
            <div className="col-lg-8">
              <div className='main-section p-30'>
                {/* Post Header */}
                <div className='blog-head'>
                  <h1>{post.title}</h1>
                  <div className='combo-sect'>
                    <div className="d-flex blog-author">
                      <span>
                        By <Link href={`/blog/author/${post.author.slug || post.author._id}`}>{post.author.name}</Link>
                      </span>
                      <span className="mx-2">|</span>
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                    <div className="mb-4 post-sharing">
                      <span>Share: </span>
                      <Link href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonicalUrl)}`}>Facebook</Link>
                      {" | "}
                      <Link href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(canonicalUrl)}`}>Twitter</Link>
                      {" | "}
                      <Link href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(canonicalUrl)}`}>LinkedIn</Link>
                    </div>
                  </div>
                </div>
                {post.banner && (
                  <div className='post-feture-image'>
                    <Image
                      src={getImageUrl(post.banner)}
                      alt={post.title}
                      width={800}
                      height={400}
                      layout="responsive"
                    />
                  </div>
                )}
                {/* <div className="mt-3 post-content-main">
                  {parse(modifiedContent, options)}
                </div> */}
                <div
                  className="mt-3 post-content-main"
                  dangerouslySetInnerHTML={{ __html: modifiedContent }}
                  suppressHydrationWarning={true}
                />
                {/* Author Profile Card */}
                <div className="card card-avt my-5">
                  <div className="card-body">
                    <Link href={`/blog/author/${post.author.slug || post.author._id}`}>
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
                </div>
                {/* Related Posts Section */}

              </div>
            </div>
            {/* Sidebar (4 columns): Table of Contents & Categories */}
            <div className="col-lg-4">
              <div className='po-sticky'>
                <div className="sidebars">
                  {tableOfContents.length >= 3 && (
                    <>
                      <h3>Table of Contents</h3>
                      <ol className="list-group-tb mb-4">
                        {tableOfContents.map(item => (
                          <li key={item.id} className={` ${activeHeading === item.id ? 'active' : ''}`}>
                            <a
                              href={`#${item.id}`}
                              onClick={e => {
                                e.preventDefault();
                                const element = document.getElementById(item.id);
                                if (element) {
                                  const yOffset = -250; // adjust offset value as needed
                                  const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                                  window.scrollTo({ top: y, behavior: 'smooth' });
                                }
                              }}
                            >{item.title}</a>
                          </li>
                        ))}
                      </ol>
                    </>
                  )}
                  <h3>Categories</h3>
                  {categories && categories.length > 0 ? (
                    <ul className="list-group-tba">
                      {categories.map(cat => (
                        <li key={cat._id} className="list-group-cu">
                          <Link href={`/blog/category/${cat.slug || cat.title.toLowerCase().replace(/\s+/g, '-')}`}>
                            {cat.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No categories available.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <h3 className='relted-head'>{relatedHeading}</h3>
            </div>
            {relatedPosts && relatedPosts.length > 0 ? (
              relatedPosts.map(rp => (
                <div key={rp.slug} className="col-lg-4 mb-4">
                  <div className="card h-100 card-222">
                    <div className='card-image-p'>
                      {rp.banner && (
                        <Link href={`/blog/${rp.slug}`}>
                          <Image
                            src={getImageUrl(rp.banner)}
                            alt={rp.title}
                            className="card-img-top"
                            width={768}
                            height={402}
                          />
                        </Link>
                      )}
                      <div className='cate-overl'>
                        {post.category && post.category.slug ? (

                          <Link href={`/blog/category/${post.category.slug}`}><span>{post.category.title}</span></Link>
                        ) : (
                          "Uncategorized"
                        )}
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="d-flex blog-author">
                        <span>
                          <Link href={`/blog/author/${rp.author.slug || rp.author._id}`}>{rp.author.name}</Link>
                        </span>
                        <span className="mx-2">|</span>
                        <span>{formatDate(rp.createdAt)}</span>
                        <span className="mx-2">|</span>
                        <span>{rp.readtimes || ' '}m Reading</span>
                      </div>
                      <Link href={`/blog/${rp.slug}`}>
                        <h5 className="card-title">{rp.title}</h5>
                      </Link>
                      <p className="card-text">
                        {rp.excerpt.slice(0, 50) + '...' || rp.content.replace(/<[^>]+>/g, '').slice(0, 50) + '...'}
                      </p>
                      <Link href={`/blog/${rp.slug}`}>Read More</Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No related posts found. Check out some random posts instead.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export async function getStaticPaths() {
  const blogApi = process.env.NEXT_PUBLIC_BLOG_API_URL;
  try {
    const res = await fetch(blogApi);
    const posts = await res.json();
    const paths = posts.map(post => ({
      params: { slug: post.slug }
    }));
    return { paths, fallback: true };
  } catch (err) {
    console.error(err);
    return { paths: [], fallback: true };
  }
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const blogApi = process.env.NEXT_PUBLIC_BLOG_PREVIEW_API_URL;
  const categoryApi = process.env.NEXT_PUBLIC_CATEGORY_API_URL;
  try {
    const postRes = await fetch(`${blogApi}/${slug}`);
    if (!postRes.ok) throw new Error('Failed to fetch post');
    const post = await postRes.json();

    const allRes = await fetch(blogApi);
    let allPosts = [];
    if (allRes.ok) {
      allPosts = await allRes.json();
    }
    const sameCategoryPosts = allPosts.filter(
      p => p.category._id === post.category._id && p._id !== post._id
    );
    let relatedPosts = [];
    let relatedHeading = '';
    if (sameCategoryPosts.length > 0) {
      relatedHeading = 'Related Posts';
      relatedPosts = sameCategoryPosts.slice(0, 3);
    } else {
      relatedHeading = 'Random Posts';
      const randomPosts = allPosts.filter(p => p._id !== post._id);
      relatedPosts = randomPosts.slice(0, 3);
    }

    // Fetch categories for the sidebar
    const catRes = await fetch(categoryApi);
    let categories = [];
    if (catRes.ok) {
      categories = await catRes.json();
    }

    return { props: { post, relatedPosts, relatedHeading, categories }, revalidate: 10 };
  } catch (err) {
    console.error(err);
    return { props: { post: null, error: true, relatedPosts: [], categories: [] }, revalidate: 10 };
  }
}

export default BlogPost;
