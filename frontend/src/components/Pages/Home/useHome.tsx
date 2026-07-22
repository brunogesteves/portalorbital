import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import {  AllContentProps, CategoryDataProps, PostProps } from "@/utils/types";
import { api } from "@/utils/api";

export function useHome() {
  const [content, setContent] = useState<AllContentProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    api.get("/posts/allPosts").then((res) => {
      setContent(res.data);
      setLoading(false);
    });
  }, []);
  console.log("useHome: ", content);

  // const postCardDesktop = (post: PostProps) => {
  //   return (
  //     <Link key={post.id} href={post.slug}>
  //       <div className="relative group rounded-xl overflow-hidden aspect-4/3 bg-gray-100 cursor-pointer">
  //         <Image
  //           alt={post.title}
  //           className="absolute inset-0 w-full h-full object-cover"
  //           src={`${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}${post.thumbnail}`}
  //           width={100}
  //           height={100}
  //           loading="eager"
  //           unoptimized
  //         />
  //         <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
  //           <h3 className="text-white font-bold text-sm first-letter:capitalize">
  //             {post.category?.name}
  //           </h3>
  //           <h3 className="text-white font-bold text-sm first-letter:capitalize">
  //             {post.title}
  //           </h3>
  //         </div>
  //       </div>
  //     </Link>
  //   );
  // };

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

  // const postCardMobile = (post: CategoryDataProps) => {
  //   return (
  //     <Link key={post.id} href={post.slug}>
  //       <div className="relative aspect-square rounded-2xl overflow-hidden shadow-sm cursor-pointer">
  //         <Image
  //           alt={post.title}
  //           className="w-full h-full object-cover"
  //           src={`${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}${post.thumbnail}`}
  //           width={100}
  //           height={100}
  //           loading="eager"
  //           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  //           unoptimized
  //         />
  //         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end items-start gap-y-2 p-3">
  //           <h3 className="text-white font-bold text-xs leading-tight first-letter:uppercase">
  //             {post.category?.name}
  //           </h3>
  //           <h1 className="text-white font-bold text-xs leading-tight first-letter:uppercase">
  //             {post.title}
  //           </h1>
  //         </div>
  //       </div>
  //     </Link>
  //   );
  // };

  const categoryModelDesktop = ( info:AllContentProps, i:number )=>{
    
     return(
       <section className="mb-12" key={i}>
                 <div className="flex items-center space-x-4 mb-6 mt-10">
                   <h2 className="text-xl font-bold text-[#111415] whitespace-nowrap">
                     {info.name}
                   </h2>
                   <div className="h-[1px] bg-gray-200 w-full"></div>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                   {info?.posts.map((post) => (
                     <Link key={post.id} href={post.slug}>
                       <div className="relative group rounded-xl overflow-hidden aspect-4/3 bg-gray-100 cursor-pointer">
                         <Image
                           alt={post.title}
                           className="absolute inset-0 w-full h-full object-cover"
                           src={`${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}${post.thumbnail}`}
                           fill
                           loading="eager"
                           unoptimized                          
                         />
                         <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                           {/* <h3 className="text-white font-bold text-sm first-letter:capitalize">
                             {post.category?.name}
                           </h3> */}
                           <h3 className="text-white font-bold text-sm first-letter:capitalize">
                             {post.title}
                           </h3>
                         </div>
                       </div>
                     </Link>
                   ))}
                 </div>
               </section>
     )
   }
  return {
    data: { content, loading },
    methods: {   geekCardsDesktop, categoryModelDesktop},
  };
}
