import React, { useEffect, useRef, useState } from "react";

import Link from "next/link";
import Head from "next/head";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { apiGetDetailJob, apiGetUserInfo } from "../../api/api";
import {
  ic_document,
  ic_pay,
  ic_pay_offer,
  ic_pay_request,
  ic_pin,
  ic_share_dark,
  logo_sayyo_white,
} from "../../assets";
import test from "../test";

const assetSrc = (asset: string | { src: string }) =>
  typeof asset === "string" ? asset : asset.src;

const DEFAULT_META_IMAGE =
  "https://mobileto-files.s3.amazonaws.com/og_image_sayyo.png";
const DEFAULT_META_DESCRIPTION =
  "Kết nối các người giải quyết vấn đề địa phương!";

type PostPageProps = {
  metaDescription: string;
  metaImage: string;
  metaTitle: string;
  metaUrl: string;
};

const buildAbsoluteUrl = (host?: string, path = "") => {
  if (!host) {
    return path;
  }

  const protocol =
    host.includes("localhost") || host.startsWith("127.0.0.1")
      ? "http"
      : "https";

  return `${protocol}://${host}${path}`;
};

const getDomainFromUrl = (url: string) => {
  try {
    return new URL(url).hostname;
  } catch {
    return "";
  }
};

const usePostPage = ({
  metaDescription,
  metaImage,
  metaTitle,
  metaUrl,
}: PostPageProps) => {
  const twitterDomain = getDomainFromUrl(metaUrl);

  const [share, setShare] = useState(false); // 공유하기 ticker 값
  const [data, setData] = useState<any>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [resCode, setResCode] = useState<string>("");
  const [userAvatar, setUserAvatar] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const router = useRouter();
  const postId =
    typeof router.query.id === "string" ? router.query.id : undefined;
  const appHubHref = postId ? `/appHub?${postId}` : "/appHub";

  /** 임시 옵션값 api 아직 없음. */
  const [tempOption, setTempOption] = useState<string>("offer");

  /** url 복사 및 팝업 */
  const shareHandler = () => {
    if (share) {
      return;
    }
    navigator.clipboard.writeText(window.location.href);
    setShare(true);
    setTimeout(() => setShare(false), 2000);
  };

  /**
   * 사용자의 브라우저 언어를 확인하여 EN, KO, VI 중 하나를 반환합니다.
   * 일치하는 언어가 없을 경우 기본값(Default)을 설정할 수 있습니다.
   */
  function getSupportedLanguage() {
    const browserLang = navigator.language;
    const langCode = browserLang.substring(0, 2).toLowerCase();

    switch (langCode) {
      case "ko":
        return "KO";
      case "en":
        return "EN";
      case "vi":
        return "VI";
      default:
        return "EN";
    }
  }

  /** 유저 정보 호출 */
  function getUserInfoHandler(id: number) {
    apiGetUserInfo(id).then((res) => {
      setUserAvatar(res.data.data.informationModel.avatar);
      setUserName(res.data.data.informationModel.name);
    });
  }

  /** 상세화면 호출 핸들러 실행 */
  useEffect(() => {
    if (!router.isReady || !postId) {
      return;
    }

    apiGetDetailJob(Number(postId)).then((res) => {
      const userLang = getSupportedLanguage();

      const matchedPost = res.data.data.translationJobPosts.find(
        (post: any) => post.languageTranslation === userLang,
      );

      const title = matchedPost
        ? matchedPost.titleTranslation
        : res.data.data.title;
      const description = matchedPost
        ? matchedPost.descriptionTranslation
        : res.data.data.description;

      setTitle(title);
      setDescription(description);
      setData(res.data.data);
      setResCode(res.data.responseCode);
      getUserInfoHandler(res.data.data.userId);
    });
  }, [postId, router.isReady]);

  // // id에 해당하는 포스트가 없을 때,
  // if (resCode === "404") {
  //   router.push("/sayyo");
  //   return <SayyoMeta />;
  // }

  // // 유효하지 않은 id 일 때,
  // if (resCode === "500") {
  //   router.push("/sayyo");
  //   return <SayyoMeta />;
  // }

  //informationModel.avatar
  //informationModel.name
  //experience.location

  /** informationModel.avatar 예외처리 함수 */
  const avatarHandler = (info: any) => {
    if (info?.avatar === null || info?.avatar === undefined) {
      return "";
    }
    return info.avatar;
  };

  /** informationModel.name 예외처리 함수 */
  const nameHandler = (info: any) => {
    if (info?.name === null || info?.name === undefined) {
      return "";
    }
    return info.name;
  };

  /** experience.location 예외처리 함수 */
  const locationHandler = (exp: any) => {
    if (exp?.location === null || exp?.location === undefined) {
      return "";
    }
    return exp.location;
  };

  // 반응형: 한 줄에 표시 가능한 신청자 카드 개수 계산
  const targetRepeat = 12; // 논리적으로 표시를 목표로 하는 최대 카드 개수
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [fitCount, setFitCount] = useState<number>(targetRepeat);

  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      const containerEl = containerRef.current;
      // 컨테이너의 실제 콘텐츠 영역 너비 계산 (양쪽 padding 제외)
      const styles = window.getComputedStyle(containerEl);
      const paddingLeft =
        parseFloat(styles.getPropertyValue("padding-left")) || 0;
      const paddingRight =
        parseFloat(styles.getPropertyValue("padding-right")) || 0;
      const containerWidth = Math.max(
        0,
        containerEl.clientWidth - paddingLeft - paddingRight,
      );

      // 카드 한 개의 폭을 동적으로 측정
      const probe = containerEl.querySelector(
        '[data-item="true"]',
      ) as HTMLElement | null;
      let itemWidth = probe?.clientWidth ?? 56; // fallback to image width

      // 컨테이너의 gap(px) 읽기 (Tailwind gap-[12px])
      const gapStr = (
        styles.getPropertyValue("column-gap") ||
        styles.getPropertyValue("gap") ||
        "12"
      ).trim();
      // 주의: overflow 시에는 컨테이너가 'justify-between'이 되어 CSS gap이 0으로 계산됩니다.
      // 레이아웃 수용량(capacity) 계산을 위해서는 설계상의 간격(12px)을 사용해야 합니다.
      let gap = parseInt(gapStr, 10);
      if (!gap || Number.isNaN(gap)) {
        gap = 12; // gap이 0 또는 NaN일 때 12px로 보정
      }

      // 한 줄에 들어갈 수 있는 카드 수 계산. 실제 표시 목표(desiredCount)가 초과될 때만 '+N' 배지용으로 1칸 예약
      const slot = itemWidth + gap;
      let maxItems = Math.floor((containerWidth + gap) / Math.max(slot, 1));

      const desiredCount = Math.min(targetRepeat, data?.userApply?.length || 0);

      if (desiredCount > maxItems) {
        // 초과 시: '+N' 배지를 위해 1칸 예약
        setFitCount(Math.max(0, maxItems - 1));
      } else {
        // 모두 표시 가능: 배지 없이 모두 노출
        setFitCount(desiredCount);
      }
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [data?.userApply?.length]);

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={metaImage} />
        <meta property="og:url" content={metaUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:domain" content={twitterDomain} />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={metaImage} />
        <meta name="twitter:url" content={metaUrl} />
      </Head>

      {/** data 받아오면 렌더링 */}
      {data && (
        <div className=" bg-[#F2F6F8] font-Roboto">
          <div
            className="flex flex-col min-h-[100vh] max-w-[768px] mx-auto border-x-[1px] border-x-[#DEE6EC] box-content
    md770:border-none
    "
          >
            {/** ticker */}
            <div
              className={
                share
                  ? `opacity-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center rounded-[8px] bg-[#000000]/70
      h-[59px] w-[239px]
      text-[16px] leading-[20.8px] text-sayyo_wht
      transition-all z-10
        `
                  : `opacity-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center rounded-[8px] bg-[#000000]/70
      h-[59px] w-[239px]
      text-[16px] leading-[20.8px] text-sayyo_wht transition-all`
              }
            >
              Share url copied successfully
            </div>
            {/** 헤더 */}
            <header className="h-[56px] pl-[16px] pr-[19px] flex justify-between items-center bg-sayyo_wht">
              <Link href="/">
                <img
                  src={assetSrc(logo_sayyo_white)}
                  alt="logo_sayyo_white"
                  className="w-[58px] h-[26px]"
                />
              </Link>
              <img
                src={assetSrc(ic_share_dark)}
                alt="ic_share_dark"
                onClick={() => shareHandler()}
                className="w-[24px] h-[24px] cursor-pointer"
              />
            </header>
            {/** 내용 */}
            <div className="flex-1">
              <div className="mb-[20px] p-[16px] bg-sayyo_wht">
                <h1 className="mb-[8px] text-sayyo_l2 text-[22px] font-bold leading-[28.6px]">
                  {`${title}`}
                </h1>
                <p className="mb-[12px] text-sayyo_l2 leading-[18.2px]">
                  {`${description}`}
                </p>
                <div className="mb-[12px] border-t-[1px] border-sayyo_bg_more border-dashed" />
                <div className="">
                  {/**
                   1. offer , sell, reqeust
                   2. offer, request, offer인 경우에는 현재 옵션이 없음.
                   3. 똑같음.
                   4. 작성자 프로필 - 현재 없음
                   5. 문구 offer & sell, request
                   6. 버튼 offer & sell, request
                   */}

                  {/** 금액 */}
                  <div className="mb-[6px] flex items-center gap-[8px]">
                    {/* {tempOption === "offer" && (
                  )} */}
                    <div className="relative w-[13px] h-[14px]">
                      <img
                        src={assetSrc(ic_pay)}
                        alt="ic_pay"
                        className="absolute -left-[1px]"
                      />
                    </div>
                    {/* {tempOption === "sell" && (
                      <Image quality={100} src={ic_pay} alt="ic_pay" />
                    )}
                    {tempOption === "request" && (
                      <Image quality={100} src={ic_pay_request} alt="ic_pay_request" />
                    )} */}

                    <div className="text-sayyo_l2 text-[14px] leading-[16.8px]">
                      {`${data.price
                        .toString()
                        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}`}
                      đ
                    </div>
                  </div>
                  {/**
                   *
                   * 0 request
                   * 1 offer
                   * 2 sell
                   */}
                  {/** 옵션 */}
                  {data.mainCategoryId !== 2 && (
                    <div className="mb-[6px] flex items-center gap-[8px]">
                      <img src={assetSrc(ic_document)} alt="ic_document" />
                      <div className="flex items-center gap-[6px] text-sayyo_l2 text-[14px] leading-[16.8px]">
                        {data.gender !== "NOMATTER" && (
                          <>
                            <span>
                              {data.gender === "MAN" ? "Man" : "Woman"}
                            </span>
                            <div className="h-[10px] border-l-[1px] border-[#000000]/10" />
                          </>
                        )}

                        {data.experience === -1 ? (
                          <></>
                        ) : (
                          <>
                            <span>{`${data.experience}`} year exp</span>
                            <div className="h-[10px] border-l-[1px] border-[#000000]/10" />
                          </>
                        )}

                        <span>{`${data.vacancy}`} people</span>
                      </div>
                    </div>
                  )}

                  {/** 위치 */}
                  <div className="flex items-center gap-[8px]">
                    <img src={assetSrc(ic_pin)} alt="ic_pin" />
                    <div className="text-sayyo_l2 text-[14px] leading-[16.8px]">
                      {`${data.location}`}
                    </div>
                  </div>
                </div>

                {/** image */}
                {data.urlImage && data.urlImage.length !== 0 ? (
                  <Link href={appHubHref}>
                    <div className="mt-[12px] flex gap-[1px] max-h-[217px] min-h-[96px] aspect-[736/217] rounded-[9px] cursor-pointer overflow-hidden bg-sayyo_wht">
                      {data.urlImage.length <= 3
                        ? data.urlImage.map((el: any, j: number) => {
                            return (
                              <div
                                className="flex-1 relative bg-sayyo_wht"
                                key={`abx${j}`}
                              >
                                <img
                                  src={el}
                                  alt="sample1"
                                  className="w-full h-full object-cover object-center"
                                />
                              </div>
                            );
                          })
                        : data.urlImage.map((el: any, j: number) => {
                            if (j >= 3) {
                              return;
                            }

                            if (j === 2) {
                              return (
                                <div
                                  className="flex-1 relative bg-sayyo_wht"
                                  key={`${j}as`}
                                >
                                  <img
                                    src={el}
                                    alt="sample2"
                                    className="w-full h-full object-cover object-center"
                                  />
                                  <div className="absolute w-full h-full bg-opacity-40 bg-[#000000]"></div>
                                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18px] text-sayyo_wht leading-[22.5px]">
                                    +2
                                  </span>
                                </div>
                              );
                            }
                            return (
                              <div
                                className="flex-1 relative bg-sayyo_wht"
                                key={`abx${j}`}
                              >
                                <img
                                  src={el}
                                  alt="sample1"
                                  className="w-full h-full object-cover object-center"
                                />
                              </div>
                            );
                          })}
                    </div>
                  </Link>
                ) : (
                  ""
                )}

                <div className="mt-[12px] mb-[6px] border-t-[1px] border-sayyo_bg_more border-dashed" />
                <Link
                  href={appHubHref}
                  className="flex w-fit gap-[8px] items-center cursor-pointer"
                >
                  {userAvatar && userName ? (
                    <>
                      <img
                        src={userAvatar}
                        alt="userAvatar"
                        className="rounded-full w-[56px] h-[56px]"
                      />
                      <span className="text-[12px] leading-[13.2px]">
                        {userName}
                      </span>
                    </>
                  ) : (
                    <div className="h-[56px]"></div>
                  )}
                </Link>
              </div>

              {/** applicnats */}
              {data.userApply.length === 0 ? (
                <Link href={appHubHref}>
                  <div className="mb-[20px] h-[142px] flex items-center justify-center bg-sayyo_wht cursor-pointer">
                    <div className="text-sayyo_subtext text-[16px] leading-[20.8px]">
                      No applicants yet
                    </div>
                  </div>
                </Link>
              ) : (
                <Link href={appHubHref}>
                  <div className="mb-[20px] pt-[9.5px] min-h-[167px] box-border bg-sayyo_wht cursor-pointer">
                    <div className="flex justify-between items-center mb-[19px]">
                      <div className="flex pl-[20px] text-[16px] font-bold leading-[20.8px]">
                        {tempOption !== "request" && (
                          <span>Requests&nbsp;</span>
                        )}
                        {tempOption === "request" && (
                          <span>Applicants&nbsp;</span>
                        )}

                        <span className="font-normal">{`${data.userApply.length}`}</span>
                      </div>
                      {/** 상단 more 부분: 배지(하단)가 필요한 경우(오버플로우)만 노출 */}
                      <div className="pr-[21px] text-sayyo_subtext text-[12px] leading-[15.6px]">
                        {Math.min(targetRepeat, data.userApply.length) >
                          fitCount && (
                          <span className="md767:hidden">More</span>
                        )}
                      </div>
                    </div>
                    {/** 오버플로우 숨김 */}
                    <div
                      ref={containerRef}
                      className={`flex ${
                        Math.min(targetRepeat, data.userApply.length) > fitCount
                          ? "justify-between"
                          : "gap-[12px]"
                      } w-full px-[16px] pb-[22px] overflow-hidden`}
                    >
                      {data.userApply
                        .slice(0, fitCount)
                        .map((i: any, j: number) => {
                          return (
                            <div
                              key={`${j}546`}
                              className="shrink-0 w-[56px]"
                              data-item="true"
                            >
                              <div>
                                <img
                                  src={avatarHandler(i.informationModel)}
                                  alt="sample"
                                  className="rounded-full mb-[8.42px] w-[56px] h-[56px]"
                                />
                                <div className="mb-[1px] text-center text-sayyo_l2 text-[12px] leading-[15.6px]">
                                  {`${nameHandler(i.informationModel)}`}
                                </div>
                                <div className="text-center text-sayyo_subtext text-[12px] leading-[15.6px]">
                                  {`${locationHandler(i.experience)}`}
                                </div>
                              </div>
                            </div>
                          );
                        })}

                      {/** 추가 표시: 목표(최대) 개수 또는 데이터 전체를 모두 보여줄 수 없을 때 노출 */}
                      {Math.min(targetRepeat, data.userApply.length) >
                        fitCount && (
                        <div className="shrink-0 md767:hidden">
                          <div
                            className={`flex items-center justify-center rounded-full mb-[8.42px] w-[56px] h-[56px] bg-sayyo_subtext text-sayyo_wht text-[16px] leading-[16px]`}
                          >
                            +
                            {Math.min(targetRepeat, data.userApply.length) -
                              fitCount}
                          </div>
                          <div className="text-center text-sayyo_l2 text-[12px] leading-[15.6px]">
                            More
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              )}
              {/** 하단 버튼 */}
            </div>
            <div
              className="p-[16px] bottom-0 max-w-[768px] w-full bg-sayyo_wht
              border-t border-t-[#DEE6EC]

        "
            >
              <Link href={appHubHref}>
                <button className="w-full h-[48px] text-sayyo_wht text-[14px] font-bold leading-[18.2px] rounded-[8px] bg-sayyo_primary">
                  {tempOption !== "request" && <span>I want it</span>}
                  {tempOption === "request" && <span>Apply</span>}
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps<PostPageProps> = async (
  context,
) => {
  const id = context.params?.id;
  const postId = Array.isArray(id) ? id[0] : id;
  const host = context.req.headers.host;
  const path = context.resolvedUrl || `/post/${postId ?? ""}`;
  const metaUrl = buildAbsoluteUrl(host, path);

  if (!postId) {
    return {
      props: {
        metaDescription: DEFAULT_META_DESCRIPTION,
        metaImage: DEFAULT_META_IMAGE,
        metaTitle: "Sayyo",
        metaUrl,
      },
    };
  }

  try {
    const res = await apiGetDetailJob(Number(postId));
    const data = res?.data?.data;
    const metaTitle = data?.title || "Sayyo";
    const metaDescription = data?.description || DEFAULT_META_DESCRIPTION;
    const metaImage = data?.urlImage?.[0] || DEFAULT_META_IMAGE;

    return {
      props: {
        metaDescription,
        metaImage,
        metaTitle,
        metaUrl,
      },
    };
  } catch {
    return {
      props: {
        metaDescription: DEFAULT_META_DESCRIPTION,
        metaImage: DEFAULT_META_IMAGE,
        metaTitle: "Sayyo",
        metaUrl,
      },
    };
  }
};

export default usePostPage;
