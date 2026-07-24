import { FiLayers } from "react-icons/fi";
import { FaRegNewspaper } from "react-icons/fa6";
import { BiSolidSlideshow } from "react-icons/bi";
import { IoWarning } from "react-icons/io5";

import { StatsGridProps } from "@/Utils/types";



const StatsGrid = ({
  lenghtSlides,
  lenghtActivePosts,
  lenghtHighliht,
}: StatsGridProps) => {
  const stats = [
    {
      label: "Total de Destaques",
      value: lenghtHighliht,
      icon: FaRegNewspaper,
      color: "from-red-600 to-red-800",
    },
    {
      label: "Posts Ativos",
      value: lenghtActivePosts,
      icon: FiLayers,
      color: "from-slate-800 to-slate-900",
    },
    {
      label: "Total de Slide",
      value: lenghtSlides,
      icon: BiSolidSlideshow,
      color: "from-blue-600 to-blue-800",
    },

  ];

  const warning = []


  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 md:gap-8">
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
      <div

        className="bg-white p-6 md:p-10 md:h-52 rounded-2xl md:rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden group hover:-translate-y-2 transition-all duration-500"
      >
        <div
          className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br  opacity-[0.03] rounded-bl-full`}
        ></div>
        <div className="relative z-10 flex flex-col gap-4 md:gap-6">
          <div
            className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl  ${warning.length > 0 ? "bg-red-500" : "bg-gray-200"} text-white flex items-center justify-center shadow-lg shadow-red-900/20 `}
          >
            <IoWarning size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] mb-1">
              Avisos
            </p>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter">
              {warning.length}
            </h3>
            {/* {warning.map((msg, i) => (
              <h3 key={i}>{msg}</h3>
            ))} */}
          </div>
        </div>
      </div>

    </div>
  );
};

export default StatsGrid;
