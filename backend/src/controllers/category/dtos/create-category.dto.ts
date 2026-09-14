import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
});

// O "tipo DTO" vem do schema — sem classe separada
export type CreateCategoryDTO = z.infer<typeof createCategorySchema>;
