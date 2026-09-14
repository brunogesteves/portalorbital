import { z } from "zod";

export const deleteCategorySchema = z.object({
  id: z.number(),
});

export type DeleteCategoryDTO = z.infer<typeof deleteCategorySchema>;
