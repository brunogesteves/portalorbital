import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  FiHome,
  FiFileText,
  FiLayers,
  FiUsers,
  FiSettings,
  FiChevronDown,
  FiSearch,
  FiLayout,
  FiDatabase,
  FiPlus,
} from "react-icons/fi";
import { MdClose } from "react-icons/md";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { useUIStore } from "@/store/useStore";

export default function Sidebar() {
  const pathname = usePathname();
  const { setIsSidebarOpen } = useUIStore();

  const menuItems = [
    {
      group: "GERAL",
      items: [{ name: "Home", href: "/", icon: FiHome }],
    },
    {
      group: "CADASTROS",
      items: [
        {
          name: "Notícias",
          href: "/posts",
          icon: FiFileText,
          subItems: [
            { name: "Listar Todos", href: "/" },
            { name: "Nova Notícia", href: "/post/new" },
          ],
        },

        { name: "Categorias", href: "/categorias", icon: FiLayers },
        { name: "Procurar", href: "/search", icon: FiSearch },
        { name: "Publishers", href: "/publishers", icon: FiUsers },
        { name: "Anúncios", href: "/ads", icon: FiLayout },
      ],
    },
  ];
  return (
    <motion.aside
      initial={{ width: 0, x: -320 }}
      animate={{ width: 320, x: 0 }}
      exit={{ width: 0, x: -320 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="bg-blue-glossy rounded-r-4xl text-slate-300 flex flex-col h-full shadow-2xl z-50 border-r border-slate-700 overflow-hidden absolute md:relative top-0 left-0"
    >
      <aside id="side-drawer">
        {/* <!-- Drawer Header --> */}
        <div className="p-6 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center">
            <Image
              alt="Orbital Logo Small"
              className="w-8 h-8 mr-2"
              src="/logo.png"
              width={32}
              height={32}
            />
            <span className="font-space font-bold text-white tracking-tight">
              ORBITAL
            </span>
          </div>
          <MdClose
            size={24}
            onClick={() => {
              setIsSidebarOpen(false);
            }}
          />
        </div>
        {/* <!-- Drawer Content --> */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="px-4 space-y-2">
            <li>
              <a
                className="flex items-center px-4 py-3 nav-silver-text hover:bg-white/5 rounded-lg transition-colors group nav-active-glow"
                href="#"
              >
                <span className="material-symbols-outlined mr-4 text-blue-400">
                  memory
                </span>
                <span className="font-space font-bold tracking-widest text-sm">
                  TECNOLOGIA
                </span>
              </a>
            </li>
            <li>
              <a
                className="flex items-center px-4 py-3 nav-silver-text hover:bg-white/5 rounded-lg transition-colors group"
                href="#"
              >
                <span className="material-symbols-outlined mr-4 text-gray-400 group-hover:text-blue-400">
                  science
                </span>
                <span className="font-space font-bold tracking-widest text-sm">
                  CIÊNCIA
                </span>
              </a>
            </li>
            <li>
              <a
                className="flex items-center px-4 py-3 nav-silver-text hover:bg-white/5 rounded-lg transition-colors group"
                href="#"
              >
                <span className="material-symbols-outlined mr-4 text-gray-400 group-hover:text-blue-400">
                  rocket_launch
                </span>
                <span className="font-space font-bold tracking-widest text-sm">
                  ESPAÇO
                </span>
              </a>
            </li>
            <li>
              <a
                className="flex items-center px-4 py-3 nav-silver-text hover:bg-white/5 rounded-lg transition-colors group"
                href="#"
              >
                <span className="material-symbols-outlined mr-4 text-gray-400 group-hover:text-blue-400">
                  neurology
                </span>
                <span className="font-space font-bold tracking-widest text-sm">
                  IA
                </span>
              </a>
            </li>
            <li>
              <a
                className="flex items-center px-4 py-3 nav-silver-text hover:bg-white/5 rounded-lg transition-colors group"
                href="#"
              >
                <span className="material-symbols-outlined mr-4 text-gray-400 group-hover:text-blue-400">
                  smart_toy
                </span>
                <span className="font-space font-bold tracking-widest text-sm">
                  ROBÓTICA
                </span>
              </a>
            </li>
            <li>
              <a
                className="flex items-center px-4 py-3 nav-silver-text hover:bg-white/5 rounded-lg transition-colors group"
                href="#"
              >
                <span className="material-symbols-outlined mr-4 text-gray-400 group-hover:text-blue-400">
                  water
                </span>
                <span className="font-space font-bold tracking-widest text-sm">
                  OCEANO
                </span>
              </a>
            </li>
            <li>
              <a
                className="flex items-center px-4 py-3 nav-silver-text hover:bg-white/5 rounded-lg transition-colors group"
                href="#"
              >
                <span className="material-symbols-outlined mr-4 text-gray-400 group-hover:text-blue-400">
                  dashboard
                </span>
                <span className="font-space font-bold tracking-widest text-sm">
                  VARIEDADES
                </span>
              </a>
            </li>
          </ul>
        </nav>
        {/* <!-- Drawer Footer --> */}
        <div className="p-6 border-t border-white/10">
          <div className="flex items-center justify-center space-x-4 opacity-60">
            <span className="material-symbols-outlined text-sm text-gray-400">
              settings
            </span>
            <span className="material-symbols-outlined text-sm text-gray-400">
              help
            </span>
            <span className="material-symbols-outlined text-sm text-gray-400">
              info
            </span>
          </div>
        </div>
      </aside>
    </motion.aside>
  );
}
