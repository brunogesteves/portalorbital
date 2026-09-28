"use client";

import Image from "next/image";
import Link from "next/link";

import { FiArrowRight } from "react-icons/fi";
import HeroSlider from "@/components/Header/Slider/Slider";
import Header from "@/components/Header/Header";
import { CategoryContentProps } from "@/utils/types";
import { imageUrl } from "@/utils/api";
import JsonLD from "@/components/jsonLd";

export default function CategoryPage({ data }: { data: CategoryContentProps }) {
  console.log("posts deeconomia: ", data.posts[0]);
  return (
    <div className="w-full min-h-screen bg-white flex flex-col font-awanzaman">
      <JsonLD description={data.name} />

      <Header slug="" />
      <div className="hidden md:block text-gray-800 min-h-screen bg-white">
        <main className="w-full min-h-screen">
          <HeroSlider device="desktop" />
          <section className="bg-white py-12" data-purpose="main-content-body">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex justify-center mb-4">
                <h2 className="font-bold text-[#111415] uppercase tracking-wide text-4xl">{data.name}</h2>
              </div>
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <h2 className="text-xl font-bold text-[#111415] whitespace-nowrap">Mundo Geek &amp; Curiosidades</h2>
                  <div className="h-px bg-gray-200 w-full"></div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-4 gap-4">
                    {data.posts.map((post, i) => (
                      <Link key={i} href={post.slug}>
                        <div className="bg-[#111415] rounded-xl overflow-hidden flex flex-col cursor-pointer hover:shadow-lg transition-shadow group">
                          <Image
                            alt={post.title}
                            className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
                            src={`${imageUrl}/${post.thumbnail}`}
                            width={100}
                            height={100}
                            unoptimized
                          />
                          <div className="p-4 grow bg-[#111415] z-10">
                            <h4 className="text-white font-bold text-sm leading-tight">{post.title}</h4>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      <div className="block md:hidden text-gray-800 min-h-screen bg-white flex flex-col w-full">
        <main className="p-4 bg-white overflow-y-auto no-scrollbar flex-1" style={{ paddingBottom: "80px" }}>
          <HeroSlider device="mobile" />

          <section className="py-6 px-4 bg-white">
            <div className="max-w-7xl mx-auto flex justify-center">
              <h2 className="text-5xl font-bold text-gray-900 uppercase tracking-tighter text-center">{data.name}</h2>
            </div>
          </section>
          <div className="space-y-8">
            {data.posts.map((post, i) => (
              <Link href={post.slug} key={i}>
                <section className="relative group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg">
                    <Image
                      alt={post.title}
                      className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
                      src={`${imageUrl}/${post.thumbnail}`}
                      width={100}
                      height={100}
                      unoptimized
                    />
                    {/* <div className="absolute top-3 left-3">
                      <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider rounded-sm shadow-lg">
                        Global Market Intelligence
                      </span>
                    </div> */}
                  </div>
                  <div className="mt-4">
                    <h1 className="text-2xl font-bold text-gray-900 leading-tight uppercase tracking-tight">
                      {post.title}
                    </h1>
                    <button className="mt-4 mb-7 bg-[#0057ff] text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-blue-700 transition-colors flex items-center gap-2 justify-center">
                      <span>Leia a matéria Completa</span>
                      <FiArrowRight className="text-sm" />
                    </button>
                  </div>
                </section>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
