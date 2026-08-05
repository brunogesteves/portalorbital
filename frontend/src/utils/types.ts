export interface SliderProps {
  device: "desktop" | "mobile";
}

export interface SlugProps {
  params: Promise<{ slug: string }>;
}


export interface CategoryProps {
  id: string;
  name: string;
  slug: string;
}

export interface CategoryContentProps {
  name: string;
  posts: PostProps[];
}

export interface CategoryDataProps {
  data: PostProps[];
}
export interface AuthorProps {
  name: string, email: string, role: string
}

export interface AllContentProps {
  id: string;
  name: string;
  slug: string;
  posts: PostProps[]
}

export interface SliderHighlightsProps {
  id: number,
  thumbnail: string,
  slug: string,
  title: string

}

export interface PostProps {
  id: number;
  authorId: number;
  categoryId: number;
  content: string;
  slug: string
  thumbnail: string
  title: string
  author: AuthorProps
  createdAt: number

}

export interface NewsDataProps {
  data: PostProps;
}


export interface MobileSearchProps {
  searchTerm: string;
  setSearchTerm: (openMobileSearch: string) => void;
  setOpenMobileSearch: (openMobileSearch: boolean) => void;
}

export interface SlugProps {
  params: Promise<{
    slug: string;
  }>;
}

