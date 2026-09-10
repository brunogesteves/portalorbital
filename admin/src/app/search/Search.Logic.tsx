"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/Utils/api";
import { PostProps } from "@/Utils/types";


export const SearchLogic = (initialQuery: string) => {

  const [posts, setPosts] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [term, setTerm] = useState(initialQuery);
  const [mobilePostDetail, setMobilePostDetail] = useState<PostProps | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState<number | null>(null);

  useEffect(() => {
    if (initialQuery) {
      fetchResults(initialQuery);
    }
  }, [initialQuery]);

  const fetchResults = async (term: string) => {
    setLoading(true);
    try {
      const response = await api.get(`/search/searchcontent/${term.toLowerCase()}`);
      setPosts(response.data);
    } catch {
      //errro
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (
    id: number,
    currentStatus: boolean,
    field: string,
  ) => {
    try {
      await api.patch(`/posts/${id}/changeStatus`, {
        status: !currentStatus,
        field,
      });
      setPosts(
        posts.map((p) => (p.id === id ? { ...p, [field]: !currentStatus } : p)),
      );
      if (mobilePostDetail?.id === id) {
        setMobilePostDetail((prev) =>
          prev ? { ...prev, [field]: !currentStatus } : null,
        );
      }
    } catch {
      //erro
    }
  };

  const handleDelete = async () => {
    if (!postToDelete) return;
    try {
      await api.delete(`/posts/${postToDelete}`);
      setPosts(posts.filter((p) => p.id !== postToDelete));
      setShowModal(false);
      setPostToDelete(null);
    } catch {
      //erro
    }
  };

  const closeMobileModal = () => setMobilePostDetail(null);

  return {
    data: { posts, loading, term, mobilePostDetail, showModal, postToDelete },
    methods: { fetchResults, setTerm, setMobilePostDetail, closeMobileModal, handleUpdateStatus, setShowModal, setPostToDelete, handleDelete },
  };
};
