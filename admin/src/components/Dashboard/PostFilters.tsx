import React from "react";
import { FiSearch } from "react-icons/fi";
import { PostFiltersProps } from "@/Utils/types";

const PostFilters = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedAuthor,
  setSelectedAuthor,
  selectedType,
  setSelectedType,
  categories,
  currentUser,
  uniqueAuthors,
}: PostFiltersProps) => {
  const selectClass =
    "w-full sm:w-auto bg-white border-2 border-slate-200 rounded-2xl px-4 py-3 md:py-3.5 outline-none text-sm font-semibold text-slate-700 focus:border-red-600 transition-colors";

  return (
    <div className="p-4 md:p-8 border-b border-slate-50 bg-slate-50/30 flex flex-col gap-4">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-lg md:text-2xl font-black text-slate-900 tracking-tight">
            Publicações Recentes
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={selectClass}
          >
            <option value="">Todas Categorias</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id.toString()}>
                {cat.name}
              </option>
            ))}
          </select>

          {currentUser?.role === "ADM" && (
            <select
              value={selectedAuthor}
              onChange={(e) => setSelectedAuthor(e.target.value)}
              className={selectClass}
            >
              <option value="">Todos Autores</option>
              {uniqueAuthors.map((auth) => (
                <option key={auth.id} value={auth.id.toString()}>
                  {auth.name}
                </option>
              ))}
            </select>
          )}

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className={selectClass}
          >
            <option value="">Mais Filtros</option>
            <option value="slide">Slide</option>
            <option value="status">No Ar</option>
            <option value="destaque">Destaque</option>
          </select>
        </div>
      </div>

      {/* Linha de baixo: pesquisar */}
      <div className="relative">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Pesquisar por título..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white border-2 border-slate-200 focus:border-red-600 rounded-2xl pl-12 pr-4 py-3 md:py-3.5 outline-none transition-all text-sm font-semibold text-slate-700"
        />
      </div>
    </div>
  );
};

export default PostFilters;
