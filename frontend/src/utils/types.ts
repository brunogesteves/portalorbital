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
}
