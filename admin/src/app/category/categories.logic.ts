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
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get("/categories/admin");
        setCategories(data);
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

    const regex = /^[a-zA-Z0-9\s-À-ÿ]+$/;
    if (!regex.test(newName)) {
      setError("Caracteres especiais (como ?, !, @, etc.) não são permitidos.");
      return;
    }

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
      setToastMessage("Categoria criada com sucesso");
      setShowToast(true);
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
      setToastMessage("Categoria excluída com sucesso");
      setShowToast(true);
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
      modalWarning,
      showToast,
      toastMessage,
    },
    methods: {
      setNewName,
      setError,
      setShowDeleteModal,
      handleCreate,
      handleDeleteClick,
      confirmDelete,
      setShowModalMessage,
      setModalWarning,
      setShowToast,
      setToastMessage,
    },
  };
}
