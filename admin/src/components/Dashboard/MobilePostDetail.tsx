import Link from "next/link";
import {
  FiCalendar,
  FiEdit2,
  FiTrash2,
  FiCheckCircle,
  FiXCircle,
  FiToggleRight,
  FiToggleLeft,
  FiX,
} from "react-icons/fi";
import { PostProps, UserProps } from "@/Utils/types";

interface MobilePostDetailProps {
  post: PostProps;
  currentUser: UserProps | null;
  onClose: () => void;
  handleToggleStatus: (id: number, currentStatus: boolean) => void;
  handleToggleSlide: (id: number, currentSlide: boolean) => void;
  handleToggleHighlight: (id: number, currentHighlight: boolean) => void;
  setPostToDelete: (id: number) => void;
  setShowModal: (show: boolean) => void;
}

const MobilePostDetail = ({
  post,
  currentUser,
  onClose,
  handleToggleStatus,
  handleToggleSlide,
  handleToggleHighlight,
  setPostToDelete,
  setShowModal,
}: MobilePostDetailProps) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-4 md:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-sm rounded-t-[2.5rem] md:rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden animate-in slide-in-from-bottom-4 md:zoom-in-95 duration-300 max-h-[85vh] overflow-y-auto">
        <div className="relative p-6 md:p-8 space-y-5">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 bg-slate-50 rounded-full transition-colors"
          >
            <FiX size={20} />
          </button>

          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-[3px] text-red-600">
              Detalhes da Notícia
            </span>
            <h3 className="text-xl font-bold text-slate-800 leading-tight pr-8">
              {post.title}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                Categoria
              </p>
              <span className="block w-fit bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase border border-slate-200">
                {post.category?.name || "Geral"}
              </span>
            </div>
            <div className="space-y-1.5">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                Data de Publicação
              </p>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                <FiCalendar className="text-red-600" />
                {new Date(post.scheduledAt).toLocaleDateString("pt-BR")}
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
              Status
            </p>
            <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100">
              {post.status ? (
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
                    handleToggleStatus(post.id, post.status);
                  }}
                  className="flex items-center gap-2 text-[10px] font-black text-red-600 uppercase tracking-widest hover:underline"
                >
                  {post.status ? (
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
                className={`text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full border ${
                  post.slide
                    ? "text-red-600 bg-red-50 border-red-100"
                    : "text-slate-400 bg-slate-50 border-slate-100"
                }`}
              >
                {post.slide ? "No slide" : "Fora do slide"}
              </span>
              {currentUser?.role === "ADM" && (
                <button
                  onClick={() => {
                    handleToggleSlide(post.id, post.slide);
                  }}
                  className="flex items-center gap-2 text-[10px] font-black text-red-600 uppercase tracking-widest hover:underline"
                >
                  {post.slide ? (
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
                className={`text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full border ${
                  post.highlight
                    ? "text-yellow-600 bg-yellow-50 border-yellow-100"
                    : "text-slate-400 bg-slate-50 border-slate-100"
                }`}
              >
                {post.highlight ? "Em destaque" : "Sem destaque"}
              </span>
              {currentUser?.role === "ADM" && (
                <button
                  onClick={() => {
                    handleToggleHighlight(post.id, post.highlight);
                  }}
                  className="flex items-center gap-2 text-[10px] font-black text-red-600 uppercase tracking-widest hover:underline"
                >
                  {post.highlight ? (
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
              href={`/post/edit/${post.id}`}
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
            >
              <FiEdit2 size={16} /> Editar
            </Link>
            <button
              onClick={() => {
                setPostToDelete(post.id);
                setShowModal(true);
                onClose();
              }}
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-red-600 text-white rounded-2xl font-bold text-sm hover:bg-red-700 transition-all shadow-lg shadow-red-100"
            >
              <FiTrash2 size={16} /> Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePostDetail;
