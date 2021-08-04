import { CategoriesModel } from './categories.model';

export interface MoviesCategoryModel {
  id: number;
  name: string;
  name_en: string;
  genres: MovieCategory[] | CategoriesModel[];
}

export interface MovieCategory {
  id: number;
  name: string;
  name_en: string;
  is_main: boolean;
}
