import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "@/Utils/api";
import { CategoryProps } from "@/Utils/types";
import { PostFormValues, postSchema } from "@/Utils/schemas";
import { useState, useEffect } from "react";

export const useNewPost = () => {
  const router = useRouter();
  const params = useParams();
  const isEdit = !!params.id;

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
    },
  });

  useEffect(() => {
    api.get("/categories").then((res) => setCategories(res.data));
    api.get("/posts/images").then((res) => setExistingImages(res.data));
  }, []);

  const contentValue = watch("content");
  const thumbnailUrlValue = watch("thumbnailUrl");

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

    try {
      await api.post("/posts/createpost", formData);
      setSuccess(true);
      setTimeout(() => router.push("/"), 1500);
    } catch (error: any) {
      const message = error.response?.data?.message;
      setWarningMessage(message);
      setShowWarningModal(true);
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
      contentValue,
      thumbnailUrlValue,
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
      setShowWarningModal,
      setWarningMessage,
      onSubmit,
    },
  };
};
