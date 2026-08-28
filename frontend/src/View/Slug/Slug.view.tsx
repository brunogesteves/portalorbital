"use client";

import { useLogicSlug } from "./Slug.logic";
import CategoryPage from "./panels/category";
import NewsPage from "./panels/news";
import NotFoundPage from "./panels/notfound";

import Loading from "@/components/Loading";
import { CategoryContentProps, PostProps } from "@/utils/types";



export default function SlugPage({ slug }: { slug: string }) {


  const { data } = useLogicSlug(slug);

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
