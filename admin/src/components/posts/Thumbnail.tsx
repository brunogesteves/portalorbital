import { api } from "@/Utils/api";
import { ThumbnailProps } from "@/Utils/types";
import Image from "next/image";


export const Thumbnail = ({ preview, setThumbnailUrl, setShowImageModal, setPreview, setExistingImages }: ThumbnailProps) => {
    return (
        <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Thumbnail (Capa)</label>
            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-4 text-center hover:border-red-400 transition-colors bg-gray-50 h-64 flex flex-col items-center justify-center relative overflow-hidden group">
                {preview ? (
                    <Image 
                    alt={preview}
                    src={preview} className="w-full h-full object-cover" 
                    width={500}
                    height={500}
                    unoptimized
                    />
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
                                    setPreview(`${process.env.NEXT_PUBLIC_API_URL}${res.data.url}`);
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
    );
}