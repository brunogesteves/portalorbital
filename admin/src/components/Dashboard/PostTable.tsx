import { useState } from "react";
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
  FiX,
} from "react-icons/fi";
import { PostProps, PostTableProps } from "@/Utils/types";
import Image from "next/image";
import { imageUrl } from "@/Utils/api";


const PostTable = ({
  posts,
  currentUser,
  handleToggleStatus,
  handleToggleSlide,
  handleToggleHighlight,
  setPostToDelete,
  setShowModal,
}: PostTableProps) => {
  const [mobilePostDetail, setMobilePostDetail] = useState<PostProps | null>(
    null,
  );

  const closeMobileModal = () => setMobilePostDetail(null);

  return (
    <div>
      <div className="flex flex-col divide-y divide-slate-50">
        <div className="hidden md:grid grid-cols-[2fr_0.8fr_0.6fr_0.5fr_0.5fr_0.6fr_0.5fr] items-center gap-2 px-3 py-4 text-slate-400 uppercase text-[9px] font-black tracking-[2px]">
          <span>Notícia</span>
          <span className="text-center">Categoria</span>
          <span className="text-center">Status</span>
          <span className="text-center">Slide</span>
          <span className="text-center">Destaque</span>
          <span className="text-center">Data</span>
          <span className="text-center">Ações</span>
        </div>

        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="grid grid-cols-1 md:grid-cols-[2fr_0.8fr_0.6fr_0.5fr_0.5fr_0.6fr_0.5fr] items-center gap-2 md:gap-2 px-3 py-3 md:py-4 hover:bg-slate-50/80 transition-all group"
            >
              <div
                onClick={() => setMobilePostDetail(post)}
                className="flex items-center gap-3 cursor-pointer group/item"
              >
                <div className="w-14 h-10 md:w-16 md:h-12 rounded-lg md:rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-white shadow-sm">
                  {post.thumbnail ? (
                    <Image
                      src={`${imageUrl}/${post.thumbnail}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-110"
                      alt={post?.thumbnail}
                      width={200}
                      height={200}
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400">
                      <FiFileText size={14} />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-slate-800 leading-tight group-hover/item:text-red-600 transition-colors line-clamp-1 text-sm">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-semibold mt-0.5">
                    <FiUser size={9} /> {post.author?.name || "Redação"}
                  </div>
                </div>
              </div>
              <div className="hidden md:flex justify-center">
                <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider border border-slate-200">
                  {post.category?.name || "Geral"}
                </span>
              </div>
              <div className="hidden md:flex justify-center items-center gap-1.5">
                <button
                  onClick={() => handleToggleStatus(post.id, post.status)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors flex-shrink-0 ${post.status ? "bg-green-600" : "bg-red-300"
                    }`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform shadow 
                      ${post.status ? "translate-x-[18px]" : "translate-x-[3px]"}
                      ${currentUser?.role !== "ADM"
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"}
                      `}
                  />
                </button>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider hidden md:inline">
                  {post.status ? "No Ar" : "Fora"}
                </span>
              </div>
              <div className="hidden md:flex justify-center items-center gap-1.5">
                <button
                  onClick={() =>
                    currentUser?.role === "ADM" &&
                    handleToggleSlide(post.id, post.slide)
                  }
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors flex-shrink-0 ${post.slide ? "bg-green-600" : "bg-red-300"
                    } ${currentUser?.role !== "ADM"
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                    }`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform shadow ${post.slide ? "translate-x-[18px]" : "translate-x-[3px]"
                      }`}
                  />
                </button>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">
                  {post.slide ? "Sim" : "Não"}
                </span>
              </div>
              <div className="hidden md:flex justify-center items-center gap-1.5">
                <button
                  onClick={() =>
                    currentUser?.role === "ADM" &&
                    handleToggleHighlight(post.id, post.highlight)
                  }
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors flex-shrink-0 ${post.highlight ? "bg-yellow-500" : "bg-gray-300"
                    } ${currentUser?.role !== "ADM"
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                    }`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform shadow ${post.highlight
                      ? "translate-x-[18px]"
                      : "translate-x-[3px]"
                      }`}
                  />
                </button>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">
                  {post.highlight ? "Sim" : "Não"}
                </span>
              </div>

              {/* Data */}
              <div className="hidden md:flex justify-center items-center">
                <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                  <FiCalendar className="text-red-600" size={12} />
                  {new Date(post.scheduledAt).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                  })}
                </span>
              </div>

              {/* Ações */}
              <div className="hidden md:flex justify-center items-center gap-2">
                <Link
                  href={`/post/edit/${post.id}`}
                  className="p-2.5 bg-slate-50 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all shadow-sm"
                >
                  <FiEdit2 size={14} />
                </Link>
                <button
                  onClick={() => {
                    setPostToDelete(post.id);
                    setShowModal(true);
                  }}
                  className={`p-2.5 bg-slate-50 text-slate-400 hover:text-white hover:bg-red-600 rounded-xl transition-all shadow-sm
                    ${currentUser?.role !== "ADM"
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                    }
                    `}
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center gap-4 py-16">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
              <FiFileText size={40} />
            </div>
            <div className="space-y-1 text-center">
              <p className="text-slate-900 font-black text-lg tracking-tight">
                Nenhuma notícia encontrada
              </p>
              <p className="text-slate-400 font-medium text-sm">
                Tente ajustar seus filtros ou termos de pesquisa.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ========== Mobile Details Modal ========== */}
      {mobilePostDetail && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-4 md:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-sm rounded-t-[2.5rem] md:rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden animate-in slide-in-from-bottom-4 md:zoom-in-95 duration-300 max-h-[85vh] overflow-y-auto">
            <div className="relative p-6 md:p-8 space-y-5">
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
                <h3 className="text-xl font-bold text-slate-800 leading-tight pr-8">
                  {mobilePostDetail.title}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
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
                  {mobilePostDetail.status ? (
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
                        setMobilePostDetail({
                          ...mobilePostDetail,
                          status: !mobilePostDetail.status,
                        });
                      }}
                      className="flex items-center gap-2 text-[10px] font-black text-red-600 uppercase tracking-widest hover:underline"
                    >
                      {mobilePostDetail.status ? (
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
                  <span
                    className={`text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full border ${mobilePostDetail.slide
                      ? "text-red-600 bg-red-50 border-red-100"
                      : "text-slate-400 bg-slate-50 border-slate-100"
                      }`}
                  >
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

              <div className="space-y-1.5">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                  Destaque
                </p>
                <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <span
                    className={`text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full border ${mobilePostDetail.highlight
                      ? "text-yellow-600 bg-yellow-50 border-yellow-100"
                      : "text-slate-400 bg-slate-50 border-slate-100"
                      }`}
                  >
                    {mobilePostDetail.highlight
                      ? "Em destaque"
                      : "Sem destaque"}
                  </span>
                  {currentUser?.role === "ADM" && (
                    <button
                      onClick={() => {
                        handleToggleHighlight(
                          mobilePostDetail.id,
                          mobilePostDetail.highlight,
                        );
                        setMobilePostDetail({
                          ...mobilePostDetail,
                          highlight: !mobilePostDetail.highlight,
                        });
                      }}
                      className="flex items-center gap-2 text-[10px] font-black text-red-600 uppercase tracking-widest hover:underline"
                    >
                      {mobilePostDetail.highlight ? (
                        <FiToggleRight size={18} />
                      ) : (
                        <FiToggleLeft size={18} />
                      )}
                      Alterar
                    </button>
                  )}
                </div>
              </div>

              <div className="pt-2 flex gap-3">
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
