import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect, use } from "react";
import { AxiosError } from "axios";

import { api } from "@/Utils/api";
import { CategoryProps } from "@/Utils/types";
import { PostFormValues, postSchema } from "@/Utils/schemas";
import { useUIStore } from "@/store/useUIStore";

export const useLogicNewPost = () => {
  const { userData, setUserData } = useUIStore();

  const router = useRouter();
  const [preview, setPreview] = useState("");
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [showImageModal, setShowImageModal] = useState(false);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [imagesInUse, setImagesInUse] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
      categoryId: "",
      scheduledAt: "",
      thumbnailUrl: "",
      slide: false,
      highlight: false,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cats, images, inUse] = await Promise.all([
          api.get("/categories/admin"),
          api.get("/images"),
          api.get("/images/in-use"),
        ]);
        setCategories(cats.data);
        setExistingImages(images.data);
        setImagesInUse(inUse.data);
      } catch {
        setWarningMessage("Erro ao carregar os dados");
        setShowWarningModal(true);
      }
    };

    fetchData();
  }, []);

  const onDeleteImage = async (filename: string) => {
    await api.delete(`/images/${filename}`);
    setExistingImages((prev) => prev.filter((img) => img !== filename));
  };

  const onSubmit = async (data: PostFormValues) => {
    setLoading(true);
    setSuccess(false);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("categoryId", data.categoryId);
    formData.append("scheduledAt", data.scheduledAt);
    if (data.thumbnailUrl) formData.append("thumbnail", data.thumbnailUrl);
    formData.append("slide", String(data.slide));
    formData.append("highlight", String(data.highlight));
    formData.append("action", "createPost");

    try {
      const response = await api.post("/posts/createpost", formData);
      setSuccess(true);
      setShowToast(true);
      const postId = response.data.id;
      if (userData?.role === "ADM") {
        setTimeout(() => router.push(`/post/edit/${postId}`), 1500);
      } else {
        setTimeout(() => router.push(`/`), 1500);
      }
    } catch (error: unknown) {
      const err = error as AxiosError<{
        message?: string;
        errors?: Record<string, string[]>;
      }>;
      const fieldErrors = err.response?.data?.errors;
      const message =
        err.response?.data?.message ??
        (fieldErrors ? Object.values(fieldErrors).flat().join(" ") : undefined);
      setShowWarningModal(true);
      setWarningMessage(message ?? "Erro ao criar a notícia");
    } finally {
      setLoading(false);
    }
  };
  return {
    data: {
      preview,
      categories,
      showImageModal,
      existingImages,
      imagesInUse,
      loading,
      success,
      showToast,
      showWarningModal,
      warningMessage,
      errors,
    },
    methods: {
      register,
      handleSubmit,
      setValue,
      watch,
      reset,
      setShowImageModal,
      setPreview,
      setExistingImages,
      setLoading,
      setSuccess,
      setShowToast,
      setShowWarningModal,
      setWarningMessage,
      onDeleteImage,
      onSubmit,
    },
  };
};
