"use client";
import { useParams } from "next/navigation";

import { PostProps } from "@/utils/types";
import { useSlug } from "./useSlug";
import CategoryPage from "@/components/ModelPages/category";
import NewsPage from "@/components/ModelPages/news";
import NotFoundPage from "@/components/ModelPages/notfound";

import Loading from "@/components/Loading";

export default function SlugPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { type, infoContent, loading } = useSlug(slug);

  if (loading) {
    return <Loading />;
  }

  if (infoContent) {
    if (type === "category") {
      // return <CategoryPage data={infoContent as PostProps} />;
      return <CategoryPage />;
    }

    if (type === "news") {
      return <NewsPage data={infoContent as PostProps} />;
    }
  }

  return <NotFoundPage />;
}
