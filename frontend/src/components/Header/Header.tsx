"use client"
import { FiMenu, FiSearch } from "react-icons/fi";
import { useHeader } from "./useHeader";
import { CategoryProps } from "@/utils/types";

export default function Header() {
  const { data, methods } = useHeader();

  return (
    <>
      {/* 💻 DESKTOP HEADER (md breakpoint and above) */}
      <div className="hidden md:block">
        {/* BEGIN: MainHeader */}
        <header className="bg-metallic-header w-full h-[60px] flex items-center px-6 relative" data-purpose="site-header">
          {/* BEGIN: LeftSection */}
          {/* Hamburger Menu Icon */}
          <div className="flex-none" data-purpose="navigation-trigger">
            <button aria-label="Menu" className="text-gray-700 hover:text-black transition-colors flex items-center justify-center">
              <FiMenu className="h-8 w-8" />
            </button>
          </div>
          {/* END: LeftSection */}

          {/* BEGIN: CenterSection */}
          {/* Logo with Graphic and Typography */}
          <div className="flex-grow flex justify-center items-center" data-purpose="logo-container">
            <div className="flex items-center space-x-2">
              {/* Orbital Ring Graphic SVG */}
              <img
                alt="Orbital Logo"
                className="h-10 w-auto object-contain"
                data-purpose="logo-icon"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgofKmN8O3SnmsRyYpCmNA1I4CUXhmozms5xV1laABwzRu2hdegZ0PvrbvinIUWwYG38HgYS4pJFL3bVDDu32ed6352moBf8KzpUfZT0TUurvJTm9GZxHg9h4zcUt-VqX0wAl_zUAbvWCc_ePpwJ73yhwM1DGVgJt05wow-RRWD9dfo4CplXlozyrXSGGr3k2o-LLPr2Xj5cnXiDWHjO9YLvEUWW--iIs4ioY5RdUKujYdfrVo9p3lT4P-m_0PRv6dux7tJT04zlM"

              />
              {/* Text Logo */}
              <div className="flex flex-col leading-none select-none">
                <span className="text-[#1e3a8a] text-xl font-black font-orbital italic" style={{ fontSize: "1.4rem" }}>ORBITAL CHANNEL TV</span>
                {/* <span className="text-[#7f1d1d] text-base font-bold font-orbital tracking-widest italic" style={{ fontSize: "1.1rem", marginTop: "-2px" }}>CHANNEL</span> */}
              </div>
            </div>
          </div>
          {/* END: CenterSection */}

          {/* BEGIN: RightSection */}
          {/* Search Bar and Profile */}
          <div className="flex-none flex items-center space-x-6" data-purpose="header-utilities">
            {/* Search Input Container */}
            <div className="relative group" data-purpose="search-bar">
              <div className="flex items-center bg-gray-200/40 border border-gray-400 rounded-md px-3 py-1 w-48 transition-all focus-within:w-64 focus-within:bg-white/80">
                <input className="bg-transparent border-none text-sm w-full p-0 focus:ring-0 text-gray-700 placeholder-gray-500" placeholder="Buscar..." type="text" />
                <FiSearch className="h-4 w-4 text-gray-600 ml-1 cursor-pointer" />
              </div>
            </div>
            {/* Profile Icon */}
            {/* <button className="flex items-center justify-center" data-purpose="user-account">
              <div className="w-8 h-8 rounded-full border-2 border-gray-600 flex items-center justify-center bg-gray-300 overflow-hidden">
                <FiUser className="h-5 w-5 text-gray-600" />
              </div>
            </button> */}
          </div>
          {/* END: RightSection */}
        </header>

        <nav className="bg-nav-red-strip w-full py-2 flex justify-center items-center" data-purpose="secondary-navigation">
          <ul className="bg-nav-blue-pill rounded-full flex items-center px-4 py-1.5 space-x-0">
            {data.categories.sort().map((cat: CategoryProps) => (
              <li key={cat.id} className="nav-link text-white px-4">
                <a href={`/${cat.name}`}>{cat.name}</a>
              </li>
            ))}
          </ul>
        </nav>
        {/* END: MainHeader */}
      </div>

      {/* 📱 MOBILE HEADER (below md breakpoint) */}
      <div className="block md:hidden">
        {/* BEGIN: HeaderSection */}
        <header className="bg-header-gradient relative overflow-hidden pb-1 pt-4" style={{ background: "linear-gradient(rgb(254, 254, 254) 70%, rgb(181, 190, 197) 100%)" }}>
          {/* Top Bar: Menu, Logo, Search */}
          <div className="flex items-center justify-between relative z-10 px-4 pb-2">
            {/* Menu Icon */}
            <button className="text-gray-700 hover:text-black flex items-center justify-center" aria-label="Abrir Menu">
              <FiMenu className="w-6 h-6" />
            </button>
            {/* Logo */}
            <div className="flex flex-col items-center justify-center flex-1">
              <div className="flex items-center">
                {/* Logo Icon */}
                <div className="relative w-10 h-10 mr-2 flex items-center justify-center">
                  <img
                    alt="Orbital Channel Logo"
                    className="w-full h-auto max-h-full object-contain"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgofKmN8O3SnmsRyYpCmNA1I4CUXhmozms5xV1laABwzRu2hdegZ0PvrbvinIUWwYG38HgYS4pJFL3bVDDu32ed6352moBf8KzpUfZT0TUurvJTm9GZxHg9h4zcUt-VqX0wAl_zUAbvWCc_ePpwJ73yhwM1DGVgJt05wow-RRWD9dfo4CplXlozyrXSGGr3k2o-LLPr2Xj5cnXiDWHjO9YLvEUWW--iIs4ioY5RdUKujYdfrVo9p3lT4P-m_0PRv6dux7tJT04zlM"
                  />
                </div>
                {/* Logo Text */}
                <div className="flex flex-col leading-tight">
                  <span className="text-[#0f3d70] font-bold text-lg tracking-wide uppercase">Orbital Channel TV</span>
                  {/* <span className="text-[#c1121f] font-bold text-sm tracking-widest uppercase mt-[-4px]">Channel</span> */}
                </div>
              </div>
            </div>
            {/* Search Icon */}
            <button className="text-gray-700 hover:text-black flex items-center justify-center" aria-label="Buscar">
              <FiSearch className="w-5 h-5" />
            </button>
          </div>
          {/* Full width horizontal line */}
          <div className="w-full h-[1px] bg-[#999] relative z-10 mb-2"></div>
          {/* Navigation Bar */}
          <nav className="relative z-10 w-full overflow-x-auto no-scrollbar">
            <ul className="flex space-x-2 px-4 items-center w-max pb-1">
              <li>
                <a href="/" className="btn-silver-active tracking-tight font-sans cursor-pointer">
                  Tecnologia
                </a>
              </li>
              
              {data.categories.sort().map((cat: CategoryProps) => (
                <li key={cat.id}>
                  <a  href={`/${cat.name}`} className="btn-blue-glossy tracking-tight font-sans cursor-pointer">
                    {cat.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </header>
        {/* END: HeaderSection */}
      </div>
    </>
  );
}
