"use client";

import { LibraryModal } from "@/components/posts/LibrayModal";
import { Thumbnail } from "@/components/posts/Thumbnail";
import { Editor } from "@/components/posts/Editor";
import { FiAlertCircle } from "react-icons/fi";
import { Suspense } from "react";

import WarningModal from "@/components/Dashboard/WarningModal";
import { useLogicNewPost } from "./newPost.logic";
import Loading from "@/components/Loading";
import Toast from "@/components/Toast";
import Calendar from "@/components/Calendar";

export default function PostForm() {
  const { data, methods } = useLogicNewPost();

  return (
    <Suspense fallback={<Loading />}>
      <div className="max-w-5xl mx-auto pb-10 px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
              Criar Nova Noticia
            </h1>
            <p className="text-gray-500 font-medium">
              Preencha os detalhes para publicar no portal.
            </p>
          </div>
        </div>

        <form
          onSubmit={methods.handleSubmit(methods.onSubmit)}
          className="space-y-8"
        >
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-black text-gray-700 ml-1">
                    Titulo da Noticia
                  </label>
                  <input
                    {...methods.register("title")}
                    type="text"
                    className={`w-full border-2 rounded-2xl px-5 py-4 outline-none transition-all font-semibold ${data.errors.title ? "border-red-200 focus:border-red-500 bg-red-50/30" : "border-gray-100 focus:border-red-600 focus:bg-white bg-gray-50/50"}`}
                    placeholder="Ex: Nova reforma politica e aprovada no congresso"
                  />
                  {data.errors.title && (
                    <span className="text-xs font-bold text-red-500 ml-1 flex items-center gap-1">
                      <FiAlertCircle size={12} /> {data.errors.title.message}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-black text-gray-700 ml-1">
                      Categoria
                    </label>
                    <div className="relative">
                      <select
                        {...methods.register("categoryId")}
                        className={`w-full border-2 rounded-2xl px-5 py-4 outline-none appearance-none transition-all font-semibold cursor-pointer ${data.errors.categoryId ? "border-red-200 focus:border-red-500 bg-red-50/30" : "border-gray-100 focus:border-red-600 focus:bg-white bg-gray-50/50"}`}
                      >
                        <option value="">Selecione...</option>
                        {data.categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        ▼
                      </div>
                    </div>
                    {data.errors.categoryId && (
                      <span className="text-xs font-bold text-red-500 ml-1 flex items-center gap-1">
                        <FiAlertCircle size={12} />{" "}
                        {data.errors.categoryId.message}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-black text-gray-700 ml-1">
                      Data de Publicacao
                    </label>
                    <Calendar
                      value={methods.watch("scheduledAt")}
                      onChange={(val) => methods.setValue("scheduledAt", val)}
                      error={!!data.errors.scheduledAt}
                    />
                    {data.errors.scheduledAt && (
                      <span className="text-xs font-bold text-red-500 ml-1 flex items-center gap-1">
                        <FiAlertCircle size={12} />{" "}
                        {data.errors.scheduledAt.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-black text-gray-700 ml-1 text-center block md:text-left">
                  Imagem de Capa (Thumbnail)
                </label>
                <Thumbnail
                  preview={data.preview}
                  setThumbnailUrl={(val) => methods.setValue("thumbnailUrl", val)}
                  setShowImageModal={methods.setShowImageModal}
                  setPreview={methods.setPreview}
                  setExistingImages={methods.setExistingImages}
                />
                {data.errors.thumbnailUrl && (
                  <span className="text-xs font-bold text-red-500 ml-1 flex items-center gap-1">
                    <FiAlertCircle size={12} /> {data.errors.thumbnailUrl.message}
                  </span>
                )}
              </div>
            </div>

            <div className="mt-6 flex items-center gap-6">
              <div className="flex items-center gap-3">
                <label className="text-sm font-black text-gray-700 ml-1">
                  Exibir no Slide
                </label>
                <button
                  type="button"
                  onClick={() => methods.setValue("slide", !methods.watch("slide"))}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${methods.watch("slide") ? "bg-red-600" : "bg-gray-300"}`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow ${methods.watch("slide") ? "translate-x-6" : "translate-x-1"}`}
                  />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <label className="text-sm font-black text-gray-700 ml-1">
                  Exibir no Destaque
                </label>
                <button
                  type="button"
                  onClick={() => methods.setValue("highlight", !methods.watch("highlight"))}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${methods.watch("highlight") ? "bg-red-600" : "bg-gray-300"}`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow ${methods.watch("highlight") ? "translate-x-6" : "translate-x-1"}`}
                  />
                </button>
              </div>
            </div>

            <div className="mt-8 space-y-2">
              <label className="text-sm font-black text-gray-700 ml-1">
                Conteudo da Noticia
              </label>
              <div
                className={`rounded-3xl overflow-hidden border-2 transition-all ${data.errors.content ? "border-red-200" : "border-gray-100"}`}
              >
                <Editor
                  content={""}
                  setContent={(val) =>
                    methods.setValue("content", val, { shouldValidate: true })
                  }
                />
              </div>
              {data.errors.content && (
                <span className="text-xs font-bold text-red-500 ml-1 flex items-center gap-1">
                  <FiAlertCircle size={12} /> {data.errors.content.message}
                </span>
              )}
            </div>

            <div className="flex justify-end pt-8 border-t border-gray-50 mt-8">
              <button
                type="submit"
                disabled={data.loading}
                className="bg-red-600 text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-red-700 transition-all shadow-xl shadow-red-200 active:scale-[0.98] disabled:opacity-50 flex items-center gap-3"
              >
                {data.loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Publicar Noticia"
                )}
              </button>
            </div>
          </div>
        </form>

        {data.showImageModal && (
          <LibraryModal
            existingImages={data.existingImages}
            imagesInUse={data.imagesInUse}
            setPreview={methods.setPreview}
            setThumbnailUrl={(val) => methods.setValue("thumbnailUrl", val)}
            setShowImageModal={methods.setShowImageModal}
            setExistingImages={(filename: string) => methods.setExistingImages((prev) => prev.filter((img) => img !== filename))}
          />
        )}
        {data.showWarningModal && (
          <WarningModal
            message={data.warningMessage}
            setShowWarningModal={methods.setShowWarningModal}
          />
        )}
        {data.showToast && (
          <Toast
            message="Post Criado"
            type="success"
            onClose={() => methods.setShowToast(false)}
          />
        )}
      </div>
    </Suspense>
  );
}
