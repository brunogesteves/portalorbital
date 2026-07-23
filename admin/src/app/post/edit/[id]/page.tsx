"use client";

// import React, { useState, useEffect } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { api } from "@/Utils/api";
// import { CategoryProps, PostFormValues } from "@/Utils/types";
// import { postSchema } from "@/Utils/schemas";
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";

import { LibraryModal } from "@/components/posts/Libray";
import { Thumbnail } from "@/components/posts/Thumbnail";
import { Editor } from "@/components/posts/Editor";
import useEditPost from "@/app/post/edit/[id]/useEditPost";

export default function EditPost() {
  const { data, methods } = useEditPost();

  return (
    <div className="max-w-5xl mx-auto pb-10 px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Editar Notícia
          </h1>
          <p className="text-gray-500 font-medium">
            Atualize as informações do post abaixo.
          </p>
        </div>

        {data.success && (
          <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg flex items-center gap-2 font-bold animate-bounce">
            <FiCheckCircle /> Alterações salvas! Redirecionando...
          </div>
        )}
      </div>

      <form
        onSubmit={methods.handleSubmit(methods.onSubmit)}
        className="space-y-8"
      >
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Título e Categoria */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-black text-gray-700 ml-1">
                  Título da Notícia
                </label>
                <input
                  {...methods.register("title")}
                  type="text"
                  className={`w-full border-2 rounded-2xl px-5 py-4 outline-none transition-all font-semibold ${methods.formState.errors.title ? "border-red-200 focus:border-red-500 bg-red-50/30" : "border-gray-100 focus:border-red-600 focus:bg-white bg-gray-50/50"}`}
                  placeholder="Ex: Nova reforma política é aprovada no congresso"
                />
                {methods.formState.errors.title && (
                  <span className="text-xs font-bold text-red-500 ml-1 flex items-center gap-1">
                    <FiAlertCircle size={12} />{" "}
                    {methods.formState.errors.title.message}
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
                      className={`w-full border-2 rounded-2xl px-5 py-4 outline-none appearance-none transition-all font-semibold cursor-pointer ${methods.formState.errors.categoryId ? "border-red-200 focus:border-red-500 bg-red-50/30" : "border-gray-100 focus:border-red-600 focus:bg-white bg-gray-50/50"}`}
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
                  {methods.formState.errors.categoryId && (
                    <span className="text-xs font-bold text-red-500 ml-1 flex items-center gap-1">
                      <FiAlertCircle size={12} />{" "}
                      {methods.formState.errors.categoryId.message}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-black text-gray-700 ml-1">
                    Data de Publicação
                  </label>
                  <input
                    {...methods.register("scheduledAt")}
                    type="datetime-local"
                    className={`w-full border-2 rounded-2xl px-5 py-4 outline-none transition-all font-semibold ${methods.formState.errors.scheduledAt ? "border-red-200 focus:border-red-500 bg-red-50/30" : "border-gray-100 focus:border-red-600 focus:bg-white bg-gray-50/50"}`}
                  />
                  {methods.formState.errors.scheduledAt && (
                    <span className="text-xs font-bold text-red-500 ml-1 flex items-center gap-1">
                      <FiAlertCircle size={12} />{" "}
                      {methods.formState.errors.scheduledAt.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Thumbnail */}
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
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <label className="text-sm font-black text-gray-700 ml-1">
              Exibir no Slide
            </label>
            <button
              type="button"
              onClick={() => methods.setValue("slide", !methods.watch("slide"))}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                methods.watch("slide") ? "bg-red-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow ${
                  methods.watch("slide") ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="mt-8 space-y-2">
            <div
              className={`rounded-3xl overflow-hidden border-2 transition-all ${methods.formState.errors.content ? "border-red-200" : "border-gray-100"}`}
            >
              <Editor
                content={methods.watch("content")}
                setContent={(val) =>
                  methods.setValue("content", val, { shouldValidate: true })
                }
              />
            </div>
            {methods.formState.errors.content && (
              <span className="text-xs font-bold text-red-500 ml-1 flex items-center gap-1">
                <FiAlertCircle size={12} />{" "}
                {methods.formState.errors.content.message}
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
                "Salvar Alterações"
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Modal de Biblioteca de Imagens */}
      {data.showImageModal && (
        <LibraryModal
          existingImages={data.existingImages}
          setPreview={methods.setPreview}
          setThumbnailUrl={(val) => methods.setValue("thumbnailUrl", val)}
          setShowImageModal={methods.setShowImageModal}
        />
      )}
    </div>
  );
}
