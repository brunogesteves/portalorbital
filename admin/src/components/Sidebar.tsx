"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import {
  FiHome, FiFileText, FiLayers, FiUsers,
  FiSettings, FiChevronDown, FiSearch,
  FiLayout, FiDatabase, FiPlus
} from 'react-icons/fi';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
// import { useUIStore } from '@/store/useUIStore';

const Sidebar = () => {
  const pathname = usePathname();
  // const { isSidebarOpen } = useUIStore();
  const [isCadastrosOpen, setIsCadastrosOpen] = useState(true);

  const menuItems = [
    {
      group: 'GERAL',
      items: [
        { name: 'Home', href: '/', icon: FiHome },
      ]
    },
    {
      group: 'CADASTROS',
      items: [
        {
          name: 'Notícias',
          href: '/posts',
          icon: FiFileText,
          subItems: [
            { name: 'Listar Todos', href: '/' },
            { name: 'Nova Notícia', href: '/post/new' }
          ]
        },

        { name: 'Categorias', href: '/categorias', icon: FiLayers },
        { name: 'Procurar', href: '/search', icon: FiSearch },
        { name: 'Publishers', href: '/publishers', icon: FiUsers },
        { name: 'Anúncios', href: '/ads', icon: FiLayout },
      ]
    }
  ];

  return (
    <motion.aside
      initial={{ width: 0, x: -320 }}
      animate={{ width: 320, x: 0 }}
      exit={{ width: 0, x: -320 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="bg-[#1e293b] text-slate-300 flex flex-col h-full shadow-2xl z-50 border-r border-slate-700 overflow-hidden absolute md:relative top-0 left-0"
    >
      {/* Título do Painel */}
      <div className="bg-[#0f172a] p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold text-white tracking-tight uppercase">Painel Administrativo</h1>
      </div>

      {/* Seção Bem-vindo */}
      <div className="p-8 border-b border-slate-700 bg-[#1e293b]/50">
        <div className="flex flex-col items-center">
          <span className="text-xs text-slate-400 font-medium">Bem-vindo,</span>
          <span className="text-lg font-bold text-white mt-1">Administrador</span>
        </div>
      </div>

      {/* Navegação */}
      <nav className="flex-1 overflow-y-auto custom-scrollbar p-4">
        {menuItems.map((group) => (
          <div key={group.group} className="mb-8">
            {/* <h3 className="px-4 mb-4 text-[11px] font-black text-slate-500 uppercase tracking-widest">
              {group.group}
            </h3> */}
            <ul className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                const hasSubItems = !!item.subItems;

                return (
                  <li key={item.name}>
                    <div className="flex flex-col">
                      <Link
                        href={item.href}
                        onClick={(e) => {
                          if (hasSubItems) {
                            // Previnir navegação direta se tiver sub-itens (opcional)
                            // setIsCadastrosOpen(!isCadastrosOpen);
                          }
                        }}
                        className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group ${isActive
                          ? 'bg-red-600 text-white shadow-lg'
                          : 'hover:bg-slate-700/50 hover:text-white'
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={18} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-red-500'} />
                          <span className="font-semibold text-sm">{item.name}</span>
                        </div>
                        {hasSubItems && <FiChevronDown size={14} className={isCadastrosOpen ? 'rotate-180 transition-transform' : ''} />}
                      </Link>

                      {hasSubItems && isCadastrosOpen && (
                        <ul className="mt-1 ml-4 border-l border-slate-700">
                          {item.subItems?.map(sub => (
                            <li key={sub.name}>
                              <Link
                                href={sub.href}
                                className={`flex items-center gap-3 px-8 py-2.5 text-xs font-medium transition-colors hover:text-red-500 ${pathname === sub.href ? 'text-red-500' : 'text-slate-400'
                                  }`}
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
                                {sub.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer / Logout Rápido */}
      <div className="p-4 border-t border-slate-700 bg-[#0f172a]/30 flex justify-around">
        <button className="p-2 hover:text-red-500 transition-colors" title="Configurações"><FiSettings /></button>
        <button className="p-2 hover:text-red-500 transition-colors" title="Banco de Dados"><FiDatabase /></button>
        <button className="p-2 hover:text-red-500 transition-colors" title="Layout"><FiLayout /></button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
