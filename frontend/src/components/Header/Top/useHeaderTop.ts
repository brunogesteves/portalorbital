import { api } from "@/utils/api";
import { CategoryProps } from "@/utils/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useHeaderTop() {
  const [categories, setCategories] = useState<CategoryProps[]>([]);
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
    },
    methods: {
      setCategories,
      handleSearch,
      handleSearchSubmit,
    },
  };
}
