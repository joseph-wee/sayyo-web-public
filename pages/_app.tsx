import GoogleAnalytics from "../lib/GoogleAnalytics";
import "../styles/globals.css";
import { Inter, Roboto, Sriracha } from "next/font/google";

import type { AppProps } from "next/app";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-inter",
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-roboto",
});
const sriracha = Sriracha({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-sriracha",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${inter.variable} ${roboto.variable} ${sriracha.variable}`}
    >
      {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
      )}
      <Component {...pageProps} />
    </div>
  );
}
