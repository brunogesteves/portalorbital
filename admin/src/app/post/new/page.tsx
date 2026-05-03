"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { api } from '@/Utils/api';
import { CategoryProps, PostFormValues } from '@/Utils/types';
import { postSchema } from '@/Utils/schemas';

import { LibraryModal } from '@/app/components/posts/Libray';
import { Thumbnail } from '@/app/components/posts/Thumbnail';
import { Editor } from '@/app/components/posts/Editor';
import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

export default function PostForm() {
  const router = useRouter();
  const params = useParams();
  const isEdit = !!params.id;

  const [preview, setPreview] = useState('');
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [showImageModal, setShowImageModal] = useState(false);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      content: '',
      categoryId: '',
      scheduledAt: '',
      thumbnailUrl: '',
    }
  });

  // Monitorar valores para os componentes controlados
  const contentValue = watch('content');
  const thumbnailUrlValue = watch('thumbnailUrl');

  useEffect(() => {
    // Carregar categorias e imagens
    api.get('/categories').then(res => setCategories(res.data));
    api.get('/posts/images').then(res => setExistingImages(res.data));

    if (isEdit) {
      api.get(`/posts/${params.id}`).then(res => {
        const post = res.data;
        reset({
          title: post.title,
          content: post.content,
          categoryId: post.categoryId.toString(),
          scheduledAt: new Date(post.scheduledAt).toISOString().slice(0, 16),
          thumbnailUrl: post.thumbnail || '',
        });
        
        if (post.thumbnail) {
          setPreview(`${process.env.NEXT_PUBLIC_URL_SERVER}${post.thumbnail}`);
        }
      });
    }
  }, [isEdit, params.id, reset]);

  const onSubmit = async (data: PostFormValues) => {
    setLoading(true);
    setSuccess(false);
    
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('categoryId', data.categoryId);
    formData.append('scheduledAt', data.scheduledAt);
    if (data.thumbnailUrl) formData.append('thumbnailUrl', data.thumbnailUrl);

    try {
      if (isEdit) {
        await api.put(`/posts/${params.id}`, formData);
      } else {
        await api.post('/posts', formData);
      }
      setSuccess(true);
      setTimeout(() => router.push('/'), 1500);
    } catch (error) {
      console.error('Erro ao salvar post:', error);
      alert('Erro ao salvar post. Verifique os campos e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-10 px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            {isEdit ? 'Editar Notícia' : 'Criar Nova Notícia'}
          </h1>
          <p className="text-gray-500 font-medium">Preencha os detalhes para publicar no portal.</p>
        </div>
        
        {success && (
          <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg flex items-center gap-2 font-bold animate-bounce">
            <FiCheckCircle /> Salvo com sucesso! Redirecionando...
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Título e Categoria */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-black text-gray-700 ml-1">Título da Notícia</label>
                <input
                  {...register('title')}
                  type="text"
                  className={`w-full border-2 rounded-2xl px-5 py-4 outline-none transition-all font-semibold ${errors.title ? 'border-red-200 focus:border-red-500 bg-red-50/30' : 'border-gray-100 focus:border-red-600 focus:bg-white bg-gray-50/50'}`}
                  placeholder="Ex: Nova reforma política é aprovada no congresso"
                />
                {errors.title && (
                  <span className="text-xs font-bold text-red-500 ml-1 flex items-center gap-1">
                    <FiAlertCircle size={12} /> {errors.title.message}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-black text-gray-700 ml-1">Categoria</label>
                  <div className="relative">
                    <select
                      {...register('categoryId')}
                      className={`w-full border-2 rounded-2xl px-5 py-4 outline-none appearance-none transition-all font-semibold cursor-pointer ${errors.categoryId ? 'border-red-200 focus:border-red-500 bg-red-50/30' : 'border-gray-100 focus:border-red-600 focus:bg-white bg-gray-50/50'}`}
                    >
                      <option value="">Selecione...</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      ▼
                    </div>
                  </div>
                  {errors.categoryId && (
                    <span className="text-xs font-bold text-red-500 ml-1 flex items-center gap-1">
                      <FiAlertCircle size={12} /> {errors.categoryId.message}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-black text-gray-700 ml-1">Data de Publicação</label>
                  <input
                    {...register('scheduledAt')}
                    type="datetime-local"
                    className={`w-full border-2 rounded-2xl px-5 py-4 outline-none transition-all font-semibold ${errors.scheduledAt ? 'border-red-200 focus:border-red-500 bg-red-50/30' : 'border-gray-100 focus:border-red-600 focus:bg-white bg-gray-50/50'}`}
                  />
                  {errors.scheduledAt && (
                    <span className="text-xs font-bold text-red-500 ml-1 flex items-center gap-1">
                      <FiAlertCircle size={12} /> {errors.scheduledAt.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Thumbnail */}
            <div className="space-y-2">
              <label className="text-sm font-black text-gray-700 ml-1 text-center block md:text-left">Imagem de Capa (Thumbnail)</label>
              <Thumbnail
                preview={preview}
                setThumbnailUrl={(val) => setValue('thumbnailUrl', val)}
                setShowImageModal={setShowImageModal}
                setPreview={setPreview}
                setExistingImages={setExistingImages}
              />
            </div>
          </div>

          <div className="mt-8 space-y-2">
            <label className="text-sm font-black text-gray-700 ml-1">Conteúdo da Notícia</label>
            <div className={`rounded-3xl overflow-hidden border-2 transition-all ${errors.content ? 'border-red-200' : 'border-gray-100'}`}>
              <Editor
                content={contentValue}
                setContent={(val) => setValue('content', val, { shouldValidate: true })}
              />
            </div>
            {errors.content && (
              <span className="text-xs font-bold text-red-500 ml-1 flex items-center gap-1">
                <FiAlertCircle size={12} /> {errors.content.message}
              </span>
            )}
          </div>

          <div className="flex justify-end pt-8 border-t border-gray-50 mt-8">
            <button 
              type="submit" 
              disabled={loading}
              className="bg-red-600 text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-red-700 transition-all shadow-xl shadow-red-200 active:scale-[0.98] disabled:opacity-50 flex items-center gap-3"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                isEdit ? 'Salvar Alterações' : 'Publicar Notícia'
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Modal de Biblioteca de Imagens */}
      {showImageModal && (
        <LibraryModal
          existingImages={existingImages}
          setPreview={setPreview}
          setThumbnailUrl={(val) => setValue('thumbnailUrl', val)}
          setShowImageModal={setShowImageModal}
        />
      )}
    </div>
  );
}
