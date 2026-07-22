import React, { useState } from "react";
import Link from "next/link";
import {
  FiFileText,
  FiUser,
  FiCalendar,
  FiEdit2,
  FiTrash2,
  FiCheckCircle,
  FiXCircle,
  FiToggleRight,
  FiToggleLeft,
  FiInfo,
  FiX,
} from "react-icons/fi";
import { PostProps, PostTableProps, UserProps } from "@/Utils/types";

const PostTable = ({
  posts,
  currentUser,
  handleToggleStatus,
  handleToggleSlide,
  setPostToDelete,
  setShowModal,
}: PostTableProps) => {
  const [mobilePostDetail, setMobilePostDetail] = useState<PostProps | null>(
    null,
  );

  const closeMobileModal = () => setMobilePostDetail(null);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="text-slate-400 uppercase text-[10px] font-black tracking-[3px]">
            <th className="px-6 md:px-10 py-8">Notícia / Autor</th>
            <th className="px-10 py-8 hidden md:table-cell">Categoria</th>
            <th className="px-10 py-8 hidden md:table-cell">Status</th>
            <th className="px-10 py-8 hidden md:table-cell">Slide</th>
            <th className="px-10 py-8 hidden md:table-cell">Data</th>
            <th className="px-10 py-8 text-center hidden md:table-cell">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {posts.length > 0 ? (
            posts.map((post) => (
              <tr
                key={post.id}
                className="hover:bg-slate-50/80 transition-all group"
              >
                <td className="px-6 md:px-10 py-8">
                  <div
                    onClick={() => setMobilePostDetail(post)}
                    className="flex items-center gap-4 md:gap-6 cursor-pointer group/item"
                  >
                    <div className="w-16 h-12 md:w-20 md:h-16 rounded-xl md:rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 border-2 border-white shadow-md">
                      {post.thumbnail ? (
                        <img
                          src={`${process.env.NEXT_PUBLIC_URL_SERVER}${post.thumbnail}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-110"
                          alt={post.title}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400">
                          <FiFileText size={20} />
                        </div>
                      )}
                    </div>
                    <div className="max-w-[200px] md:max-w-xs space-y-1">
                      <h4 className="font-bold text-slate-800 leading-tight group-hover/item:text-red-600 transition-colors line-clamp-2 text-sm md:text-base">
                        {post.title}
                      </h4>

                      {/* Desktop Author */}
                      <div className="hidden md:flex items-center gap-2 text-slate-400 text-xs font-semibold">
                        <FiUser size={12} /> {post.author?.name || "Redação"}
                      </div>

                      {/* Mobile Author Button */}
                      <button className="md:hidden flex items-center gap-2 text-red-600 text-[10px] font-black uppercase tracking-wider bg-red-50 px-2 py-1 rounded-lg border border-red-100">
                        <FiUser size={10} /> {post.author?.name || "Redação"}
                      </button>
                    </div>
                  </div>
                </td>
                <td className="px-10 py-8 hidden md:table-cell">
                  <span className="bg-slate-100 text-slate-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider border border-slate-200">
                    {post.category?.name || "Geral"}
                  </span>
                </td>
                <td className="px-10 py-8 hidden md:table-cell">
                  <div className="flex flex-col gap-2">
                    {post.status === "liveAir" ? (
                      <span className="flex items-center gap-1.5 text-[10px] font-black text-emerald-600 uppercase tracking-wider bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 w-fit">
                        <FiCheckCircle /> No ar
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-wider bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100 w-fit">
                        <FiXCircle /> Fora do ar
                      </span>
                    )}
                    {currentUser?.role === "ADM" && (
                      <button
                        onClick={() => handleToggleStatus(post.id, post.status)}
                        className="flex items-center gap-2 text-[10px] font-bold text-red-600 hover:underline transition-all"
                      >
                        {post.status === "liveAir" ? (
                          <FiToggleRight size={16} />
                        ) : (
                          <FiToggleLeft size={16} />
                        )}
                        Alternar Status
                      </button>
                    )}
                  </div>
                </td>
                <td className="px-10 py-8 hidden md:table-cell">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        currentUser?.role === "ADM" &&
                        handleToggleSlide(post.id, post.slide)
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        post.slide ? "bg-red-600" : "bg-gray-300"
                      } ${currentUser?.role !== "ADM" ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow ${
                          post.slide ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                      {post.slide ? "Sim" : "Não"}
                    </span>
                  </div>
                </td>
                <td className="px-10 py-8 text-sm font-bold text-slate-500 hidden md:table-cell">
                  <div className="flex items-center gap-2">
                    <FiCalendar className="text-red-600" />
                    {new Date(post.scheduledAt).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </div>
                </td>
                <td className="px-10 py-8 hidden md:table-cell">
                  <div className="flex justify-center gap-3">
                    <Link
                      href={`/post/edit/${post.id}`}
                      className="p-3.5 bg-slate-50 text-slate-400 hover:text-white hover:bg-slate-800 rounded-2xl transition-all shadow-sm"
                    >
                      <FiEdit2 size={18} />
                    </Link>
                    <button
                      onClick={() => {
                        setPostToDelete(post.id);
                        setShowModal(true);
                      }}
                      className="p-3.5 bg-slate-50 text-slate-400 hover:text-white hover:bg-red-600 rounded-2xl transition-all shadow-sm"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-10 py-32 text-center">
                <div className="flex flex-col items-center gap-6">
                  <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
                    <FiFileText size={48} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-900 font-black text-xl tracking-tight">
                      Nenhuma notícia encontrada
                    </p>
                    <p className="text-slate-400 font-medium">
                      Tente ajustar seus filtros ou termos de pesquisa.
                    </p>
                  </div>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Mobile Details Modal */}
      {mobilePostDetail && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="relative p-8 space-y-6">
              <button
                onClick={closeMobileModal}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 bg-slate-50 rounded-full transition-colors"
              >
                <FiX size={20} />
              </button>

              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-[3px] text-red-600">
                  Detalhes da Notícia
                </span>
                <h3 className="text-xl font-bold text-slate-800 leading-tight">
                  {mobilePostDetail.title}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                    Categoria
                  </p>
                  <span className="block w-fit bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase border border-slate-200">
                    {mobilePostDetail.category?.name || "Geral"}
                  </span>
                </div>
                <div className="space-y-1.5">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                    Data de Publicação
                  </p>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                    <FiCalendar className="text-red-600" />
                    {new Date(mobilePostDetail.scheduledAt).toLocaleDateString(
                      "pt-BR",
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                  Status
                </p>
                <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  {mobilePostDetail.status === "liveAir" ? (
                    <span className="flex items-center gap-1.5 text-[10px] font-black text-emerald-600 uppercase tracking-wider bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                      <FiCheckCircle /> No ar
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-wider bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                      <FiXCircle /> Fora do ar
                    </span>
                  )}

                  {currentUser?.role === "ADM" && (
                    <button
                      onClick={() => {
                        handleToggleStatus(
                          mobilePostDetail.id,
                          mobilePostDetail.status,
                        );
                        // Update local state to reflect change in modal
                        setMobilePostDetail({
                          ...mobilePostDetail,
                          status:
                            mobilePostDetail.status === "liveAir"
                              ? "offAir"
                              : "liveAir",
                        });
                      }}
                      className="flex items-center gap-2 text-[10px] font-black text-red-600 uppercase tracking-widest hover:underline"
                    >
                      {mobilePostDetail.status === "liveAir" ? (
                        <FiToggleRight size={18} />
                      ) : (
                        <FiToggleLeft size={18} />
                      )}
                      Alterar
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                  Slide
                </p>
                <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full border ${
                    mobilePostDetail.slide
                      ? "text-red-600 bg-red-50 border-red-100"
                      : "text-slate-400 bg-slate-50 border-slate-100"
                  }`}>
                    {mobilePostDetail.slide ? "No slide" : "Fora do slide"}
                  </span>
                  {currentUser?.role === "ADM" && (
                    <button
                      onClick={() => {
                        handleToggleSlide(
                          mobilePostDetail.id,
                          mobilePostDetail.slide,
                        );
                        setMobilePostDetail({
                          ...mobilePostDetail,
                          slide: !mobilePostDetail.slide,
                        });
                      }}
                      className="flex items-center gap-2 text-[10px] font-black text-red-600 uppercase tracking-widest hover:underline"
                    >
                      {mobilePostDetail.slide ? (
                        <FiToggleRight size={18} />
                      ) : (
                        <FiToggleLeft size={18} />
                      )}
                      Alterar
                    </button>
                  )}
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <Link
                  href={`/post/edit/${mobilePostDetail.id}`}
                  className="flex-1 flex items-center justify-center gap-2 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
                >
                  <FiEdit2 size={16} /> Editar
                </Link>
                <button
                  onClick={() => {
                    setPostToDelete(mobilePostDetail.id);
                    setShowModal(true);
                    closeMobileModal();
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-4 bg-red-600 text-white rounded-2xl font-bold text-sm hover:bg-red-700 transition-all shadow-lg shadow-red-100"
                >
                  <FiTrash2 size={16} /> Excluir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostTable;
