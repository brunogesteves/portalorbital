import React from 'react';
import Link from 'next/link';
import { FiPlus } from 'react-icons/fi';

const WelcomeSection = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-red-600 font-black text-[10px] uppercase tracking-[4px] mb-2">
          <div className="w-12 h-[2px] bg-red-600"></div>
          Dashboard Geral
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none">
          Visão Geral do <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-900">Portal</span>
        </h1>
        <p className="text-slate-500 font-medium max-w-md text-sm md:text-base">Gerencie publicações, métricas e usuários em uma interface centralizada.</p>
      </div>
      <Link href="/post/new" className="bg-red-600 text-white px-6 md:px-10 py-4 md:py-5 rounded-2xl font-black text-sm hover:bg-red-700 transition-all shadow-2xl shadow-red-900/20 flex items-center gap-3 active:scale-95 group">
        <FiPlus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
        Nova Publicação
      </Link>
    </div>
  );
};

export default WelcomeSection;
