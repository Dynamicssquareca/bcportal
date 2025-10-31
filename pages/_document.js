import { Html, Head, Main, NextScript } from "next/document";
import Script from 'next/script'
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" type="image/png" href="/favicon.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/favicon.png" sizes="192x192" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"></link>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
        
      </Head>
      <body>
        <noscript>

        </noscript>
        <Main />
        <NextScript />



      </body>
    </Html>
  );
}
