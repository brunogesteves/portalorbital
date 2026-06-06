"use client";
/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import { useSearch } from "./useSearch";
import Image from "next/image";
import Link from "next/link";

const metadata: Metadata = {
  title: "Busca - Orbital Channel",
  description:
    "Encontre as melhores notícias de tecnologia, inovação, entretenimento e muito mais no Orbital Channel.",
  keywords: ["busca", "pesquisa", "tecnologia", "notícias", "orbital channel"],
  alternates: {
    canonical: "/search",
  },
};

// Placeholder search result cards — replace with real data fetching when ready
const results = [
  {
    id: 1,
    category: "Segurança",
    title: "Toyota lidera lista dos carros mais blindados de 2024",
    excerpt:
      "A procura por veículos de alta segurança cresce em centros urbanos globais.",
    date: "15 Out, 2024",
    img: "https://lh3.googleusercontent.com/aida/AP1WRLtZe4YzL0i04F25WfGkjT-YoQnpTgQMR3mQhxBRjxMjxtEyAeagRZtsMKw6l0FCfArMcpn-EGiDvyL0qCnwZzKIy8-I-uInTHRp3LxVZp5LqCd_FJnk2eao55XFXkTDlacFjHs4rx1FN-frOkxTA_s94RzrlWaJskt6Tcps6WO75Cd2SVgWlnFV484n-YPm7Af2smHZrfY3eLVSd4QtyYfEnq-G0LZTYLDqwaZwZ71tIhG7-zpS-PhbTcQ",
    alt: "Toyota Blindado",
  },
  {
    id: 2,
    category: "Inovação",
    title: "A ascensão dos SUVs elétricos no mercado asiático",
    excerpt:
      "Geely e Omoda apresentam conceitos que desafiam o design tradicional.",
    date: "14 Out, 2024",
    img: "https://lh3.googleusercontent.com/aida/AP1WRLuV001BY4meuZRiqo7zr_oHMY7XPfWeA8h9Sl3_g1MVXQeoc86w_L6nByfXfJEAnGy7bRkiWFSLWKvaLoENGzcfrQaZEem9M7el6WlDZwAxtf0xQzriqgHCN-BFmJDqw-p-VBZN0I_ZImjWOBy8O4Anz_PhxTR_7VkevkPvWfrAKWTNJLZAmgMEK4yTOId0ZkPnMHVNdp3BpZ7qw4jqm8H4iD_qJ0-d8TH1UUmpk7-zbnqaVXC-NwI_Lnc",
    alt: "Futuro Automotivo",
  },
  {
    id: 3,
    category: "Lifestyle",
    title: "Garagens de luxo: O novo status da elite tecnológica",
    excerpt:
      "Como o design de interiores está se adaptando aos colecionadores de supercarros.",
    date: "12 Out, 2024",
    img: "https://lh3.googleusercontent.com/aida/AP1WRLtHxVvTpRlqAR-CbJqosiKlLdqwftRIbfSl7Gw_c4A_MBQdAzkOpLPnbdTjPOmftwHqAOwD83PdwJM_EQRFfaGvKXv3w6INzviWMv5JOrfs0bncWhnjQaGG6g1JdPVfGQKoFE1aO-AO806PUYDnpywHHO2Igq4FkZGHC-tgaNgMwvVQrdFdeyhjc-NwuUekG8kQb_yDSOziNCq24NepgQMVT-_hOpTbVc3id0dr4KGRP-cVumWWPBYT-5c",
    alt: "Luxury Lifestyle",
  },
  {
    id: 4,
    category: "Tecnologia",
    title: "Superando limites: A precisão na engenharia moderna",
    excerpt:
      "Inovações em ferramentas e processos garantem a longevidade de motores clássicos.",
    date: "10 Out, 2024",
    img: "https://lh3.googleusercontent.com/aida/AP1WRLtqN82x4gUXalMnq1Wq00wF2V080u870rJWsa2eD1c8jkiVjNfQB2bZgBLUvAdbzNV-lVvCxqz2G1UoZpmvNlSRGrxZwUGlKYRrGO88hyV3XmluyO9dIt-pjRlB25iLb8P7o1FlCZYxCYkyH0v0oIr4Z1RPD0hTM6FrreLLsuCzyKSOrKd9DCSLNiDkwvdrJvgyHBTbe3x193iUdbLvhjE4NElRCtcDMfMbfpCxLJ0Dc049pJF5ZJ1wrCE",
    alt: "Mecânica de Precisão",
  },
];

function SearchResults() {
  const query = "Tecnologia"; // TODO: replace with real search param via searchParams prop
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

              {/* Results Grid */}
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
