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

import Slider from "@/components/Header/Slider/Slider";

import { useHome } from "./useHome";
import Header from "@/components/Header/Header";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Orbital Channel",
  "url": "https://orbitaltv.net",
  "description": "Plataforma de conteúdo tecnológico inovadora trazendo o melhor em tecnologia mundial.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://orbitaltv.net/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export default function Home() {
  const { data, methods } = useHome();

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header slug="Home" />
      <div className="hidden md:block text-gray-800 min-h-screen bg-white">
        {/* BEGIN: MainContentPlaceholder */}
        <main className="w-full min-h-screen">
          <Slider device="desktop" />
          <section className="bg-white py-12" data-purpose="main-content-body">
            <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
              <div className="mb-4">
                <div className="flex items-center space-x-4 mb-6">
                  <h2 className="text-xl lg:text-2xl font-bold text-[#111415] whitespace-nowrap">
                    Destaques
                  </h2>
                  <div className="h-px bg-gray-200 w-full"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  {/* Main Technology Icons */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:col-span-9">
                    <div className="bg-gray-800 rounded-xl p-4 flex flex-col items-center justify-center text-center space-y-2 aspect-square">
                      <FaRobot className="text-white text-3xl" />
                      <span className="text-white text-[10px] font-bold">
                        Robotics
                      </span>
                    </div>
                    <div className="bg-blue-900 rounded-xl p-4 flex flex-col items-center justify-center text-center space-y-2 aspect-square">
                      <FaSatellite className="text-white text-3xl" />
                      <span className="text-white text-[10px] font-bold">
                        Satellites
                      </span>
                    </div>
                    <div className="bg-blue-600 rounded-xl p-4 flex flex-col items-center justify-center text-center space-y-2 aspect-square">
                      <FaInfinity className="text-white text-3xl" />
                      <span className="text-white text-[10px] font-bold uppercase">
                        Meta &amp; Facebook
                      </span>
                    </div>
                    <div className="bg-gray-100 border border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center text-center space-y-2 aspect-square">
                      <FaLinux className="text-gray-800 text-3xl" />
                      <span className="text-gray-800 text-[10px] font-bold">
                        Linux
                      </span>
                    </div>
                    <div className="bg-[#0B3D91] rounded-xl p-4 flex flex-col items-center justify-center text-center space-y-2 aspect-square">
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
                        <div className="bg-red-600 text-white rounded p-1 text-center min-w-11.25">
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
                        <div className="bg-red-600 text-white rounded p-1 text-center min-w-11.25">
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
                      <button className="w-full py-2 bg-gray-200 hover:bg-gray-300 transition-colors text-gray-600 text-[9px] font-bold rounded-lg uppercase tracking-wider" aria-label="Ver agenda de eventos">
                        Ver Agenda
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <h2 className="text-xl lg:text-2xl font-bold text-[#111415] whitespace-nowrap">
                    Mais Destaques
                  </h2>
                  <div className="h-px bg-gray-200 w-full"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
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
                          aria-label="Siga-nos no Facebook"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaFacebookF className="text-sm" />
                          <span>Facebook</span>
                        </a>
                        <a
                          className="flex items-center justify-center space-x-2 bg-[#00acee] text-white py-3 rounded-full font-bold text-[10px] shadow-lg shadow-blue-400/20 hover:opacity-90 transition-opacity"
                          href="#"
                          aria-label="Siga-nos no X (Twitter)"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaXTwitter className="text-sm" />
                          <span>Twitter / X</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {data.content.map((info, i) => {
                return methods.contentModelDesktop(info, i)
              })}
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
          className="p-4 bg-white overflow-y-auto flex-1"
          style={{ paddingBottom: "80px" }}
        >
          <Slider device="mobile" />

          {data.content.map((info, i) => {
            return methods.contentModelMobile(info, i)
          })}
        </main>
      </div>
    </div>
  );
}
