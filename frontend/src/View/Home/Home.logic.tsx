import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { AllContentProps, SliderHighlightsProps } from "@/utils/types";
import { api, imageUrl } from "@/utils/api";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";

export function HomeLogic() {
  const [content, setContent] = useState<AllContentProps[]>([]);
  const [highLight, setHighLight] = useState<SliderHighlightsProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const [postsRes, highLightRes] = await Promise.all([
          api.get("/posts/allPosts"),
          api.get("/posts/highlightPosts"),

        ]);
        setHighLight(highLightRes.data);
        setContent(postsRes.data);
      } catch {
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, []);


  const highlightDesktop = () => {
    return (
      <div className="mb-4">
        <div className="flex items-center space-x-4 mb-6">
          <h2 className="text-xl lg:text-2xl font-bold text-[#111415] whitespace-nowrap">
            Destaques
          </h2>
          <div className="h-px bg-gray-200 w-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:col-span-9">
            {highLight.map((post, i) => {
              if (i <= 3) {
                return (
                  // <Link href={post.slug} key={post.id} className="relative block bg-gray-800 rounded-xl p-2 flex flex-col items-center justify-end text-center space-y-2 aspect-square overflow-hidden">
                  //   <Image
                  //     alt={post.title}
                  //     className="absolute inset-0 w-full h-full object-cover"
                  //     src={`${imageUrl}/${post.thumbnail}`}
                  //     fill
                  //     loading="eager"
                  //     unoptimized
                  //   />
                  //   <div className="absolute inset-0 bg-black/40" />
                  //   <span className="relative text-white text-xl font-bold z-10">
                  //     {post.title}
                  //   </span>
                  // </Link>
                  <article key={i}>
              <Link href={post.slug} aria-label={`Ler: ${post.title}`}>
                <div className="relative group rounded-xl overflow-hidden aspect-square bg-gray-100 cursor-pointer">
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
                )
              }
            })}
          </div>
          
          <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 md:col-span-3">
            <div className="flex items-center space-x-2 mb-4">
              <h3 className="text-sm font-bold text-[#111415] uppercase tracking-wider">
                Eventos Próximos
              </h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-4 p-2 bg-white rounded-lg border border-gray-100">
                <div className="bg-red-600 text-white rounded p-1 text-center min-w-11.25">
                  <div className="text-[8px] uppercase font-bold leading-tight">
                    Julho
                  </div>
                  <div className="text-lg font-black leading-none">
                    18
                  </div>
                </div>
                <div>
                  <div className="text-[9px] text-gray-500 font-bold uppercase">
                    Redes Sociais
                  </div>
                  <div className="text-[11px] font-bold text-[#111415] leading-tight">
                    Como criar conteúdo de alto impacto
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-2 bg-white rounded-lg border border-gray-100">
                <div className="bg-red-600 text-white rounded p-1 text-center min-w-11.25">
                  <div className="text-[8px] uppercase font-bold leading-tight">
                    Julho
                  </div>
                  <div className="text-lg font-black leading-none">
                    20
                  </div>
                </div>
                <div>
                  <div className="text-[9px] text-gray-500 font-bold uppercase">
                    Mídias Sociais
                  </div>
                  <div className="text-[11px] font-bold text-[#111415] leading-tight">
                    Novas ferramentas para influenciadores
                  </div>
                </div>
              </div>
              <button className="w-full py-2 bg-gray-200 hover:bg-gray-300 transition-colors text-gray-600 text-[9px] font-bold rounded-lg uppercase tracking-wider" aria-label="Ver agenda de eventos">
                Ver Agenda
              </button>
            </div>
          </div>
        </div>
      </div>

    )
  }

  const highlightMobile = () => {
    return (
      <div className="mb-2">
        <div className="flex items-center gap-2 px-1 mb-2">
          <span
            className="text-[#222] font-bold text-xs tracking-tight uppercase"
            style={{ fontFamily: "sans-serif" }}
          >
            Destaques
          </span>
          <div className="flex-1 h-px bg-linear-to-r from-[#999] to-[#ccc]"></div>
        </div>
        <div className="flex flex-col gap-3">
          {highLight.map((post, i) => {
            if (i <= 3) {
              return (
                <Link href={post.slug} key={i} className="relative block w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-sm cursor-pointer">
                  <Image
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    src={`${imageUrl}/${post.thumbnail}`}
                    fill
                    loading="eager"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex items-end p-3">
                    <p className="text-white font-bold text-3xl leading-tight">
                      {post.title}
                    </p>
                  </div>
                </Link>
              )
            }
          })}
        </div>
      </div>
    )
  };

  const moreHighlightDesktop = () => {
    return (
      <div className="mb-4">
        <div className="flex items-center space-x-4 mb-6">
          <h2 className="text-xl lg:text-2xl font-bold text-[#111415] whitespace-nowrap">
            Mais Destaques
          </h2>
          <div className="h-px bg-gray-200 w-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:col-span-9">
            {highLight.map((post, i) => {
              if (i >= 4 && i <= 7) {
                return (
                  // <Link href={post.slug} key={post.id} className="relative block bg-gray-800 rounded-xl p-2 flex flex-col items-center justify-end text-center space-y-2 aspect-square overflow-hidden">
                  //   <Image
                  //     alt={post.title}
                  //     className="absolute inset-0 w-full h-full object-cover"
                  //     src={`${imageUrl}/${post.thumbnail}`}
                  //     fill
                  //     loading="eager"
                  //     unoptimized
                  //   />
                  //   <div className="absolute inset-0 bg-black/40" />
                  //   <span className="relative text-white text-[20px] font-bold z-10">
                  //     {post.title}
                  //   </span>
                  // </Link>
                  <article key={i}>
              <Link href={post.slug} aria-label={`Ler: ${post.title}`}>
                <div className="relative group rounded-xl overflow-hidden aspect-square bg-gray-100 cursor-pointer">
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
                )
              }
            })}
          </div>
          {/* Embedded Eventos Component */}
          <div className="md:col-span-3 space-y-4">
            <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 flex flex-col justify-center h-full">
              <h3 className="text-sm font-bold text-[#111415] uppercase tracking-wider mb-4 text-center">
                Conecte-se
              </h3>
              <div className="space-y-3">
                <a
                  className="flex items-center justify-center space-x-2 bg-[#3b5998] text-white py-3 rounded-full font-bold text-[10px] shadow-lg shadow-blue-500/20 hover:opacity-90 transition-opacity"
                  href="#"
                  aria-label="Siga-nos no Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookF className="text-sm" />
                  <span>Facebook</span>
                </a>
                <a
                  className="flex items-center justify-center space-x-2 bg-[#00acee] text-white py-3 rounded-full font-bold text-[10px] shadow-lg shadow-blue-400/20 hover:opacity-90 transition-opacity"
                  href="#"
                  aria-label="Siga-nos no X (Twitter)"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaXTwitter className="text-sm" />
                  <span>Twitter / X</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }

  const moreHighlightMobile = () => {
    return (
      <div className="mb-2">
        <div className="flex items-center gap-2 px-1 mb-2">
          <span
            className="text-[#222] font-bold text-xs tracking-tight uppercase"
            style={{ fontFamily: "sans-serif" }}
          >
            Destaques
          </span>
          <div className="flex-1 h-px bg-linear-to-r from-[#999] to-[#ccc]"></div>
        </div>
        <div className="flex flex-col gap-3">
          {highLight.map((post, i) => {
            if (i >= 4 && i <= 7) {
              return (
                <Link href={post.slug} key={post.id} className="relative block w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-sm cursor-pointer">
                  <Image
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    src={`${imageUrl}/${post.thumbnail}`}
                    fill
                    loading="eager"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex items-end p-3">
                    <p className="text-white font-bold text-3xl leading-tight">
                      {post.title}
                    </p>
                  </div>
                </Link>
              )
            }
          })}
        </div>
      </div>
    )
  };


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
                  <p className="text-white font-bold text-xl leading-tight">
                    {info.posts[i].title}
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
    data: { content, loading, highLight },
    methods: { contentModelDesktop, contentModelMobile, highlightDesktop, highlightMobile, moreHighlightDesktop, moreHighlightMobile },
  };
}
