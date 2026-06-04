"use client";
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiArrowRight } from "react-icons/fi";
import Header from "@/components/Header/Categories/HeaderCategories";
import Footer from "@/components/Footer";
import HeroSlider from "@/components/Header/Slider/Slider";
import { PostProps } from "@/utils/types";

export default function CategoryPage(data:PostProps) {  

  return (
    <div className="w-full min-h-screen bg-white flex flex-col font-awanzaman">
      <Header slug={data.title} />

      {/* ========================================================================= */}
      {/* 💻 DESKTOP LAYOUT (md breakpoint and above)                              */}
      {/* ========================================================================= */}
      <div className="hidden md:block text-gray-800 min-h-screen bg-white">
        <main className="w-full min-h-screen">
          <HeroSlider device="desktop" />
          
          <section className="bg-white py-12" data-purpose="main-content-body">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex justify-center mb-4">
                <h2 className="font-bold text-[#111415] uppercase tracking-wide text-4xl">{data.title}</h2>
              </div>
              
              {/* Destaques Automotivos */}
              <div className="mb-12">
                <div className="flex items-center space-x-4 mb-6">
                  <h2 className="text-xl font-bold text-[#111415] whitespace-nowrap">Destaques Automotivos</h2>
                  <div className="h-[1px] bg-gray-200 w-full"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="group cursor-pointer">
                    <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-gray-100 mb-3">
                      <img
                        alt="Toyota blindado"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbOGliB9Xd8p5M49j2H4t99MpdN_xaGsyP9crY5bF3wZ_ErxsGicGqsIw_l-DofoJyqkka3HmlVLCXLZnlMnpLLlL6Zt66DQxnecDMptW5zniiKgwNENvShD-BUMmWbXF_FYayi9s_cGh9OVsa2Wd9t5fD8klLqEsAy9YVaUzdUHlMJvrlcoPzcej38uuqqC5qnNHVSv2YNTW_zKJVdQKveszJB6E35TzVKCDgcZ0IqoCyv2bAlg_9pvCmeEVU7AawUjeEJ7X0nYM"
                      />
                    </div>
                    <h3 className="font-bold text-[#111415] text-lg leading-tight mb-2 group-hover:text-blue-600 transition-colors">Toyota lidera lista dos carros mais blindados no Brasil</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">Ranking atualizado mostra preferência nacional por segurança em SUVs premium.</p>
                  </div>
                  <div className="group cursor-pointer">
                    <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-gray-100 mb-3">
                      <img
                        alt="Geely x Omoda"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQc2lnmH0fzOpQVVAEHB2fRO-Va7v8D2Rr_uTIFE_O284NW4qYAMQrKFdHnj3n2c1hQDe-P3rHX43Qy6UNAGrcW_4mu_DPUCBdVKW6QU7gvWxhk8fh3ZaLeJciFWLq1192qNkCKyoqq_SJqc-Q2uf-z8ERmIX29p4Ysdny6fEG2kc8AGiTrgDi61ZuIwv9IaBrh3l15Wsh9TEk9heIp8_up9flyYxjXK6xlnFna42rHzYHUmjF77HXoxtWhnh6knqTC3yPA-Tr8hE"
                      />
                    </div>
                    <h3 className="font-bold text-[#111415] text-lg leading-tight mb-2 group-hover:text-blue-600 transition-colors">Geely x Omoda Jaecoo: qual chinesa é maior ameaça à BYD e à GWM</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">Guerra das marcas asiáticas se intensifica com novos lançamentos eletrificados.</p>
                  </div>
                  <div className="group cursor-pointer">
                    <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-gray-100 mb-3">
                      <img
                        alt="Carros no Paraguai"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBR-9qD3HfPy_k9YSG7l5kEtKdLb5VER-nqUdGm9xoS6C-ZQBJDs9ibW4MXkQebBlRM-0iMewofDpeG6aUbVELYrJPZ4hO7U5Lo4NvC66ygveHMtNMrrMz2J5WO22e-yQgbkDFHnCHD0AWcEdhmctgJgdsSEfAomG-OPLwN2r5b9iBTros7iZBu_rGEOOT7eL8gGmcA0szMkZq8HJmUNwCL1FEsXRQ7a-mtJfkojxF63ebfq88IvoxZDQ_ktFxAIJDUv7-He22FNxI"
                      />
                    </div>
                    <h3 className="font-bold text-[#111415] text-lg leading-tight mb-2 group-hover:text-blue-600 transition-colors">Por que carros fabricados no Brasil são mais baratos no Paraguai</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">Entenda a carga tributária e as estratégias de exportação que impactam os preços.</p>
                  </div>
                </div>
              </div>

              {/* Tecnologia Automotiva */}
              <div className="mb-12">
                <div className="flex items-center space-x-4 mb-6">
                  <h2 className="text-xl font-bold text-[#111415] whitespace-nowrap">Tecnologia Automotiva</h2>
                  <div className="h-[1px] bg-gray-200 w-full"></div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Main Technology Column */}
                  <div className="lg:col-span-8 space-y-6">
                    <div className="flex items-start space-x-4 group cursor-pointer">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          alt="Audi Q3"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          src="https://lh3.googleusercontent.com/aida/ADBb0uiAhqRetLCaYlcZ1J52__YiiZMYfutQ0UIZsFI5heCrQ9oJMqJdJqGoNK3q_B1bh76NyXZWRJOT2jEVNkWrN0HtQwojWpcnaQORZlp4DJ7_LO4oRlBjAZaFSARfYm-PNYdBnIU023EWhwp5f4DCmRKUughOwn1DXvKEJ-HhGUoQjOMfwbgutcWWNIM5p_H9wB3J-uzAjPlCiysuN77LnGc0yTPg-fhOr72m5SZwtwnUm6oiaRw1R6RJvg"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#111415] text-lg mb-1 group-hover:text-blue-600 transition-colors">Audi Q3 evolui para enfrentar BMW e Mercedes, mas fica devendo em tecnologia</h3>
                        <p className="text-sm text-gray-600">Painel digital estreito e assistentes incompletos contrastam com a potência do SUV premium.</p>
                      </div>
                    </div>
                    <div className="h-[1px] bg-gray-100 w-full"></div>
                    
                    <div className="flex items-start space-x-4 group cursor-pointer">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          alt="Carros Blindados"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          src="https://lh3.googleusercontent.com/aida/ADBb0uhqtko0A8RjporXNgPBNentnv6EY6dIDQ99xBXp0_8L9JECbuloLgAsKNs2bA8oRuvMXNfE5tyigs1DjnVJqE7tZwldqozi3GSAxlLQk3I3ri42biL72C2hMig_fOYc9rcy8s3x18ZP-BwHK2W12ff1PgRGmtDFejSelDGynUB2ayrc8hVOgK55HDDncy7RW_B5jsv_1AZykVHmMCX8ln8xH6Eu2lNN1yecs0CRstY2QMbhs6bzIAlGta8"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#111415] text-lg mb-1 group-hover:text-blue-600 transition-colors">Toyota lidera lista dos carros mais blindados no Brasil</h3>
                        <p className="text-sm text-gray-600">Veja o raio-X da segurança automotiva e os modelos preferidos pelos brasileiros.</p>
                      </div>
                    </div>
                    <div className="h-[1px] bg-gray-100 w-full"></div>

                    <div className="flex items-start space-x-4 group cursor-pointer">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          alt="Geely x Omoda"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          src="https://lh3.googleusercontent.com/aida/ADBb0uiAlCz7fRomzruYd-2ET0MWH92foD4Nj9_2cHhs1J3sjtgk2BMoLhPQ7QvZTlbei--eOqeu3i5FWKGZ7QTki_xpiEQ-FIfYEcIje0afjsjQozW95YrPGxn7zGFln63uxhhdPJtkmLcmr8qp7D1WiTUfIFdZ9cxqSrfZhJPkEUtrVtDlFoKJLhvhwW3ks6qUXUWvghXH7LIrlliSqdni5jklMxJag_8eNOyPYdlc0u-t4msFy6wUvheyjg"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#111415] text-lg mb-1 group-hover:text-blue-600 transition-colors">Geely x Omoda Jaecoo: qual chinesa é maior ameaça à BYD e à GWM</h3>
                        <p className="text-sm text-gray-600">A guerra das marcas asiáticas se intensifica com a chegada de novos gigantes eletrificados no Brasil.</p>
                      </div>
                    </div>
                  </div>

                  {/* Sidebar: Eventos do Setor */}
                  <div className="lg:col-span-4">
                    <div className="bg-gray-50/50 p-6 rounded-xl border border-gray-100">
                      <div className="flex items-center space-x-2 mb-6">
                        <h3 className="text-sm font-bold text-[#111415] uppercase tracking-wider">Eventos do Setor</h3>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-4 p-3 bg-white rounded-lg border border-gray-100">
                          <div className="bg-blue-600 text-white rounded p-2 text-center min-w-[50px]">
                            <div className="text-[10px] uppercase font-bold leading-tight">Nov</div>
                            <div className="text-xl font-black leading-none mt-1">15</div>
                          </div>
                          <div>
                            <div className="text-sm font-bold text-[#111415] leading-tight mb-1">Salão do Automóvel 2026</div>
                            <div className="text-[11px] text-gray-500 font-medium">São Paulo, SP</div>
                          </div>
                        </div>
                        <div className="flex items-start space-x-4 p-3 bg-white rounded-lg border border-gray-100">
                          <div className="bg-blue-600 text-white rounded p-2 text-center min-w-[50px]">
                            <div className="text-[10px] uppercase font-bold leading-tight">Dez</div>
                            <div className="text-xl font-black leading-none mt-1">05</div>
                          </div>
                          <div>
                            <div className="text-sm font-bold text-[#111415] leading-tight mb-1">Lançamento Nova Hilux Hybrid</div>
                            <div className="text-[11px] text-gray-500 font-medium">Evento exclusivo para imprensa</div>
                          </div>
                        </div>
                        <button className="w-full py-3 bg-gray-200 hover:bg-gray-300 transition-colors text-gray-700 text-xs font-bold rounded-lg uppercase tracking-wider mt-2">Ver Agenda Completa</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mundo Geek & Curiosidades */}
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <h2 className="text-xl font-bold text-[#111415] whitespace-nowrap">Mundo Geek &amp; Curiosidades</h2>
                  <div className="h-[1px] bg-gray-200 w-full"></div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Main Curiosities Cards */}
                  <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[#111415] rounded-xl overflow-hidden flex flex-col cursor-pointer hover:shadow-lg transition-shadow group">
                      <img
                        alt="Mecânico cego"
                        className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
                        src="https://lh3.googleusercontent.com/aida/ADBb0ug6mQSuK8hSMk1P0hEldJEsSuWrMkvDGNr9stEAdJXbEePSNkXF8clX5jiuM7xipceLb9uRBnZWwMzXNDItC1POyNJpsfD6JSuot6e4OXwraftyPuP1MzGn1O7VeoYxDzaFTkH0AJ60hhft3ebSB21fQsP9f-Xuc52AE__lLsCniGOeb2mnbNBjTJqPBREMJHs8B9iui5bHqE0JdzD2qth0qD4EkHZHqwvnvnNdQjQRQQTp88FcLUGA48M"
                      />
                      <div className="p-4 flex-grow bg-[#111415] z-10">
                        <h4 className="text-white font-bold text-sm leading-tight">Mecânico cego conserta quase tudo e usa mapa imaginário em oficina</h4>
                      </div>
                    </div>
                    <div className="bg-[#111415] rounded-xl overflow-hidden flex flex-col cursor-pointer hover:shadow-lg transition-shadow group">
                      <img
                        alt="Garagem famosos"
                        className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
                        src="https://lh3.googleusercontent.com/aida/ADBb0uiVYKGm52xK4WYRxv6jHnqtzLcAABN2mghwag-cJgmOW1HGW4UDtGQYM3Rut0DwfGc4rjn-3x4AgqZt3slLV4WhJqH4QZP9PDwLHK4M3HrlmxcBb28-Uh-CwJuvzHLVv_wbGpYeCeX3XAETRTjuLKWi0BCWuyNNX-auZfsUqxWy-rIL62YB9LVu6LX8ejORraNt8BIu-1tPKq88L0m3pnDtwMa5sV9Vzl8InGZoHtyFm4beI7ryYQ4og1w"
                      />
                      <div className="p-4 flex-grow bg-[#111415] z-10">
                        <h4 className="text-white font-bold text-sm leading-tight">Garagem dos Famosos: conheça os carros luxuosos das celebridades</h4>
                      </div>
                    </div>
                    <div className="bg-[#111415] rounded-xl overflow-hidden flex flex-col cursor-pointer hover:shadow-lg transition-shadow group">
                      <img
                        alt="Película Inteligente"
                        className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdBcIoVnvsGnDUQYXeg0WKTyXg-ehDwPNOKV59BMT8g8yubh1KAAOL83hYe9IIMKpL1PHiV4srI-OAMKvjnz9kTrfCgosLmlZ8MABMBqVimDwazbWsKuYzjqFxAM2NMRQbt4NHdR9QH4v4KJsR3s72UAhXTt7VtkdQnLkBbMPKP6R02-vkkVNEkHNS7Cq5712ApFl5zfn2WfQsnqYNILCnfNdJi3gFvGLu1YPa4ht6zkeEtOPSb8pKOYwHUknxYZFrS-IBHTEYhlk"
                      />
                      <div className="p-4 flex-grow bg-[#111415] z-10">
                        <h4 className="text-white font-bold text-sm leading-tight">Película Inteligente: como funciona a nova película que só escurece de fora</h4>
                      </div>
                    </div>
                  </div>

                  {/* Comunidade Motor */}
                  <div className="lg:col-span-4">
                    <div className="bg-gray-50/50 p-6 rounded-xl border border-gray-100 flex flex-col h-full">
                      <h3 className="text-sm font-bold text-[#111415] uppercase tracking-wider mb-4 text-center">Comunidade Motor</h3>
                      <p className="text-sm text-gray-600 text-center mb-6">Junte-se à nossa comunidade para debater sobre lançamentos, dicas de mecânica e muito mais.</p>
                      <div className="space-y-4 flex-grow flex flex-col justify-center">
                        <a className="flex items-center justify-center space-x-3 bg-[#3b5998] text-white py-3 px-4 rounded-lg font-bold text-sm shadow-md hover:bg-blue-800 transition-colors" href="#">
                          <FaFacebookF className="text-sm" />
                          <span>Seguir no Facebook</span>
                        </a>
                        <a className="flex items-center justify-center space-x-3 bg-[#000000] text-white py-3 px-4 rounded-lg font-bold text-sm shadow-md hover:bg-gray-800 transition-colors" href="#">
                          <FaXTwitter className="text-sm" />
                          <span>Seguir no X</span>
                        </a>
                      </div>
                    </div>
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
        <main className="p-4 bg-white overflow-y-auto no-scrollbar flex-1" style={{ paddingBottom: "80px" }}>
          <HeroSlider device="mobile" />
          
          <section className="py-6 px-4 bg-white">
            <div className="max-w-7xl mx-auto flex justify-center">
              <h2 className="text-5xl font-bold text-gray-900 uppercase tracking-tighter text-center">{data.title}</h2>
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
                  <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider rounded-sm shadow-lg">Global Market Intelligence</span>
                </div>
              </div>
              <div className="mt-4">
                <h1 className="text-2xl font-bold text-gray-900 leading-tight uppercase tracking-tight">
                  Toyota lidera lista dos carros mais blindados no Brasil: o domínio do mercado industrial
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
                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400">Tech Focus</h2>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <img
                  alt="SUV Interior"
                  className="w-full rounded-lg shadow-inner"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCACbKUOh5-5fOZZfKOvoBxRUSjtbvjXAYCTTxQF1ROMCrFBb1PVRNCMLY5cjY1ShUEI9bI0yQBzyWgQg17zfXp1h8C0OHDbnWZdRYT9NDtZ9SrnO5LWBh1Pk8bzdpxHDZoRMn9Xe6WMPFpvC9YWY1HuHqCTbVng3bz42BCMIkh6aTpDcMDyLYN9F1TN3kuqkLiafGAQdTULso-U99begqOD3ZavBmka4IMOyINMPkH7tiQlQL6YWFtVD7KrvusmYSwbFEjCOHCz_k"
                />
                <div className="space-y-2">
                  <h3 className="text-xl font-bold leading-snug">De perfume a tela deslizante: Omoda 7 tenta ser diferente na selva dos SUVs tecnológicos</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    A nova aposta foca na integração total de IA e dashboards holográficos que se adaptam ao perfil do motorista, elevando o padrão de precisão industrial.
                  </p>
                </div>
              </div>
            </section>

            <div className="h-px bg-gray-200 w-full"></div>

            {/* Recent Protocols (List) */}
            <section className="space-y-6 pb-10">
              <h2 className="text-base font-black uppercase tracking-tighter border-b-2 border-black pb-1 inline-block">PROTOCOLOS RECENTES</h2>
              <div className="space-y-4">
                {/* Item 1 */}
                <div className="flex gap-4 items-start">
                  <img
                    alt="Car News"
                    className="w-24 h-24 object-cover rounded bg-gray-100 flex-shrink-0"
                    src="https://lh3.googleusercontent.com/aida/ADBb0ujSAP-_gIfEnm3e93xU8hlWHPR6ezlf_HmYi410O-rMTY_7EtysI17ZfQIAS2DAigj_sKstiiJp7DT0wgRcKaKiY4hzLqd0fhFUKF5dd5hUTSAP0_w4OHmFfW5cBlsgCuatt3nVGmjePdV7MpfnIxi8QalleHDrpdyl0tEQxDc8vOfykQAvypUdCB66STmGo58XZCRDGZjVPSIvbzc03HWN7jO_LhmB0S5EvAnQ58QZLs9iAEh2FfUOXg"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-bold leading-tight hover:text-blue-600 cursor-pointer italic">Chevrolet Sonic retorna como SUV para encarar Nivus e Fastback.</h4>
                    <span className="text-[10px] text-gray-400 uppercase mt-2 block font-medium">HÁ 2 HORAS</span>
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
                    <h4 className="text-sm font-bold leading-tight hover:text-blue-600 cursor-pointer italic">Jeep Compass 2027 ganhará sistema híbrido no 2º semestre.</h4>
                    <span className="text-[10px] text-gray-400 uppercase mt-2 block font-medium">HÁ 5 HORAS</span>
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
                    <h4 className="text-sm font-bold leading-tight hover:text-blue-600 cursor-pointer italic">Novo golpe da CNH: Como bandidos arrancam dinheiro não cobrado.</h4>
                    <span className="text-[10px] text-gray-400 uppercase mt-2 block font-medium">HÁ 8 HORAS</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
