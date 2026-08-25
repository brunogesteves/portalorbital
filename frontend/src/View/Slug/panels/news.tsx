import Header from "@/components/Header/Header";

import { NewsDataProps } from "@/utils/types";
import Image from "next/image";
import {
  AudioPlayerDesktop,
  AudioPlayerMobile,
} from "@/components/AudioPlayer/AudioPlayer";
import { imageUrl } from "@/utils/api";
import { ShareButton } from "@/components/ShareButton";
import JsonLD from "@/components/jsonLd";

export default function NewsPage({ data }: NewsDataProps) {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col font-awanzaman">
      <JsonLD description={data.title} />
      <Header slug={data.title as string} />
      <div className="hidden md:block text-gray-800 min-h-screen bg-white">
        <main className="w-full min-h-screen">
          <div
            id="adsense-desktop-top"
            aria-label="Publicidade"
            className="w-full flex justify-center items-center py-3 bg-gray-50 border-y border-gray-100"
            style={{ minHeight: "90px" }}
          >
          </div>
          <section
            className="bg-white py-12 px-6 md:px-16"
            data-purpose="article-reading-section"
          >
            <div className="max-w-4xl mx-auto space-y-12">
              <article className="flex flex-col">
                <h1 className="text-gray-900 font-bold text-3xl md:text-5xl leading-tight mb-8 first-letter:capitalize">
                  {data.title}
                </h1>
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                  <div className="flex flex-col">
                    <span className="text-gray-500 text-xs mb-1">
                      {new Date(data?.createdAt).toLocaleDateString("pt-BR")}
                    </span>
                    <span className="text-blue-700 text-sm font-bold">
                      {data.author?.name}
                    </span>
                  </div>
                  <div className="flex space-x-4">
                    <ShareButton url={data.slug} />
                  </div>
                </div>
                {/* Photo */}
                <div className="mb-8  rounded-lg overflow-hidden shadow-xl border border-gray-100 ">
                  <Image
                    alt={data.title}
                    width={640}
                    height={360}
                    loading="eager"
                    unoptimized
                    className="object-cover aspect-video w-full"
                    src={`${imageUrl}/${data.thumbnail}`}
                  />
                </div>
                <AudioPlayerDesktop content={data.content} />
                <div className="space-y-6">
                  <div className="text-gray-700 text-lg leading-relaxed space-y-4">
                    <div dangerouslySetInnerHTML={{ __html: data.content }} />
                  </div>
                </div>
              </article>

              <div className="border-t border-gray-200"></div>
              <div
                id="adsense-desktop-mid"
                aria-label="Publicidade"
                className="w-full flex justify-center items-center py-4"
                style={{ minHeight: "280px" }}
              >
              </div>
            </div>
          </section>
        </main>
      </div>
      <div className="block md:hidden text-gray-800 min-h-screen bg-white flex flex-col ">
        <main
          className="p-4 bg-white overflow-y-auto no-scrollbar flex-1"
          style={{ paddingBottom: "80px" }}
        >
          {/* <Slider device="mobile" /> */}

          <div
            id="adsense-mobile-top"
            aria-label="Publicidade"
            className="w-full flex justify-center items-center my-2 bg-gray-50"
            style={{ minHeight: "50px" }}
          >
            {/* ADSENSE BANNER MOBILE 320x50 — cole o script aqui */}
          </div>

          <div className="mb-3 mt-4">
            <p className="text-[11px] text-gray-500 font-medium">
              {new Date(data.createdAt).toLocaleDateString("pt-BR")}
            </p>
          </div>

          {/* Author Name with Avatar */}
          <div className="flex items-center gap-2 mb-4">
            {/* <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
              <img
                alt="Redação Orbital"
                className="w-full h-full object-cover"
                src={process.env.NEXT_PUBLIC_API_URL + data.thumbnail}
              />
            </div> */}
            <p className="text-sm font-bold text-gray-800">
              {data.author?.name}
            </p>
          </div>
          <div className="flex justify-end items-end gap-3 mb-6">
            <ShareButton url={data.slug} />
          </div>

          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-3 first-letter:capitalize">
            {data.title}
          </h1>
          <div className="relative w-full mb-4 rounded-lg overflow-hidden shadow-sm">
            <Image
              alt={data.title}
              className="w-full h-auto aspect-video object-cover"
              src={`${imageUrl}/${data.thumbnail}`}
              width={640}
              height={360}
              unoptimized
              loading="eager"
            />

            {/* <div className="bg-black/50 absolute bottom-0 left-0 right-0 p-2">
              <p className="text-[10px] text-white/80">
                Representação holográfica da malha neural quântica do Orbital
                Channel. (Foto: Divulgação)
              </p>
            </div> */}
          </div>

          <AudioPlayerMobile content={data.content} />
          {/* <div
            id="adsense-mobile-mid"
            aria-label="Publicidade"
            className="w-full flex justify-center items-center my-4 bg-gray-50"
            style={{ minHeight: "250px" }}
          />           */}


          {/* News Text Content */}
          <article className="prose prose-slate max-w-none">
            <div dangerouslySetInnerHTML={{ __html: data.content }} />
          </article>
        </main>
      </div>
    </div>
  );
}
