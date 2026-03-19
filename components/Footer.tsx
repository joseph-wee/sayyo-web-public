import React from "react";

import Link from "next/link";

import { btn_instagram_color, logo_mobileto_black } from "../assets";

const assetSrc = (asset: string | { src: string }) =>
  typeof asset === "string" ? asset : asset.src;

const Footer = () => {
  return (
    <footer
      className="absolute bottom-0 w-[100%] pt-[53px] pb-[50px] bg-sayyo_bg tall:static
    md720:pt-[20px] md720:pb-[23px]
    "
    >
      <div
        className="mb-[9px] flex items-center justify-center gap-[12px]

      md720:mb-[6px]"
      >
        <Link
          href="/pp"
          className="text-sayyo_subtext font-Roboto text-[16px] leading-[20.8px]
          md1920_1450:text-[0.833vw] md1920:leading-[1.083vw]
          md1450:text-[12px]
          md720:text-[12px] md720:leading-[15.6px]"
        >
          Chính sách bảo mật
        </Link>
        <div className="w-[1px] h-[13px] bg-[rgba(0,0,0,0.1)]" />
        <Link
          href="/toc"
          className="text-sayyo_subtext font-Roboto text-[16px] leading-[20.8px]
          md1920_1450:text-[0.833vw] md1920:leading-[1.083vw]
          md1450:text-[12px]
          md720:text-[12px] md720:leading-[15.6px]"
        >
          Điều khoản và điều kiện
        </Link>
        <div className="w-[1px] h-[13px] bg-[rgba(0,0,0,0.1)]" />
        <button
          className="flex items-center"
          onClick={() => window.open("https://www.instagram.com/sayyo.viet")}
        >
          <img
            src={assetSrc(btn_instagram_color)}
            alt="btn_instagram"
            className="mr-[12px] md720:mr-0"
          />
          <span
            className="text-sayyo_subtext font-Roboto text-[16px] leading-[20.8px]     md1920_1450:text-[0.833vw] md1920:leading-[1.083vw]
          md1450:text-[12px]
          md720:text-[12px] md720:leading-[15.6px] md720:hidden"
          >
            Instagram
          </span>
        </button>
      </div>
      {/* <Link
        href="/del_guide"
        className="block mb-[9px] text-sayyo_subtext text-center font-Roboto text-[16px] leading-[20.8px]
      md1920_1450:text-[0.833vw] md1920_1450:leading-[1.083vw]
      md1450:text-[12px]
      md720:text-[12px] md720:leading-[15.6px] md720:mb-[27px]"
      >
        Hướng dẫn rút tiền tài khoản
      </Link> */}
      <span
        className="block mb-[40px] text-sayyo_subtext text-center font-Roboto text-[16px] leading-[20.8px]
      md1920:mb-[2.083vw] md1920_1450:text-[0.833vw] md1920_1450:leading-[1.083vw]
      md1450:text-[12px]
      md720:text-[12px] md720:leading-[15.6px] md720:mb-[27px]"
      >
        2024 Sayyo Bảo lưu mọi quyền.
      </span>
      <img
        src={assetSrc(logo_mobileto_black)}
        alt="logo_mobileto"
        className="mx-auto md1920:w-[11.042vw] min-w-[96.2px] md720:w-[96.2px] cursor-pointer"
        onClick={() => window.open("https://www.mobileto.io")}
      />
    </footer>
  );
};

