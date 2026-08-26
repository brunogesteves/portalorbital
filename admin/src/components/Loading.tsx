

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-6">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 border-4 border-red-600/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="text-slate-400 font-bold tracking-[3px] uppercase text-[10px]">
        Sincronizando Sistema...
      </p>
    </div>
  );
}
