"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import { useSearch } from "./useSearch";
import Image from "next/image";
import Link from "next/link";
// import { metadataSearch } from "@/utils/metadatas";

// export const metadata = metadataSearch;

function SearchResults() {
  const searchParams = useSearchParams();
  const term = searchParams.get("term") || "";

  const { data, methods } = useSearch(term);

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      <Header slug="Search" />

      {/* ============================= */}
      {/* 💻 DESKTOP LAYOUT            */}
      {/* ============================= */}
      {data.isLoading && (
        <div className="text-center text-black/80 bg-white/40 py-10 w-full">
          Carregando...
        </div>
      )}
      <div className="hidden md:flex text-center text-black/80 bg-white/40 py-5 w-full px-14 flex items-center gap-2 ">
        <input
          className="bg-transparent  border-2 border-gray-500 h-9 rounded-lg  text-sm w-full p-4 focus:ring-0  focus:outline-none text-gray-700 placeholder-gray-500"
          placeholder="Buscar..."
          type="text"
          onChange={(e) => methods.setSearchTerm(e.target.value)}
          value={data.searchTerm}
          onKeyDown={(e) => {
            if (e.key === "Enter" && data.searchTerm.length > 0) {
              methods.searchPosts();
            }
          }}
        />
        <button className="bg-[#1e3a8a] hover:bg-[#1e40af] text-white px-6 py-2 rounded-md text-sm font-bold uppercase tracking-wider transition-colors">
          Buscar
        </button>
      </div>
      {!data.isLoading && data.searchResults.length > 0 && (
        <div className="hidden md:flex flex-col flex-1 bg-white">
          <main className="w-full flex-1">
            {/* Search Results Section */}
            <section className="py-12 px-6 md:px-16 max-w-7xl mx-auto">
              {/* Section Header */}
              <div className="mb-8 space-y-2">
                <div className="flex items-center space-x-4">
                  <h1 className="text-black font-bold text-2xl md:text-3xl uppercase tracking-wider whitespace-nowrap font-awanzaman">
                    Resultados da Busca
                  </h1>
                  <div className="h-[1px] bg-blue-900/40 w-full" />
                </div>
                <p className="text-black/60 text-sm italic capitalize">
                  Resultados para:{data.term}
                  <span className="text-white font-semibold">{data.term}</span>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {data?.searchResults?.map((item) => (
                  <article
                    key={item.id}
                    className="bg-[#1d2021] rounded-md overflow-hidden border border-blue-900/30 flex flex-col cursor-pointer hover:border-blue-700/50 transition-colors duration-300"
                  >
                    <Link
                      href={item.slug}
                      className="aspect-video w-full overflow-hidden"
                    >
                      <Image
                        alt={item.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        src={`${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}${item.thumbnail}`}
                        width={640}
                        height={360}
                      />
                    </Link>
                    <div className="p-4 flex flex-col flex-grow space-y-2">
                      <span className="text-[#b91c1c] text-[10px] font-bold uppercase tracking-widest">
                        {item.category?.name}
                      </span>
                      <h2 className="text-white font-bold text-base leading-tight">
                        {item.title}
                      </h2>

                      <span className="text-white/40 text-[10px] pt-2">
                        {new Date(item.createdAt).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </main>
        </div>
      )}
      {!data.isLoading && data.searchResults.length === 0 && (
        <div className="text-center text-black/80 bg-white/40 py-10 w-full">
          {data.warning}
        </div>
      )}

      {/* ============================= */}
      {/* 📱 MOBILE LAYOUT             */}
      {/* ============================= */}
      <div className="block md:hidden flex-1 bg-white">
        {!data.isLoading && data.searchResults.length > 0 && (
          <main className="p-4" style={{ paddingBottom: "80px" }}>
            {/* Section Header */}
            <div className="mb-6 space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-black font-bold text-lg uppercase tracking-wider whitespace-nowrap">
                  Resultados
                </h1>
                <div className="h-[1px] bg-blue-900/40 flex-1" />
              </div>
              <p className="text-black/60 text-xs italic capitalize">
                Resultados para:{data.term}
                <span className="text-white font-semibold">{data.term}</span>
              </p>
            </div>

            {/* Mobile Cards */}
            <div className="space-y-4 bg-white">
              {/* {data.isLoading && (
              <div className="text-center text-black/80 bg-white/40 py-10 w-full">
                Carregando...
              </div>
            )} */}

              {data?.searchResults?.map((item) => (
                <article key={item.id} className="p-4 space-y-3">
                  <div className="relative rounded-lg overflow-hidden">
                    <Image
                      alt={item.title}
                      className="w-full aspect-[16/9] object-cover"
                      src={`${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}${item.thumbnail}`}
                      width={640}
                      height={360}
                    />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[#c1121f] text-[10px] font-bold uppercase tracking-widest">
                      {item.category?.name}
                    </span>
                    <h3 className="text-xl font-bold leading-tight uppercase text-gray-900">
                      {item.title}
                    </h3>

                    <div className="flex  items-center text-[10px] text-gray-400 font-medium">
                      {new Date(item.createdAt).toLocaleDateString("pt-BR")}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </main>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Carregando busca...</div>}>
      <SearchResults />
    </Suspense>
  );
}
