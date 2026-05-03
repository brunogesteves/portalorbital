import React from 'react';
import { FiFileText, FiLayers, FiUsers } from 'react-icons/fi';
import { PostProps } from '@/Utils/types';

interface StatsGridProps {
  postsCount: number;
  categoriesCount: number;
}

const StatsGrid = ({ postsCount, categoriesCount }: StatsGridProps) => {
  const stats = [
    { label: 'Total de Notícias', value: postsCount, icon: FiFileText, color: 'from-red-600 to-red-800' },
    { label: 'Categorias Ativas', value: categoriesCount, icon: FiLayers, color: 'from-slate-800 to-slate-900' },
    { label: 'Equipe Editorial', value: 12, icon: FiUsers, color: 'from-blue-600 to-blue-800' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden group hover:-translate-y-2 transition-all duration-500">
          <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-[0.03] rounded-bl-full`}></div>
          <div className="relative z-10 flex flex-col gap-6">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} text-white flex items-center justify-center shadow-lg shadow-red-900/20 `}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] mb-1">{stat.label}</p>
              <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{stat.value}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
