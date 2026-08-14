

type RoleProps = "ADM" | "PBR";

export interface UserProps {
  // id: number;
  email: string;
  name: string;
  role: RoleProps
}

export interface CategoryProps {
  id: number;
  name: string;
  slug: string;
  _count?: {
    posts: number;
  };
}

export interface PaginationProps {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PostTableProps {
  posts: PostProps[];
  currentUser: RoleProps;
  handleToggleStatus: (id: number, currentStatus: boolean) => void;
  handleToggleSlide: (id: number, currentSlide: boolean) => void;
  handleToggleHighlight: (id: number, currentHighlight: boolean) => void;
  setPostToDelete: (id: number) => void;
  setShowModal: (show: boolean) => void;
  pagination: PaginationProps;
  goToPage: (page: number) => void;
  setLimit: (limit: number) => void;
  fetching: boolean;
}

export interface MobilePostDetailProps {
  post: PostProps;
  currentUser: RoleProps;
  onClose: () => void;
  handleToggleStatus: (id: number, currentStatus: boolean) => void;
  handleToggleSlide: (id: number, currentSlide: boolean) => void;
  handleToggleHighlight: (id: number, currentHighlight: boolean) => void;
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
  status: boolean;
  slide: boolean;
  highlight: boolean;
  categoryId: number;
  authorId: number;
  category?: CategoryProps;
  author?: {
    name: string;
    email: string;
    role: string;
  };
}

// // Para retrocompatibilidade com o código anterior se necessário
// export type contentNewsProps = PostProps;
// export type BannerProps = any; // Ajustar se necessário
export interface ThumbnailProps {
  preview: string;
  setThumbnailUrl: (url: string) => void;
  setShowImageModal: (show: boolean) => void;
  setPreview: (show: string) => void;
  setExistingImages: (img: string[]) => void;
}

export interface PostFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedAuthor: string;
  setSelectedAuthor: (value: string) => void;
  selectedType: string;
  setSelectedType: (value: string) => void;
  categories: CategoryProps[];
  currentUser: RoleProps
  uniqueAuthors: { id: number; name: string }[];
}


export interface DeleteModalProps {
  postTitle: string | undefined;
  handleDelete: () => void;
  setShowModal: (show: boolean) => void;
}
export interface ModalMessageProps {
  text: string;
  setShowModal: (show: boolean) => void;
}

export interface StatsGridProps {
  lenghtHighliht: number;
  lenghtActivePosts: number;
  lenghtSlides: number;
}

export interface LibraryModalProps {
  existingImages: string[];
  setPreview: (preview: string) => void;
  setThumbnailUrl: (thumbnailUrl: string) => void;
  setShowImageModal: (show: boolean) => void;
  onDelete?: (filename: string) => Promise<void>;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PostStats {
  totalPosts: number;
  totalHighlights: number;
  totalActivePosts: number;
  totalSlides: number;
}