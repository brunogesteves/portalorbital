import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { AllContentProps } from "@/utils/types";
import { api, imageUrl } from "@/utils/api";

export function useHome() {
  const [content, setContent] = useState<AllContentProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/posts/allPosts").then((res) => {
      setContent(res.data);
      setLoading(false);
    });
  }, []);

  const contentModelDesktop = (info: AllContentProps, i: number) => {
    return (
      <section className="mb-12" key={i} aria-label={info.name}>
        <div className="flex items-center space-x-4 mb-6 mt-10">
          <h2 className="text-xl font-bold text-[#111415] whitespace-nowrap">
            {info.name}
          </h2>
          <div className="h-px bg-gray-200 w-full" aria-hidden="true"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {info.posts.map((post) => (
            <article key={post.id}>
              <Link href={post.slug} aria-label={`Ler: ${post.title}`}>
                <div className="relative group rounded-xl overflow-hidden aspect-4/3 bg-gray-100 cursor-pointer">
                  <Image
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    src={`${imageUrl}/${post.thumbnail}`}
                    fill
                    loading="eager"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                    <h3 className="text-white font-bold text-xl first-letter:capitalize">
                      {post.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    );
  };

  const contentModelMobile = (info: AllContentProps, i: number) => {
    return (
      <section key={i}>
        <div className="mt-8 mb-4">
          <div className="flex items-center gap-2 px-1">
            <span
              className="text-[#222] font-bold text-xs tracking-tight uppercase"
              style={{ fontFamily: "sans-serif" }}
            >
              {info.name}

            </span>
            <div className="flex-1 h-px bg-linear-to-r from-[#999] to-[#ccc]"></div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {info.posts.map((post, i) => {
            return (
              <Link href={post.slug} key={i} className="relative aspect-square rounded-2xl overflow-hidden shadow-sm cursor-pointer">
                <Image
                  alt="Future Luxury Travel"
                  className="w-full h-full object-cover"
                  src={`${imageUrl}/${post.thumbnail}`}
                  fill
                  loading="eager"
                  unoptimized
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex items-end p-3">
                  <p className="text-white font-bold text-xs leading-tight">
                    ESTILO DE VIDA
                  </p>
                </div>
              </Link>

            )
          })}
        </div>
      </section>
    )
  }

  return {
    data: { content, loading },
    methods: { contentModelDesktop, contentModelMobile },
  };
}
