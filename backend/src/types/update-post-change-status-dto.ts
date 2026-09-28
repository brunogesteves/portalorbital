import { PostPublished } from "@prisma/client";
import { PostField } from "../entities/post/types/post-field";

export interface UpdatePostChangeStatusDTO {
  id: number;
  field: PostField;
  status: boolean;
}
