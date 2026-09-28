export type PaginationResult<T> = {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type PaginationRequest = {
  page: number;
  limit: number;
};
