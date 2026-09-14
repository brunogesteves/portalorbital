import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
});

export type CreateCategoryDTO = z.infer<typeof createCategorySchema>;
