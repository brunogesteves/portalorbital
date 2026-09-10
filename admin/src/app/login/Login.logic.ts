import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { api } from "@/Utils/api";
import { LoginFormValues, loginSchema } from "@/Utils/schemas";

import axios from "axios";

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
      email: "admin@portal.com",
      password: "admin123",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    setError("");
    console.log("tentativa");
    try {
      const { data: result } = await api.post("/auth/login", data);

      console.log(result);
      if (result.status) {
        console.log("aqui redireciona");
        document.cookie = `token=${result.token}; path=/; max-age=3600; SameSite=Lax`;
        router.push("/");
      }
    } catch (err: unknown) {
      console.log(err);
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ??
            "Credenciais inválidas ou o de conexão.",
        );
      } else {
        setError("Ocorreu um erro inesperado.");
      }
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
