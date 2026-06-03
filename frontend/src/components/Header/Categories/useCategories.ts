import { api } from '@/utils/api';
import { CategoryProps } from '@/utils/types';
import { useEffect, useState } from 'react';

export function useHeader() {
  const [categories, setCategories] = useState<CategoryProps[]>([]);


  useEffect(() => {
    async function getCategories() {
     try {
         await api.get('/categories').then((res) => { 
        setCategories(res.data);
      });
     } catch (error) {
        
     }
    }
    getCategories();
  }, []);
  return {
    data: {
      categories,
    },
    methods: {
      setCategories,
    },
  };
}
