"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";

import { api, imageUrl } from "@/Utils/api";
import { CategoryProps, PostProps } from "@/Utils/types";
import { PostFormValues, postSchema } from "@/Utils/schemas";

export const useLogicPost = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [preview, setPreview] = useState("");
  const [categories, setCategories] = useState<CategoryProps[]>([]);

  const [showImageModal, setShowImageModal] = useState(false);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [imagesInUse, setImagesInUse] = useState<string[]>([]);
  const [loadingOffAir, setLoadingOffAir] = useState(false);
  const [loadingGoLive, setLoadingGoLive] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [post, setPost] = useState<PostProps>();
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
      if (id) {
        try {
          const [cats, images, post, inUse] = await Promise.all([
            api.get("/categories/admin"),
            api.get("/images"),
            api.get(`/posts/${id}`),
            api.get("/images/in-use"),
          ]);

          setCategories(cats.data);
          setExistingImages(images.data);
          setImagesInUse(inUse.data);
          setPost(post.data);
          reset({
            title: post.data.title,
            content: post.data.content,
            categoryId: post.data.categoryId.toString(),
            scheduledAt: new Date(post.data.scheduledAt)
              .toISOString()
              .slice(0, 16),
            thumbnailUrl: post.data.thumbnail || "",
            slide: post.data.slide ?? false,
            highlight: post.data.highlight ?? false,
          });

          if (post.data.thumbnail) {
            setPreview(`${imageUrl}/${post.data.thumbnail}`);
          }
        } catch {
          setShowWarningModal(true);
          setWarningMessage("Erro ao carregar os dados");
        }
      }
    };
    fetchData();
  }, [id, reset]);


  const onSubmit = async (
    data: PostFormValues,
    status: "ACTIVE" | "UNACTIVE",
  ) => {
    setLoadingOffAir(status === "UNACTIVE" ? true : false);
    setLoadingGoLive(status === "ACTIVE" ? true : false);
    setSuccess(false);

    const formData = new FormData();
    formData.append("id", id?.toString() ?? "");
    formData.append("title", data.title);
    if (data.thumbnailUrl) formData.append("thumbnail", data.thumbnailUrl);
    formData.append("content", data.content);
    formData.append("scheduledAt", data.scheduledAt);
    formData.append("createdAt", post?.createdAt ?? "");
    formData.append("updatedAt", post?.updatedAt ?? "");
    formData.append("published", status);
    formData.append("slide", String(data.slide));
    formData.append("highlight", String(data.highlight));
    formData.append("categoryId", data.categoryId);
    formData.append("authorId", String(post?.authorId ?? ""));
    formData.append("action", "editPost");

    try {
      await api.put(`/posts/${id}`, formData);
      setSuccess(true);
      setShowToast(true);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message = err.response?.data.message;
      setShowWarningModal(true);
      setWarningMessage("Erro ao atualizar post");
    } finally {
      setLoadingOffAir(false);
      setLoadingGoLive(false);
      router.push(`/`);
    }
  };

  return {
    data: {
      preview,
      categories,
      showImageModal,
      existingImages,
      imagesInUse,
      loadingOffAir,
      loadingGoLive,
      success,
      showToast,
      showWarningModal,
      warningMessage,
      post,
      formState: {
        errors,
      },
    },
    methods: {
      onSubmit,
      setShowImageModal,
      setPreview,
      setExistingImages,
      setShowWarningModal,
      setShowToast,
      setValue,
      watch,
      reset,
      handleSubmit,
      register,
      setPost
    },
  };
};
