"use client";

import { useSlug } from "./useSlug";
import CategoryPage from "@/components/ModelPages/category";
import NewsPage from "@/components/ModelPages/news";
import NotFoundPage from "@/components/ModelPages/notfound";

import Loading from "@/components/Loading";
import { CategoryContentProps, PostProps } from "@/utils/types";



export default function SlugPage({ slug }: { slug: string }) {
  // const params = useParams();
  // const slug = params.slug as string;

  const { data } = useSlug(slug);

  if (data.loading) {
    return <Loading />;
  }

  if (data.content) {
    if (data.type === "category") {
      return <CategoryPage data={data.content as CategoryContentProps} />;
    }

    if (data.type === "news") {
      return <NewsPage data={data.content as PostProps} />;
    }
  }

  return <NotFoundPage />;
}
