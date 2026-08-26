"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";

import { api, imageUrl } from "@/Utils/api";
import { CategoryProps } from "@/Utils/types";
import { PostFormValues, postSchema } from "@/Utils/schemas";

export const useLogicPost = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [preview, setPreview] = useState("");
  const [categories, setCategories] = useState<CategoryProps[]>([]);

  const [showImageModal, setShowImageModal] = useState(false);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
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

      if (id) {
        try {
          const [cats, images, post] = await Promise.all([
            api.get("/categories"),
            api.get("/images"),
            api.get(`/posts/${id}`)
          ])
          setCategories(cats.data);
          setExistingImages(images.data);
          reset({
            title: post.data.title,
            content: post.data.content,
            categoryId: post.data.categoryId.toString(),
            scheduledAt: new Date(post.data.scheduledAt).toISOString().slice(0, 16),
            thumbnailUrl: post.data.thumbnail || "",
            slide: post.data.slide ?? false,
            highlight: post.data.highlight ?? false,
          })

          if (post.data.thumbnail) {
            setPreview(`${imageUrl}/${post.data.thumbnail}`);
          }


        } catch {
          setShowWarningModal(true);
          setWarningMessage("Erro ao carregar os dados");
        }
      }
    }
    fetchData();

  }, [id, reset]);

  const onSubmit = async (data: PostFormValues) => {
    setLoading(true);
    setSuccess(false);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("categoryId", data.categoryId);
    formData.append("scheduledAt", data.scheduledAt);
    if (data.thumbnailUrl) formData.append("thumbnailUrl", data.thumbnailUrl);
    formData.append("slide", String(data.slide));
    formData.append("highlight", String(data.highlight));
    formData.append("action", "editPost");

    try {
      await api.put(`/posts/${id}`, formData);
      setSuccess(true);
      setTimeout(() => router.push("/"), 1500);
    } catch (error) {

      const err = error as AxiosError<{ message: string }>;
      const message = err.response?.data.message
      setShowWarningModal(true);
      setWarningMessage(message ?? "");

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
      loading,
      success,
      showWarningModal,
      warningMessage,
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
      setValue,
      watch,
      reset,
      handleSubmit,
      register,

    },
  };
}
