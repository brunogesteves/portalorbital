import React, { useEffect, useState } from 'react';
import { api } from '@/Utils/api';
import { CategoryProps } from '@/Utils/types';

export function useCategorias() {
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [newName, setNewName] = useState('');
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<CategoryProps | null>(null);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      console.log('API Response:', response.data);
      setCategories(response.data);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    try {
      const response = await api.post('/categories', { name: newName });
      setCategories([...categories, response.data]);
      setNewName('');
    } catch (error) {
      alert('Erro ao criar categoria');
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
      setCategories(categories.filter(c => c.id !== categoryToDelete.id));
      setShowDeleteModal(false);
      setCategoryToDelete(null);
    } catch (error) {
      alert('Erro ao excluir categoria');
    }
  };

  return {
    data:{categories,
    newName,
    loading,
    showDeleteModal,
categoryToDelete},
    methods:{    
    setNewName,
    setShowDeleteModal,
    handleCreate,
    handleDeleteClick,
    confirmDelete}
  };
}