const FooterEn = () => {
  return (
    <footer
      className="absolute bottom-0 w-[100%] pt-[53px] pb-[50px] bg-sayyo_bg tall:static
    md720:pt-[20px] md720:pb-[23px]
    "
    >
      <div
        className="mb-[9px] flex items-center justify-center gap-[12px]

      md720:mb-[6px]"
      >
        <Link
          href="/en/pp"
          className="text-sayyo_subtext font-Roboto text-[16px] leading-[20.8px]
          md1920_1450:text-[0.833vw] md1920:leading-[1.083vw]
          md1450:text-[12px]
          md720:text-[12px] md720:leading-[15.6px]"
        >
          Privacy policy
        </Link>
        <div className="w-[1px] h-[13px] bg-[rgba(0,0,0,0.1)]" />
        <Link
          href="/en/toc"
          className="text-sayyo_subtext font-Roboto text-[16px] leading-[20.8px]
          md1920_1450:text-[0.833vw] md1920:leading-[1.083vw]
          md1450:text-[12px]
          md720:text-[12px] md720:leading-[15.6px]"
        >
          Terms of conditions
        </Link>
        <div className="w-[1px] h-[13px] bg-[rgba(0,0,0,0.1)]" />
        <button
          className="flex items-center"
          onClick={() => window.open("https://www.instagram.com/sayyo.viet")}
        >
          <img
            src={assetSrc(btn_instagram_color)}
            alt="btn_instagram"
            className="mr-[12px] md720:mr-0"
          />
          <span
            className="text-sayyo_subtext font-Roboto text-[16px] leading-[20.8px]     md1920_1450:text-[0.833vw] md1920:leading-[1.083vw]
          md1450:text-[12px]
          md720:text-[12px] md720:leading-[15.6px] md720:hidden"
          >
            Instagram
          </span>
        </button>
      </div>
      {/* <Link
        href="/del_guide"
        className="block mb-[9px] text-sayyo_subtext text-center font-Roboto text-[16px] leading-[20.8px]
      md1920_1450:text-[0.833vw] md1920_1450:leading-[1.083vw]
      md1450:text-[12px]
      md720:text-[12px] md720:leading-[15.6px] md720:mb-[27px]"
      >
        Hướng dẫn rút tiền tài khoản
      </Link> */}
      <span
        className="block mb-[40px] text-sayyo_subtext text-center font-Roboto text-[16px] leading-[20.8px]
      md1920:mb-[2.083vw] md1920_1450:text-[0.833vw] md1920_1450:leading-[1.083vw]
      md1450:text-[12px]
      md720:text-[12px] md720:leading-[15.6px] md720:mb-[27px]"
      >
        2024 Sayyo All Rights Reserved.
      </span>
      <img
        src={assetSrc(logo_mobileto_black)}
        alt="logo_mobileto"
        className="mx-auto md1920:w-[11.042vw] min-w-[96.2px] md720:w-[96.2px] cursor-pointer"
        onClick={() => window.open("https://www.mobileto.io")}
      />
    </footer>
  );
};

const FooterKo = () => {
  return (
    <footer
      className="absolute bottom-0 w-[100%] pt-[53px] pb-[50px] bg-sayyo_bg tall:static
    md720:pt-[20px] md720:pb-[23px]
    "
    >
      <div
        className="mb-[9px] flex items-center justify-center gap-[12px]

      md720:mb-[6px]"
      >
        <Link
          href="/ko/pp"
          className="text-sayyo_subtext font-Roboto text-[16px] leading-[20.8px]
          md1920_1450:text-[0.833vw] md1920:leading-[1.083vw]
          md1450:text-[12px]
          md720:text-[12px] md720:leading-[15.6px]"
        >
          개인정보보호
        </Link>
        <div className="w-[1px] h-[13px] bg-[rgba(0,0,0,0.1)]" />
        <Link
          href="/ko/toc"
          className="text-sayyo_subtext font-Roboto text-[16px] leading-[20.8px]
          md1920_1450:text-[0.833vw] md1920:leading-[1.083vw]
          md1450:text-[12px]
          md720:text-[12px] md720:leading-[15.6px]"
        >
          이용약관
        </Link>
        <div className="w-[1px] h-[13px] bg-[rgba(0,0,0,0.1)]" />
        <button
          className="flex items-center"
          onClick={() => window.open("https://www.instagram.com/sayyo.viet")}
        >
          <img
            src={assetSrc(btn_instagram_color)}
            alt="btn_instagram"
            className="mr-[12px] md720:mr-0"
          />
          <span
            className="text-sayyo_subtext font-Roboto text-[16px] leading-[20.8px]     md1920_1450:text-[0.833vw] md1920:leading-[1.083vw]
          md1450:text-[12px]
          md720:text-[12px] md720:leading-[15.6px] md720:hidden"
          >
            Instagram
          </span>
        </button>
      </div>
      {/* <Link
        href="/del_guide"
        className="block mb-[9px] text-sayyo_subtext text-center font-Roboto text-[16px] leading-[20.8px]
      md1920_1450:text-[0.833vw] md1920_1450:leading-[1.083vw]
      md1450:text-[12px]
      md720:text-[12px] md720:leading-[15.6px] md720:mb-[27px]"
      >
        Hướng dẫn rút tiền tài khoản
      </Link> */}
      <span
        className="block mb-[40px] text-sayyo_subtext text-center font-Roboto text-[16px] leading-[20.8px]
      md1920:mb-[2.083vw] md1920_1450:text-[0.833vw] md1920_1450:leading-[1.083vw]
      md1450:text-[12px]
      md720:text-[12px] md720:leading-[15.6px] md720:mb-[27px]"
      >
        2024 Sayyo All Rights Reserved.
      </span>
      <img
        src={assetSrc(logo_mobileto_black)}
        alt="logo_mobileto"
        className="mx-auto md1920:w-[11.042vw] min-w-[96.2px] md720:w-[96.2px] cursor-pointer"
        onClick={() => window.open("https://www.mobileto.io")}
      />
    </footer>
  );
};

Footer.En = FooterEn;
Footer.Ko = FooterKo;

export default Footer;
