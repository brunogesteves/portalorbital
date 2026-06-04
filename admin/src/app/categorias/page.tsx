"use client";

import React from 'react';
import { useCategorias } from './useCategories';
import { FiPlus, FiTrash2, FiAlertCircle } from 'react-icons/fi';

export default function Categorias() {
  const {
    data,methods
  } = useCategorias();

  if (data.loading) return <div className="text-center p-10">Carregando...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Gerenciar Categorias</h1>

      <form onSubmit={methods.handleCreate} className="mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md flex gap-4 border border-gray-100">
          <input
            type="text"
            value={data.newName}
            onChange={(e) => {
              methods.setNewName(e.target.value);
              methods.setError('');
            }}
            placeholder="Nome da nova categoria..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
          <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 font-semibold">
            <FiPlus /> Adicionar
          </button>
        </div>
        {data.error && (
          <span className="text-xs font-bold text-red-500 mt-2 ml-1 flex items-center gap-1 animate-fade-in">
            <FiAlertCircle size={14} /> {data.error}
          </span>
        )}
      </form>

      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        <div className="grid grid-cols-1 divide-y divide-gray-100">
          {data.categories.length > 0 ? data.categories.map((cat) => (
            <div key={cat.id} className="flex justify-between items-center px-6 py-4 hover:bg-gray-50 transition-colors">
              <span className="text-lg font-medium text-gray-700">{cat.name}</span>
              <button
                onClick={() => methods.handleDeleteClick(cat)}
                className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-full hover:bg-red-50"
              >
                <FiTrash2 size={20} />
              </button>
            </div>
          )) : (
            <div className="p-8 text-center text-gray-400 italic">Nenhuma categoria cadastrada.</div>
          )}
        </div>
      </div>

      {/* Modal de Confirmação de Exclusão (Estilo Biblioteca) */}
      {data.showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[100] backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg flex flex-col shadow-2xl overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-800">Excluir Categoria</h3>
              <button
                onClick={() => methods.setShowDeleteModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl transition-colors"
              >
                &times;
              </button>
            </div>

            <div className="p-10 text-center">
              <p className="text-gray-600 text-lg">
                Tem certeza que deseja excluir a categoria <strong className="text-gray-900">"{data.categoryToDelete?.name}"</strong>?
              </p>
              <p className="text-gray-400 text-sm mt-2">Esta ação não poderá ser desfeita.</p>
            </div>

            <div className="p-6 border-t bg-gray-50 flex gap-4">
              <button
                onClick={() => methods.setShowDeleteModal(false)}
                className="flex-1 bg-white border border-gray-200 px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={methods.confirmDelete}
                className="flex-1 bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-200 active:scale-95"
              >
                Confirmar Exclusão
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

