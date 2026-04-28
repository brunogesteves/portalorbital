export interface UserProps {
  id: number;
  email: string;
  name: string;
  role: 'ADM' | 'PBR';
}

export interface CategoryProps {
  id: number;
  name: string;
}

export interface PostProps {
  id: number;
  title: string;
  thumbnail: string | null;
  content: string;
  scheduledAt: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  categoryId: number;
  authorId: number;
  category?: CategoryProps;
  author?: {
    name: string;
    email: string;
    role: string;
  };
}

// Para retrocompatibilidade com o código anterior se necessário
export type contentNewsProps = PostProps;
export type BannerProps = any; // Ajustar se necessário
