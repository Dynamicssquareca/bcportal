import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

const CategoryPage = ({
  category,
  posts
}) => {

  if (!category) {
    return <p>Category not found</p>;
  }

  const canonicalUrl =
    `${process.env.NEXT_PUBLIC_SITE_URL}/category/${category.slug}/`;

  const defaultImage = '/img/erp-f-im.jpg';

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

  const getAuthorAvatarUrl = (author) => {
    const avatar = String(author?.profilePic || author?.image || '').trim();
    return avatar ? getProfileImageUrl(avatar) : '/img/author-defult-pic.png';
  };

  const formatPostDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (Number.isNaN(date.getTime())) return String(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatPostMeta = (dateStr, readtimes) => {
    const formattedDate = formatPostDate(dateStr);
    const parts = [];
    if (formattedDate) parts.push(formattedDate);
    if (readtimes > 0) parts.push(`${readtimes} min`);
    return parts.length ? parts.join(' | ') : 'Date unknown';
  };

  return (
    <>
      <Head>

        <title>
          {category.metaTitle ||
            category.title}
        </title>

        <meta
          name="description"
          content={
            category.metaDescription ||
            category.excerpt ||
            ''
          }
        />

        <link
          rel="canonical"
          href={canonicalUrl}
        />

        {category.metaKeywords && (
          <meta
            name="keywords"
            content={category.metaKeywords}
          />
        )}

        <meta
          property="og:title"
          content={
            category.metaTitle ||
            category.title
          }
        />

        <meta
          property="og:description"
          content={
            category.metaDescription ||
            category.excerpt ||
            ''
          }
        />

      </Head>

      <div className="container pb-80">

        {/* BREADCRUMB */}
        <div className='row'>

          <div className='col-lg-12'>

            <div className="breadcrumb-list">

              <ol className="breadcrumb">

                <li className="breadcrumb-item">

                  <Link href="/">
                    Home
                  </Link>

                </li>

                <li className="breadcrumb-item">

                  <a href="/category">
                    Categories
                  </a>

                </li>

                <li
                  className="breadcrumb-item active"
                  aria-current="page"
                >

                  {category.name}

                </li>

              </ol>

            </div>

          </div>

        </div>

        {/* TITLE */}
        <div className='common-title'>

          <h1>
            Category: {category.name}
          </h1>

        </div>

        {/* POSTS */}
        {posts.length === 0 ? (

          <p>
            No posts found for this category.
          </p>

        ) : (

          <div className="row">

            {posts.map(post => (

              <div
                key={post.slug}
                className='col-lg-4'
              >

                <div className='card-blog-02'>

                  {/* IMAGE */}
                  <div className="card-title">

                    <Link href={`/${post.slug}`}>

                      <Image
                        src={
                          post.imageUrl
                            ? getImageUrl(post.imageUrl)
                            : defaultImage
                        }
                        alt={post.title}
                        className="img-fluid"
                        width={400}
                        height={300}
                        quality={60}
                        loading="lazy"
                      />

                      <h3>
                        {post.title}
                      </h3>

                    </Link>

                  </div>

                  {/* AUTHOR */}
                  <div className='card-post-ava'>

                    <Link
                      href={`/author/${post.author?.slug || ''}`}
                    >

                      <Image
                        width={44}
                        height={44}
                        src={getAuthorAvatarUrl(post.author)}
                        alt="user avatar"
                        className='author-avatar'
                      />

                      <div className='av-info'>

                        <div className='av-name-a'>

                          {post.author?.name ||
                            'Unknown'}

                        </div>

                        <div className='av-date-b'>
                          {formatPostMeta(post.createdAt, post.readtimes)}
                        </div>

                      </div>

                    </Link>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
    </>
  );
};

// STATIC PATHS
export async function getStaticPaths() {

  const categoryApi =
    process.env.NEXT_PUBLIC_CATEGORY_API_URL;

  try {

    const res =
      await fetch(categoryApi);

    let categories = [];

    if (res.ok) {
      categories = await res.json();
    }

    const paths =
      categories.map(cat => ({
        params: {
          slug:
            cat.slug ||
            cat.title
              ?.toLowerCase()
              .replace(/\s+/g, '-')
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

  const categoryApi =
    process.env.NEXT_PUBLIC_CATEGORY_API_URL;

  const blogApi =
    process.env.NEXT_PUBLIC_BLOG_API_URL;

  try {

    // CATEGORIES
    const catRes =
      await fetch(categoryApi);

    let categories = [];

    if (catRes.ok) {
      categories =
        await catRes.json();
    }

    // CATEGORY
    const rawCategory =
      categories.find(
        cat =>
          (
            cat.slug ||
            cat.title
              ?.toLowerCase()
              .replace(/\s+/g, '-')
          ) === slug
      ) || null;

    if (!rawCategory) {
      return {
        notFound: true
      };
    }

    // CLEAN CATEGORY
    const category = {

      _id:
        rawCategory._id ?? null,

      name:
        rawCategory.name ?? '',

      title:
        rawCategory.title ?? '',

      slug:
        rawCategory.slug ?? '',

      excerpt:
        rawCategory.excerpt ?? '',

      metaTitle:
        rawCategory.metaTitle ?? '',

      metaDescription:
        rawCategory.metaDescription ?? '',

      metaKeywords:
        rawCategory.metaKeywords ?? '',
    };

    // POSTS
    const postRes =
      await fetch(blogApi);

    let rawPosts = [];

    if (postRes.ok) {
      rawPosts =
        await postRes.json();
    }

    // FILTER + OPTIMIZE POSTS
    const posts =
      rawPosts
        .filter(post => {

          if (!post.category) {
            return false;
          }

          if (
            Array.isArray(post.category)
          ) {

            return post.category.some(
              c =>
                c._id ===
                category._id
            );

          }

          return (
            post.category._id ===
            category._id
          );

        })
        .map(post => ({

          _id:
            post._id ?? null,

          slug:
            post.slug ?? '',

          title:
            post.title ?? '',

          imageUrl:
            post.imageUrl ?? null,

          createdAt:
            post.createdAt ?? null,

          readtimes:
            post.readtimes ?? 0,

          author: {

            name:
              post.author?.name ?? '',

            slug:
              post.author?.slug ?? '',

            profilePic:
              post.author?.profilePic ?? '',

            image:
              post.author?.image ?? '',
          }

        }));

    return {

      props: {
        category,
        posts
      },

      revalidate: 60

    };

  } catch (err) {

    console.error(err);

    return {

      props: {
        category: null,
        posts: []
      },

      revalidate: 60

    };

  }
}

export default CategoryPage;