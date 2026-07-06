import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

const AuthorPage = ({ author, posts }) => {

  if (!author) {
    return <p>Author not found</p>;
  }

  const canonicalUrl =
    `${process.env.NEXT_PUBLIC_SITE_URL}/author/${author.slug}`;

  const defaultImage = '/img/erp-f-im.jpg';
  const defaultAuthorImage = '/img/author-defult-pic.png';
  const authorAvatar = String(author.profilePic || author.image || '').trim();

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
          {author.name} - Author
        </title>

        <link
          rel="canonical"
          href={canonicalUrl}
        />

        <meta
          name="robots"
          content="noindex, nofollow"
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

                  <a href="/author">
                    Authors
                  </a>

                </li>

                <li
                  className="breadcrumb-item active"
                  aria-current="page"
                >

                  {author.name}

                </li>

              </ol>

            </div>

          </div>

        </div>

        {/* AUTHOR INFO */}
        <div className="row pd-90">

          <div className="col-md-2">

            <div className='auther-inner'>

              <Image
                src={
                  authorAvatar
                    ? getProfileImageUrl(authorAvatar)
                    : defaultAuthorImage
                }
                width={100}
                height={100}
                alt={author.name}
                className="author-avatar"
              />

            </div>

          </div>

          <div className="col-md-10">

            <div className='common-titles'>

              <h1>
                {author.name}
              </h1>

              <p>
                {author.about}
              </p>

            </div>

          </div>

        </div>

        {/* POSTS */}
        <div className='common-title-two'>

          <h2>
            Posts by {author.name}
          </h2>

        </div>

        {posts.length === 0 ? (

          <p>
            No posts found for this author.
          </p>

        ) : (

          <div className="row">

            {posts.map(post => (

              <div
                key={post.slug}
                className='col-lg-4 d-flex'
              >

                <div className='card-blog-02'>

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

                  <div className='card-post-ava'>

                    <Link
                      href={`/author/${post.author?.slug || ''}`}
                    >

                      <Image
                        width={42}
                        height={42}
                        src={
                          authorAvatar
                            ? getProfileImageUrl(authorAvatar)
                            : defaultAuthorImage
                        }
                        alt="user avatar"
                        className='rounded-circle'
                      />

                      <div className='av-info'>

                        <div className='av-name-a'>

                          {post.author?.name || 'Unknown'}

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

  const authorApi =
    process.env.NEXT_PUBLIC_AUTHOR_API_URL;

  try {

    const res =
      await fetch(authorApi);

    let authors = [];

    if (res.ok) {
      authors = await res.json();
    }

    const paths =
      authors.map(author => ({
        params: {
          slug: author.slug
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

  const authorApi =
    process.env.NEXT_PUBLIC_AUTHOR_API_URL;

  const blogApi =
    process.env.NEXT_PUBLIC_BLOG_API_URL;

  try {

    // AUTHORS
    const resAuthors =
      await fetch(authorApi);

    const authors =
      await resAuthors.json();

    // AUTHOR
    const rawAuthor =
      authors.find(
        a => a.slug === slug
      ) || null;

    if (!rawAuthor) {
      return {
        notFound: true
      };
    }

    // CLEAN AUTHOR
    const author = {

      _id:
        rawAuthor._id ?? null,

      name:
        rawAuthor.name ?? '',

      slug:
        rawAuthor.slug ?? '',

      about:
        rawAuthor.about ?? '',

      image:
        rawAuthor.image ?? '',

      profilePic:
        rawAuthor.profilePic ?? '',
    };

    // POSTS
    const resPosts =
      await fetch(blogApi);

    const rawPosts =
      await resPosts.json();

    // FILTER + OPTIMIZE POSTS
    const posts =
      rawPosts
        .filter(
          post =>
            post.author?.slug === slug
        )
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
          }

        }));

    return {

      props: {
        author,
        posts
      },

      revalidate: 60

    };

  } catch (err) {

    console.error(err);

    return {

      props: {
        author: null,
        posts: []
      },

      revalidate: 60

    };

  }
}

export default AuthorPage;