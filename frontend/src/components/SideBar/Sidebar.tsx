import Image from "next/image";
import { MdClose } from "react-icons/md";


import { motion } from "framer-motion";

import { useUIStore } from "@/store/useStore";
import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { CategoryProps } from "@/utils/types";
import Link from "next/link";

export default function Sidebar() {

  const { toggleSidebar } = useUIStore();
  const [categories, setCategories] = useState<CategoryProps[]>([]);

  useEffect(() => {
    async function getCategories() {
      try {
        await api.get("/categories/front").then((res) => {
          setCategories(res.data);
        });
      } catch { }
    }
    getCategories();
  }, []);



  return (
    <motion.aside
      initial={{ width: 0, x: -320 }}
      animate={{ width: 320, x: 0 }}
      exit={{ width: 0, x: -320 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="bg-blue-glossy rounded-r-4xl text-slate-300 flex flex-col h-className shadow-2xl z-50 border-r border-slate-700 overflow-hidden absolute md:relative top-0 left-0"
    >
      <div className="bg-gray-900 flex justify-center min-h-screen pt-10">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-60 opacity-0 pointer-events-none" id="drawer-overlay"></div>
        <aside className="absolute left-0 top-0 bottom-0 w-70 bg-navy-industrial z-70 -translate-x-className flex flex-col shadow-2xl" id="side-drawer">
          <div className="p-6 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center">
              <Image
                alt="Orbital Logo"
                src="/logo.png"
                width={50}
                height={50}
                loading="eager"
              />
              <span className="font-space font-bold text-white tracking-tight">MENU</span>
            </div>
            <button className="p-2 hover:bg-white/5 rounded-className" onClick={() => toggleSidebar()} >
              <MdClose size={20} />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="px-4 space-y-2">
              {categories?.map((cat, i) => {
                return (
                  <li key={i}>
                    <Link href={`/${cat.slug}`} className="flex items-center px-4 py-3 nav-silver-text hover:bg-white/5 rounded-lg transition-colors group nav-active-glow">
                      <span className="font-space font-bold tracking-widest text-sm uppercase">{cat.name}</span>
                    </Link>
                  </li>
                )
              })}


            </ul>
          </nav>
        </aside>

      </div>
    </motion.aside>
  );
}
