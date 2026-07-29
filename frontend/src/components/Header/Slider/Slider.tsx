"use client";
import SliderSlick from "react-slick";
import { SliderProps } from "@/utils/types";
import { useSlider } from "./useSlider";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import Image from "next/image";
import { imageUrl } from "@/utils/api";

export default function Slider({ device }: SliderProps) {
  const { data } = useSlider();

  if (!data.slides || data.slides.length === 0) {
    return (
      <div className="w-full h-60 aspect-video bg-gray-100 flex items-center justify-center rounded-2xl">
        <span className="text-gray-400">Carregando destaques...</span>
      </div>
    );
  }

  if (device === "desktop") {
    return (
      <section
        className="relative w-full aspect-video bg-black overflow-hidden group h-100"
        data-purpose="hero-slider"
      >
        <style>{`
          .slick-slider, .slick-list, .slick-track, .slick-slide > div {
            height: 100%;
          }
          .desktop-slider-slick .slick-dots {
            bottom: 12px !important;
            display: flex !important;
            justify-content: center;
            align-items: center;
            left: 50% !important;
            transform: translateX(-50%) !important;
            width: auto !important;
            padding: 0;
            margin: 0;
            list-style: none;
          }
          .desktop-slider-slick .slick-dots li {
            margin: 0 4px !important;
            width: 8px !important;
            height: 8px !important;
            display: inline-block;
          }
          .desktop-slider-slick .slick-dots li button {
            width: 8px !important;
            height: 8px !important;
            padding: 0 !important;
            border: none;
            background: transparent;
            cursor: pointer;
          }
          .desktop-slider-slick .slick-dots li button:before {
            font-size: 8px !important;
            color: white !important;
            opacity: 0.5 !important;
            width: 8px !important;
            height: 8px !important;
            content: '•' !important;
            display: block;
            line-height: 8px;
            text-align: center;
          }
          .desktop-slider-slick .slick-dots li.slick-active button:before {
            color: #b91c1c !important;
            opacity: 1 !important;
          }
        `}</style>

        <SliderSlick
          {...data.settings}
          className="desktop-slider-slick"
        >
          {data.typedSlides.map((slide) => (
            <Link
              href={`/${slide.slug}`}
              key={slide.id}
              className="block w-full"
            >
              <div className="relative w-full aspect-video overflow-hidden rounded-lg h-fit">
                <Image
                  alt={slide.title}
                  src={`${imageUrl}/${slide.thumbnail}`}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-100% to-transparent z-0" />

                <div className="absolute top-80 left-1/2 w-full  text-center  translate-x-[-50%] p-3 sm:p-4 pb-5 sm:pb-8">
                  <h1 className="text-white  font-bold text-[2rem]! sm:text-base leading-tight line-clamp-2 first-letter:capitalize">
                    {slide.title}
                  </h1>
                </div>
              </div>
            </Link>
          ))}
        </SliderSlick>
      </section>
    );
  }

  return (
    <div className="relative mb-8">
      <style>{`
        .mobile-slider-slick .slick-dots {
          bottom: 12px !important;
          display: flex !important;
          justify-content: center;
          align-items: center;
          left: 50% !important;
          transform: translateX(-50%) !important;
          width: auto !important;
          padding: 0;
          margin: 0;
          list-style: none;
        }
        .mobile-slider-slick .slick-dots li {
          margin: 0 4px !important;
          width: 8px !important;
          height: 8px !important;
          display: inline-block;
        }
        .mobile-slider-slick .slick-dots li button {
          width: 8px !important;
          height: 8px !important;
          padding: 0 !important;
          border: none;
          background: transparent;
          cursor: pointer;
        }
        .mobile-slider-slick .slick-dots li button:before {
          font-size: 8px !important;
          color: white !important;
          opacity: 0.5 !important;
          width: 8px !important;
          height: 8px !important;
          content: '•' !important;
          display: block;
          line-height: 8px;
          text-align: center;
        }
        .mobile-slider-slick .slick-dots li.slick-active button:before {
          color: #2563eb !important;
          opacity: 1 !important;
        }
      `}</style>
      <div className="w-full  aspect-video bg-gray-100 rounded-2xl overflow-hidden shadow-md relative">
        <SliderSlick
          {...data.mobileSettings}
          className="mobile-slider-slick h-full"
        >
          {data.typedSlides.map((slide) => (
            <Link href={`/${slide.slug}`} key={slide.id}>
              <div className="relative w-full h-full aspect-video outline-none">
                <Image
                  alt={slide.title}
                  src={`${imageUrl}/${slide.thumbnail}`}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 pb-8">
                  {/* <span className="bg-[#b91c1c] text-white text-[12px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider mb-2 inline-block">
                  Destaque
                </span> */}
                  <h3 className="text-white font-bold text-base leading-tight">
                    {slide.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </SliderSlick>
      </div>
    </div>
  );
}
