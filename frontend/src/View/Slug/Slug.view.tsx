"use client";

import { SlugLogic } from "./Slug.logic";
import CategoryPage from "./panels/category";
import NewsPage from "./panels/news";
import NotFoundPage from "./panels/notfound";

import Loading from "@/components/Loading";
import { CategoryContentProps, PostProps } from "@/utils/types";

export default function SlugPage({ slug }: { slug: string }) {
  const { data } = SlugLogic(slug);

  if (data.loading) {
    return <Loading />;
  }

  if (data.type === "category") {
    return <CategoryPage data={data.categoryContent as CategoryContentProps} />;
  }

  if (data.type === "news") {
    return <NewsPage data={data.postContent as PostProps} />;
  }

  return <NotFoundPage />;
}
