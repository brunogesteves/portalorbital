"use client";

import { useSlug } from "./useSlug";
import CategoryPage from "@/components/ModelPages/category";
import NewsPage from "@/components/ModelPages/news";
import NotFoundPage from "@/components/ModelPages/notfound";

import Loading from "@/components/Loading";



export default function SlugPage({ slug }: { slug: string }) {
  // const params = useParams();
  // const slug = params.slug as string;

  const { data } = useSlug(slug);

  if (data.loading) {
    return <Loading />;
  }

  if (data.infoContent) {
    if (data.type === "category") {
      return <CategoryPage name={data.infoContent.name} posts={data.infoContent.posts} />;
      // return <CategoryPage slug={slug} />;
    }

    if (data.type === "news") {
      return <NewsPage data={data.infoContent} />;
    }
  }

  return <NotFoundPage />;
}
