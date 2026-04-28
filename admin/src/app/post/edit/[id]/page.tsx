"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { api } from '@/Utils/api';
import { CategoryProps } from '@/Utils/types';
import dynamic from 'next/dynamic';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS

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
                    setPreview(`${process.env.NEXT_PUBLIC_URL_SERVER || 'http://localhost:3001'}${post.thumbnail}`);
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
                            url: `${process.env.NEXT_PUBLIC_URL_SERVER || 'http://localhost:3001'}${res.data.url}`,
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
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Thumbnail (Capa)</label>
                        <div className="border-2 border-dashed border-gray-200 rounded-2xl p-4 text-center hover:border-red-400 transition-colors bg-gray-50 h-64 flex flex-col items-center justify-center relative overflow-hidden group">
                            {preview ? (
                                <img src={preview} className="w-full h-full object-cover" />
                            ) : (
                                <div className="text-gray-400">
                                    <p>Nenhuma imagem selecionada</p>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-4">
                                <label className="bg-white text-gray-800 px-4 py-2 rounded-lg cursor-pointer font-bold hover:bg-gray-100 transition-colors">
                                    Upload
                                    <input type="file" className="hidden" onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            const formData = new FormData();
                                            formData.append('image', file);
                                            api.post('/posts/upload-image', formData).then(res => {
                                                setThumbnailUrl(res.data.url);
                                                setPreview(`${process.env.NEXT_PUBLIC_URL_SERVER || 'http://localhost:3001'}${res.data.url}`);
                                                api.get('/posts/images').then(r => setExistingImages(r.data));
                                            }).catch(err => {
                                                console.error('Erro ao fazer upload da capa:', err);
                                                alert('Erro ao fazer upload da capa');
                                            });
                                        }
                                    }} />
                                </label>
                                <button
                                    type="button"
                                    onClick={() => setShowImageModal(true)}
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-700 transition-colors"
                                >
                                    Biblioteca
                                </button>
                            </div>
                        </div>
                    </div>
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
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[100] backdrop-blur-sm p-4">
                    <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[80vh] flex flex-col shadow-2xl">
                        <div className="p-6 border-b flex justify-between items-center">
                            <h3 className="text-2xl font-bold text-gray-800">Biblioteca de Imagens</h3>
                            <button onClick={() => setShowImageModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
                        </div>
                        <div className="p-6 overflow-y-auto grid grid-cols-2 md:grid-cols-4 gap-4">
                            {existingImages.map((img, i) => (
                                <div
                                    key={i}
                                    className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group border-4 border-transparent hover:border-red-500 transition-all"
                                    onClick={() => {
                                        setPreview(`${process.env.NEXT_PUBLIC_URL_SERVER || 'http://localhost:3001'}${img}`);
                                        setThumbnailUrl(img);
                                        setShowImageModal(false);
                                    }}
                                >
                                    <img src={`${process.env.NEXT_PUBLIC_URL_SERVER || 'http://localhost:3001'}${img}`} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 flex items-center justify-center transition-all">
                                        <span className="text-white font-bold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                                            SELECIONAR
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-6 border-t text-right">
                            <button onClick={() => setShowImageModal(false)} className="bg-gray-100 px-6 py-2 rounded-lg font-bold text-gray-600 hover:bg-gray-200 transition-colors">Fechar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
