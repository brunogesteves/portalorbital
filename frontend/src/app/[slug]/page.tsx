"use client";
import Header from "@/components/Header/Header";
import { useSlug } from "./useSlug";
import CategoryPage from "@/components/ModelPages/category";
import NewsPage from "@/components/ModelPages/news";
import NotFoundPage from "@/components/ModelPages/notfound";

import { PostProps } from "@/utils/types";
import { useParams } from "next/navigation";
import Footer from "@/components/Footer";

export default function SlugPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { type, infoContent, loading } = useSlug(slug);

  if (loading) {
    return (
      <>
        <Header slug="" />
        <div className="text-[100px] bg-white flex w-full h-full justify-center items-center">
          Carregando...
        </div>
        <Footer />
      </>
    );
  }

  if (infoContent) {
    if (type === "category") {
      // return <CategoryPage data={infoContent as PostProps} />;
    }

    if (type === "news") {
      return <NewsPage data={infoContent as PostProps} />;
    }
  }

  return <NotFoundPage />;
}
