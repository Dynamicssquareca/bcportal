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

                      {post.imageUrl && (

                        <Image
                          src={getImageUrl(post.imageUrl)}
                          alt={post.title}
                          className="img-fluid"
                          width={400}
                          height={300}
                          quality={60}
                          loading="lazy"
                        />

                      )}

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
                        src={
                          post.author?.profilePic
                            ? getProfileImageUrl(
                                post.author.profilePic
                              )
                            : '/img/author-defult-pic.png'
                        }
                        alt="user avatar"
                        className='rounded-circle'
                      />

                      <div className='av-info'>

                        <div className='av-name-a'>

                          {post.author?.name ||
                            'Unknown'}

                        </div>

                        <div className='av-date-b'>

                          {post.createdAt
                            ? new Date(
                                post.createdAt
                              ).toLocaleDateString(
                                'en-GB',
                                {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric'
                                }
                              )
                            : 'Date unknown'}

                          <span>|</span>

                          {post.readtimes || 0} min

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
        rawCategory._id || null,

      name:
        rawCategory.name || '',

      title:
        rawCategory.title || '',

      slug:
        rawCategory.slug || '',

      excerpt:
        rawCategory.excerpt || '',

      metaTitle:
        rawCategory.metaTitle || '',

      metaDescription:
        rawCategory.metaDescription || '',

      metaKeywords:
        rawCategory.metaKeywords || '',
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
            post._id || null,

          slug:
            post.slug || '',

          title:
            post.title || '',

          imageUrl:
            post.imageUrl || '',

          createdAt:
            post.createdAt || null,

          readtimes:
            post.readtimes || 0,

          author: {

            name:
              post.author?.name || '',

            slug:
              post.author?.slug || '',

            profilePic:
              post.author?.profilePic || '',
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