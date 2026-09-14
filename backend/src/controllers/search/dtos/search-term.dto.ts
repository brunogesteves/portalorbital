import { z } from "zod";

export const searchTermSchema = z.object({
  term: z.string().min(1, "O termo é obrigatório"),
});

export type SearchTermDTO = z.infer<typeof searchTermSchema>;
