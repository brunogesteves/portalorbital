import { api } from "@/utils/api";
import { PostProps } from "@/utils/types";
import { useEffect, useState } from "react";

export function SearchLogic(term: string) {
  const [searchTerm, setSearchTerm] = useState(term);
  const [searchResults, setSearchResults] = useState<PostProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [warning, setWarning] = useState("");

  async function searchPosts() {
    if (!term) {
      setWarning("Digite um termo para buscar");
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setIsError(false);

    try {
      const res = await api.get(`/search/searchcontent?term=${term.toLowerCase()}`);
      setSearchResults(res.data);
    } catch {
      setIsError(true);
      setWarning("Erro interno");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    searchPosts();
  }, [term]);

  return {
    data: {
      searchTerm,
      searchResults,
      term,
      isLoading,
      isError,
      warning,
    },
    methods: {
      setSearchResults,
      setSearchTerm,
      searchPosts,
    },
  };
}
