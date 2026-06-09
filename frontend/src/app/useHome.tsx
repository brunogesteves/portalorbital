import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { PostProps } from "@/utils/types";
import { api } from "@/utils/api";

export function useHome() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/posts/all").then((res) => {
      setPosts(res.data);
      setLoading(false);
    });
  }, []);

  const postCardDesktop = (post: PostProps) => {
    return (
      <Link key={post.id} href={post.slug}>
        <div className="relative group rounded-xl overflow-hidden aspect-[4/3] bg-gray-100 cursor-pointer">
          <Image
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover"
            src={`${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}${post.thumbnail}`}
            width={500}
            height={500}
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
            className="w-full aspect-video object-cover"
            src={`${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}${post.thumbnail}`}
            width={500}
            height={500}
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
            width={500}
            height={500}
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
    data: { posts, loading },
    methods: { postCardDesktop, postCardMobile, geekCardsDesktop },
  };
}
