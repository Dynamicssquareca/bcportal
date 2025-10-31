import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

const CategoryIndex = ({ categories }) => {
  const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL}blog/category`;
  const buildImageUrl = (baseUrl, img) => {
    if (!img) return '';
    if (img.startsWith('http')) return img;
    return `${baseUrl.replace(/\/$/, '')}/${img.replace(/^\//, '')}`;
  };
  const getImageUrl = (img) =>
    buildImageUrl(process.env.NEXT_PUBLIC_BLOG_API_Image, img);

  return (
    <>
      <Head>
        {/* <title>Categories - My App</title>
        <link rel="canonical" href={canonicalUrl} /> */}
        <title>Categories</title>
        <meta name="description" content={categories.metaDescription || categories.excerpt || ''} />
        <link rel="canonical" href={canonicalUrl} />
        {categories.metaKeywords && <meta name="keywords" content={categories.metaKeywords} />}
        <meta property="og:title" content={categories.metaTitle || categories.title} />
        <meta property="og:description" content={categories.metaDescription || categories.excerpt || ''} />
      </Head>
      <div className="container pb-80">
        <div className='row'>
          <div className='col-lg-12'>
            <div className="breadcrumb-list">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                <li className="breadcrumb-item"><a href="/blog">Blog</a></li>
                <li className="breadcrumb-item active" aria-current="page">Categories</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="row g-4">
          <div className='col-lg-12'>
            <div className='common-title'>
              <h1>Categories</h1>
            </div>
          </div>
          {categories.map(cat => (
            <div key={cat._id} className="col-md-3">
              <div className="card card-categ h-100 text-center">
                <div className="card-body">
                  <Link href={`/blog/category/${cat.slug || cat.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    <Image src={getImageUrl(cat.categoryimg) || '/img/icons/icons-01.png'} alt="icon" className="mb-2" width={68} height={68} />
                    <h5 className="card-title">{cat.title}</h5>
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
  const categoryApi = process.env.NEXT_PUBLIC_CATEGORY_API_URL;
  try {
    const res = await fetch(categoryApi);
    let categories = [];
    if (res.ok) {
      categories = await res.json();
    }
    return { props: { categories }, revalidate: 60 };
  } catch (err) {
    console.error(err);
    return { props: { categories: [] }, revalidate: 60 };
  }
}

export default CategoryIndex;
