import { z } from "zod";

export const searchSlugSchema = z.object({
  slug: z.string().min(1, "O termo é obrigatório"),
});

export type SearchSlugDTO = z.infer<typeof searchSlugSchema>;
