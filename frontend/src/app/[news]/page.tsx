/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiShare2 } from "react-icons/fi";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import HeroSlider from "@/components/Slider/Slider";

type Props = {
  params: Promise<{ news: string }>;
};

// Gerador dinâmico de metadados para SEO da Notícia
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { news } = await params;

  // Formata o slug da notícia (ex: nova-lei-aprovada -> Nova Lei Aprovada)
  const newsTitle = news
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${newsTitle}`,
    description: `Leia mais sobre "${newsTitle}" no Portal Político. Análise completa e atualizações ao vivo.`,
    alternates: {
      canonical: `/${news}`,
    },
    openGraph: {
      title: `${newsTitle} | Portal Político`,
      description: `Leia mais sobre "${newsTitle}" no Portal Político.`,
      type: "article",
    },
  };
}

export default async function NewsPage({ params }: Props) {
  const { news } = await params;

  const newsTitle = news
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="w-full min-h-screen bg-white flex flex-col font-awanzaman">
      <Header />

      {/* ========================================================================= */}
      {/* 💻 DESKTOP LAYOUT (md breakpoint and above)                              */}
      {/* ========================================================================= */}
      <div className="hidden md:block text-gray-800 min-h-screen bg-white">
        <main className="w-full min-h-screen">
          {/* Hero Slider */}
          <HeroSlider device="desktop" />

          {/* Dedicated Article Reading Area */}
          <section className="bg-white py-12 px-6 md:px-16" data-purpose="article-reading-section">
            <div className="max-w-4xl mx-auto space-y-12">
              <article className="flex flex-col">
                {/* Headline */}
                <h1 className="text-gray-900 font-bold text-3xl md:text-5xl leading-tight mb-8">
                  {newsTitle}
                </h1>

                {/* Header Info and Social Icons Row */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                  <div className="flex flex-col">
                    <span className="text-gray-500 text-xs mb-1">18/05/2026</span>
                    <span className="text-blue-700 text-sm font-bold">Por Igor Siqueira e Pedro Lopes, UOL</span>
                  </div>

                  {/* Social Media Icons */}
                  <div className="flex space-x-4">
                    <button aria-label="Facebook" className="text-gray-400 hover:text-blue-700 transition-colors">
                      <FaFacebookF className="w-5 h-5" />
                    </button>
                    <button aria-label="X (Twitter)" className="text-gray-400 hover:text-blue-700 transition-colors">
                      <FaXTwitter className="w-5 h-5" />
                    </button>
                    <button aria-label="Compartilhar" className="text-gray-400 hover:text-blue-700 transition-colors">
                      <FiShare2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Photo */}
                <div className="mb-8 rounded-lg overflow-hidden shadow-xl border border-gray-100">
                  <img
                    alt="Capa da Notícia"
                    className="w-full h-auto object-cover"
                    src="https://lh3.googleusercontent.com/aida/ADBb0ugBRKkOEmz-Pj4mY-1jolRWIJ2p-TibU6AIgsgRZolQEY83YSmcyjdkXKOGh3VMeEdzYzZUKQ5jNe16c2k_M41mQau9c3hK_cOGBxN20TSo4SzfRJ3nKYByY9oB03dHXr6SmbhLscds-IxwmzQI6J1VDwdXYd4KV9Nuio0W4wxNS2cpFPwZERxBUO_KTJLylyswDIopn7oZIm6bnldcQWt9BBlp9O-wCYk_ywhWU7AvkFEJ3QJGzps9kr0"
                  />
                </div>

                {/* Text Content */}
                <div className="space-y-6">
                  <div className="text-gray-700 text-lg leading-relaxed space-y-4">
                    <p>O jogador Neymar Jr. está no centro de uma movimentação política e empresarial sem precedentes. Fontes ligadas ao staff do atleta confirmam que diversas marcas globais e grupos de investimento estão articulando uma estratégia de &quot;lobby preventivo&quot; para garantir a imagem do craque em mercados emergentes antes mesmo da próxima Copa do Mundo.</p>
                    <p>A estratégia envolve desde parcerias com o setor de tecnologia até a incursão no mercado de entretenimento digital, onde Neymar já possui forte presença. O objetivo é blindar a marca &quot;Neymar&quot; de possíveis flutuações de performance no campo, focando no seu poder de influência como ícone cultural global.</p>
                    <p>Especialistas em marketing esportivo afirmam que nunca se viu tamanha coordenação de interesses em torno de um único atleta brasileiro, superando até mesmo os recordes de contratos publicitários de décadas anteriores.</p>
                  </div>
                </div>
              </article>

              <div className="border-t border-gray-200"></div>
            </div>
          </section>
        </main>
      </div>

      {/* ========================================================================= */}
      {/* 📱 MOBILE LAYOUT (below md breakpoint)                                   */}
      {/* ========================================================================= */}
      <div className="block md:hidden text-gray-800 min-h-screen bg-white flex flex-col w-full">
        <main className="p-4 bg-white overflow-y-auto no-scrollbar flex-1" style={{ paddingBottom: "80px" }}>
          {/* Hero Slider */}
          <HeroSlider device="mobile" />

          {/* Publication Date/Time */}
          <div className="mb-3 mt-4">
            <p className="text-[11px] text-gray-500 font-medium">
              18/05/2026 14h30 — Atualizado há 2 horas
            </p>
          </div>

          {/* Author Name with Avatar */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
              <img
                alt="Redação Orbital"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDn1jMOelWpeN948UBOAfjUijt3RwwzmAP7dNLN1HaGVXKbhacG81uGZIjKOyWjVIMKb6CRYApC9cAuBRhvOaGfjQtc6reqhlJJXO9Cda_pHgqTqqKiknC4x3O49Tt9FjKehmNxqPWdSS2AX4ATQYZ_8naDVsbO4tX0rGAE69WFxwNLG7mWFPAIFtX90iOCCu_0nMnknRyqmmihu_PRboPdVGPvjada9ETH_dn-hHDonkWuw07QBEPqkR_KZDyznv0YJGBcUy5UDm0"
              />
            </div>
            <p className="text-sm font-bold text-gray-800">Por Redação Orbital</p>
          </div>

          {/* Social Media Share Icons */}
          <div className="flex items-center gap-3 mb-6">
            <button aria-label="WhatsApp" className="w-8 h-8 rounded-full flex items-center justify-center bg-[#25D366] text-white">
              <FaWhatsapp className="text-sm" />
            </button>
            <button aria-label="Facebook" className="w-8 h-8 rounded-full flex items-center justify-center bg-[#1877F2] text-white">
              <FaFacebookF className="text-sm" />
            </button>
            <button aria-label="X (Twitter)" className="w-8 h-8 rounded-full flex items-center justify-center bg-black text-white">
              <FaXTwitter className="text-sm" />
            </button>
            <button aria-label="Compartilhar" className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-200 text-gray-600">
              <FiShare2 className="text-sm" />
            </button>
          </div>

          {/* Main News Image */}
          <div className="relative w-full mb-4 rounded-lg overflow-hidden shadow-sm">
            <img
              alt="Capa da Notícia Mobile"
              className="w-full h-auto aspect-video object-cover"
              src="https://lh3.googleusercontent.com/aida/ADBb0uhL-ca7829kk3hIAlb9FeBHLmqMPaCVzLVp7-LLvED_0_33651uYmNWzhiZUjN-boIWDgNxfnUIxSrW8ppvsgt-X39OxhhisscBNWDENofOBCFBH2MMb3dMmhbTFz46XSq9h0yhUvTnv4G2jgtyz7Zleqe74Wudc6ix6AHkj48wK6LwtnrPN0SMDjYt7x1Y5iJvc62hS-_GfAUjh6oRJTCFrlMRTIG27CdYWtPoIaRM_2dXTEzYjnR08sk"
            />
            <div className="bg-black/50 absolute bottom-0 left-0 right-0 p-2">
              <p className="text-[10px] text-white/80">Representação holográfica da malha neural quântica do Orbital Channel. (Foto: Divulgação)</p>
            </div>
          </div>

          {/* News Text Content */}
          <article className="prose prose-slate max-w-none">
            <h1 className="text-2xl font-extrabold text-gray-900 leading-tight mb-3">
              {newsTitle}
            </h1>
            <p className="text-lg text-gray-600 font-medium leading-snug mb-6 border-l-4 border-[#c1121f] pl-4 italic">
              Tecnologia permite o processamento de dados em tempo real a partir de satélites de baixa órbita, prometendo revolucionar a transmissão de notícias e o acesso global à informação.
            </p>

            <blockquote className="my-8 py-4 border-y border-gray-200">
              <p className="text-xl text-gray-900 text-center italic">
                &quot;Não estamos apenas enviando informação pelo espaço; estamos transformando o espaço em informação.&quot;
              </p>
              <cite className="block text-center text-sm font-bold text-gray-500 mt-2">— Diretor de Inovação Orbital</cite>
            </blockquote>

            <h3 className="text-lg font-bold text-gray-900 mt-6 mb-2">Impacto na Segurança da Informação</h3>
            <p className="text-gray-800 leading-relaxed mb-6">
              A criptografia nativa do sistema é virtualmente impossível de ser interceptada por métodos cibernéticos atuais. Cada bit de notícia entregue ao seu dispositivo é validado por uma assinatura biométrica-espacial, garantindo a integridade absoluta dos fatos em uma era onde a desinformação se tornou uma ameaça global.
            </p>
          </article>
        </main>
      </div>

      <Footer />
    </div>
  );
}
