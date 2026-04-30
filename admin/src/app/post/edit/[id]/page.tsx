"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { api } from '@/Utils/api';
import { CategoryProps } from '@/Utils/types';
import dynamic from 'next/dynamic';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS
import { LibraryModal } from '@/app/components/posts/Libray';
import { Thumbnail } from '@/app/components/posts/Thumbnail';

// Import SunEditor dynamically to avoid SSR issues
const SunEditor = dynamic(() => import('suneditor-react'), {
    ssr: false,
});

export default function PostForm() {
    const router = useRouter();
    const params = useParams();
    const isEdit = !!params.id;

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [scheduledAt, setScheduledAt] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [preview, setPreview] = useState('');
    const [categories, setCategories] = useState<CategoryProps[]>([]);
    const [showImageModal, setShowImageModal] = useState(false);
    const [existingImages, setExistingImages] = useState<string[]>([]); // Simulação de fotos existentes

    useEffect(() => {
        // Carregar categorias
        api.get('/categories').then(res => setCategories(res.data));

        api.get('/posts/images').then(res => setExistingImages(res.data));

        if (isEdit) {
            api.get(`/posts/${params.id}`).then(res => {
                const post = res.data;
                setTitle(post.title);
                setContent(post.content);
                setCategoryId(post.categoryId.toString());
                setScheduledAt(new Date(post.scheduledAt).toISOString().slice(0, 16));
                if (post.thumbnail) {
                    setPreview(`${process.env.NEXT_PUBLIC_URL_SERVER}${post.thumbnail}`);
                    setThumbnailUrl(post.thumbnail);
                }
            });
        }
    }, [isEdit, params.id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('categoryId', categoryId);
        formData.append('scheduledAt', scheduledAt);
        if (thumbnailUrl) formData.append('thumbnailUrl', thumbnailUrl);

        try {
            if (isEdit) {
                await api.put(`/posts/${params.id}`, formData);
            } else {
                await api.post('/posts', formData);
            }
            router.push('/');
        } catch (error) {
            alert('Erro ao salvar post');
        }
    };

    const handleImageUploadBefore = (files: any[], info: object, uploadHandler: Function) => {
        const file = files[0];
        const formData = new FormData();
        formData.append('image', file);

        api.post('/posts/upload-image', formData)
            .then(res => {
                const response = {
                    result: [
                        {
                            url: `${process.env.NEXT_PUBLIC_URL_SERVER}${res.data.url}`,
                            name: file.name,
                            size: file.size,
                        }
                    ]
                };
                uploadHandler(response);
            })
            .catch(err => {
                console.error('Erro ao fazer upload da imagem no editor:', err);
                uploadHandler(err.message);
            });

        return undefined;
    };

    return (
        <div className="max-w-5xl mx-auto pb-20">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">
                {isEdit ? 'Editar Notícia' : 'Criar Nova Notícia'}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100 ">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
                    {/* Título e Categoria */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Título da Notícia</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none transition-all"
                                placeholder="Digite o título chamativo..."
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Categoria</label>
                            <select
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none appearance-none bg-white"
                                required
                            >
                                <option value="">Selecione uma categoria</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Data e Hora de Publicação</label>
                            <input
                                type="datetime-local"
                                value={scheduledAt}
                                onChange={(e) => setScheduledAt(e.target.value)}
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
                                required
                            />
                        </div>
                    </div>

                    {/* Thumbnail */}
                    <Thumbnail
                        preview={preview}
                        setThumbnailUrl={setThumbnailUrl}
                        setShowImageModal={setShowImageModal}
                        setPreview={setPreview}
                        setExistingImages={setExistingImages}
                    />
                </div>

                {/* Editor SunEditor */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Conteúdo da Notícia</label>
                    <div className="rounded-xl overflow-hidden border border-gray-200">
                        <SunEditor
                            setContents={content}
                            onChange={setContent}
                            onImageUploadBefore={handleImageUploadBefore}
                            height="300px"
                            setOptions={{
                                buttonList: [
                                    ['undo', 'redo'],
                                    ['font', 'fontSize', 'formatBlock'],
                                    ['paragraphStyle', 'blockquote'],
                                    ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                                    ['fontColor', 'hiliteColor', 'textStyle'],
                                    ['removeFormat'],
                                    ['outdent', 'indent'],
                                    ['align', 'horizontalRule', 'list', 'lineHeight'],
                                    ['table', 'link', 'image'], // Vídeo removido como solicitado
                                    ['fullScreen', 'showBlocks'],
                                    ['preview']
                                ],
                                height: '600px'
                            }}
                        />
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button type="submit" className="bg-red-600 text-white px-10 py-4 rounded-xl font-bold text-xl hover:bg-red-700 transition-all shadow-xl shadow-red-200 active:scale-95">
                        {isEdit ? 'Salvar Alterações' : 'Publicar Notícia'}
                    </button>
                </div>
            </form>

            {/* Modal de Biblioteca de Imagens */}
            {showImageModal && (
                <LibraryModal
                    existingImages={existingImages}
                    setPreview={setPreview}
                    setThumbnailUrl={setThumbnailUrl}
                    setShowImageModal={setShowImageModal}
                />
            )}
        </div>
    );
}
