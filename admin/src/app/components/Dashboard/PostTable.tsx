import React from 'react';
import Link from 'next/link';
import { 
  FiFileText, FiUser, FiCalendar, FiEdit2, FiTrash2, 
  FiCheckCircle, FiXCircle, FiToggleRight, FiToggleLeft 
} from 'react-icons/fi';
import { PostProps, UserProps } from '@/Utils/types';

interface PostTableProps {
  posts: PostProps[];
  currentUser: UserProps | null;
  handleToggleStatus: (id: number, currentStatus: string) => void;
  setPostToDelete: (id: number) => void;
  setShowModal: (show: boolean) => void;
}

const PostTable = ({
  posts,
  currentUser,
  handleToggleStatus,
  setPostToDelete,
  setShowModal
}: PostTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="text-slate-400 uppercase text-[10px] font-black tracking-[3px]">
            <th className="px-10 py-8">Notícia / Autor</th>
            <th className="px-10 py-8">Categoria</th>
            <th className="px-10 py-8">Status</th>
            <th className="px-10 py-8">Data</th>
            <th className="px-10 py-8 text-center">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {posts.length > 0 ? posts.map((post) => (
            <tr key={post.id} className="hover:bg-slate-50/80 transition-all group">
              <td className="px-10 py-8">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-16 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 border-2 border-white shadow-md">
                    {post.thumbnail ? (
                      <img 
                        src={`${process.env.NEXT_PUBLIC_URL_SERVER}${post.thumbnail}`} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        alt={post.title}
                      />
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
              <td className="px-10 py-8">
                <div className="flex flex-col gap-2">
                  {post.status === 'offAir' ? (
                    <span className="flex items-center gap-1.5 text-[10px] font-black text-emerald-600 uppercase tracking-wider bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 w-fit">
                      <FiCheckCircle /> No ar
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-wider bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100 w-fit">
                      <FiXCircle /> Fora do ar
                    </span>
                  )}
                  {currentUser?.role === 'ADM' && (
                    <button
                      onClick={() => handleToggleStatus(post.id, post.status)}
                      className="flex items-center gap-2 text-[10px] font-bold text-red-600 hover:underline transition-all"
                    >
                      {post.status === 'offAir' ? <FiToggleRight size={16} /> : <FiToggleLeft size={16} />}
                      Alternar Status
                    </button>
                  )}
                </div>
              </td>
              <td className="px-10 py-8 text-sm font-bold text-slate-500">
                <div className="flex items-center gap-2">
                  <FiCalendar className="text-red-600" />
                  {new Date(post.scheduledAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
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
              <td colSpan={5} className="px-10 py-32 text-center">
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
  );
};

export default PostTable;
