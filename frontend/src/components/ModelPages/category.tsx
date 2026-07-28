"use client";

// import { FaFacebookF } from "react-icons/fa";
// import { FaXTwitter } from "react-icons/fa6";
import { FiArrowRight } from "react-icons/fi";

import HeroSlider from "@/components/Header/Slider/Slider";
import Header from "../Header/Header";
import { CategoryContentProps } from "@/utils/types";
import Image from "next/image";
import { imageUrl } from "@/utils/api";
import Link from "next/link";

export default function CategoryPage({ name, posts }: CategoryContentProps) {


  return (
    <div className="w-full min-h-screen bg-white flex flex-col font-awanzaman">
      <Header slug="" />
      {/* ========================================================================= */}
      {/* 💻 DESKTOP LAYOUT (md breakpoint and above)                              */}
      {/* ========================================================================= */}
      <div className="hidden md:block text-gray-800 min-h-screen bg-white">
        <main className="w-full min-h-screen">
          <HeroSlider device="desktop" />

          <section className="bg-white py-12" data-purpose="main-content-body">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex justify-center mb-4">
                <h2 className="font-bold text-[#111415] uppercase tracking-wide text-4xl">
                  {name}
                </h2>
              </div>


              {/* Mundo Geek & Curiosidades */}
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <h2 className="text-xl font-bold text-[#111415] whitespace-nowrap">
                    Mundo Geek &amp; Curiosidades
                  </h2>
                  <div className="h-px bg-gray-200 w-full"></div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-4 gap-4">
                    {posts.map((post, i) => (
                      <Link key={i} href={post.slug}>
                        <div className="bg-[#111415] rounded-xl overflow-hidden flex flex-col cursor-pointer hover:shadow-lg transition-shadow group">
                          <Image
                            alt="Garagem famosos"
                            className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
                            src={`${imageUrl}/${post.thumbnail}`}
                            width={100}
                            height={100}
                            unoptimized

                          />
                          <div className="p-4 grow bg-[#111415] z-10">
                            <h4 className="text-white font-bold text-sm leading-tight">
                              {post.title}
                            </h4>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* ========================================================================= */}
      {/* 📱 MOBILE LAYOUT (below md breakpoint)                                   */}
      {/* ========================================================================= */}
      <div className="block md:hidden text-gray-800 min-h-screen bg-white flex flex-col w-full">
        <main
          className="p-4 bg-white overflow-y-auto no-scrollbar flex-1"
          style={{ paddingBottom: "80px" }}
        >
          <HeroSlider device="mobile" />

          <section className="py-6 px-4 bg-white">
            <div className="max-w-7xl mx-auto flex justify-center">
              <h2 className="text-5xl font-bold text-gray-900 uppercase tracking-tighter text-center">
                {"titulo"}
              </h2>
            </div>
          </section>

          <div className="space-y-8">
            {/* Main Highlight (Hero) */}
            <section className="relative group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  alt="Toyota Concept"
                  className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkgNkjV7lfg071wHeiQj-zbf4Ugj8VHK9lh7i9V5qrgTRO5S4-ZnEFlgHY5BV7Ak7_2BG713hwCEhQhq_gMiF6dbktO01PeeO18iYVO-xvZ-yid6BDtoINpeIBCpwVGZ5u6mC2L0ZzE_UEaTF-ADoHDqGR5jhxGyGkeT4eZ3vXQrOwCG0pWqKTJWW28XCiEw90fACNGMfywZ66VcaaEhei9LSRUwoQuezOsoKwC5mVVFrmxXvVVfA-Z_B_YkgrH1HDgRLwpUHtWFM"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider rounded-sm shadow-lg">
                    Global Market Intelligence
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <h1 className="text-2xl font-bold text-gray-900 leading-tight uppercase tracking-tight">
                  Toyota lidera lista dos carros mais blindados no Brasil: o
                  domínio do mercado industrial
                </h1>
                <button className="mt-4 bg-[#0057ff] text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-blue-700 transition-colors flex items-center gap-2 justify-center">
                  <span>Read Full Report</span>
                  <FiArrowRight className="text-sm" />
                </button>
              </div>
            </section>

            <div className="h-px bg-gray-200 w-full"></div>

            {/* Tech Focus Section */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-6 bg-blue-600"></span>
                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400">
                  Tech Focus
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <img
                  alt="SUV Interior"
                  className="w-full rounded-lg shadow-inner"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCACbKUOh5-5fOZZfKOvoBxRUSjtbvjXAYCTTxQF1ROMCrFBb1PVRNCMLY5cjY1ShUEI9bI0yQBzyWgQg17zfXp1h8C0OHDbnWZdRYT9NDtZ9SrnO5LWBh1Pk8bzdpxHDZoRMn9Xe6WMPFpvC9YWY1HuHqCTbVng3bz42BCMIkh6aTpDcMDyLYN9F1TN3kuqkLiafGAQdTULso-U99begqOD3ZavBmka4IMOyINMPkH7tiQlQL6YWFtVD7KrvusmYSwbFEjCOHCz_k"
                />
                <div className="space-y-2">
                  <h3 className="text-xl font-bold leading-snug">
                    De perfume a tela deslizante: Omoda 7 tenta ser diferente na
                    selva dos SUVs tecnológicos
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    A nova aposta foca na integração total de IA e dashboards
                    holográficos que se adaptam ao perfil do motorista, elevando
                    o padrão de precisão industrial.
                  </p>
                </div>
              </div>
            </section>

            <div className="h-px bg-gray-200 w-full"></div>

            {/* Recent Protocols (List) */}
            <section className="space-y-6 pb-10">
              <h2 className="text-base font-black uppercase tracking-tighter border-b-2 border-black pb-1 inline-block">
                PROTOCOLOS RECENTES
              </h2>
              <div className="space-y-4">
                {/* Item 1 */}
                <div className="flex gap-4 items-start">
                  <img
                    alt="Car News"
                    className="w-24 h-24 object-cover rounded bg-gray-100 flex-shrink-0"
                    src="https://lh3.googleusercontent.com/aida/ADBb0ujSAP-_gIfEnm3e93xU8hlWHPR6ezlf_HmYi410O-rMTY_7EtysI17ZfQIAS2DAigj_sKstiiJp7DT0wgRcKaKiY4hzLqd0fhFUKF5dd5hUTSAP0_w4OHmFfW5cBlsgCuatt3nVGmjePdV7MpfnIxi8QalleHDrpdyl0tEQxDc8vOfykQAvypUdCB66STmGo58XZCRDGZjVPSIvbzc03HWN7jO_LhmB0S5EvAnQ58QZLs9iAEh2FfUOXg"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-bold leading-tight hover:text-blue-600 cursor-pointer italic">
                      Chevrolet Sonic retorna como SUV para encarar Nivus e
                      Fastback.
                    </h4>
                    <span className="text-[10px] text-gray-400 uppercase mt-2 block font-medium">
                      HÁ 2 HORAS
                    </span>
                  </div>
                </div>
                {/* Item 2 */}
                <div className="flex gap-4 items-start border-t border-gray-100 pt-4">
                  <img
                    alt="Jeep"
                    className="w-24 h-24 object-cover rounded bg-gray-100 flex-shrink-0"
                    src="https://lh3.googleusercontent.com/aida/ADBb0uhQZtWy7qRBtv2SBql_wt0mRh34CYWrXwzIcAHt987mQxZuPVMbCVdDwsN9V5EimjpZKIWWnk5l_MQd5v1Y-DkzsUFfMh39k5oG8ka6ObLnbU3UdtKLcrG7-VdLDk501UvDOrwx_OT1JpxG0_0qIRKXwVZyQteiJ35DYt9TIXTQXcdFZjv6yRNDy246bj0qJbzhIRkIZSRcCp9HqL3CxQupBYsi7YebEIa03si3gQLnX_30Xms_9VUPTCs"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-bold leading-tight hover:text-blue-600 cursor-pointer italic">
                      Jeep Compass 2027 ganhará sistema híbrido no 2º semestre.
                    </h4>
                    <span className="text-[10px] text-gray-400 uppercase mt-2 block font-medium">
                      HÁ 5 HORAS
                    </span>
                  </div>
                </div>
                {/* Item 3 */}
                <div className="flex gap-4 items-start border-t border-gray-100 pt-4">
                  <img
                    alt="News"
                    className="w-24 h-24 object-cover rounded bg-gray-100 flex-shrink-0"
                    src="https://lh3.googleusercontent.com/aida/ADBb0ugSDA188_ucodcR_yRIXSjCA8JAg8PsNqGxoBG_yOMpNyRLN3iBF6ckp-aSl2DEzyKNuM9JnwTfoq77jdEmnKkP9MsBKYyVpIeHKOceoW1rHW0Ghqi1PieVjuNmiHNsiMaiUBD-FYEVMKJtGu4jAv4k_yvD3-d8NEMkNQPn2l3M2qjre5QmQ4olxd0eiBGNX2WaCQ1cPjcMP2Yfb0xro6FErS-384Bqa06xzV_KPQQzs_5F13yIfWL96w"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-bold leading-tight hover:text-blue-600 cursor-pointer italic">
                      Novo golpe da CNH: Como bandidos arrancam dinheiro não
                      cobrado.
                    </h4>
                    <span className="text-[10px] text-gray-400 uppercase mt-2 block font-medium">
                      HÁ 8 HORAS
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
