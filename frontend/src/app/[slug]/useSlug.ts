import { api } from "@/utils/api";
import { useEffect, useState } from "react";

import CategoryPage from "@/components/ModelPages/category";
import { PostProps } from "@/utils/types";
import NewsPage from "@/components/ModelPages/news";

export function useSlug(slug: string) {
  const [infoContent, setInfoContent] = useState<any>();
  const [type, setType] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        await api.get(`/search/${slug}`).then((res) => {
          if (res.data) {
            setType(res.data.type);
            setInfoContent(res.data.content);
          }
        });
      } catch (error) {
        console.error(error);
      }
    }

    getData();
  }, [slug]);

  if (type == "category") {
    // return CategoryPage(content);
  } else if (type == "news") {
    console.log("news");
    return NewsPage(infoContent);
  } else {
    // return <>pagina nao encontrada</>
  }
}
