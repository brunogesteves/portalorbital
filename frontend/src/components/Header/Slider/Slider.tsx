"use client";
import SliderSlick from "react-slick";
import { SliderProps } from "@/utils/types";
import { useSlider } from "./useSlider";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import Image from "next/image";

export default function Slider({ device }: SliderProps) {
  const { data } = useSlider();

  if (!data.Slides || data.Slides.length === 0) {
    return (
      <div className="w-full aspect-[16/9] bg-gray-100 flex items-center justify-center rounded-2xl">
        <span className="text-gray-400">Carregando destaques...</span>
      </div>
    );
  }

  if (device === "desktop") {
    return (
      <section
        className="relative w-full h-[400px] aspect-[16/9] bg-black overflow-hidden group"
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

        <SliderSlick {...data.settings} className="desktop-slider-slick h-full">
          {data.typedSlides.map((slide) => (
            <Link href={`/${slide.slug}`} key={slide.id}>
              <div className="relative w-full h-full aspect-[16/9]  outline-none cursor-pointer">
                <Image
                  alt={slide.title}
                  width={1280}
                  height={720}
                  className="absolute inset-0 w-full h-full object-cover"
                  src={`${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}${slide.thumbnail}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                {/* <div className="absolute top-4 left-4">
                  <span className="bg-[#b91c1c] text-white text-[20px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider ml-[150px]">
                    Destaque
                  </span>
                </div> */}
                <div className="absolute bottom-4 flex justify-center w-full">
                  <h1 className="text-white font-sans font-bold text-xl md:text-2xl lg:text-3xl leading-tight max-w-4xl text-center px-8">
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
      <div className="w-full aspect-[16/9] bg-gray-100 rounded-2xl overflow-hidden shadow-md relative">
        <SliderSlick
          {...data.mobileSettings}
          className="mobile-slider-slick h-full"
        >
          {data.typedSlides.map((slide) => (
            <Link href={`/${slide.slug}`} key={slide.id}>
              <div className="relative w-full h-full aspect-[16/9] outline-none">
                <Image
                  alt={slide.title}
                  width={1280}
                  height={720}
                  className="absolute inset-0 w-full h-full object-cover"
                  src={`${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}${slide.thumbnail}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
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
