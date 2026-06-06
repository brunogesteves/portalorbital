import React from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';
import { CategoryProps, UserProps } from '@/Utils/types';

interface PostFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedAuthor: string;
  setSelectedAuthor: (value: string) => void;
  categories: CategoryProps[];
  currentUser: UserProps | null;
  uniqueAuthors: { id: number; name: string }[];
}

const PostFilters = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedAuthor,
  setSelectedAuthor,
  categories,
  currentUser,
  uniqueAuthors
}: PostFiltersProps) => {
  return (
    <div className="p-10 border-b border-slate-50 bg-slate-50/30 flex flex-col lg:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Publicações Recentes</h2>
        <span className="bg-red-100 text-red-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">Live</span>
      </div>

      <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
        <div className="relative flex-1 min-w-[200px]">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Pesquisar título..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border-2 border-slate-200 focus:border-red-600 rounded-2xl pl-12 pr-4 py-3.5 outline-none transition-all text-sm font-semibold text-slate-700"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-white border-2 border-slate-200 rounded-2xl px-4 py-3.5 outline-none text-sm font-semibold text-slate-700 focus:border-red-600"
        >
          <option value="">Todas Categorias</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id.toString()}>{cat.name}</option>
          ))}
        </select>

        {currentUser?.role === 'ADM' && (
          <select
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
            className="bg-white border-2 border-slate-200 rounded-2xl px-4 py-3.5 outline-none text-sm font-semibold text-slate-700 focus:border-red-600"
          >
            <option value="">Todos Autores</option>
            {uniqueAuthors.map(auth => (
              <option key={auth.id} value={auth.id.toString()}>{auth.name}</option>
            ))}
          </select>
        )}

        <button className="p-4 bg-white border-2 border-slate-200 rounded-2xl text-slate-500 hover:border-red-600 hover:text-red-600 transition-all">
          <FiFilter size={20} />
        </button>
      </div>
    </div>
  );
};

export default PostFilters;
