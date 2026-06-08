import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiShare2 } from "react-icons/fi";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import Slider from "@/components/Header/Slider/Slider";
import { NewsDataProps } from "@/utils/types";
import Image from "next/image";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import { Metadata } from "next";
import { getSlugMetadata } from "@/utils/metadatas";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return getSlugMetadata({ params });
}
export default function NewsPage({ data }: NewsDataProps) {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col font-awanzaman">
      <Header slug={data.title as string} />

      {/* ========================================================================= */}
      {/* 💻 DESKTOP LAYOUT (md breakpoint and above)                              */}
      {/* ========================================================================= */}
      <div className="hidden md:block text-gray-800 min-h-screen bg-white">
        <main className="w-full min-h-screen">
          {/* <Slider device="desktop" /> */}

          {/* ================================================================ */}
          {/* 📢 ADSENSE ZONE — Desktop Top Leaderboard (728x90)              */}
          {/* Coloque aqui o código do bloco de anúncio do Google AdSense     */}
          {/* ================================================================ */}
          <div
            id="adsense-desktop-top"
            aria-label="Publicidade"
            className="w-full flex justify-center items-center py-3 bg-gray-50 border-y border-gray-100"
            style={{ minHeight: "90px" }}
          >
            {/* ADSENSE LEADERBOARD 728x90 — cole o script aqui */}
          </div>

          {/* Dedicated Article Reading Area */}
          <section
            className="bg-white py-12 px-6 md:px-16"
            data-purpose="article-reading-section"
          >
            <div className="max-w-4xl mx-auto space-y-12">
              <article className="flex flex-col">
                {/* Headline */}
                <h1 className="text-gray-900 font-bold text-3xl md:text-5xl leading-tight mb-8 first-letter:capitalize">
                  {data.title}
                </h1>

                {/* Header Info and Social Icons Row */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                  <div className="flex flex-col">
                    <span className="text-gray-500 text-xs mb-1">
                      {new Date(data.createdAt).toLocaleDateString("pt-BR")}
                    </span>
                    <span className="text-blue-700 text-sm font-bold">
                      {data.author?.name}
                    </span>
                  </div>

                  {/* Social Media Icons */}
                  <div className="flex space-x-4">
                    <button
                      aria-label="Facebook"
                      className="text-gray-400 hover:text-blue-700 transition-colors"
                    >
                      <FaFacebookF className="w-5 h-5" />
                    </button>
                    <button
                      aria-label="X (Twitter)"
                      className="text-gray-400 hover:text-blue-700 transition-colors"
                    >
                      <FaXTwitter className="w-5 h-5" />
                    </button>
                    <button
                      aria-label="Compartilhar"
                      className="text-gray-400 hover:text-blue-700 transition-colors"
                    >
                      <FiShare2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <AudioPlayer content={data.content} />

                {/* Photo */}
                <div className="mb-8 bg-red-500 rounded-lg overflow-hidden shadow-xl border border-gray-100 ">
                  <Image
                    alt={data.title}
                    width={640}
                    height={360}
                    className="object-cover aspect-video w-full"
                    src={`${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}${data.thumbnail}`}
                  />
                </div>

                <div className="space-y-6">
                  <div className="text-gray-700 text-lg leading-relaxed space-y-4">
                    <div dangerouslySetInnerHTML={{ __html: data.content }} />
                  </div>
                </div>
              </article>

              <div className="border-t border-gray-200"></div>

              {/* ================================================================ */}
              {/* 📢 ADSENSE ZONE — Desktop Mid Rectangle (336x280)              */}
              {/* Coloque aqui o código do bloco de anúncio do Google AdSense    */}
              {/* ================================================================ */}
              <div
                id="adsense-desktop-mid"
                aria-label="Publicidade"
                className="w-full flex justify-center items-center py-4"
                style={{ minHeight: "280px" }}
              >
                {/* ADSENSE RECTANGLE 336x280 — cole o script aqui */}
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* ========================================================================= */}
      {/* 📱 MOBILE LAYOUT (below md breakpoint)                                   */}
      {/* ========================================================================= */}
      <div className="block md:hidden text-gray-800 min-h-screen bg-white flex flex-col ">
        <main
          className="p-4 bg-white overflow-y-auto no-scrollbar flex-1"
          style={{ paddingBottom: "80px" }}
        >
          {/* <Slider device="mobile" /> */}

          {/* ================================================================ */}
          {/* 📢 ADSENSE ZONE — Mobile Top Banner (320x50)                   */}
          {/* Coloque aqui o código do bloco de anúncio do Google AdSense    */}
          {/* ================================================================ */}
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

          {/* Social Media Share Icons */}
          <div className="flex justify-end items-end gap-3 mb-6">
            <button
              aria-label="WhatsApp"
              className="w-8 h-8 rounded-full flex items-center justify-center bg-[#25D366] text-white"
            >
              <FaWhatsapp className="text-sm" />
            </button>
            <button
              aria-label="Facebook"
              className="w-8 h-8 rounded-full flex items-center justify-center bg-[#1877F2] text-white"
            >
              <FaFacebookF className="text-sm" />
            </button>
            <button
              aria-label="X (Twitter)"
              className="w-8 h-8 rounded-full flex items-center justify-center bg-black text-white"
            >
              <FaXTwitter className="text-sm" />
            </button>
            <button
              aria-label="Compartilhar"
              className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-200 text-gray-600"
            >
              <FiShare2 className="text-sm" />
            </button>
          </div>

          {/* Audio Player */}
          <AudioPlayer content={data.content} />

          {/* Main News Image */}
          <div className="relative w-full mb-4 rounded-lg overflow-hidden shadow-sm">
            <Image
              alt={data.title}
              className="w-full h-auto aspect-video object-cover"
              src={`${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}${data.thumbnail}`}
              width={640}
              height={360}
            />
            {/* <div className="bg-black/50 absolute bottom-0 left-0 right-0 p-2">
              <p className="text-[10px] text-white/80">
                Representação holográfica da malha neural quântica do Orbital
                Channel. (Foto: Divulgação)
              </p>
            </div> */}
          </div>

          {/* ================================================================ */}
          {/* 📢 ADSENSE ZONE — Mobile Mid Rectangle (300x250)               */}
          {/* Inserido após a imagem de capa, antes do texto — alta CTR      */}
          {/* ================================================================ */}
          <div
            id="adsense-mobile-mid"
            aria-label="Publicidade"
            className="w-full flex justify-center items-center my-4 bg-gray-50"
            style={{ minHeight: "250px" }}
          >
            {/* ADSENSE RECTANGLE MOBILE 300x250 — cole o script aqui */}
          </div>

          {/* News Text Content */}
          <article className="prose prose-slate max-w-none">
            <h1 className="text-2xl font-extrabold text-gray-900 leading-tight mb-3">
              {data.title}
            </h1>
            <div dangerouslySetInnerHTML={{ __html: data.content }} />
          </article>
        </main>
      </div>

      <Footer />
    </div>
  );
}
