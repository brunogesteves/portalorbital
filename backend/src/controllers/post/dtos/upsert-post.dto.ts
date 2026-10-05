import { z } from "zod";

const boolFromForm = z
  .enum(["true", "false"])
  .default("false")
  .transform((value) => value === "true");

export const upsertPostSchema = z.object({
  id: z.coerce.number().optional(),

  title: z
    .string()
    .min(1, "O título é obrigatório")
    .max(100, "O título deve ser mais descritivo (max. 100 caracteres)")
    .regex(/^[\p{L}\p{N}\s]+$/u, "Caracteres especiais (como ?, !, @, etc.) não são permitidos"),

  content: z.string().min(20, "O conteúdo está muito curto"),

  categoryId: z.string().min(1, "Selecione uma categoria"),
  scheduledAt: z.string().min(1, "A data de publicação é obrigatória"),

  thumbnail: z.string().optional().default(""),

  slide: boolFromForm,
  highlight: boolFromForm,

  published: z.string().optional(),
  authorId: z.coerce.number().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),

  action: z.enum(["createPost", "editPost"], { message: "A ação é obrigatória" }),
});

export type UpsertPostDTO = z.infer<typeof upsertPostSchema>;
