import Head from "next/head";

type SeoProps = {
  description: string;
  image?: string;
  title?: string;
  url?: string;
};

const DEFAULT_IMAGE = "https://sayyo.mobileto.io/img_og.png";
const DEFAULT_TITLE = "Sayyo";
const DEFAULT_URL = "https://sayyo.mobileto.io";

const Seo = ({
  description,
  image = DEFAULT_IMAGE,
  title = DEFAULT_TITLE,
  url = DEFAULT_URL,
}: SeoProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
};

export default Seo;
