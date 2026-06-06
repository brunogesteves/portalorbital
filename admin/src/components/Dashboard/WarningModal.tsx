import React from "react";
import { WarningModalProps } from "@/Utils/types";

const WarningModal = ({ message, setShowWarningModal }: WarningModalProps) => {
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xl flex items-center justify-center z-[100] p-6 animate-in fade-in duration-300">
      <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl max-w-md w-full border border-white/20 transform animate-in zoom-in-95 duration-300">
        <p className="text-slate-500 mb-10 text-center font-medium leading-relaxed">
          {message}
        </p>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => setShowWarningModal(false)}
            className="w-full py-5 bg-slate-100 text-slate-500 rounded-2xl font-black hover:bg-slate-200 transition-all active:scale-95"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;
