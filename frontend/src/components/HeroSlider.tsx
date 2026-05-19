/* eslint-disable @next/next/no-img-element */
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { HeroSliderProps } from "@/utils/types";

export default function HeroSlider({ device }: HeroSliderProps) {
  if (device === "desktop") {
    return (
      <section className="relative w-full aspect-[554/156] bg-black overflow-hidden group" data-purpose="hero-slider">
        {/* Background Image */}
        <img
          alt="A high-tech, futuristic cityscape at night with glowing blue and white lights, holographic interfaces appearing in the sky, reflecting the revolution of Artificial Intelligence"
          className="absolute inset-0 w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCF1-cDrxBPWE-Rul_2abemBXAaOpG3K84DT4m5cF0rSazOf_c8wR1fZJMSwvp4R7Nr3JWIAKcpvby2t_iot2_evhUqvpd96-fLYZjlQQvCsZgrO0DrH4beeIn_IGXl6IheM7nGwfP9U15S2VCoXWH4VDUws3mQ39itbsrslztByIivzUn31cVoqvz-U5FXsDh8kv3IdUbqptNVIiZfo5OYnJUd6rZGt-2xy4hrECvTyPlVnSolSJs_K11yqNn0TuB15XYzk7Wb6IM"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        {/* Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-[#b91c1c] text-white text-[20px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider ml-[150px]">Destaque</span>
        </div>
        {/* Content */}
        <div className="absolute bottom-4 flex justify-center w-full">
          <h1 className="text-white  font-sans font-bold text-xl md:text-2xl lg:text-3xl leading-tight max-w-4xl">
            A REVOLUÇÃO DA IA: Como Bill Gates e Microsoft estão moldando o futuro com Windows e Chrome
          </h1>
        </div>
        {/* Navigation Arrows */}
        <button className="absolute left-2 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors px-2 flex items-center justify-center">
          <FiChevronLeft size={48} />
        </button>
        <button className="absolute right-2 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors px-2 flex items-center justify-center">
          <FiChevronRight size={48} />
        </button>
        {/* Pagination Dots */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1.5">
          <div className="w-2 h-2 rounded-full bg-[#b91c1c]"></div>
          <div className="w-2 h-2 rounded-full bg-white/50"></div>
          <div className="w-2 h-2 rounded-full bg-white/50"></div>
        </div>
      </section>
    );
  }

  return (
    <div className="relative mb-8">
      <div className="w-full aspect-[16/9] bg-gray-100 rounded-2xl overflow-hidden shadow-md relative">
        <div className="absolute inset-0 bg-[#0047AB]"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <h3 className="text-white font-bold text-lg leading-tight">Destaque: As inovações espaciais que estão mudando o mundo</h3>
        </div>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 left-2">
        <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white cursor-pointer" aria-label="Slide Anterior">
          <FiChevronLeft className="text-sm" />
        </button>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-2">
        <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white cursor-pointer" aria-label="Próximo Slide">
          <FiChevronRight className="text-sm" />
        </button>
      </div>
      <div className="flex justify-center gap-1.5 mt-3">
        <span className="w-2 h-2 rounded-full bg-blue-600"></span>
        <span className="w-2 h-2 rounded-full bg-gray-300"></span>
        <span className="w-2 h-2 rounded-full bg-gray-300"></span>
      </div>
    </div>
  );
}
