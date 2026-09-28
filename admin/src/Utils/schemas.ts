import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "O e-mail é obrigatório")
    .email("Insira um e-mail corporativo válido"),
  password: z
    .string()
    .min(1, "A senha é obrigatória")
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export const postSchema = z.object({
  title: z
    .string()
    .min(1, "O título é obrigatório")
    .max(100, "O título deve ser mais descritivo (max. 100 caracteres)")
    .regex(
      /^[\p{L}\p{N}\s]+$/u,
      "Caracteres especiais (como ?, !, @, etc.) não são permitidos",
    ),
  content: z
    .string()
    .min(1, "O conteúdo da notícia é obrigatório")
    .min(20, "O conteúdo está muito curto"),
  categoryId: z.string().min(1, "Selecione uma categoria"),
  scheduledAt: z.string().min(1, "A data de publicação é obrigatória"),
  thumbnailUrl: z.string().min(1, "Selecione uma imagem de capa"),
  slide: z.boolean(),
  highlight: z.boolean(),
});

// Tipos inferidos dos schemas do Zod
export type LoginFormValues = z.infer<typeof loginSchema>;
export type PostFormValues = z.infer<typeof postSchema>;
