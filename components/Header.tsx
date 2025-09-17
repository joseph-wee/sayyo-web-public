import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { logo_sayyo_small } from "../assets";

/** bg color transparent Header */
const Header = () => {
  const router = useRouter();
  const [page, setPage] = useState("");
  const [path, setPath] = useState("");
  const [lang, setLang] = useState("");

  const pathGetter = () => {
    setPath(router.pathname.substring(3));
  };

  const pageGetter = () => {
    if (router.pathname === "/" || router.pathname.includes("main")) {
      setPage("main");
      return;
    }
    router.pathname !== "/" && setPage("etc");
  };

  const langGetter = () => {
    if (router.pathname.includes("en")) {
      setLang("en");
      return;
    }
    if (router.pathname.includes("ko")) {
      setLang("ko");
      return;
    }
    setLang("vn");
  };

  useEffect(() => {
    pageGetter();
    pathGetter();
    langGetter();
  }, [router]);

  return (
    <header
      className={`absolute z-20 w-[100%] ${
        page === "etc" && "bg-sayyo_primary"
      }`}
    >
      <div className="m-auto my-0 pl-[24px] pr-[20px] flex items-center justify-between max-w-[1280px] h-[78px] md720:h-[57px] ">
        <Link href={`${lang === "vn" ? "/" : `main`}`}>
          <Image
            src={logo_sayyo_small}
            alt="logo_sayyo_small"
            className="md720:w-[46.5px]"
          />
        </Link>
        <div className="flex items-center gap-[17px]">
          <Link href={`${page === "main" ? "/" : path}`}>
            <button
              className={`${
                lang === "vn"
                  ? "font-Roboto font-bold text-base text-sayyo_wht underline underline-offset-[5px] md720:text-[12px] md720:leading-[15.6px] md720:underline-offset-[3px]"
                  : "font-Roboto font-normal text-sayyo_wht md720:text-[12px] md720:leading-[15.6px]"
              } `}
            >
              Vietnamese
            </button>
          </Link>
          <div className="w-[1px] h-[13px] border-l-[1px] border-l-[#FFFFFF]/[.4] md720:h-[8.27px]" />
          <Link
            href={`${
              page === "main"
                ? "/en/main"
                : lang === "vn"
                ? `/en${router.pathname}`
                : `/en${path}`
            }`}
          >
            <button
              className={`${
                lang === "en"
                  ? "font-Roboto font-bold text-base text-sayyo_wht underline underline-offset-[5px] md720:text-[12px] md720:leading-[15.6px] md720:underline-offset-[3px]"
                  : "font-Roboto font-normal text-sayyo_wht md720:text-[12px] md720:leading-[15.6px]"
              } `}
            >
              English
            </button>
          </Link>

          <div className="w-[1px] h-[13px] border-l-[1px] border-l-[#FFFFFF]/[.4] md720:h-[8.27px]" />
          <Link
            href={`${
              page === "main"
                ? "/ko/main"
                : lang === "vn"
                ? `/ko${router.pathname}`
                : `/ko${path}`
            }`}
          >
            <button
              className={`${
                lang === "ko"
                  ? "font-Roboto font-bold text-base text-sayyo_wht underline underline-offset-[5px] md720:text-[12px] md720:leading-[15.6px] md720:underline-offset-[3px]"
                  : "font-Roboto font-normal text-sayyo_wht md720:text-[12px] md720:leading-[15.6px]"
              } `}
            >
              Korean
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

/** bg color sayyo_primary Header */
const HeaderGreen = () => {
  const router = useRouter();
  const path = `/en/` + router.pathname;

  return (
    <header className="absolute z-20 w-[100%] bg-sayyo_primary ">
      <div className="m-auto my-0 pl-[24px] pr-[20px] flex items-center justify-between max-w-[1280px] h-[78px] md720:h-[57px]">
        <Link href="/">
          <Image
            src={logo_sayyo_small}
            alt="logo_sayyo_small"
            className="md720:w-[46.5px]"
          />
        </Link>
        <div className="flex items-center gap-[17px]">
          <button className="font-Roboto font-bold text-base text-sayyo_wht underline underline-offset-[5px] md720:text-[12px] md720:leading-[15.6px] md720:underline-offset-[3px]">
            Vietnamese
          </button>
          <div className="w-[1px] h-[13px] border-l-[1px] border-l-[#FFFFFF]/[.4] md720:h-[8.27px]" />
          <Link href={path}>
            <button className="font-Roboto font-normal text-sayyo_wht md720:text-[12px] md720:leading-[15.6px]">
              English
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

/** bg color transparent Header English */
const HeaderEn = () => {
  return (
    <header className="absolute z-20 w-[100%]">
      <div className="m-auto my-0 pl-[24px] pr-[20px] flex items-center justify-between max-w-[1280px] h-[78px] md720:h-[57px]">
        <Link href="/en/main">
          <Image
            src={logo_sayyo_small}
            alt="logo_sayyo_small"
            className="md720:w-[46.5px]"
          />
        </Link>
        <div className="flex items-center gap-[17px]">
          <Link href="/">
            <button className="font-Roboto font-normal text-sayyo_wht md720:text-[12px] md720:leading-[15.6px]">
              Vietnamese
            </button>
          </Link>
          <div className="w-[1px] h-[13px] border-l-[1px] border-l-[#FFFFFF]/[.4] md720:h-[8.27px]" />
          <button className="font-Roboto font-bold text-base text-sayyo_wht underline underline-offset-[5px] md720:text-[12px] md720:leading-[15.6px] md720:underline-offset-[3px]">
            English
          </button>
        </div>
      </div>
    </header>
  );
};

/** bg color sayyo_primary Header Englsih */
const HeaderGreenEn = () => {
  const router = useRouter();
  const path = router.pathname.substring(3);
  console.log(path);

  return (
    <header className="absolute z-20 w-[100%] bg-sayyo_primary ">
      <div
        className="m-auto my-0 pl-[24px] pr-[20px] flex items-center justify-between max-w-[1280px] h-[78px]

      md720:h-[57px] "
      >
        <Link href="/en/main">
          <Image
            src={logo_sayyo_small}
            alt="logo_sayyo_small"
            className="md720:w-[46.5px]"
          />
        </Link>
        <div className="flex items-center gap-[17px]">
          <Link href={`${path}`}>
            <button className="font-Roboto font-normal text-sayyo_wht md720:text-[12px] md720:leading-[15.6px]">
              Vietnamese
            </button>
          </Link>
          <div className="w-[1px] h-[13px] border-l-[1px] border-l-[#FFFFFF]/[.4] md720:h-[8.27px]" />

          <button className="font-Roboto font-bold text-base text-sayyo_wht underline underline-offset-[5px] md720:text-[12px] md720:leading-[15.6px] md720:underline-offset-[3px]">
            English
          </button>
        </div>
      </div>
    </header>
  );
};

Header.Green = HeaderGreen;
Header.En = HeaderEn;
Header.GreenEn = HeaderGreenEn;

export default Header;
