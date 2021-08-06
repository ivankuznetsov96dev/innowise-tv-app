import { MoviesCategoryModel } from '../../../../shared/interfaces/movies-category.model';
import { VideoWripperModel } from '../../../../shared/interfaces/video-wripper.model';

export interface VideosStoreInterface {
  isLoading: boolean;
  videos_categories: MoviesCategoryModel[];
  videos_category_id: number;
  videos_list: VideoWripperModel | null;
}
