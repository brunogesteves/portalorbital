import { useRouter } from "next/navigation";
import { useState } from "react";

export function useHeaderTop() {
  const [openMobileSearch, setOpenMobileSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  function handleSearchSubmit() {
    router.push(`/search?term=${searchTerm}`);
  }

  return {
    data: {
      searchTerm,
      openMobileSearch,
    },
    methods: {
      setOpenMobileSearch,
      handleSearch,
      handleSearchSubmit,
      setSearchTerm,
    },
  };
}
