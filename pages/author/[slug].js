import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

const AuthorPage = ({ author, posts }) => {
  if (!author) return <p>Author not found</p>;
  const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL}blog/author/${author.slug}`;
  const buildImageUrl = (baseUrl, img) => {
    if (!img) return '';
    if (img.startsWith('http')) return img;
    return `${baseUrl.replace(/\/$/, '')}/${img.replace(/^\//, '')}`;
  };

  const getImageUrl = (img) =>
    buildImageUrl(process.env.NEXT_PUBLIC_BLOG_API_Image, img);

  const getProfileImageUrl = (img) =>
    buildImageUrl(process.env.NEXT_PUBLIC_BLOG_API_Image_profilePics, img);
  return (
    <>
      <Head>
        <title>{author.name} - Author - My App</title>
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="container pb-80">
      <div className='row'>
          <div className='col-lg-12'>
            <div className="breadcrumb-list">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                <li className="breadcrumb-item"><a href="/blog">Blog</a></li>
                <li className="breadcrumb-item"><a href="/blog/author">Authors</a></li>
                <li className="breadcrumb-item active" aria-current="page">{author.name}</li>
              </ol>
            </div>
          </div>
        </div>


        <div className="row pd-90">
          <div className="col-md-2">
            <div className='auther-inner'>
            <Image
              src={
                author.profilePic
                  ? `${process.env.NEXT_PUBLIC_BLOG_API_Image_profilePics.replace(/\/$/, '')}/${author.profilePic.replace(/^\//, '')}`
                  : '/img/icons/user-avt.png'
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
           <h1>{author.name}</h1>
           <p>{author.aboutus}</p>
           </div>
          </div>
        </div>
        <div className='common-title-two'> <h2>Posts by {author.name}</h2></div>
       
        {posts.length === 0 ? (
          <p>No posts found for this author.</p>
        ) : (
          <div className="row">
            {posts.map(post => (
              <div key={post.slug} className='col-lg-4'>
              <div className='card-blog-02'>
                <div className="card-title">
                  <Link href={`/blog/${post.slug}`}>
                    {post.banner && (
                      <Image src={getImageUrl(post.banner)} alt={post.title} className="img-fluid" width={400} height={300} />
                    )}
                    <h3>{post.title}</h3>
                  </Link>
                </div>
                <div className='card-post-ava'>
                  <Link href={`/blog/author/${post.author.slug || post.author._id}`}>
                    <Image
                      width={44}
                      height={44}
                      src={post.author.profilePic ? getProfileImageUrl(post.author.profilePic) : '/img/icons/user-avt.png'}
                      alt="user avatar"
                       className='rounded-circle'
                    />
                    <div className='av-info'>
                      <div className='av-name-a'>{post.author && post.author.name ? post.author.name : 'Unknown'}</div>
                      <div className='av-date-b'>{new Date(post.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) || 'Date unknown'} <span>|</span> {post.readtimes || ''}min</div>
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

export async function getStaticPaths() {
  const authorApi = process.env.NEXT_PUBLIC_AUTHOR_API_URL;
  try {
    const res = await fetch(authorApi);
    let authors = [];
    if (res.ok) {
      authors = await res.json();
    }
    const paths = authors.map(author => ({
      params: { slug: author.slug }
    }));
    return { paths, fallback: true };
  } catch (err) {
    console.error(err);
    return { paths: [], fallback: true };
  }
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const authorApi = process.env.NEXT_PUBLIC_AUTHOR_API_URL;
  const blogApi = process.env.NEXT_PUBLIC_BLOG_API_URL;
  try {
    const resAuthors = await fetch(authorApi);
    const authors = await resAuthors.json();
    const author = authors.find(a => a.slug === slug) || null;
    if (!author) return { notFound: true };

    const resPosts = await fetch(blogApi);
    const posts = await resPosts.json();
    const filteredPosts = posts.filter(
      post => post.author && post.author.slug === slug
    );
    return { props: { author, posts: filteredPosts } , revalidate: 10 };
  } catch (err) {
    console.error(err);
    return { props: { author: null, posts: [] }, revalidate: 10 };
  }
}

export default AuthorPage;
