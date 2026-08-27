"use client";

import { useEffect, useState } from "react";
import { FiCheckCircle, FiAlertCircle, FiX } from "react-icons/fi";
import { ToastProps } from "@/Utils/types";

export default function Toast({
  message,
  type = "success",
  onClose,
  duration = 5000,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <FiCheckCircle size={20} />,
    error: <FiAlertCircle size={20} />,    
  };

  const colors = {
    success: "bg-black/50 from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 text-emerald-400 bg-gradient-to-r border backdrop-blur-xl rounded-xl px-4 py-2 flex items-center gap-3 shadow-2xl",
    error: "bg-black/50 from-amber-500/20 to-amber-600/10 border-amber-500/30 text-amber-400 ",
  };

  return (
    <div
      className={`fixed top-4 right-4 z-[200] transform transition-all duration-300 ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div
        className={`${colors[type]} text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 font-bold`}
      >
        {icons[type]}
        <span>{message}</span>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="ml-2 hover:opacity-80"
        >
          <FiX size={18} />
        </button>
      </div>
    </div>
  );
}
