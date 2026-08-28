"use client";

import React, { useState } from "react";
import {  useRouter } from "next/navigation";
import { api } from "@/Utils/api";
import { PostProps } from "@/Utils/types";


export const useSearchLogic = (initialQuery: string) => {
  const router = useRouter();

  const [posts, setPosts] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [term, setTerm] = useState(initialQuery);

  const fetchResults = async (term: string) => {
    setLoading(true);
    try {
      const response = await api.get(`/search?q=${encodeURIComponent(term)}`);
      console.log(response.data)
      setPosts(response.data);
    } catch  {
      //errro
      
    } finally {
      setLoading(false);
    }
  };

  

  const handleInternalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(term)}`);
    fetchResults(term)
  };

  return {
    data: { posts, loading, term },
    methods: { fetchResults, handleInternalSearch, setTerm },
  };
};
