import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { api } from "@/Utils/api";
import { loginSchema } from "@/Utils/schemas";
import { LoginFormValues } from "@/Utils/types";

export default function useLogin() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    setError("");
    try {
      await api.post("/auth/login", data);
      router.push("/");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Credenciais inválidas ou erro de conexão.",
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    data: {
      errors,
      loading,
      error,
    },
    methods: {
      register,
      handleSubmit,
      onSubmit,
    },
  };
}
