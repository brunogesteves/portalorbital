import { useState } from "react";
import Link from "next/link";
import {
  FiFileText,
  FiUser,
  FiCalendar,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";
import { PostProps, PostTableProps } from "@/Utils/types";
import Image from "next/image";
import { imageUrl } from "@/Utils/api";
import Pagination from "./Pagination";
import MobilePostDetail from "./MobilePostDetail";

const PostTable = ({
  posts,
  currentUser,
  handleUpdateStatus,
  setPostToDelete,
  setShowModal,
  pagination,
  goToPage,
  setLimit,
  fetching,
  path,
}: PostTableProps) => {
  const [mobilePostDetail, setMobilePostDetail] = useState<PostProps | null>(
    null,
  );

  const closeMobileModal = () => setMobilePostDetail(null);

  return (
    <div className="relative">
      <div className="flex flex-col divide-y divide-slate-50">
        <div className="hidden md:grid grid-cols-[2fr_0.8fr_0.6fr_0.5fr_0.5fr_0.6fr_0.5fr] items-center gap-2 px-3 py-4 text-slate-400 uppercase text-[9px] font-black tracking-[2px]">
          <span>Notícia</span>
          <span className="text-center">Categoria</span>
          {path === "edit" && (
            <>
              <span className="text-center">Status</span>
              <span className="text-center">Slide</span>
              <span className="text-center">Destaque</span>
            </>
          )}
          <span className="text-center">Data</span>
          <span className="text-center">Ações</span>
        </div>
        {fetching && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 border-3 border-red-600/20 rounded-full"></div>
                <div className="absolute inset-0 border-3 border-red-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Carregando...
              </p>
            </div>
          </div>
        )}

        {posts?.length > 0 ? (
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
              {path === "edit" && currentUser === "ADM" && (
                <>
                  <div className="hidden md:flex justify-center items-center gap-1.5">
                    <button
                      onClick={() => {
                        const newStatus: boolean =
                          post.published == "ACTIVE" ? false : true;
                        handleUpdateStatus(post.id, newStatus, "published");
                      }}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors flex-shrink-0 ${post.published == "ACTIVE" ? "bg-green-600" : "bg-red-300"}`}
                    >
                      <span
                        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform shadow cursor-pointer
                      ${post.published == "ACTIVE" ? "translate-x-[18px]" : "translate-x-[3px]"}`}
                      />
                    </button>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider hidden md:inline">
                      {post.published == "ACTIVE" ? "No Ar" : "Fora"}
                    </span>
                  </div>
                  <div className="hidden md:flex justify-center items-center gap-1.5">
                    <button
                      onClick={() =>
                        handleUpdateStatus(post.id, post.slide, "slide")
                      }
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors flex-shrink-0 ${post.slide ? "bg-green-600" : "bg-red-300"}`}
                    >
                      <span
                        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform shadow ${post.slide ? "translate-x-[18px]" : "translate-x-[3px]"}`}
                      />
                    </button>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">
                      {post.slide ? "Sim" : "Não"}
                    </span>
                  </div>
                  <div className="hidden md:flex justify-center items-center gap-1.5">
                    <button
                      onClick={() =>
                        handleUpdateStatus(post.id, post.highlight, "highlight")
                      }
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors flex-shrink-0 ${post.highlight ? "bg-yellow-500" : "bg-gray-300"}
                        `}
                    >
                      <span
                        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform shadow ${
                          post.highlight
                            ? "translate-x-[18px]"
                            : "translate-x-[3px]"
                        }`}
                      />
                    </button>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">
                      {post.highlight ? "Sim" : "Não"}
                    </span>
                  </div>
                </>
              )}
              <div className="hidden md:flex justify-center items-center">
                <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                  <FiCalendar className="text-red-600" size={12} />
                  {new Date(post.scheduledAt).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                  })}
                </span>
              </div>

              <div className="hidden md:flex justify-center items-center gap-2">
                <Link
                  href={`/post/${path}/${post.id}`}
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
                    ${
                      currentUser !== "ADM"
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
      <Pagination
        page={pagination?.page}
        limit={pagination?.limit}
        total={pagination?.total}
        totalPages={pagination?.totalPages}
        goToPage={goToPage}
        setLimit={setLimit}
      />
      {mobilePostDetail && (
        <MobilePostDetail
          post={mobilePostDetail}
          currentUser={currentUser}
          onClose={closeMobileModal}
          handleUpdateStatus={handleUpdateStatus}
          setPostToDelete={setPostToDelete}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};

export default PostTable;
