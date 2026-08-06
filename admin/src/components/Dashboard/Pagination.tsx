import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";
import { PaginationProps } from "@/Utils/types";

interface PaginationComponentProps extends PaginationProps {
  goToPage: (page: number) => void;
  setLimit: (limit: number) => void;
}

const Pagination = ({
  page,
  limit,
  total,
  totalPages,
  goToPage,
  setLimit,
}: PaginationComponentProps) => {
  if (totalPages === 0) return null;

  return (
    <div className="px-4 py-4 md:px-6 md:py-5 border-t border-slate-100 bg-slate-50/50">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Items per page */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Mostrar</span>
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="bg-white border-2 border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 outline-none focus:border-red-600 transition-colors cursor-pointer"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={40}>40</option>
            <option value={50}>50</option>
          </select>
          <span className="text-xs font-semibold text-slate-500">por página</span>
        </div>

        {/* Page info */}
        <div className="text-xs font-semibold text-slate-500">
          {total} notícias • Página {page} de {totalPages}
        </div>

        {/* Page navigation */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => goToPage(1)}
            disabled={page === 1}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            title="Primeira página"
          >
            <FiChevronsLeft size={16} />
          </button>
          <button
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            title="Página anterior"
          >
            <FiChevronLeft size={16} />
          </button>

          {/* Page numbers */}
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum: number;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (page <= 3) {
              pageNum = i + 1;
            } else if (page >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = page - 2 + i;
            }
            return (
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                className={`min-w-[32px] h-8 rounded-xl text-xs font-bold transition-all ${
                  page === pageNum
                    ? "bg-red-600 text-white shadow-lg shadow-red-200"
                    : "text-slate-500 hover:bg-white hover:text-slate-700"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            title="Próxima página"
          >
            <FiChevronRight size={16} />
          </button>
          <button
            onClick={() => goToPage(totalPages)}
            disabled={page === totalPages}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            title="Última página"
          >
            <FiChevronsRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
