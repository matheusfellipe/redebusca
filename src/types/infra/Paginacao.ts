export interface PaginationResponse<T> {
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  pageable: Pageable;
  size: number;
  content: T[];
  number: number;
  sort: Sort;
  empty: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  unpaged: boolean;
  paged: boolean;
}

export interface Sort {
  unsorted: boolean;
  sorted: boolean;
  empty: boolean;
}