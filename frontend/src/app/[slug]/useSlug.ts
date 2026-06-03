import { api } from '@/utils/api';
import { useEffect, useState } from 'react';


import  CategoryPage from '@/components/category/category';
import { PostProps } from '@/utils/types';
import NewsPage from '@/components/category/news';

export function useSlug(slug:string) {
    const [contentCategory,setContentCategory] = useState(null)
    const [newsContent,sContentetNews] = useState(null)

   useEffect(() => {
    async function getData() {
      try {
        const res = await api.get(`/posts/all`);

        if (res.data?.length) {
          setContentCategory(res.data[0]);
        }
      } catch (error) {
        console.error(error);
      }
    }

    getData();
  }, [slug]);
    

    if(contentCategory){
     return CategoryPage(contentCategory)
    }else if(newsContent){
        return NewsPage(newsContent)
    }else{
        // return <>pagina nao encontrada</>
    }


  
}
