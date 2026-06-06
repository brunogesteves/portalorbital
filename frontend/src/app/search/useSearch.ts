import { api } from "@/utils/api";
import { PostProps } from "@/utils/types";
import { useEffect, useState } from "react";

export function useSearch(term: string) {
  const [searchResults, setSearchResults] = useState<PostProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [warning, setWarning] = useState("uuuuuuuu");
  useEffect(() => {
    async function getPosts() {
      if (!term) return;

      setIsLoading(true);
      setIsError(false);

      try {
        const res = await api.get(`/search?term=${term.toLowerCase()}`);
        const { postsResults, message } = res.data;
        if (postsResults.length > 0) {
          setSearchResults(postsResults);
        } else {
          setWarning(message);
        }
      } catch (error: any) {
        setIsError(true);
        setWarning("Erro interno");
      } finally {
        setIsLoading(false);
      }
    }

    getPosts();
  }, [term]);
  return {
    data: {
      searchResults,
      term,
      isLoading,
      isError,
      warning,
    },
    methods: {
      setSearchResults,
    },
  };
}
