import { api } from "@/utils/api";
import { PostProps } from "@/utils/types";
import { useEffect, useState } from "react";

export function useHome() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/posts/all").then((res) => {
      setPosts(res.data);
      setLoading(false);
    });
  }, []);

  return {
    data: { posts, loading },
    methods: {},
  };
}
