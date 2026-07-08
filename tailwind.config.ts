import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      Inter: ["var(--font-inter)", "system-ui", "Arial"],
      Roboto: ["var(--font-roboto)", "system-ui", "Arial"],
      Sriracha: ["var(--font-sriracha)", "cursive"],
      NanumSquare: ["var(--font-nanum-square)", "system-ui", "Arial"],
      NanumSquareRound: [
        "var(--font-nanum-square-round)",
        "system-ui",
        "Arial",
      ],
    },
    colors: {
      sayyo_primary: "#00A939",
      sayyo_wht: "#FFFFFF",
      sayyo_bg: "#F2F6F8",
      sayyo_l2: "#063322",
      sayyo_subtext: "#818C97",
      sayyo_bg_more: "#DEE6EC",
    },
    screens: {
      md720: { max: "720px" },
      md760: { max: "760px" },
      md770: { max: "770px" },
      md970: { max: "970px" },
      md1080: { max: "1080px" },
      md1180: { max: "1180px" },
      md1450: { max: "1450px" },
      md1920_720: { max: "1920px", min: "721px" },
      md1920_760: { max: "1920px", min: "761px" },
      md1920_970: { max: "1920px", min: "971px" },
      md1920_1080: { max: "1920px", min: "1081px" },
      md1920_1180: { max: "1920px", min: "1181px" },
      md1920_1450: { max: "1920px", min: "1451px" },
      md1920: { max: "1919px", min: "721px" },
      md805: { max: "805px" },
    },
    backgroundImage: {
      "img-back-middle": "url('/assets/img_back_middle.png')",
    },
  },
  plugins: [],
};
export default config;
