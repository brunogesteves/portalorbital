"use client";

import React, { useEffect, useState } from 'react';
import { api } from '@/Utils/api';
import { PostProps } from '@/Utils/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FiEdit2, FiTrash2, FiPlus, FiFileText,
  FiLayers, FiUsers, FiSearch, FiFilter,
  FiCalendar, FiUser
} from 'react-icons/fi';

export default function Home() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const fetchData = async () => {
    try {
      const response = await api.get('/posts');
      setPosts(response.data);
    } catch (error: any) {
      if (error.response?.status === 401) {
        router.push('/login');
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
      setPosts(posts.filter(p => p.id !== postToDelete));
      setShowModal(false);
    } catch (error) {
      alert('Erro ao excluir post');
    }
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-6">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 border-4 border-red-600/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="text-slate-400 font-bold tracking-[3px] uppercase text-[10px]">Sincronizando Sistema...</p>
    </div>
  );

  return (
    <div className="space-y-12 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">

      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-center   gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-red-600 font-black text-[10px] uppercase tracking-[4px] mb-2">
            <div className="w-12 h-[2px] bg-red-600"></div>
            Dashboard Geral
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">
            Visão Geral do <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-900">Portal</span>
          </h1>
          <p className="text-slate-500 font-medium max-w-md">Gerencie publicações, métricas e usuários em uma interface centralizada.</p>
        </div>
        <Link href="/post/new" className="bg-red-600 text-white px-10 py-5 rounded-2xl font-black text-sm hover:bg-red-700 transition-all shadow-2xl shadow-red-900/20 flex items-center gap-3 active:scale-95 group">
          <FiPlus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          Nova Publicação
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Total de Notícias', value: posts.length, icon: FiFileText, color: 'from-red-600 to-red-800' },
          { label: 'Categorias Ativas', value: new Set(posts.map(p => p.categoryId)).size, icon: FiLayers, color: 'from-slate-800 to-slate-900' },
          { label: 'Equipe Editorial', value: 12, icon: FiUsers, color: 'from-blue-600 to-blue-800' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden group hover:-translate-y-2 transition-all duration-500">
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-[0.03] rounded-bl-full`}></div>
            <div className="relative z-10 flex flex-col gap-6">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} text-white flex items-center justify-center shadow-lg shadow-red-900/20`}>
                <stat.icon size={28} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] mb-1">{stat.label}</p>
                <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{stat.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden">

        {/* Table Header / Filters */}
        <div className="p-10 border-b border-slate-50 bg-slate-50/30 flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Publicações Recentes</h2>
            <span className="bg-red-100 text-red-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">Live</span>
          </div>

          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-80">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Pesquisar por título..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border-2 border-slate-200 focus:border-red-600 rounded-2xl pl-12 pr-4 py-3.5 outline-none transition-all text-sm font-semibold text-slate-700"
              />
            </div>
            <button className="p-4 bg-white border-2 border-slate-200 rounded-2xl text-slate-500 hover:border-red-600 hover:text-red-600 transition-all">
              <FiFilter size={20} />
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 uppercase text-[10px] font-black tracking-[3px]">
                <th className="px-10 py-8">Notícia / Autor</th>
                <th className="px-10 py-8">Categoria</th>
                <th className="px-10 py-8">Data de Publicação</th>
                <th className="px-10 py-8 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredPosts.length > 0 ? filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50/80 transition-all group">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-16 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 border-2 border-white shadow-md">
                        {post.thumbnail ? (
                          <img src={`${process.env.NEXT_PUBLIC_URL_SERVER}${post.thumbnail}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400">
                            <FiFileText size={24} />
                          </div>
                        )}
                      </div>
                      <div className="max-w-xs space-y-1">
                        <h4 className="font-bold text-slate-800 leading-tight group-hover:text-red-600 transition-colors line-clamp-2">{post.title}</h4>
                        <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold">
                          <FiUser size={12} /> {post.author?.name || 'Redação'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <span className="bg-slate-100 text-slate-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider border border-slate-200">
                      {post.category?.name || 'Geral'}
                    </span>
                  </td>
                  <td className="px-10 py-8 text-sm font-bold text-slate-500">
                    <div className="flex items-center gap-2">
                      <FiCalendar className="text-red-600" />
                      {new Date(post.scheduledAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
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
                      <button
                        onClick={() => { setPostToDelete(post.id); setShowModal(true); }}
                        className="p-3.5 bg-slate-50 text-slate-400 hover:text-white hover:bg-red-600 rounded-2xl transition-all shadow-sm"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="px-10 py-32 text-center">
                    <div className="flex flex-col items-center gap-6">
                      <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
                        <FiFileText size={48} />
                      </div>
                      <div className="space-y-1">
                        <p className="text-slate-900 font-black text-xl tracking-tight">Nenhuma notícia encontrada</p>
                        <p className="text-slate-400 font-medium">Tente ajustar seus filtros ou termos de pesquisa.</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xl flex items-center justify-center z-[100] p-6 animate-in fade-in duration-300">
          <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl max-w-md w-full border border-white/20 transform animate-in zoom-in-95 duration-300">
            <div className="w-24 h-24 bg-red-50 text-red-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
              <FiTrash2 size={48} />
            </div>
            <h2 className="text-3xl font-black mb-4 text-slate-900 text-center tracking-tight">Deseja excluir?</h2>
            <p className="text-slate-500 mb-10 text-center font-medium leading-relaxed">
              Esta ação é irreversível. A notícia será removida permanentemente do portal público.
            </p>
            <div className="flex flex-col gap-4">
              <button
                onClick={handleDelete}
                className="w-full py-5 bg-red-600 text-white rounded-2xl font-black hover:bg-red-700 transition-all shadow-xl shadow-red-900/20 active:scale-95"
              >
                Confirmar Exclusão
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-5 bg-slate-100 text-slate-500 rounded-2xl font-black hover:bg-slate-200 transition-all active:scale-95"
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
