import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

function formatDate(dateStr) {
  const date = new Date(dateStr);

  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC'
  });
}

const BlogPost = ({
  post,
  relatedPosts,
  relatedHeading,
  categories,
  error
}) => {

  const router = useRouter();

  const [activeHeading, setActiveHeading] =
    useState(null);

  if (router.isFallback) {
    return (
      <div className="container py-5">
        Loading...
      </div>
    );
  }

  if (!post) {
    return <p>Post not found</p>;
  }

  // CANONICAL URL
  const canonicalUrl = post?.slug
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/${post.slug}/`
    : `${process.env.NEXT_PUBLIC_SITE_URL}`;

  // IMAGE URL
  const getImageUrl = (img) => {

    if (!img) return '';

    if (img.startsWith('http')) {
      return img;
    }

    return `${process.env.NEXT_PUBLIC_BLOG_API_Image.replace(/\/$/, '')}/${img.replace(/^\//, '')}`;
  };

  // TOC + ADD IDS
  const {
    modifiedContent,
    tableOfContents
  } = useMemo(() => {

    let toc = [];

    let count = 0;

    const contentWithIds =
      post.content.replace(
        /<h2>(.*?)<\/h2>/g,
        (match, p1) => {

          count++;

          const id =
            `tb-${count
              .toString()
              .padStart(2, '0')}`;

          toc.push({
            id,
            title: p1
          });

          return `<h2 id="${id}">${p1}</h2>`;
        }
      );

    return {
      modifiedContent: contentWithIds,
      tableOfContents: toc
    };

  }, [post?._id]);

  // ACTIVE TOC
  useEffect(() => {

    const headings =
      document.querySelectorAll(
        'h2[id^="tb-"]'
      );

    if (!headings.length) return;

    const observer =
      new IntersectionObserver(
        (entries) => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {
              setActiveHeading(
                entry.target.id
              );
            }

          });

        },
        {
          rootMargin:
            '0px 0px -80% 0px'
        }
      );

    headings.forEach(heading =>
      observer.observe(heading)
    );

    return () => {

      headings.forEach(heading =>
        observer.unobserve(heading)
      );

    };

  }, [modifiedContent]);

  return (
    <>
      <Head>

        <title>
          {post.metaTitle || post.title}
        </title>

        <meta
          name="description"
          content={
            post.metaDescription ||
            post.excerpt ||
            ''
          }
        />

        <link
          rel="canonical"
          href={canonicalUrl}
        />

        {post.metaKeywords && (
          <meta
            name="keywords"
            content={post.metaKeywords}
          />
        )}

        <meta
          property="og:title"
          content={
            post.metaTitle || post.title
          }
        />

        <meta
          property="og:description"
          content={
            post.metaDescription ||
            post.excerpt ||
            ''
          }
        />

        <meta
          property="og:image"
          content={
            post.imageUrl
              ? getImageUrl(post.imageUrl)
              : `${process.env.NEXT_PUBLIC_SITE_URL}img/banner/home-main-banner.png`
          }
        />

        {/* SCHEMA */}
        {post.schema &&
          post.schema.map(
            (scriptContent, index) => (
              <script
                key={index}
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: scriptContent
                }}
              />
            )
          )}

      </Head>

      <section className='bg--bb'>

        <div className="container crm-blog-head">

          {/* BREADCRUMB */}
          <div className="breadcrumb-list">

            <ol className="breadcrumb">

              <li className="breadcrumb-item">
                <Link href="/">
                  Home
                </Link>
              </li>

              <li
                className="breadcrumb-item active"
                aria-current="page"
              >

                {post.category?.[0]?.slug ? (

                  <Link
                    href={`/category/${post.category[0].slug}`}
                  >
                    <span>
                      {post.category[0].name}
                    </span>
                  </Link>

                ) : (
                  "Uncategorized"
                )}

              </li>

            </ol>

          </div>

          <div className="row">

            {/* MAIN CONTENT */}
            <div className="col-lg-8">

              <div className='main-section p-30'>

                {/* HEADER */}
                <div className='blog-head'>

                  <h1>{post.title}</h1>

                  <div className='combo-sect'>

                    <div className="d-flex blog-author">

                      <span>
                        By{" "}
                        <Link
                          href={`/author/${post.author.slug || post.author._id}`}
                        >
                          {post.author.name}
                        </Link>
                      </span>

                      {(post?.scheduleDate ||
                        post?.updatedAt) && (
                        <>
                          <span className="mx-2">
                            |
                          </span>

                          <span>
                            {formatDate(
                              post.scheduleDate ||
                              post.updatedAt
                            )}
                          </span>
                        </>
                      )}

                    </div>

                    {/* SHARE */}
                    <div className="mb-4 post-sharing">

                      <span>
                        Share:
                      </span>

                      <Link
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonicalUrl)}`}
                      >
                        Facebook
                      </Link>

                      {" | "}

                      <Link
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(canonicalUrl)}`}
                      >
                        Twitter
                      </Link>

                      {" | "}

                      <Link
                        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(canonicalUrl)}`}
                      >
                        LinkedIn
                      </Link>

                    </div>

                  </div>

                </div>

                {/* FEATURE IMAGE */}
                {post.imageUrl && (

                  <div className='post-feture-image'>

                    <Image
                      src={getImageUrl(post.imageUrl)}
                      alt={post.title}
                      width={800}
                      height={400}
                      priority
                      quality={60}
                      loading="eager"
                      sizes="(max-width: 768px) 100vw, 800px"
                    />

                  </div>

                )}

                {/* CONTENT */}
                <div
                  className="mt-3 post-content-main"
                  dangerouslySetInnerHTML={{
                    __html: modifiedContent
                  }}
                  suppressHydrationWarning={true}
                />

                {/* AUTHOR CARD */}
                <div className="card card-avt my-5">

                  <div className="card-body">

                    <Link
                      href={`/author/${post.author.slug || post.author._id}`}
                    >

                      <Image
                        src={
                          post.author?.image
                            ? getImageUrl(
                                post.author.image
                              )
                            : "/img/author-defult-pic.png"
                        }
                        alt={
                          post?.author?.name ||
                          'Author'
                        }
                        className="rounded-circle me-3"
                        width={60}
                        height={60}
                        style={{
                          width: '60px',
                          height: '60px',
                          objectFit: 'cover'
                        }}
                      />

                      <div className='card-avt-det'>

                        <h4>
                          {post.author.name}
                        </h4>

                        <p>
                          {post.author.about}
                        </p>

                      </div>

                    </Link>

                  </div>

                </div>

              </div>

            </div>

            {/* SIDEBAR */}
            <div className="col-lg-4">

              <div className='po-sticky'>

                <div className="sidebars">

                  {/* AD */}
                  {/* <div className='adv-pic'>

                    <a href="#">
                      <img
                        src="/img/blog-side-pic-top.png"
                        alt="sidebar"
                      />
                    </a>

                  </div> */}

                  {/* TOC */}
                  {tableOfContents.length >= 1 && (
                    <>
                      <h3>
                        Table of Contents
                      </h3>

                      <ol className="list-group-tb mb-4">

                        {tableOfContents.map(
                          item => (

                            <li
                              key={item.id}
                              className={
                                activeHeading ===
                                item.id
                                  ? 'active'
                                  : ''
                              }
                            >

                              <a
                                dangerouslySetInnerHTML={{
                                  __html:
                                    item.title
                                }}
                                href={`#${item.id}`}
                                onClick={e => {

                                  e.preventDefault();

                                  const element =
                                    document.getElementById(
                                      item.id
                                    );

                                  if (element) {

                                    const yOffset =
                                      -250;

                                    const y =
                                      element.getBoundingClientRect().top +
                                      window.pageYOffset +
                                      yOffset;

                                    window.scrollTo({
                                      top: y,
                                      behavior:
                                        'smooth'
                                    });

                                  }

                                }}
                              />

                            </li>

                          )
                        )}

                      </ol>
                    </>
                  )}

                  {/* CATEGORIES */}
                  <h3>
                    Categories
                  </h3>

                  {categories &&
                  categories.length > 0 ? (

                    <ul className="list-group-tba">

                      {categories.map(cat => (

                        <li
                          key={cat._id}
                          className="list-group-cu"
                        >

                          <Link
                            href={`/category/${cat.slug}`}
                          >
                            {cat.name}
                          </Link>

                        </li>

                      ))}

                    </ul>

                  ) : (
                    <p>
                      No categories available.
                    </p>
                  )}

                </div>

              </div>

            </div>

          </div>

          {/* RELATED POSTS */}
          <div className="row">

            <div className="col-lg-12">

              <h3 className='relted-head'>
                {relatedHeading}
              </h3>

            </div>

            {relatedPosts &&
            relatedPosts.length > 0 ? (

              relatedPosts.map(rp => (

                <div
                  key={rp.slug}
                  className="col-lg-4 mb-4"
                >

                  <div className="card h-100 card-222">

                    <div className='card-image-p'>

                      {rp.imageUrl && (

                        <Link href={`/${rp.slug}`}>

                          <Image
                            src={getImageUrl(rp.imageUrl)}
                            alt={rp.title}
                            className="card-img-top"
                            width={768}
                            height={402}
                            quality={60}
                            loading="lazy"
                          />

                        </Link>

                      )}

                    </div>

                    <div className="card-body">

                      <div className="d-flex blog-author">

                        <span>

                          <Link
                            href={`/author/${rp.author.slug || rp.author._id}`}
                          >
                            {rp.author.name}
                          </Link>

                        </span>

                        {(rp?.scheduleDate ||
                          rp?.updatedAt) && (
                          <>
                            <span className="mx-2">
                              |
                            </span>

                            <span>
                              {formatDate(
                                rp.scheduleDate ||
                                rp.updatedAt
                              )}
                            </span>
                          </>
                        )}

                      </div>

                      <Link
                        href={`/${rp.slug}`}
                      >

                        <h5 className="card-title">
                          {rp.title}
                        </h5>

                      </Link>

                      <p className="card-text">

                        {rp.excerpt
                          ? rp.excerpt.slice(
                              0,
                              80
                            ) + '...'
                          : ''}

                      </p>

                      <Link
                        href={`/${rp.slug}`}
                      >
                        Read More
                      </Link>

                    </div>

                  </div>

                </div>

              ))

            ) : (
              <p>
                No related posts found.
                Check out some random posts
                instead.
              </p>
            )}

          </div>

        </div>

      </section>
    </>
  );
};

