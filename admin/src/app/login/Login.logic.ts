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
    let routerStatus = null;
    try {
      const { data: result } = await api.post("auth/login", data);

      console.log(result);
      if (result.status) {
        routerStatus = result.status;
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
      if (routerStatus) {
        router.push("/");
      }
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
