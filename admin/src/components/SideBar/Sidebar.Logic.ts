import { useUIStore } from "@/store/useUIStore";
import { useState } from "react";

import {
  FiHome,
  FiFileText,
  FiLayers,
  FiUsers,
  FiSearch,
  FiLayout,
} from "react-icons/fi";

export const useSidebarLogic = () => {
  const { setIsSidebarOpen, userData } = useUIStore();
  const [isOpen, setIsOpen] = useState(true);

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
          href: "/",
          icon: FiFileText,
          subItems: [
            { name: "Listar Todos", href: "/" },
            { name: "Nova Notícia", href: "/post/new" },
            { name: "Em Análise", href: "/post/pending" },
          ],
        },

        { name: "Categorias", href: "/category", icon: FiLayers },
        { name: "Procurar", href: "/search", icon: FiSearch },
        { name: "Publishers", href: "/publishers", icon: FiUsers },
        { name: "Anúncios", href: "/ads", icon: FiLayout },
      ],
    },
  ];

  return {
    setIsSidebarOpen,
    isOpen,
    menuItems,

    userData,
  };
};
