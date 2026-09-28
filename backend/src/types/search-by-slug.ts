export type SearchBySlugResult<T> = {
  item: string;
  content: T[] | T | null;
};
