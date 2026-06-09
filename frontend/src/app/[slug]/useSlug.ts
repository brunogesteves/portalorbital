import { useEffect, useState } from "react";

import { api } from "@/utils/api";
import { PostProps } from "@/utils/types";

export function useSlug(slug: string) {
  const [infoContent, setInfoContent] = useState<
    PostProps | PostProps[] | null
  >(null);
  const [type, setType] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true); // Bom para evitar telas em branco

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const res = await api.get(`/search/${slug}`);
        console.log(res.data.type);
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

  return { type, infoContent, loading };
}
