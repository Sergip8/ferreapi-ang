export class SearchParameters {
  search?: string;
  sort?: string;
  order?: 'asc' | 'desc';
  page: number = 1;
  size: number = 10;
} 