// STATIC PATHS
export async function getStaticPaths() {

  const blogApi =
    process.env.NEXT_PUBLIC_BLOG_API_URL;

  try {

    const res =
      await fetch(blogApi);

    const posts =
      await res.json();

    const paths = posts.map(post => ({
      params: {
        slug: post.slug
      }
    }));

    return {
      paths,
      fallback: 'blocking'
    };

  } catch (err) {

    console.error(err);

    return {
      paths: [],
      fallback: 'blocking'
    };

  }
}

// STATIC PROPS
export async function getStaticProps({
  params
}) {

  const { slug } = params;

  const blogApi =
    process.env.NEXT_PUBLIC_BLOG_API_URL;

  const categoryApi =
    process.env.NEXT_PUBLIC_CATEGORY_API_URL;

  try {

    // SINGLE POST
    const postRes =
      await fetch(`${blogApi}/${slug}`);

    if (!postRes.ok) {
      return {
        notFound: true
      };
    }

    const post =
      await postRes.json();

    if (
      !post ||
      Object.keys(post).length === 0
    ) {
      return {
        notFound: true
      };
    }

    // ALL POSTS
    const allRes =
      await fetch(blogApi);

    let allPosts = [];

    if (allRes.ok) {
      allPosts =
        await allRes.json();
    }

    // RELATED POSTS
    const sameCategoryPosts =
      allPosts.filter(
        p =>
          p.category?.[0]?._id ===
            post.category?.[0]?._id &&
          p._id !== post._id
      );

    let relatedPosts = [];

    let relatedHeading = '';

    if (
      sameCategoryPosts.length > 0
    ) {

      relatedHeading =
        'Related Posts';

      relatedPosts =
        sameCategoryPosts
          .slice(0, 3)
          .map(p => ({
            slug: p.slug,
            title: p.title,
            excerpt: p.excerpt,
            imageUrl: p.imageUrl,
            updatedAt: p.updatedAt,
            scheduleDate:
              p.scheduleDate,

            author: {
              name:
                p.author?.name || '',
              slug:
                p.author?.slug || '',
            }
          }));

    } else {

      relatedHeading =
        'Random Posts';

      relatedPosts =
        allPosts
          .filter(
            p =>
              p._id !== post._id
          )
          .slice(0, 3)
          .map(p => ({
            slug: p.slug,
            title: p.title,
            excerpt: p.excerpt,
            imageUrl: p.imageUrl,
            updatedAt: p.updatedAt,
            scheduleDate:
              p.scheduleDate,

            author: {
              name:
                p.author?.name || '',
              slug:
                p.author?.slug || '',
            }
          }));

    }

    // CATEGORIES
    const catRes =
      await fetch(categoryApi);

    let categories = [];

    if (catRes.ok) {

      categories =
        (
          await catRes.json()
        ).map(cat => ({
          _id: cat._id,
          name: cat.name,
          slug: cat.slug
        }));

    }

    // CLEAN POST
    const cleanPost = {

      _id: post._id,

      slug: post.slug,

      title: post.title,

      content: post.content,

      excerpt: post.excerpt,

      imageUrl: post.imageUrl,

      metaTitle: post.metaTitle,

      metaDescription:
        post.metaDescription,

      metaKeywords:
        post.metaKeywords,

      updatedAt: post.updatedAt,

      scheduleDate:
        post.scheduleDate,

      schema:
        post.schema || [],

      author: {
        name:
          post.author?.name || '',

        slug:
          post.author?.slug || '',

        image:
          post.author?.image || '',

        about:
          post.author?.about || '',
      },

      category:
        (post.category || []).map(
          cat => ({
            _id: cat._id,
            name: cat.name,
            slug: cat.slug,
          })
        )
    };

    return {

      props: {
        post: cleanPost,
        relatedPosts,
        relatedHeading,
        categories
      },

      revalidate: 60

    };

  } catch (err) {

    console.error(err);

    return {
      notFound: true
    };

  }
}

export default BlogPost;