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
                  author.profilePic
                    ? getProfileImageUrl(
                        author.profilePic
                      )
                    : '/img/author-defult-pic.png'
                }
                width={100}
                height={100}
                alt={author.name}
                className="img-fluid rounded-circle"
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

                  <div className='card-post-ava'>

                    <Link
                      href={`/author/${post.author?.slug || ''}`}
                    >

                      <Image
                        width={42}
                        height={42}
                        src={
                          author?.image
                            ? getImageUrl(
                                author.image
                              )
                            : "/img/author-defult-pic.png"
                        }
                        alt="user avatar"
                        className='rounded-circle'
                      />

                      <div className='av-info'>

                        <div className='av-name-a'>

                          {post.author?.name || 'Unknown'}

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
        rawAuthor._id || null,

      name:
        rawAuthor.name || '',

      slug:
        rawAuthor.slug || '',

      about:
        rawAuthor.about || '',

      image:
        rawAuthor.image || '',

      profilePic:
        rawAuthor.profilePic || '',
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