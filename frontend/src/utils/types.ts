export interface SliderProps {
  device: "desktop" | "mobile";
}

export interface SlugProps {
  params: Promise<{ slug: string }>;
}

export interface HeaderProps {
  slug: string;
}

export interface CategoryProps {
  id: string;
  name: string;
  slug: string;
}

export interface PostProps {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  content: string;
  author: {
    name: string;
  };
  createdAt: Date;
  category?: { id: number; name: string; slug: string };
}

export interface NewsDataProps {
  data: PostProps;
}
export interface CategoryDataProps {
  data: PostProps[];
}

export interface MobileSearchProps {
  searchTerm: string;
  setSearchTerm: (openMobileSearch: string) => void;
  setOpenMobileSearch: (openMobileSearch: boolean) => void;
}
