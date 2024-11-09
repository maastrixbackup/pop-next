import Head from "next/head";

function MetaContext({
  title,
  metaTitle,
  metaKeyWords,
  metaDesc,
  twitterCard,
  twitterTitle,
  twitterDesc,
  twitterSite,
  ogTitle,
  ogDesc,
  ogSiteName,
}) {
  return (
    <Head>
      <title>{title} | Pop Telecom</title>
      <meta name="title" content={metaTitle}></meta>
      <meta name="keywords" content={metaKeyWords}></meta>
      <meta name="description" content={metaDesc}></meta>
      <meta name="twitter:card" content={twitterCard}></meta>
      <meta name="twitter:title" content={twitterTitle}></meta>
      <meta name="twitter:description" content={twitterDesc}></meta>
      <meta name="twitter:site" content={twitterSite}></meta>
      <meta property="og:title" content={ogTitle}></meta>
      <meta property="og:description" content={ogDesc}></meta>
      <meta property="og:site_name" content={ogSiteName}></meta>
    </Head>
  );
}

export default MetaContext;
