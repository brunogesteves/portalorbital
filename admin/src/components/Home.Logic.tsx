import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { api } from "@/Utils/api";
import { PostProps, CategoryProps, Pagination, PostStats } from "@/Utils/types";
import { useUIStore } from "@/store/useUIStore";

export const HomeLogic = () => {
  const { userData, setUserData } = useUIStore();
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedAuthor, setSelectedAuthor] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [showModalMessage, setShowModalMessage] = useState<boolean>(false);
  const [modalWarning, setModalWarning] = useState<string>("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [stats, setStats] = useState<PostStats>({
    totalPosts: 0,
    totalHighlights: 0,
    totalActivePosts: 0,
    totalSlides: 0,
  });
  const router = useRouter();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const fetchPosts = useCallback(
    async (
      page: number,
      limit: number,
      search?: string,
      categoryId?: string,
      authorId?: string,
      type?: string,
      isDebounced = false,
    ) => {
      if (isDebounced) setFetching(true);
      try {
        const params = new URLSearchParams();
        params.set("page", String(page));
        params.set("limit", String(limit));
        if (search) params.set("q", search);
        if (categoryId) params.set("categoryId", categoryId);
        if (authorId) params.set("authorId", authorId);
        if (type) params.set("type", type);

        const postsRes = await api.get(`/posts?${params.toString()}`);
        setPosts(postsRes.data.posts);
        setPagination(postsRes.data.pagination);
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          // router.push("/login");
        }
      } finally {
        if (isDebounced) setFetching(false);
      }
    },
    [router],
  );

  const fetchStats = useCallback(async () => {
    try {
      const statsRes = await api.get("/posts/stats");
      setStats(statsRes.data);
    } catch (error: unknown) {
      // if (axios.isAxiosError(error) && error.response?.status === 401) {
      //     router.push("/login");
      // }
    }
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catsRes, userRes] = await Promise.all([
          api.get("/categories"),
          api.get("/auth/me"),
          fetchPosts(1, 10),
          fetchStats(),
        ]);
        setCategories(catsRes.data);
        setUserData({
          email: userRes.data.user.email,
          name: userRes.data.user.name,
          role: userRes.data.user.role,
        });
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          // router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        fetchPosts(
          1,
          pagination.limit,
          searchTerm,
          selectedCategory,
          selectedAuthor,
          selectedType,
          true,
        );
      }, 300);
    }
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchTerm, selectedCategory, selectedAuthor, selectedType]);

  const handleDelete = async () => {
    if (postToDelete === null) return;
    try {
      await api.delete(`/posts/${postToDelete}`);
      await Promise.all([
        fetchPosts(
          pagination.page,
          pagination.limit,
          searchTerm,
          selectedCategory,
          selectedAuthor,
          selectedType,
        ),
        fetchStats(),
      ]);
      setShowModal(false);
      setToastMessage("Notícia apagada");
      setShowToast(true);
    } catch {
      setShowModalMessage(true);
      setModalWarning("Erro ao excluir post");
    }
  };

  const handleUpdateStatus = async (
    id: number,
    currentStatus: boolean,
    field: string,
  ) => {
    if (userData?.role !== "ADM") return;
    console.log("id: ", id)
    console.log("field: ", field)
    console.log("currentStatus: ", currentStatus)
    try {
      await api.patch(`/posts/${id}/changeStatus`, {
        status: !currentStatus,
        field,
      });
      setPosts(
        posts.map((p) => (p.id === id ? { ...p, [field]: !currentStatus } : p)),
      );
    } catch {
      setShowModalMessage(true);
      setModalWarning("Erro ao atualizar slide");
    }
  };

  const uniqueAuthors = Array.from(
    new Set(
      posts.map((p) =>
        JSON.stringify({ id: p.authorId, name: p.author?.name || "Redação" }),
      ),
    ),
  ).map((a) => JSON.parse(a));

  const goToPage = (page: number) => {
    fetchPosts(
      page,
      pagination.limit,
      searchTerm,
      selectedCategory,
      selectedAuthor,
      selectedType,
    );
  };

  const setLimit = (limit: number) => {
    fetchPosts(
      1,
      limit,
      searchTerm,
      selectedCategory,
      selectedAuthor,
      selectedType,
    );
  };

  return {
    data: {
      posts,
      categories,
      loading,
      fetching,
      showModal,
      postToDelete,
      searchTerm,
      selectedCategory,
      selectedAuthor,
      selectedType,
      uniqueAuthors,
      showModalMessage,
      modalWarning,
      showToast,
      toastMessage,
      pagination,
      stats,
      userData,
    },
    methods: {
      handleDelete,
      handleUpdateStatus,
      setPostToDelete,
      setSearchTerm,
      setSelectedCategory,
      setSelectedAuthor,
      setSelectedType,
      setShowModal,
      setShowModalMessage,
      setModalWarning,
      setShowToast,
      goToPage,
      setLimit,
    },
  };
};
