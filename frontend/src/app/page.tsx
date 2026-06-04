/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { FaRobot, FaSatellite, FaInfinity, FaLinux, FaRocket, FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Header from "@/components/Header/Categories/HeaderCategories";
import Footer from "@/components/Footer";
import Slider from "@/components/Header/Slider/Slider";

export const metadata: Metadata = {
  title: "Orbital Channel - O mundo em suas mãos",
  description: "Uma plataforma de conteúdo tecnológico inovadora trazendo o melhor em tecnologia mundial, sempre buscando as notícias mais atualizadas para você.",
  keywords: ["tecnologia", "notícias", "inovação", "inteligência artificial", "mundo geek", "orbital channel"],
  authors: [{ name: "Orbital Channel" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Orbital Channel - O mundo em suas mãos",
    description: "Uma plataforma de conteúdo tecnológico inovadora trazendo o melhor em tecnologia mundial.",
    url: "https://orbitalchannel.com",
    siteName: "Orbital Channel",
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida/ADBb0uh635aAwT-DVGCdV5q1KeXqYFOLcX2HvG7ox7PAnoPqFCV7r8CBjCMBC8fYN7I9chHuefrjMJA9Cm-oDrrU2zdmc_h3tJwiOT4DHNcO0PO4Ip3BlKqzwAjrTImEXR8ZDkwNU8uZ_MAZu0Dibp_yvlX0bJv-IW5gTzl04G0aaK0TliapXT18OvzcS35Du068BJwq5u7OR5NEERv45vBYkkmoJ1ZsyMKTGkaJoxsCnFzxwniL25LxUgRM4IxhygMFeNUH5MpfUnmu",
        width: 800,
        height: 600,
        alt: "Orbital Channel Logo",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orbital Channel - O mundo em suas mãos",
    description: "Uma plataforma de conteúdo tecnológico inovadora trazendo o melhor em tecnologia mundial.",
  },
};

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      <Header slug="Home"/>
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
              <div className="mb-12">
                <div className="flex items-center space-x-4 mb-6">
                  <h2 className="text-xl font-bold text-[#111415] whitespace-nowrap">Featured Content</h2>
                  <div className="h-[1px] bg-gray-200 w-full"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative group rounded-xl overflow-hidden aspect-[4/3] bg-gray-100 cursor-pointer">
                    <img
                      alt="Geopolitica"
                      className="absolute inset-0 w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_t7a8pEx_X6C9pHTMZLp8wj_l75eEmKJR7PWtfJLxgtBcTZEsI1FDIXFq4x7VpswC6fq-SAn9fe2ND5gvEW5VzwYMDB-qX3zzYMPeMSyFXc3x4b2E_fjPVMU_-y6RtpCvf0pJdY9O7fyGQtDiv7OI_IVBfWvD-a7XtEw8KI8mSX5ZFpTaIU7kuV6oL584Alnj0cOX_oWu9OL1-RMrp0fd7hRhr_l0z0OjyR2odB-WBLC5_WUVS3uTvUqVyfIf4wUbYoJoyG1xJFM"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                      <h3 className="text-white font-bold text-sm">Geopolítica:<br />Brasileiros no Exterior</h3>
                    </div>
                  </div>
                  <div className="relative group rounded-xl overflow-hidden aspect-[4/3] bg-gray-100 cursor-pointer">
                    <img
                      alt="Historia"
                      className="absolute inset-0 w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_t7a8pEx_X6C9pHTMZLp8wj_l75eEmKJR7PWtfJLxgtBcTZEsI1FDIXFq4x7VpswC6fq-SAn9fe2ND5gvEW5VzwYMDB-qX3zzYMPeMSyFXc3x4b2E_fjPVMU_-y6RtpCvf0pJdY9O7fyGQtDiv7OI_IVBfWvD-a7XtEw8KI8mSX5ZFpTaIU7kuV6oL584Alnj0cOX_oWu9OL1-RMrp0fd7hRhr_l0z0OjyR2odB-WBLC5_WUVS3uTvUqVyfIf4wUbYoJoyG1xJFM"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                      <h3 className="text-white font-bold text-sm">História &amp; Arte:<br />Descobertas em Arqueologia e Antropologia</h3>
                    </div>
                  </div>
                  <div className="relative group rounded-xl overflow-hidden aspect-[4/3] bg-gray-100 cursor-pointer">
                    <img
                      alt="Medicina"
                      className="absolute inset-0 w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_t7a8pEx_X6C9pHTMZLp8wj_l75eEmKJR7PWtfJLxgtBcTZEsI1FDIXFq4x7VpswC6fq-SAn9fe2ND5gvEW5VzwYMDB-qX3zzYMPeMSyFXc3x4b2E_fjPVMU_-y6RtpCvf0pJdY9O7fyGQtDiv7OI_IVBfWvD-a7XtEw8KI8mSX5ZFpTaIU7kuV6oL584Alnj0cOX_oWu9OL1-RMrp0fd7hRhr_l0z0OjyR2odB-WBLC5_WUVS3uTvUqVyfIf4wUbYoJoyG1xJFM"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                      <h3 className="text-white font-bold text-sm">Avanços da Medicina:<br />O que esperar para os próximos anos</h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tecnologia with Events Embedded */}
              <div className="mb-4">
                <div className="flex items-center space-x-4 mb-6">
                  <h2 className="text-xl font-bold text-[#111415] whitespace-nowrap">Tecnologia</h2>
                  <div className="h-[1px] bg-gray-200 w-full"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  {/* Main Technology Icons */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:col-span-9">
                    <div className="bg-gray-800 rounded-xl p-4 flex flex-col items-center justify-center text-center space-y-2 cursor-pointer aspect-square">
                      <FaRobot className="text-white text-3xl" />
                      <span className="text-white text-[10px] font-bold">Robotics</span>
                    </div>
                    <div className="bg-blue-900 rounded-xl p-4 flex flex-col items-center justify-center text-center space-y-2 cursor-pointer aspect-square">
                      <FaSatellite className="text-white text-3xl" />
                      <span className="text-white text-[10px] font-bold">Satellites</span>
                    </div>
                    <div className="bg-blue-600 rounded-xl p-4 flex flex-col items-center justify-center text-center space-y-2 cursor-pointer aspect-square">
                      <FaInfinity className="text-white text-3xl" />
                      <span className="text-white text-[10px] font-bold uppercase">Meta &amp; Facebook</span>
                    </div>
                    <div className="bg-gray-100 border border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center text-center space-y-2 cursor-pointer aspect-square">
                      <FaLinux className="text-gray-800 text-3xl" />
                      <span className="text-gray-800 text-[10px] font-bold">Linux</span>
                    </div>
                    <div className="bg-[#0B3D91] rounded-xl p-4 flex flex-col items-center justify-center text-center space-y-2 cursor-pointer aspect-square">
                      <FaRocket className="text-white text-3xl" />
                      <span className="text-white text-[10px] font-bold">NASA</span>
                    </div>
                  </div>

                  {/* Embedded Eventos Component */}
                  <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 md:col-span-3">
                    <div className="flex items-center space-x-2 mb-4">
                      <h3 className="text-sm font-bold text-[#111415] uppercase tracking-wider">Eventos Próximos</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-4 p-2 bg-white rounded-lg border border-gray-100">
                        <div className="bg-red-600 text-white rounded p-1 text-center min-w-[45px]">
                          <div className="text-[8px] uppercase font-bold leading-tight">Julho</div>
                          <div className="text-lg font-black leading-none">18</div>
                        </div>
                        <div>
                          <div className="text-[9px] text-gray-500 font-bold uppercase">Redes Sociais</div>
                          <div className="text-[11px] font-bold text-[#111415] leading-tight">Como criar conteúdo de alto impacto</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 p-2 bg-white rounded-lg border border-gray-100">
                        <div className="bg-red-600 text-white rounded p-1 text-center min-w-[45px]">
                          <div className="text-[8px] uppercase font-bold leading-tight">Julho</div>
                          <div className="text-lg font-black leading-none">20</div>
                        </div>
                        <div>
                          <div className="text-[9px] text-gray-500 font-bold uppercase">Mídias Sociais</div>
                          <div className="text-[11px] font-bold text-[#111415] leading-tight">Novas ferramentas para influenciadores</div>
                        </div>
                      </div>
                      <button className="w-full py-2 bg-gray-200 hover:bg-gray-300 transition-colors text-gray-600 text-[9px] font-bold rounded-lg uppercase tracking-wider">Ver Agenda</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mundo Geek with Social Embedded */}
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <h2 className="text-xl font-bold text-[#111415] whitespace-nowrap">Mundo Geek</h2>
                  <div className="h-[1px] bg-gray-200 w-full"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  {/* Main Geek Cards */}
                  <div className="md:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[#111415] rounded-xl overflow-hidden flex flex-col cursor-pointer hover:shadow-lg transition-shadow">
                      <img
                        alt="Mundo Geek"
                        className="w-full aspect-video object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_t7a8pEx_X6C9pHTMZLp8wj_l75eEmKJR7PWtfJLxgtBcTZEsI1FDIXFq4x7VpswC6fq-SAn9fe2ND5gvEW5VzwYMDB-qX3zzYMPeMSyFXc3x4b2E_fjPVMU_-y6RtpCvf0pJdY9O7fyGQtDiv7OI_IVBfWvD-a7XtEw8KI8mSX5ZFpTaIU7kuV6oL584Alnj0cOX_oWu9OL1-RMrp0fd7hRhr_l0z0OjyR2odB-WBLC5_WUVS3uTvUqVyfIf4wUbYoJoyG1xJFM"
                      />
                      <div className="p-4">
                        <h4 className="text-white font-bold text-xs uppercase">Mundo Geek</h4>
                        <p className="text-gray-400 text-[10px] mt-1">Acompanhe as últimas novidades do universo geek aqui.</p>
                      </div>
                    </div>
                    <div className="bg-[#111415] rounded-xl overflow-hidden flex flex-col cursor-pointer hover:shadow-lg transition-shadow">
                      <img
                        alt="Mars"
                        className="w-full aspect-video object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_t7a8pEx_X6C9pHTMZLp8wj_l75eEmKJR7PWtfJLxgtBcTZEsI1FDIXFq4x7VpswC6fq-SAn9fe2ND5gvEW5VzwYMDB-qX3zzYMPeMSyFXc3x4b2E_fjPVMU_-y6RtpCvf0pJdY9O7fyGQtDiv7OI_IVBfWvD-a7XtEw8KI8mSX5ZFpTaIU7kuV6oL584Alnj0cOX_oWu9OL1-RMrp0fd7hRhr_l0z0OjyR2odB-WBLC5_WUVS3uTvUqVyfIf4wUbYoJoyG1xJFM"
                      />
                      <div className="p-4">
                        <h4 className="text-white font-bold text-xs uppercase">Missão Marte</h4>
                        <p className="text-gray-400 text-[10px] mt-1">O que a NASA está planejando para o planeta vermelho.</p>
                      </div>
                    </div>
                    <div className="bg-[#111415] rounded-xl overflow-hidden flex flex-col cursor-pointer hover:shadow-lg transition-shadow">
                      <img
                        alt="Robots"
                        className="w-full aspect-video object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_t7a8pEx_X6C9pHTMZLp8wj_l75eEmKJR7PWtfJLxgtBcTZEsI1FDIXFq4x7VpswC6fq-SAn9fe2ND5gvEW5VzwYMDB-qX3zzYMPeMSyFXc3x4b2E_fjPVMU_-y6RtpCvf0pJdY9O7fyGQtDiv7OI_IVBfWvD-a7XtEw8KI8mSX5ZFpTaIU7kuV6oL584Alnj0cOX_oWu9OL1-RMrp0fd7hRhr_l0z0OjyR2odB-WBLC5_WUVS3uTvUqVyfIf4wUbYoJoyG1xJFM"
                      />
                      <div className="p-4">
                        <h4 className="text-white font-bold text-xs uppercase">Robôs Úteis</h4>
                        <p className="text-gray-400 text-[10px] mt-1">Como a automação está ajudando no dia a dia.</p>
                      </div>
                    </div>
                  </div>

                  {/* Embedded Redes Sociais Component */}
                  <div className="md:col-span-3 space-y-4">
                    <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 flex flex-col justify-center h-full">
                      <h3 className="text-sm font-bold text-[#111415] uppercase tracking-wider mb-4 text-center">Conecte-se</h3>
                      <div className="space-y-3">
                        <a className="flex items-center justify-center space-x-2 bg-[#3b5998] text-white py-3 rounded-full font-bold text-[10px] shadow-lg shadow-blue-500/20 hover:opacity-90 transition-opacity" href="#">
                          <FaFacebookF className="text-sm" />
                          <span>Facebook</span>
                        </a>
                        <a className="flex items-center justify-center space-x-2 bg-[#00acee] text-white py-3 rounded-full font-bold text-[10px] shadow-lg shadow-blue-400/20 hover:opacity-90 transition-opacity" href="#">
                          <FaXTwitter className="text-sm" />
                          <span>Twitter / X</span>
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
        {/* Content Area */}
        <main className="p-4 bg-white overflow-y-auto no-scrollbar flex-1" style={{ paddingBottom: "80px" }}>
          <Slider device="mobile" />

          {/* New Content Cards */}
          <section className="grid grid-cols-2 gap-4">
            {/* Card 1 */}
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-sm cursor-pointer">
              <img
                alt="Future Cities"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida/ADBb0ujDAijTpseTsCJT6ChcGYdDbIFGifrHzjqifj7I4JE2j00q8P06_HmDa9T4IOL59WycBQqtC2KkCLuB6EU1g2kx7o5EOSG56JanQ5g12DbFnjTDvpgoakjvavYDT72POFCTcawVpNIUoA6TanZQUlkIo8leFWkYsaIykENqG749-VBA1w2-0nyCTEZT9tY7fYeS2116ZEhHx-vEiHYF4uxZUNenCEUo79wReNoxhQhbweNbjg0URgfSfQ"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3">
                <p className="text-white font-bold text-xs leading-tight">TECNOLOGIA</p>
              </div>
            </div>
            {/* Card 2 */}
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-sm cursor-pointer">
              <img
                alt="Fusion Reactor"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida/ADBb0uhkrED4O3ohZBVImqVgqdrggKiTwl_oDvl6gEBbNVsHNc5Tf6AXfv9vCdGAtOHqN4ANhSr_y8OCn30HV2ZEnDu_XBarjl0w5MQy7oth450B0Jq2HsZYKUpKYruMd0kaj9fNr5AJYZKIRv8_S72qoxyH84GO7TtpbriuhGBC8ALrJP3-20tqeryu7xuxgo70lnnwUsBVy7wVASs3uHj2NxG4xniUZn_w47OuKU5u28DuewJDz4tpfLiFWv0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3">
                <p className="text-white font-bold text-xs leading-tight">CIÊNCIA</p>
              </div>
            </div>
            {/* Card 3 */}
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-sm cursor-pointer">
              <img
                alt="New Gen Satellites"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida/ADBb0uj3z3V0dl380uA5udEE4Ey93-BQn8_kCdBWkzy6FNaPis6o3siwRxFIqqjxBgGa7ylYYviDNuTPvQE66XB8Xxkaug4Av8Yi87OhJe_fQ-Ys5xpPMtgSlEmx5gyYD6dZUjhAmeQTm4aBtwQrQxmq3Moa1iMThdU2sfK2CEQlrKLPp3ywH0g4BRv7nGy729ht29DS7Ahev6Fbex5f4Dg5wpAKhKJf9B-gQf8HizggseAmmn-FYZU1UUW7hwE"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3">
                <p className="text-white font-bold text-xs leading-tight">ESPAÇO</p>
              </div>
            </div>
            {/* Card 4 */}
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-sm cursor-pointer">
              <img
                alt="AI Neural Processing"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0oIuxSSSxgIs2DuiMoeasjZ-mOs0hlFxDXYOE5UkcSUYwl8kC57er13OOzZ3JGFQQ-0hHFL92BlvPkeLiW7BN27l1O4MuhD2aO0iXdoqeViEEwxgXntpMhUd0cb14qW5XukbT2pC1cI7yXdNcWP2EjUeC6-RD8MR4ZCstDTU_RZQNBniWXhvtLylXPQxxK77BrwIMQGpBZ7uEL_kjanTMQat-j2mJh5XgYODD9Z-qDpipy75zS21c5aUyR3Q8d9Pngod_n46TUjM"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3">
                <p className="text-white font-bold text-xs leading-tight">IA</p>
              </div>
            </div>
            {/* Card 5 */}
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-sm cursor-pointer">
              <img
                alt="Future Robotics Lab"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5sBrSxluP8aXu3cfX8ljXXBb4snEBWUQ72a1oZ_fq8suVSg2Z1GjmLzDfr9sIsB0J1M3dRHlLubJSrfhzh3AX6eh03_FD_yrHL3PM6ASvX9Pv485MBK7Fdn__XwHYqh6dGLM46ciyEubTfdn5ncSNbZpyD2ISgGsdbMl5NYtFmRNuL5BlPzEEDJkuwmNxDevYeHwDu_QRDPv145eybXdeV9ewnYm1bqgD5kd8kBPkSLNrKYnFqTmjIih6rj7oQyWNa_VuXaZDKeE"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3">
                <p className="text-white font-bold text-xs leading-tight">ROBÓTICA</p>
              </div>
            </div>
            {/* Card 6 */}
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-sm cursor-pointer">
              <img
                alt="Deep Sea Exploration"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSw9uWjip3YWKjCZOEPbAIGZYmY6QTSxojjkeRZ6brsFf-K9K9lAPJYUBy8GPjVvUKSoV8nV5lLcpS_9nO9fSf0mmi3oXcG0xIgHL1jStb7AU5Q1BNADyJBMIRl8DZvVCuH2XSP-vxXoUkVvkhBeiETXiGPpO-BsulXKOOh_HcSVBK6UVsANbgYfEIZG1v4fc3NsptVkTq8KBQDWkBkHF4_XrpEz0-Enkcg2qfAii6cpKRwF205CySlnEDXGlXPwWsheQ9XwEhFqI"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3">
                <p className="text-white font-bold text-xs leading-tight">OCEANO</p>
              </div>
            </div>
          </section>

          <section className="mt-8 mb-4">
            <div className="flex items-center gap-2 px-1">
              <span className="text-[#222] font-bold text-xs tracking-tight uppercase" style={{ fontFamily: "sans-serif" }}>VARIEDADES</span>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-[#999] to-[#ccc]"></div>
            </div>
          </section>

          <section className="grid grid-cols-2 gap-4 mt-4">
            {/* Card 7 */}
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-sm cursor-pointer">
              <img
                alt="Future Luxury Travel"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDb4YjwIlSMZwwdlhvIzyrxCF1MW4mcVvQZwwyZkM2YuvclqMYreDeYlbaOVKoFhm-XkVwO8J5rIllXEDcOyvPTb3rn2g3WBvprtpulnrdG4UYcx-6rWCg2f-QrZc5NIbeIiLhMvVz-Sq40qf0CzHa0HjVYSWhUfL7XEu1A9VUhSW4W6r6lHlHVyV3ce8l4i8qI9IOJ7XZFA_8AzfkWZ-QVcQPeEuGs9F9httfuUQsLlANYOtKYZsw-iMdct27vLXpPSyaFQcPrDb8"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3">
                <p className="text-white font-bold text-xs leading-tight">ESTILO DE VIDA</p>
              </div>
            </div>
            {/* Card 8 */}
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-sm cursor-pointer">
              <img
                alt="VR Gaming Revolution"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4VmLVTot1796_D0yo3vwF-kUDlBReKOi6Y5eHLvUoQuIlr1zWEugtX8uw4_l8FVPbGREwdriEXlFbccXA0TmEGCcRWxHTtPMHPQy4xtr10yYgy9JyTSDkgDv0riniiK7BC-gMO8ysHjwtaQmKyVezzxbVpQiT3GXe7ftJRwE1IHYKKgeea7_RsQQvUCkxrCtB2WDUTN9ddbwM-xysaQenV8yo20pTm6pwtbzuRnLO4jMZ1oj_1x0EXlVd_0TrWZwPUcwTUx6tEh0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3">
                <p className="text-white font-bold text-xs leading-tight">ENTRETENIMENTO</p>
              </div>
            </div>
          </section>
        </main>

      </div>

      <Footer />
    </div>
  );
}
