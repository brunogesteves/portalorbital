import React from 'react';

interface DeleteModalProps {
  postTitle: string | undefined;
  handleDelete: () => void;
  setShowModal: (show: boolean) => void;
}

const DeleteModal = ({ postTitle, handleDelete, setShowModal }: DeleteModalProps) => {
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xl flex items-center justify-center z-[100] p-6 animate-in fade-in duration-300">
      <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl max-w-md w-full border border-white/20 transform animate-in zoom-in-95 duration-300">
        <h2 className="text-3xl font-black mb-4 text-slate-900 text-center tracking-tight">Deseja excluir?</h2>
        <p className="text-slate-500 mb-10 text-center font-medium leading-relaxed">
          Você está prestes a excluir permanentemente a notícia: <br />
          <span className="text-red-600 font-bold">"{postTitle}"</span>
        </p>
        <div className="flex flex-col gap-4">
          <button
            onClick={handleDelete}
            className="w-full py-5 bg-red-600 text-white rounded-2xl font-black hover:bg-red-700 transition-all shadow-xl shadow-red-900/20 active:scale-95"
          >
            Confirmar Exclusão
          </button>
          <button
            onClick={() => setShowModal(false)}
            className="w-full py-5 bg-slate-100 text-slate-500 rounded-2xl font-black hover:bg-slate-200 transition-all active:scale-95"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
