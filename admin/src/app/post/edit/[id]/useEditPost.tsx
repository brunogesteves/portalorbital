"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { api, imageUrl } from "@/Utils/api";
import { CategoryProps } from "@/Utils/types";
import { PostFormValues, postSchema } from "@/Utils/schemas";

export const useEditPost = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [preview, setPreview] = useState("");
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [showImageModal, setShowImageModal] = useState(false);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showModalMessage, setShowModalMessage] = useState(false);
  const [modalWarning, setModalWarning] = useState("");

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

  // const contentValue = watch("content");

  useEffect(() => {
    // Carregar categorias e imagens da biblioteca
    api.get("/categories").then((res) => setCategories(res.data));
    api.get("/posts/images").then((res) => setExistingImages(res.data));

    // Carregar dados do post para edição
    if (id) {
      api
        .get(`/posts/${id}`)
        .then((res) => {
          const post = res.data;
          reset({
            title: post.title,
            content: post.content,
            categoryId: post.categoryId.toString(),
            scheduledAt: new Date(post.scheduledAt).toISOString().slice(0, 16),
            thumbnailUrl: post.thumbnail || "",
            slide: post.slide ?? false,
            highlight: post.highlight ?? false,
          });

          if (post.thumbnail) {
            setPreview(`${imageUrl}/${post.thumbnail}`);
          }
        })
        .catch(() => {
          setShowModalMessage(true);
          setModalWarning("Erro ao carregar os dados da notícia.");
        });
    }
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

    try {
      await api.put(`/posts/${id}`, formData);
      setSuccess(true);
      setTimeout(() => router.push("/"), 1500);
    } catch {
      setShowModalMessage(true);
      setModalWarning("Erro ao salvar as alterações. Verifique os campos.");
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
      modalWarning,
      showModalMessage,
      formState: {
        errors,
      },
    },
    methods: {
      onSubmit,
      setShowImageModal,
      setPreview,
      setExistingImages,
      setShowModalMessage,
      setValue,
      watch,
      reset,
      handleSubmit,
      register,

    },
  };
}
