interface LibraryModalProps {
    existingImages: string[];
    setPreview: (preview: string) => void;
    setThumbnailUrl: (thumbnailUrl: string) => void;
    setShowImageModal: (show: boolean) => void;
}

export const LibraryModal = ({ existingImages, setPreview, setThumbnailUrl, setShowImageModal }: LibraryModalProps) => {
    return (
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
                                setPreview(`${process.env.NEXT_PUBLIC_URL_SERVER}${img}`);
                                setThumbnailUrl(img);
                                setShowImageModal(false);
                            }}
                        >
                            <img src={`${process.env.NEXT_PUBLIC_URL_SERVER}${img}`} className="w-full h-full object-cover" />
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
    );
}