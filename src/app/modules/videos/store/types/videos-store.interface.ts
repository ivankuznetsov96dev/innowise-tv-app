import { MoviesCategoryModel } from '../../../../shared/interfaces/movies-category.model';

export interface VideosStoreInterface {
  isLoading: boolean;
  videos_categories: MoviesCategoryModel[];
  videos_category_id: number;
}
