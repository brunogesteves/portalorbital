import { useEffect, useState } from "react";

import { api } from "@/utils/api";
import { CategoryContentProps, PostProps } from "@/utils/types";

export function useLogicSlug(slug: string) {
  const [categoryContent, setCategoryContent] = useState<CategoryContentProps | null>(null);
  const [postContent, setPostContent] = useState<PostProps | null>(null);
  const [type, setType] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true); // Bom para evitar telas em branco

  useEffect(() => {
    async function getData() {
      setLoading(true);

      try {
        const res = await api.get(`/search/${slug}`);        
        if (res.data.status) {
          setType(res.data.type);
          if (res.data.type == "category") {
            setCategoryContent(res.data.content)
          } else {
            setPostContent(res.data.content)
          }
        }
      } catch (error) {
        console.error(error);
        setType("notfound");
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      getData();
    }
  }, [slug]);

  return { data: { type, content: type == "category" ? categoryContent : postContent, loading } };
}
