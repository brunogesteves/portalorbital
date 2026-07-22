"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/Utils/api";
import { useRouter } from "next/navigation";
import { PostProps, CategoryProps, UserProps } from "@/Utils/types";

// Dashboard Components
import WelcomeSection from "../components/Dashboard/WelcomeSection";
import StatsGrid from "../components/Dashboard/StatsGrid";
import PostFilters from "../components/Dashboard/PostFilters";
import PostTable from "../components/Dashboard/PostTable";
import DeleteModal from "../components/Dashboard/DeleteModal";

export default function Home() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedAuthor, setSelectedAuthor] = useState<string>("");
  const router = useRouter();

  const fetchData = async () => {
    try {
      const [postsRes, catsRes, userRes] = await Promise.all([
        api.get("/posts"),
        api.get("/categories"),
        api.get("/auth/me"),
      ]);
      setPosts(postsRes.data);
      setCategories(catsRes.data);
      setCurrentUser(userRes.data.user);
    } catch (error: any) {
      if (error.response?.status === 401) {
        router.push("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async () => {
    if (postToDelete === null) return;
    try {
      await api.delete(`/posts/${postToDelete}`);
      setPosts(posts.filter((p) => p.id !== postToDelete));
      setShowModal(false);
    } catch (error) {
      alert("Erro ao excluir post");
    }
  };

  const handleToggleStatus = async (id: number, currentStatus: string) => {
    if (currentUser?.role !== "ADM") return;
    const newStatus = currentStatus === "offAir" ? "liveAir" : "offAir";
    try {
      await api.patch(`/posts/${id}/status`, { status: newStatus });
      setPosts(
        posts.map((p) => (p.id === id ? { ...p, status: newStatus } : p)),
      );
    } catch (error) {
      alert("Erro ao atualizar status");
    }
  };

  const handleToggleSlide = async (id: number, currentSlide: boolean) => {
    if (currentUser?.role !== "ADM") return;
    try {
      await api.patch(`/posts/${id}/slide`, { slide: !currentSlide });
      setPosts(
        posts.map((p) => (p.id === id ? { ...p, slide: !currentSlide } : p)),
      );
    } catch (error) {
      alert("Erro ao atualizar slide");
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "" || post.categoryId === Number(selectedCategory);
    const matchesAuthor =
      selectedAuthor === "" || post.authorId === Number(selectedAuthor);
    return matchesSearch && matchesCategory && matchesAuthor;
  });

  const uniqueAuthors = Array.from(
    new Set(
      posts.map((p) =>
        JSON.stringify({ id: p.authorId, name: p.author?.name || "Redação" }),
      ),
    ),
  ).map((a) => JSON.parse(a));

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-6">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-red-600/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-slate-400 font-bold tracking-[3px] uppercase text-[10px]">
          Sincronizando Sistema...
        </p>
      </div>
    );

  return (
    <div className="space-y-12 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <WelcomeSection />

      <StatsGrid
        postsCount={posts.length}
        categoriesCount={new Set(posts.map((p) => p.categoryId)).size}
      />

      <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
        <PostFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedAuthor={selectedAuthor}
          setSelectedAuthor={setSelectedAuthor}
          categories={categories}
          currentUser={currentUser}
          uniqueAuthors={uniqueAuthors}
        />

        <PostTable
          posts={filteredPosts}
          currentUser={currentUser}
          handleToggleStatus={handleToggleStatus}
          handleToggleSlide={handleToggleSlide}
          setPostToDelete={(id) => setPostToDelete(id)}
          setShowModal={setShowModal}
        />
      </div>

      {showModal && (
        <DeleteModal
          postTitle={posts.find((p) => p.id === postToDelete)?.title}
          handleDelete={handleDelete}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
}
