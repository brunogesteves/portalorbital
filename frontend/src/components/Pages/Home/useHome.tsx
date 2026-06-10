import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { PostProps } from "@/utils/types";
import { api } from "@/utils/api";

export function useHome() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);

  useEffect(() => {
    setLoading2(true);
    api.get("/posts/all").then((res) => {
      setPosts(res.data);
      setLoading(false);
    });
  }, []);
  console.log("useHome 2");

  const postCardDesktop = (post: PostProps) => {
    return (
      <Link key={post.id} href={post.slug}>
        <div className="relative group rounded-xl overflow-hidden aspect-[4/3] bg-gray-100 cursor-pointer">
          <Image
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover"
            src={`${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}${post.thumbnail}`}
            width={100}
            height={100}
            loading="eager"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
            <h3 className="text-white font-bold text-sm first-letter:capitalize">
              {post.category?.name}
            </h3>
            <h3 className="text-white font-bold text-sm first-letter:capitalize">
              {post.title}
            </h3>
          </div>
        </div>
      </Link>
    );
  };

  const geekCardsDesktop = (post: PostProps) => {
    return (
      <Link key={post.id} href={post.slug}>
        <div className="bg-[#111415] rounded-xl overflow-hidden flex flex-col cursor-pointer hover:shadow-lg transition-shadow">
          <Image
            alt={post.title}
            className="w-full  aspect-video object-cover"
            src={`${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}${post.thumbnail}`}
            width={100}
            height={100}
            loading="eager"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized
          />
          <div className="p-4">
            <h4 className="text-white font-bold text-xs uppercase">
              {post.category?.name}
            </h4>
            <p className="text-gray-400 text-xl mt-1 first-letter:uppercase">
              {post.title}
            </p>
          </div>
        </div>
      </Link>
    );
  };

  const postCardMobile = (post: PostProps) => {
    return (
      <Link key={post.id} href={post.slug}>
        <div className="relative aspect-square rounded-2xl overflow-hidden shadow-sm cursor-pointer">
          <Image
            alt={post.title}
            className="w-full h-full object-cover"
            src={`${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}${post.thumbnail}`}
            width={100}
            height={100}
            loading="eager"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end items-start gap-y-2 p-3">
            <h3 className="text-white font-bold text-xs leading-tight first-letter:uppercase">
              {post.category?.name}
            </h3>
            <h1 className="text-white font-bold text-xs leading-tight first-letter:uppercase">
              {post.title}
            </h1>
          </div>
        </div>
      </Link>
    );
  };

  return {
    data: { posts, loading, loading2 },
    methods: { postCardDesktop, postCardMobile, geekCardsDesktop },
  };
}
