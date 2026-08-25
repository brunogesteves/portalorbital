import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { api } from "@/Utils/api";
import { useUIStore } from "@/store/useUIStore";

const useHeader = () => {
  const { toggleSidebar, userData } = useUIStore();
  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();


  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      router.push("/login");
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return {
    data: { time, mounted, searchQuery },
    methods: { handleLogout, handleSearch, setSearchQuery, toggleSidebar },
  };
};

export default useHeader;
