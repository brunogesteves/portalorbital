import Image from "next/image";

export default function Sidebar() {
  return (
    <aside
      className="absolute left-0 top-0 bottom-0 w-[280px] bg-navy-industrial z-[70] -translate-x-full flex flex-col shadow-2xl"
      id="side-drawer"
    >
      {/* <!-- Drawer Header --> */}
      <div className="p-6 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center">
          <Image
            alt="Orbital Logo Small"
            className="w-8 h-8 mr-2"
            src="/logo.png"
            width={32}
            height={32}
          />
          <span className="font-space font-bold text-white tracking-tight">
            ORBITAL
          </span>
        </div>
        <button
          className="p-2 hover:bg-white/5 rounded-full"
          onClick={() => {
            console.log("fechar");
          }}
        >
          <span className="material-symbols-outlined text-gray-400">close</span>
        </button>
      </div>
      {/* <!-- Drawer Content --> */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="px-4 space-y-2">
          <li>
            <a
              className="flex items-center px-4 py-3 nav-silver-text hover:bg-white/5 rounded-lg transition-colors group nav-active-glow"
              href="#"
            >
              <span className="material-symbols-outlined mr-4 text-blue-400">
                memory
              </span>
              <span className="font-space font-bold tracking-widest text-sm">
                TECNOLOGIA
              </span>
            </a>
          </li>
          <li>
            <a
              className="flex items-center px-4 py-3 nav-silver-text hover:bg-white/5 rounded-lg transition-colors group"
              href="#"
            >
              <span className="material-symbols-outlined mr-4 text-gray-400 group-hover:text-blue-400">
                science
              </span>
              <span className="font-space font-bold tracking-widest text-sm">
                CIÊNCIA
              </span>
            </a>
          </li>
          <li>
            <a
              className="flex items-center px-4 py-3 nav-silver-text hover:bg-white/5 rounded-lg transition-colors group"
              href="#"
            >
              <span className="material-symbols-outlined mr-4 text-gray-400 group-hover:text-blue-400">
                rocket_launch
              </span>
              <span className="font-space font-bold tracking-widest text-sm">
                ESPAÇO
              </span>
            </a>
          </li>
          <li>
            <a
              className="flex items-center px-4 py-3 nav-silver-text hover:bg-white/5 rounded-lg transition-colors group"
              href="#"
            >
              <span className="material-symbols-outlined mr-4 text-gray-400 group-hover:text-blue-400">
                neurology
              </span>
              <span className="font-space font-bold tracking-widest text-sm">
                IA
              </span>
            </a>
          </li>
          <li>
            <a
              className="flex items-center px-4 py-3 nav-silver-text hover:bg-white/5 rounded-lg transition-colors group"
              href="#"
            >
              <span className="material-symbols-outlined mr-4 text-gray-400 group-hover:text-blue-400">
                smart_toy
              </span>
              <span className="font-space font-bold tracking-widest text-sm">
                ROBÓTICA
              </span>
            </a>
          </li>
          <li>
            <a
              className="flex items-center px-4 py-3 nav-silver-text hover:bg-white/5 rounded-lg transition-colors group"
              href="#"
            >
              <span className="material-symbols-outlined mr-4 text-gray-400 group-hover:text-blue-400">
                water
              </span>
              <span className="font-space font-bold tracking-widest text-sm">
                OCEANO
              </span>
            </a>
          </li>
          <li>
            <a
              className="flex items-center px-4 py-3 nav-silver-text hover:bg-white/5 rounded-lg transition-colors group"
              href="#"
            >
              <span className="material-symbols-outlined mr-4 text-gray-400 group-hover:text-blue-400">
                dashboard
              </span>
              <span className="font-space font-bold tracking-widest text-sm">
                VARIEDADES
              </span>
            </a>
          </li>
        </ul>
      </nav>
      {/* <!-- Drawer Footer --> */}
      <div className="p-6 border-t border-white/10">
        <div className="flex items-center justify-center space-x-4 opacity-60">
          <span className="material-symbols-outlined text-sm text-gray-400">
            settings
          </span>
          <span className="material-symbols-outlined text-sm text-gray-400">
            help
          </span>
          <span className="material-symbols-outlined text-sm text-gray-400">
            info
          </span>
        </div>
      </div>
    </aside>
  );
}
