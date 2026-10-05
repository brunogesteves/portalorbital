import { FiLayers } from "react-icons/fi";
import { FaRegNewspaper } from "react-icons/fa6";
import { BiSolidSlideshow } from "react-icons/bi";
import { IoWarning } from "react-icons/io5";
import { CategoryProps, PostStats } from "@/Utils/types";

interface StatsGridProps {
  statistics: PostStats;
}

const StatsGrid = ({ statistics }: StatsGridProps) => {
  const stats = [
    {
      label: "Total de Destaques",
      value: statistics.totalHighlights,
      icon: FaRegNewspaper,
      color: "from-red-600 to-red-800",
    },
    {
      label: "Posts Ativos",
      value: statistics.totalActivePosts,
      icon: FiLayers,
      color: "from-slate-800 to-slate-900",
    },
    {
      label: "Total de Slide",
      value: statistics.totalSlides,
      icon: BiSolidSlideshow,
      color: "from-blue-600 to-blue-800",
    },
  ];

  const warnings: string[] = [];

  if (statistics.totalSlides < 1) {
    warnings.push("O slide precisa ter no mínimo 1 post ativos");
  }

  if (statistics.totalHighlights < 8) {
    warnings.push(
      `O destaque tem ${statistics.totalHighlights} posts ativos e precisa ter no mínimo 8`,
    );
  }

  if ((statistics.slideAndHighlightPostsAtTheSameTime ?? 0) > 0) {
    warnings.push(
      `${statistics.slideAndHighlightPostsAtTheSameTime} post(s) ativo(s) está(ão) no slide e destaque ao mesmo tempo`,
    );
  }

  statistics.getPostsCategorized?.forEach((category) => {
    const activePostsInCategory = category.totalPosts;
    if (activePostsInCategory > 0 && activePostsInCategory % 4 !== 0) {
      warnings.push(
        `Categoria "${category.name}" tem ${activePostsInCategory} posts ativos (deve ser múltiplo de 4)`,
      );
    }
  });

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-8">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white p-6 md:p-10 md:h-52  rounded-2xl md:rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden group hover:-translate-y-2 transition-all duration-500"
          >
            <div
              className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-[0.03] rounded-bl-full`}
            ></div>
            <div className="relative z-10 flex flex-col gap-4 md:gap-6">
              <div
                className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br ${stat.color} text-white flex items-center justify-center shadow-lg shadow-red-900/20 `}
              >
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] mb-1">
                  {stat.label}
                </p>
                <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter">
                  {stat.value}
                </h3>
              </div>
            </div>
          </div>
        ))}
        <div className="bg-white p-6 md:p-10 md:h-52 rounded-2xl md:rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden group hover:-translate-y-2 transition-all duration-500">
          <div
            className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br  opacity-[0.03] rounded-bl-full`}
          ></div>
          <div className="relative z-10 flex flex-col gap-4 md:gap-6">
            <div
              className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl  ${warnings.length > 0 ? "bg-red-500" : "bg-gray-200"} text-white flex items-center justify-center shadow-lg shadow-red-900/20 `}
            >
              <IoWarning size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] mb-1">
                Avisos
              </p>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter">
                {warnings.length}
              </h3>
            </div>
          </div>
        </div>
      </div>
      {warnings.length > 0 ? (
        <div className="bg-red-100 border border-red-200 rounded-xl p-4 mt-4">
          <div className="flex items-center gap-2 mb-3">
            <IoWarning className="text-red-500" size={20} />
            <h4 className="font-bold text-red-700">Avisos do Sistema</h4>
          </div>
          <ul className="space-y-2">
            {warnings.map((msg, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-red-600"
              >
                <span className="text-red-400 mt-0.5">•</span>
                {msg}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default StatsGrid;
