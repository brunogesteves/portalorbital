import Image from "next/image";
import { FaFacebookF, FaYoutube, FaRss } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <>
      {/* 💻 DESKTOP FOOTER (md breakpoint and above) */}
      <div className="hidden md:block">
        {/* BEGIN: Footer */}
        <footer
          className="w-full bg-[#001b3d] text-white py-12 px-6 md:px-16 border-t border-blue-900/50 relative overflow-hidden"
          style={{
            background:
              "radial-gradient(circle, rgb(0, 74, 153) 0%, rgb(0, 27, 61) 100%)",
          }}
        >
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, rgb(0, 174, 239) 1px, transparent 0px)",
              backgroundSize: "24px 24px",
              opacity: 0.07,
            }}
          ></div>
          <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Column 1: Quem Somos */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold font-orbital tracking-wider uppercase border-b border-blue-400/30 pb-2 inline-block text-[#F0F4F8]">
                Quem Somos
              </h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <ul className="space-y-2">
                  <li>
                    <a
                      className="text-sm hover:text-white transition-colors text-[#F0F4F8]"
                      href="#"
                    >
                      Sobre Casa Eletrônica
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-sm hover:text-white transition-colors text-[#F0F4F8]"
                      href="#"
                    >
                      Parceiros
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-sm hover:text-white transition-colors text-[#F0F4F8]"
                      href="#"
                    >
                      Serviços
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-sm hover:text-white transition-colors text-[#F0F4F8]"
                      href="#"
                    >
                      Produtos
                    </a>
                  </li>
                </ul>
                <ul className="space-y-2">
                  <li>
                    <a
                      className="text-sm hover:text-white transition-colors text-[#F0F4F8]"
                      href="#"
                    >
                      App
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-sm hover:text-white transition-colors text-[#F0F4F8]"
                      href="#"
                    >
                      Fale Conosco
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-sm hover:text-white transition-colors text-[#F0F4F8]"
                      href="#"
                    >
                      Política de Privacidade
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-sm hover:text-white transition-colors text-[#F0F4F8]"
                      href="#"
                    >
                      Termos de Uso
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Column 2: Contato */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold font-orbital tracking-wider uppercase border-b border-blue-400/30 pb-2 inline-block text-[#F0F4F8]">
                Contato
              </h3>
              <div className="space-y-4">
                <p className="text-sm leading-relaxed text-[#F0F4F8]">
                  Uma plataforma de conteúdo tecnológico inovadora trazendo o
                  melhor em tecnologia mundial, sempre buscando as notícias mais
                  atualizadas para você. Localizados na vanguarda da informação
                  digital para levar o futuro até você hoje.
                </p>
                <p className="text-sm leading-relaxed font-semibold italic text-[#F0F4F8]">
                  Visite-nos em nosso escritório virtual ou entre em contato
                  pelos canais de atendimento exclusivos aos parceiros.
                </p>
              </div>
            </div>

            {/* Column 3: Redes Sociais */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold font-orbital tracking-wider uppercase border-b border-blue-400/30 pb-2 inline-block text-[#F0F4F8]">
                Redes Sociais
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center bg-white/10">
                    <FaFacebookF className="text-[18px] text-[#F0F4F8]" />
                  </div>
                  <span className="text-sm text-[#F0F4F8]">
                    Orbital Channel
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center bg-white/10">
                    <FaXTwitter className="text-[18px] text-[#F0F4F8]" />
                  </div>
                  <span className="text-sm text-[#F0F4F8]">O-B-M Channel</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center bg-white/10">
                    <FaYoutube className="text-[18px] text-[#F0F4F8]" />
                  </div>
                  <span className="text-sm text-[#F0F4F8]">OO-M Channel</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center bg-white/10">
                    <FaRss className="text-[18px] text-[#F0F4F8]" />
                  </div>
                  <span className="text-sm text-[#F0F4F8]">O-A-M Channel</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="relative max-w-7xl mx-auto mt-12 pt-6 border-t border-blue-400/20 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-white/80 text-[#F0F4F8]">
              © 2024 Orbital Channel. Todos os direitos reservados.
            </p>
            <Image
              alt="Orbital Logo Small"
              className="h-8 w-auto object-contain mt-4 md:mt-0"
              fill
              src="/logo.png"
            />
          </div>
        </footer>
        {/* END: Footer */}
      </div>

      {/* 📱 MOBILE FOOTER (below md breakpoint) */}
      <div className="block md:hidden">
        <footer className="bg-metallic-footer left-0 right-0 z-50 relative mt-auto">
          <span
            className="text-white font-medium uppercase tracking-wider"
            style={{ fontSize: "0.5rem" }}
          >
            Orbital Channel - O mundo em suas mãos
          </span>
        </footer>
      </div>
    </>
  );
}
