import { useEffect, useState } from "react";

import { api } from "@/utils/api";
import { CategoryContentProps, PostProps } from "@/utils/types";

export function useSlug(slug: string) {
  const [infoContent, setInfoContent] = useState<any>(null);
  const [type, setType] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true); // Bom para evitar telas em branco

  useEffect(() => {
    async function getData() {
      console.log("retorn no useslug")
      setLoading(true);
      try {
        const res = await api.get(`/search/${slug}`);
        console.log("retorna da api");
        if (res.data.status) {
          setType(res.data.type);
          setInfoContent(res.data.content);
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

  console.log("useSlug: ", type);
  console.log("infoContent: ", infoContent);

  return { data: { type, infoContent, loading } };
}
