import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

const AuthorIndex = ({ authors }) => {
  const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/author`;
  const defaultImage = '/img/author-defult-pic.png';
  const authorList = Array.isArray(authors) ? authors : [];
 const getImageUrl = (img) => {
    if (!img) return '';
    if (img.startsWith('http')) return img;
    return `${process.env.NEXT_PUBLIC_BLOG_API_Image.replace(/\/$/, '')}/${img.replace(/^\//, '')}`;
  };

  const getAuthorAvatarUrl = (author) => {
    const avatar = String(author?.profilePic || author?.image || '').trim();
    return avatar ? getImageUrl(avatar) : defaultImage;
  };
  return (
    <>
      <Head>
        <title>Authors - My App</title>
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="container pb-80">

        <div className='row'>
          <div className='col-lg-12'>
            <div className="breadcrumb-list">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Authors</li>
              </ol>
            </div>
          </div>
        </div>




        <div className="row">
          <div className='col-lg-12'>
            <div className='common-title'>
              <h1>Authors</h1>
            </div>
          </div>
          {authorList.map(author => (
            <div key={author._id} className="col-md-3">
              <div className="card card-categ h-100 text-center">
                <div className="card-body">
                  <Link href={`author/${author.slug || author._id}`}>
                    <Image
                       src={getAuthorAvatarUrl(author)}
                      alt={author.name}
                      width={60}
                      height={60}
                      className="author-avatar mb-2"
                    />
                    <h5 className="card-title">{author.name}</h5>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const authorApi = process.env.NEXT_PUBLIC_AUTHOR_API_URL;
  try {
    const res = await fetch(authorApi);
    let authors = [];
    if (res.ok) {
      authors = await res.json();
    }
    return { props: { authors }, revalidate: 10 };
  } catch (err) {
    console.error(err);
    return { props: { authors: [] }, revalidate: 10 };
  }
}

export default AuthorIndex;
