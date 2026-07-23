"use client";

import {
  FiLogOut,
  FiSearch,
  FiMenu,
  FiChevronDown,
  FiUser,
} from "react-icons/fi";

import useHeader from "./useHeader";

const Header = () => {
  const { data, methods } = useHeader();

  return (
    <header className="sticky top-0 z-50 bg-[#0f172a] h-16 md:h-20 flex items-center justify-between px-4 md:px-8 text-white shadow-lg border-b border-slate-700">
      <div className="flex items-center gap-4 md:gap-6">
        <button
          onClick={methods.toggleSidebar}
          className="text-slate-400 hover:text-white transition-colors"
        >
          <FiMenu size={24} />
        </button>
      </div>

      {/* Barra de Busca */}
      <div className="flex-1 max-w-xl px-3 md:px-10 hidden sm:block">
        <div className="relative group">
          <input
            type="text"
            placeholder="Search for..."
            value={data.searchQuery}
            onChange={(e) => methods.setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && methods.handleSearch()}
            className="w-full bg-white text-slate-800 rounded-lg px-5 py-2.5 pr-12 outline-none focus:ring-2 focus:ring-red-600 transition-all text-sm font-medium"
          />
          <div
            onClick={methods.handleSearch}
            className="absolute right-0 top-0 h-full px-4 flex items-center bg-slate-100 rounded-r-lg border-l border-slate-200 text-slate-500 cursor-pointer hover:bg-slate-200 transition-colors"
          >
            <FiSearch size={18} />
          </div>
        </div>
      </div>

      {/* Perfil do Usuário e Logout */}
      <div className="flex items-center gap-3 md:gap-8">
        {/* Relógio Minimalista */}
        <div className="hidden lg:block text-slate-400 font-mono text-sm tracking-widest">
          {data.mounted
            ? data.time.toLocaleTimeString("pt-BR", { hour12: false })
            : "--:--:--"}
        </div>

        {/* Dropdown de Usuário */}
        <div className="flex items-center gap-2 md:gap-3 cursor-pointer group hover:bg-slate-800 p-1.5 md:p-2 rounded-lg transition-colors">
          <span className="text-xs md:text-sm font-bold text-slate-300 hidden sm:inline">Admin</span>
          <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-slate-700 flex items-center justify-center border border-slate-600">
            <FiUser className="text-slate-400" size={14} />
          </div>
          <FiChevronDown className="text-slate-500 group-hover:text-white transition-colors hidden sm:block" />

          {/* Logout embutido no clique (simplificado para o teste) */}
          <button
            onClick={methods.handleLogout}
            className="hidden group-hover:block absolute top-16 right-8 bg-white text-slate-800 p-4 rounded-xl shadow-2xl border border-slate-100 min-w-[150px] animate-in fade-in zoom-in duration-200"
          >
            <div className="flex items-center gap-3 font-bold text-red-600">
              <FiLogOut /> Sair do Sistema
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
