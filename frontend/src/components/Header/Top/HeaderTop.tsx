"use client";
import { FiMenu, FiSearch } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

import { useUIStore } from "@/store/useStore";
import { useHeaderTop } from "./useHeaderTop";
import { ModalSearchlMobile } from "@/components/ModaSearchlMobile";

export const HeaderTopDesktop = () => {


  const { data, methods } = useHeaderTop();
  return (
    <div className="flex w-full px-5 py-2">
      {/* <div className="flex-none" data-purpose="navigation-trigger">
        <button
          aria-label="Menu"
          className="text-gray-700 hover:text-black transition-colors flex items-center justify-center"
        >
          <FiMenu className="h-8 w-8 cursor-pointer" />
        </button>
      </div> */}
      <div
        className="grow flex justify-center items-center px-8"
        data-purpose="logo-container"
      >
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex-shrink-0"
            data-purpose="logo-icon"
          >
            <Image
              alt="Orbital Logo"
              src="/logo.png"
              width={48}
              height={48}
              loading="eager"
              style={{ height: '48px', width: '48px', objectFit: 'contain' }}
            />
          </Link>

          <div className="flex items-center leading-none select-none" style={{ height: '48px' }}>
            <Image
              alt="Orbital Logo"
              src="/orbitaWritten.png"
              width={240}
              height={48}
              loading="eager"
              style={{ height: '48px', width: 'auto', objectFit: 'contain' }}
            />
          </div>
        </div>
      </div>

      <div
        className="flex-none flex items-center gap-6"
        data-purpose="header-utilities"
      >
        <div className="relative group" data-purpose="search-bar">
          <div className="flex items-center bg-gray-200/40 border border-gray-400 rounded-md px-3 py-1 w-48 transition-all focus-within:w-64 focus-within:bg-white/80">
            <input
              className="bg-transparent border-none text-sm w-full p-0 focus:ring-0 text-gray-700 placeholder-gray-500 focus:outline-none"
              placeholder="Buscar..."
              type="text"
              onChange={(e) => methods.handleSearch(e)}
              value={data.searchTerm}
              onKeyDown={(e) => {
                if (e.key === "Enter" && data.searchTerm.length > 0) {
                  methods.handleSearchSubmit();
                }
              }}
            />
            <FiSearch
              onClick={methods.handleSearchSubmit}
              className="h-4 w-4 text-gray-600 ml-1 cursor-pointer"
            />
          </div>
        </div>
        {/* <button className="flex items-center justify-center" data-purpose="user-account">
              <div className="w-8 h-8 rounded-full border-2 border-gray-600 flex items-center justify-center bg-gray-300 overflow-hidden">
                <FiUser className="h-5 w-5 text-gray-600" />
              </div>
            </button> */}
      </div>
    </div >
  );
};

export const HeaderTopMobile = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useUIStore();
  const { data, methods } = useHeaderTop();
  return (
    <>
      <div className="flex items-center justify-between relative z-10 px-4 pb-2">
        <button
          className="text-gray-700 hover:text-black flex items-center justify-center flex-shrink-0"
          aria-label="Abrir Menu"
        >
          <FiMenu
            className="w-6 h-6"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        </button>
        <div className="flex items-center justify-center flex-1 px-4">
          <div className="flex items-center gap-2">
            <div className="shrink-0" style={{ height: '40px', width: '40px' }}>
              <Image
                alt="Orbital Channel Logo"
                src="/logo.png"
                width={40}
                height={40}
                loading="eager"
                style={{ height: '40px', width: 'auto', objectFit: 'contain' }}
              />
            </div>
            <div className="flex items-center leading-none" style={{ height: '40px' }}>
              <Image
                alt="Orbital Logo"
                src="/orbitaWritten.png"
                width={160}
                height={40}
                loading="eager"
                style={{ height: '20px', width: 'auto', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
        <button
          className="text-gray-700 hover:text-black flex items-center justify-center flex-shrink-0"
          aria-label="Buscar"
        >
          <FiSearch
            className="w-5 h-5"
            onClick={() => methods.setOpenMobileSearch(true)}
          />
        </button>
      </div>

      <div className="w-full h-[1px] bg-[#999] relative z-10 mb-2"></div>
      {data.openMobileSearch && (
        <ModalSearchlMobile
          searchTerm={data.searchTerm}
          setSearchTerm={(e) => methods.setSearchTerm(e)}
          setOpenMobileSearch={methods.setOpenMobileSearch}
        />
      )}
    </>
  );
};
