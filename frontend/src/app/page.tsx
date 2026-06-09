"use client";

import {
  FaRobot,
  FaSatellite,
  FaInfinity,
  FaLinux,
  FaRocket,
  FaFacebookF,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

import Footer from "@/components/Footer";
import Slider from "@/components/Header/Slider/Slider";
import Header from "@/components/Header/Header";
// import { metadataHome } from "@/utils/metadatas";
import { useHome } from "./useHome";

// export  const metadata = metadataHome;

export default function Home() {
  const { data, methods } = useHome();
  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      {/* <Header slug="Home"/> */}
      {/* <Header slug="Home" /> */}
      {/* ========================================================================= */}
      {/* 💻 DESKTOP LAYOUT (md breakpoint and above)                              */}
      {/* ========================================================================= */}
      <div className="hidden md:block text-gray-800 min-h-screen bg-white">
        {/* BEGIN: MainContentPlaceholder */}
        <main className="w-full min-h-screen">
          <Slider device="desktop" />
          <section className="bg-white py-12" data-purpose="main-content-body">
            <div className="max-w-7xl mx-auto px-6">
              {/* Featured Content */}
              <section className="mb-12">
                <div className="flex items-center space-x-4 mb-6">
                  <h2 className="text-xl font-bold text-[#111415] whitespace-nowrap">
                    Destaques do Portal
                  </h2>
                  <div className="h-[1px] bg-gray-200 w-full"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {data.posts
                    .slice(0, 3)
                    .map((post) => methods.postCardDesktop(post))}
                </div>
              </section>

              {/* Tecnologia with Events Embedded */}
              <div className="mb-4">
                <div className="flex items-center space-x-4 mb-6">
                  <h2 className="text-xl font-bold text-[#111415] whitespace-nowrap">
                    Tecnologia
                  </h2>
                  <div className="h-[1px] bg-gray-200 w-full"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  {/* Main Technology Icons */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:col-span-9">
                    <div className="bg-gray-800 rounded-xl p-4 flex flex-col items-center justify-center text-center space-y-2 cursor-pointer aspect-square">
                      <FaRobot className="text-white text-3xl" />
                      <span className="text-white text-[10px] font-bold">
                        Robotics
                      </span>
                    </div>
                    <div className="bg-blue-900 rounded-xl p-4 flex flex-col items-center justify-center text-center space-y-2 cursor-pointer aspect-square">
                      <FaSatellite className="text-white text-3xl" />
                      <span className="text-white text-[10px] font-bold">
                        Satellites
                      </span>
                    </div>
                    <div className="bg-blue-600 rounded-xl p-4 flex flex-col items-center justify-center text-center space-y-2 cursor-pointer aspect-square">
                      <FaInfinity className="text-white text-3xl" />
                      <span className="text-white text-[10px] font-bold uppercase">
                        Meta &amp; Facebook
                      </span>
                    </div>
                    <div className="bg-gray-100 border border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center text-center space-y-2 cursor-pointer aspect-square">
                      <FaLinux className="text-gray-800 text-3xl" />
                      <span className="text-gray-800 text-[10px] font-bold">
                        Linux
                      </span>
                    </div>
                    <div className="bg-[#0B3D91] rounded-xl p-4 flex flex-col items-center justify-center text-center space-y-2 cursor-pointer aspect-square">
                      <FaRocket className="text-white text-3xl" />
                      <span className="text-white text-[10px] font-bold">
                        NASA
                      </span>
                    </div>
                  </div>

                  {/* Embedded Eventos Component */}
                  <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 md:col-span-3">
                    <div className="flex items-center space-x-2 mb-4">
                      <h3 className="text-sm font-bold text-[#111415] uppercase tracking-wider">
                        Eventos Próximos
                      </h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-4 p-2 bg-white rounded-lg border border-gray-100">
                        <div className="bg-red-600 text-white rounded p-1 text-center min-w-[45px]">
                          <div className="text-[8px] uppercase font-bold leading-tight">
                            Julho
                          </div>
                          <div className="text-lg font-black leading-none">
                            18
                          </div>
                        </div>
                        <div>
                          <div className="text-[9px] text-gray-500 font-bold uppercase">
                            Redes Sociais
                          </div>
                          <div className="text-[11px] font-bold text-[#111415] leading-tight">
                            Como criar conteúdo de alto impacto
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 p-2 bg-white rounded-lg border border-gray-100">
                        <div className="bg-red-600 text-white rounded p-1 text-center min-w-[45px]">
                          <div className="text-[8px] uppercase font-bold leading-tight">
                            Julho
                          </div>
                          <div className="text-lg font-black leading-none">
                            20
                          </div>
                        </div>
                        <div>
                          <div className="text-[9px] text-gray-500 font-bold uppercase">
                            Mídias Sociais
                          </div>
                          <div className="text-[11px] font-bold text-[#111415] leading-tight">
                            Novas ferramentas para influenciadores
                          </div>
                        </div>
                      </div>
                      <button className="w-full py-2 bg-gray-200 hover:bg-gray-300 transition-colors text-gray-600 text-[9px] font-bold rounded-lg uppercase tracking-wider">
                        Ver Agenda
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mundo Geek with Social Embedded */}
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <h2 className="text-xl font-bold text-[#111415] whitespace-nowrap">
                    Mundo Geek
                  </h2>
                  <div className="h-[1px] bg-gray-200 w-full"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  {/* Main Geek Cards */}
                  <div className="md:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {data.posts
                      .slice(0, 3)
                      .map((post) => methods.geekCardsDesktop(post))}
                  </div>

                  {/* Embedded Redes Sociais Component */}
                  <div className="md:col-span-3 space-y-4">
                    <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 flex flex-col justify-center h-full">
                      <h3 className="text-sm font-bold text-[#111415] uppercase tracking-wider mb-4 text-center">
                        Conecte-se
                      </h3>
                      <div className="space-y-3">
                        <a
                          className="flex items-center justify-center space-x-2 bg-[#3b5998] text-white py-3 rounded-full font-bold text-[10px] shadow-lg shadow-blue-500/20 hover:opacity-90 transition-opacity"
                          href="#"
                        >
                          <FaFacebookF className="text-sm" />
                          <span>Facebook</span>
                        </a>
                        <a
                          className="flex items-center justify-center space-x-2 bg-[#00acee] text-white py-3 rounded-full font-bold text-[10px] shadow-lg shadow-blue-400/20 hover:opacity-90 transition-opacity"
                          href="#"
                        >
                          <FaXTwitter className="text-sm" />
                          <span>Twitter / X</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <section className="mb-12">
                <div className="flex items-center space-x-4 mb-6 mt-10">
                  <h2 className="text-xl font-bold text-[#111415] whitespace-nowrap">
                    Categoria
                  </h2>
                  <div className="h-[1px] bg-gray-200 w-full"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {data.posts.slice(0, 3).map((post) => (
                    <Link key={post.id} href={post.slug}>
                      <div className="relative group rounded-xl overflow-hidden aspect-[4/3] bg-gray-100 cursor-pointer">
                        <Image
                          alt={post.title}
                          className="absolute inset-0 w-full h-full object-cover"
                          src={`${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}${post.thumbnail}`}
                          fill
                          loading="eager"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                          <h3 className="text-white font-bold text-sm first-letter:capitalize">
                            {post.category?.name}
                          </h3>
                          <h3 className="text-white font-bold text-sm first-letter:capitalize">
                            {post.title}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
              <section className="mb-12">
                <div className="flex items-center space-x-4 mb-6 mt-10">
                  <h2 className="text-xl font-bold text-[#111415] whitespace-nowrap">
                    Categoria
                  </h2>
                  <div className="h-[1px] bg-gray-200 w-full"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {data.posts.slice(0, 3).map((post) => (
                    <Link key={post.id} href={post.slug}>
                      <div className="relative group rounded-xl overflow-hidden aspect-[4/3] bg-gray-100 cursor-pointer">
                        <Image
                          alt={post.title}
                          className="absolute inset-0 w-full h-full object-cover"
                          src={`${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}${post.thumbnail}`}
                          fill
                          loading="eager"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                          <h3 className="text-white font-bold text-sm first-letter:capitalize">
                            {post.category?.name}
                          </h3>
                          <h3 className="text-white font-bold text-sm first-letter:capitalize">
                            {post.title}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
              <section className="mb-12">
                <div className="flex items-center space-x-4 mb-6 mt-10">
                  <h2 className="text-xl font-bold text-[#111415] whitespace-nowrap">
                    Categoria
                  </h2>
                  <div className="h-[1px] bg-gray-200 w-full"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {data.posts.slice(0, 3).map((post) => (
                    <Link key={post.id} href={post.slug}>
                      <div className="relative group rounded-xl overflow-hidden aspect-[4/3] bg-gray-100 cursor-pointer">
                        <Image
                          alt={post.title}
                          className="absolute inset-0 w-full h-full object-cover"
                          src={`${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}${post.thumbnail}`}
                          fill
                          loading="eager"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                          <h3 className="text-white font-bold text-sm first-letter:capitalize">
                            {post.category?.name}
                          </h3>
                          <h3 className="text-white font-bold text-sm first-letter:capitalize">
                            {post.title}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            </div>
          </section>
        </main>
      </div>

      {/* ========================================================================= */}
      {/* 📱 MOBILE LAYOUT (below md breakpoint)                                   */}
      {/* ========================================================================= */}
      <div className="block md:hidden text-gray-800 min-h-screen bg-white flex flex-col w-full">
        {/* Content Area */}
        <main
          className="p-4 bg-white overflow-y-auto no-scrollbar flex-1"
          style={{ paddingBottom: "80px" }}
        >
          <Slider device="mobile" />

          <section className="grid grid-cols-2 gap-4">
            {data.posts.slice(0, 8).map((post) => methods.postCardMobile(post))}
            {data.posts.slice(0, 8).map((post) => (
              <Link key={post.id} href={post.slug}>
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-sm cursor-pointer">
                  <Image
                    alt={post.title}
                    className="w-full h-full object-cover"
                    src={`${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}${post.thumbnail}`}
                    fill
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end items-start gap-y-2 p-3">
                    <h3 className="text-white font-bold text-xs leading-tight first-letter:uppercase">
                      {post.category?.name}
                    </h3>
                    <h1 className="text-white font-bold text-xs leading-tight first-letter:uppercase">
                      {post.title}
                    </h1>
                  </div>
                </div>
              </Link>
            ))}
          </section>

          <section className="mt-8 mb-4">
            <div className="flex items-center gap-2 px-1">
              <span
                className="text-[#222] font-bold text-xs tracking-tight uppercase"
                style={{ fontFamily: "sans-serif" }}
              >
                Categoria
              </span>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-[#999] to-[#ccc]"></div>
            </div>
          </section>

          <section className="grid grid-cols-2 gap-4 mt-4">
            {/* Card 7 */}
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-sm cursor-pointer">
              <Image
                alt="Future Luxury Travel"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDb4YjwIlSMZwwdlhvIzyrxCF1MW4mcVvQZwwyZkM2YuvclqMYreDeYlbaOVKoFhm-XkVwO8J5rIllXEDcOyvPTb3rn2g3WBvprtpulnrdG4UYcx-6rWCg2f-QrZc5NIbeIiLhMvVz-Sq40qf0CzHa0HjVYSWhUfL7XEu1A9VUhSW4W6r6lHlHVyV3ce8l4i8qI9IOJ7XZFA_8AzfkWZ-QVcQPeEuGs9F9httfuUQsLlANYOtKYZsw-iMdct27vLXpPSyaFQcPrDb8"
                fill
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3">
                <p className="text-white font-bold text-xs leading-tight">
                  ESTILO DE VIDA
                </p>
              </div>
            </div>
            {/* Card 8 */}
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-sm cursor-pointer">
              <Image
                alt="VR Gaming Revolution"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4VmLVTot1796_D0yo3vwF-kUDlBReKOi6Y5eHLvUoQuIlr1zWEugtX8uw4_l8FVPbGREwdriEXlFbccXA0TmEGCcRWxHTtPMHPQy4xtr10yYgy9JyTSDkgDv0riniiK7BC-gMO8ysHjwtaQmKyVezzxbVpQiT3GXe7ftJRwE1IHYKKgeea7_RsQQvUCkxrCtB2WDUTN9ddbwM-xysaQenV8yo20pTm6pwtbzuRnLO4jMZ1oj_1x0EXlVd_0TrWZwPUcwTUx6tEh0"
                fill
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3">
                <p className="text-white font-bold text-xs leading-tight">
                  ENTRETENIMENTO
                </p>
              </div>
            </div>
          </section>
          <section className="mt-8 mb-4">
            <div className="flex items-center gap-2 px-1">
              <span
                className="text-[#222] font-bold text-xs tracking-tight uppercase"
                style={{ fontFamily: "sans-serif" }}
              >
                Categoria
              </span>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-[#999] to-[#ccc]"></div>
            </div>
          </section>

          <section className="grid grid-cols-2 gap-4 mt-4">
            {/* Card 7 */}
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-sm cursor-pointer">
              <Image
                alt="Future Luxury Travel"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDb4YjwIlSMZwwdlhvIzyrxCF1MW4mcVvQZwwyZkM2YuvclqMYreDeYlbaOVKoFhm-XkVwO8J5rIllXEDcOyvPTb3rn2g3WBvprtpulnrdG4UYcx-6rWCg2f-QrZc5NIbeIiLhMvVz-Sq40qf0CzHa0HjVYSWhUfL7XEu1A9VUhSW4W6r6lHlHVyV3ce8l4i8qI9IOJ7XZFA_8AzfkWZ-QVcQPeEuGs9F9httfuUQsLlANYOtKYZsw-iMdct27vLXpPSyaFQcPrDb8"
                fill
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3">
                <p className="text-white font-bold text-xs leading-tight">
                  ESTILO DE VIDA
                </p>
              </div>
            </div>
            {/* Card 8 */}
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-sm cursor-pointer">
              <Image
                alt="VR Gaming Revolution"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4VmLVTot1796_D0yo3vwF-kUDlBReKOi6Y5eHLvUoQuIlr1zWEugtX8uw4_l8FVPbGREwdriEXlFbccXA0TmEGCcRWxHTtPMHPQy4xtr10yYgy9JyTSDkgDv0riniiK7BC-gMO8ysHjwtaQmKyVezzxbVpQiT3GXe7ftJRwE1IHYKKgeea7_RsQQvUCkxrCtB2WDUTN9ddbwM-xysaQenV8yo20pTm6pwtbzuRnLO4jMZ1oj_1x0EXlVd_0TrWZwPUcwTUx6tEh0"
                fill
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3">
                <p className="text-white font-bold text-xs leading-tight">
                  ENTRETENIMENTO
                </p>
              </div>
            </div>
          </section>
          <section className="mt-8 mb-4">
            <div className="flex items-center gap-2 px-1">
              <span
                className="text-[#222] font-bold text-xs tracking-tight uppercase"
                style={{ fontFamily: "sans-serif" }}
              >
                Categoria
              </span>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-[#999] to-[#ccc]"></div>
            </div>
          </section>

          <section className="grid grid-cols-2 gap-4 mt-4">
            {/* Card 7 */}
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-sm cursor-pointer">
              <Image
                alt="Future Luxury Travel"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDb4YjwIlSMZwwdlhvIzyrxCF1MW4mcVvQZwwyZkM2YuvclqMYreDeYlbaOVKoFhm-XkVwO8J5rIllXEDcOyvPTb3rn2g3WBvprtpulnrdG4UYcx-6rWCg2f-QrZc5NIbeIiLhMvVz-Sq40qf0CzHa0HjVYSWhUfL7XEu1A9VUhSW4W6r6lHlHVyV3ce8l4i8qI9IOJ7XZFA_8AzfkWZ-QVcQPeEuGs9F9httfuUQsLlANYOtKYZsw-iMdct27vLXpPSyaFQcPrDb8"
                fill
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3">
                <p className="text-white font-bold text-xs leading-tight">
                  ESTILO DE VIDA
                </p>
              </div>
            </div>
            {/* Card 8 */}
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-sm cursor-pointer">
              <Image
                alt="VR Gaming Revolution"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4VmLVTot1796_D0yo3vwF-kUDlBReKOi6Y5eHLvUoQuIlr1zWEugtX8uw4_l8FVPbGREwdriEXlFbccXA0TmEGCcRWxHTtPMHPQy4xtr10yYgy9JyTSDkgDv0riniiK7BC-gMO8ysHjwtaQmKyVezzxbVpQiT3GXe7ftJRwE1IHYKKgeea7_RsQQvUCkxrCtB2WDUTN9ddbwM-xysaQenV8yo20pTm6pwtbzuRnLO4jMZ1oj_1x0EXlVd_0TrWZwPUcwTUx6tEh0"
                fill
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3">
                <p className="text-white font-bold text-xs leading-tight">
                  ENTRETENIMENTO
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}
