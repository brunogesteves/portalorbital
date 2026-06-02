import { api } from '@/utils/api';

import { useEffect, useState } from 'react';

export function useCategory() {
  const [categoryName, setCategoryName] = useState("Carros");

  return {
    data: {
      categoryName,
    },
    methods: {
      setCategoryName,
    },
  };
}
