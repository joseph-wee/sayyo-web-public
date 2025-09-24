import GoogleAnalytics from "../lib/GoogleAnalytics";
import "../styles/globals.css";
import { Inter, Roboto, Sriracha } from "next/font/google";
import localFont from "next/font/local";
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

const nanum_square = localFont({
  src: [
    {
      path: "../assets/fonts/NanumSquareR.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/NanumSquareB.woff",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-nanum-square",
});

const nanum_square_round = localFont({
  src: [
    {
      path: "../assets/fonts/NanumSquareRoundR.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/NanumSquareRoundB.woff",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-nanum-square-round",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${inter.variable} ${roboto.variable} ${sriracha.variable} ${nanum_square.variable} ${nanum_square_round.variable} font-Inter`}
    >
      {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
      )}
      <Component {...pageProps} />
    </div>
  );
}
