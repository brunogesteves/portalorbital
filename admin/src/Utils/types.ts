import * as z from "zod";
import { loginSchema, postSchema } from "./schemas";

export interface UserProps {
  id: number;
  email: string;
  name: string;
  role: "ADM" | "PBR";
}

export interface CategoryProps {
  id: number;
  name: string;
  slug: string;
}

export interface PostTableProps {
  posts: PostProps[];
  currentUser: UserProps | null;
  handleToggleStatus: (id: number, currentStatus: string) => void;
  setPostToDelete: (id: number) => void;
  setShowModal: (show: boolean) => void;
}

export interface WarningModalProps {
  message: string | undefined;
  setShowWarningModal: (show: boolean) => void;
}

export interface PostProps {
  id: number;
  title: string;
  slug: string;
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

// Tipos inferidos dos schemas do Zod
export type LoginFormValues = z.infer<typeof loginSchema>;
export type PostFormValues = z.infer<typeof postSchema>;

// Para retrocompatibilidade com o código anterior se necessário
export type contentNewsProps = PostProps;
export type BannerProps = any; // Ajustar se necessário
