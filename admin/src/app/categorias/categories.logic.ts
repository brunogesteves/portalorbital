import React, { useEffect, useState } from "react";
import { api } from "@/Utils/api";
import { CategoryProps } from "@/Utils/types";

export function useLogicCategory() {
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [newName, setNewName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] =
    useState<CategoryProps | null>(null);
  const [showModalMessage, setShowModalMessage] = useState(false);
  const [modalWarning, setModalWarning] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories");

        setCategories(response.data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!newName.trim()) return;

    // 1. Validar se há caracteres especiais no nome da categoria
    const regex = /^[a-zA-Z0-9\s-À-ÿ]+$/;
    if (!regex.test(newName)) {
      setError("Caracteres especiais (como ?, !, @, etc.) não são permitidos.");
      return;
    }

    // Criar a slug sem acentuação e com hífens nos espaços
    const slug = newName
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-");

    try {
      const response = await api.post("/categories", { name: newName, slug });
      setCategories([...categories, response.data]);
      setNewName("");
    } catch {
      const message = "Erro ao criar categoria";
      setError(message);
    }
  };

  const handleDeleteClick = (category: CategoryProps) => {
    setCategoryToDelete(category);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!categoryToDelete) return;
    try {
      await api.delete(`/categories/${categoryToDelete.id}`);
      setCategories(categories.filter((c) => c.id !== categoryToDelete.id));
      setShowDeleteModal(false);
      setCategoryToDelete(null);
    } catch {
      setShowModalMessage(true);
      setModalWarning("Erro ao excluir categoria");
    }
  };

  return {
    data: {
      categories,
      newName,
      error,
      loading,
      showDeleteModal,
      categoryToDelete,
      showModalMessage,
      modalWarning
    },
    methods: {
      setNewName,
      setError,
      setShowDeleteModal,
      handleCreate,
      handleDeleteClick,
      confirmDelete,
      setShowModalMessage,
      setModalWarning
    },
  };
}
