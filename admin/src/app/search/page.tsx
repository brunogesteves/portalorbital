"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import Link from "next/link";
import {
  FiEdit2,
  FiFileText,
  FiSearch,
  FiCalendar,
  FiUser,
} from "react-icons/fi";
import { useSearchResults } from "./useSearch";
import Image from "next/image";

function SearchResults() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const { data, methods } = useSearchResults(initialQuery);

  return (
    <div className="space-y-12 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-red-600 font-black text-[10px] uppercase tracking-[4px] mb-2">
            <div className="w-12 h-[2px] bg-red-600"></div>
            Resultados da Pesquisa
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">
            Busca por:{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-900">
              {initialQuery || "Todos"}
            </span>
          </h1>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
        {/* Internal Search Bar (Same style as Header) */}
        <div className="p-10 border-b border-slate-50 bg-slate-50/30 flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Filtros de Pesquisa
            </h2>
          </div>

          <form
            onSubmit={methods.handleInternalSearch}
            className="flex items-center gap-4 w-full lg:w-auto"
          >
            <div className="relative flex-1 lg:w-96">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search for..."
                value={data.internalSearch}
                onChange={(e) => methods.handleInternalSearch(e)}
                className="w-full bg-white border-2 border-slate-200 focus:border-red-600 rounded-2xl pl-12 pr-4 py-3.5 outline-none transition-all text-sm font-semibold text-slate-700 shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="bg-red-600 text-white px-8 py-3.5 rounded-2xl font-black text-sm hover:bg-red-700 transition-all shadow-lg active:scale-95"
            >
              Pesquisar
            </button>
          </form>
        </div>

        {/* Loading State */}
        {data.loading ? (
          <div className="px-10 py-32 text-center">
            <div className="inline-block w-12 h-12 border-4 border-red-600/20 border-t-red-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-slate-400 font-bold uppercase tracking-widest text-[10px]">
              Buscando no banco de dados...
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 uppercase text-[10px] font-black tracking-[3px]">
                  <th className="px-10 py-8">Notícia / Autor</th>
                  <th className="px-10 py-8">Categoria</th>
                  <th className="px-10 py-8">Data</th>
                  <th className="px-10 py-8 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {data.posts.length > 0 ? (
                  data.posts.map((post) => (
                    <tr
                      key={post.id}
                      className="hover:bg-slate-50/80 transition-all group"
                    >
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-6">
                          <div className="w-20 h-16 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 border-2 border-white shadow-md">
                            {post.thumbnail ? (
                              <Image
                                src={`${process.env.NEXT_PUBLIC_API_URL}/api/${post.thumbnail}`}
                                alt={post.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400">
                                <FiFileText size={24} />
                              </div>
                            )}
                          </div>
                          <div className="max-w-xs space-y-1">
                            <h4 className="font-bold text-slate-800 leading-tight group-hover:text-red-600 transition-colors line-clamp-2">
                              {post.title}
                            </h4>
                            <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold">
                              <FiUser size={12} />{" "}
                              {post.author?.name || "Redação"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <span className="bg-slate-100 text-slate-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider border border-slate-200">
                          {post.category?.name || "Geral"}
                        </span>
                      </td>
                      <td className="px-10 py-8 text-sm font-bold text-slate-500">
                        <div className="flex items-center gap-2">
                          <FiCalendar className="text-red-600" />
                          {new Date(post.scheduledAt).toLocaleDateString(
                            "pt-BR",
                          )}
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex justify-center gap-3">
                          <Link
                            href={`/post/edit/${post.id}`}
                            className="p-3.5 bg-slate-50 text-slate-400 hover:text-white hover:bg-slate-800 rounded-2xl transition-all shadow-sm"
                          >
                            <FiEdit2 size={18} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-10 py-32 text-center">
                      <div className="flex flex-col items-center gap-6">
                        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
                          <FiSearch size={48} />
                        </div>
                        <div className="space-y-1">
                          <p className="text-slate-900 font-black text-xl tracking-tight">
                            Nenhum resultado encontrado
                          </p>
                          <p className="text-slate-400 font-medium">
                            Tente outros termos ou verifique a ortografia.
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Carregando Informações...</div>}>
      <SearchResults />
    </Suspense>
  );
}
