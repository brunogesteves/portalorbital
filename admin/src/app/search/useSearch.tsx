"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { api } from "@/Utils/api";
import { PostProps } from "@/Utils/types";
import Link from "next/link";
import {
  FiEdit2,
  FiTrash2,
  FiFileText,
  FiSearch,
  FiFilter,
  FiCalendar,
  FiUser,
} from "react-icons/fi";

export const useSearchResults = (initialQuery: string) => {
  const router = useRouter();

  const [posts, setPosts] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [internalSearch, setInternalSearch] = useState(initialQuery);

  const fetchResults = async (query: string) => {
    setLoading(true);
    try {
      const response = await api.get(`/posts?q=${encodeURIComponent(query)}`);
      setPosts(response.data);
    } catch (error: any) {
      if (error.response?.status === 401) {
        router.push("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults(initialQuery);
    setInternalSearch(initialQuery);
  }, [initialQuery]);

  const handleInternalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(internalSearch)}`);
  };

  return {
    data: { posts, loading, internalSearch, searchTerm },
    methods: { fetchResults, handleInternalSearch },
  };
};
