import { api, imageUrl } from "@/Utils/api";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiTrash2, FiX, FiLoader } from "react-icons/fi";
import ModalMessage from "@/components/ModalMessage";
import { LibraryModalProps } from "@/Utils/types";



export const LibraryModal = ({
  existingImages,
  setExistingImages,
  setPreview,
  setThumbnailUrl,
  setShowImageModal,

}: LibraryModalProps) => {
  const [deletingImage, setDeletingImage] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);



  const handleDelete = async (filename: string) => {


    // setExistingImages("asas");

    setDeletingImage(filename);
    setDeleteError(null);

    try {

      const res = await api.delete(`/images/${filename}`)
      if (res) setExistingImages(filename)
    } catch {
      //toast(erro na tentativa de apagar a foto)


    } finally {
      // setDeletingImage(null);
      // setShowWarningModal(true);
      // setWarningMessage(message ?? "");
    }
  };


  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[85vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100">
          <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              Biblioteca de Imagens
            </h3>
            <p className="text-sm text-slate-400 font-medium mt-0.5">
              Selecione uma imagem para usar como capa da notícia
            </p>
          </div>
          <button
            onClick={() => setShowImageModal(false)}
            className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-xl transition-all"
          >
            <FiX size={20} />
          </button>
        </div>



        <div className="flex-1 overflow-y-auto p-8">
          {existingImages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-300">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <FiX size={32} />
              </div>
              <p className="text-sm font-bold text-slate-400">
                Nenhuma imagem encontrada
              </p>
              <p className="text-xs text-slate-300 mt-1">
                Faça upload de imagens pelo editor de conteúdo
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {existingImages.map((img, i) => {
                const isDeleting = deletingImage === img;
                return (
                  <div
                    key={i}
                    className={`group relative aspect-video rounded-2xl overflow-hidden border-2 transition-all bg-slate-100 shadow-sm hover:shadow-lg ${isDeleting
                      ? "border-yellow-400 opacity-60"
                      : "border-transparent hover:border-red-500 cursor-pointer"
                      }`}
                    onClick={() => {
                      if (isDeleting) return;
                      setPreview(`${imageUrl}/${img}`);
                      setThumbnailUrl(`${img}`);
                      setShowImageModal(false);
                    }}
                  >
                    <Image
                      src={`${imageUrl}/${img}`}
                      alt={img}
                      height={200}
                      width={200}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                      {isDeleting ? (
                        <FiLoader className="text-white animate-spin" size={24} />
                      ) : (
                        <span className="text-white font-black text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                          Selecionar
                        </span>
                      )}
                    </div>
                    <button
                      onClick={(e) => handleDelete(img)}
                      className="absolute top-2 right-2 p-1.5 bg-red-600/90 hover:bg-red-700 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all z-10 shadow-lg"
                      title="Excluir imagem"
                    >
                      <FiTrash2 size={14} />
                    </button>

                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex justify-end px-8 py-5 border-t border-slate-100 bg-slate-50/50 rounded-b-3xl">
          <button
            onClick={() => setShowImageModal(false)}
            className="px-8 py-3 bg-white text-slate-600 font-bold rounded-2xl border-2 border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
          >
            Cancelar
          </button>
        </div>
      </div>
      {deleteError && (
        <ModalMessage
          text={deleteError}
          setShowModal={(show: boolean) => {
            if (!show) setDeleteError(null);
          }}
        />
      )}
    </div>
  );
};
