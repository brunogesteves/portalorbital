"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/Utils/api';
import { FiLogOut, FiSearch, FiMenu, FiChevronDown, FiUser } from 'react-icons/fi';
import { useUIStore } from '@/store/useUIStore';

const Header = () => {
  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const { toggleSidebar } = useUIStore();

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      router.push('/login');
    } catch (error) {
      console.error('Erro ao sair:', error);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0f172a] h-20 flex items-center justify-between px-8 text-white shadow-lg border-b border-slate-700">
      {/* Botão Burger e Menu */}
      <div className="flex items-center gap-6">
        <button
          onClick={toggleSidebar}
          className="text-slate-400 hover:text-white transition-colors"
        >
          <FiMenu size={24} />
        </button>
      </div>

      {/* Barra de Busca (como na imagem) */}
      <div className="flex-1 max-w-xl px-10">
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Search for..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full bg-white text-slate-800 rounded-lg px-5 py-2.5 pr-12 outline-none focus:ring-2 focus:ring-red-600 transition-all text-sm font-medium"
          />
          <div 
            onClick={handleSearch}
            className="absolute right-0 top-0 h-full px-4 flex items-center bg-slate-100 rounded-r-lg border-l border-slate-200 text-slate-500 cursor-pointer hover:bg-slate-200 transition-colors"
          >
            <FiSearch size={18} />
          </div>
        </div>
      </div>

      {/* Perfil do Usuário e Logout */}
      <div className="flex items-center gap-8">
        {/* Relógio Minimalista */}
        <div className="hidden md:block text-slate-400 font-mono text-sm tracking-widest">
          {mounted ? time.toLocaleTimeString('pt-BR', { hour12: false }) : '--:--:--'}
        </div>

        {/* Dropdown de Usuário */}
        <div className="flex items-center gap-3 cursor-pointer group hover:bg-slate-800 p-2 rounded-lg transition-colors">
          <span className="text-sm font-bold text-slate-300">Admin</span>
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center border border-slate-600">
            <FiUser className="text-slate-400" />
          </div>
          <FiChevronDown className="text-slate-500 group-hover:text-white transition-colors" />

          {/* Logout embutido no clique (simplificado para o teste) */}
          <button
            onClick={handleLogout}
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
