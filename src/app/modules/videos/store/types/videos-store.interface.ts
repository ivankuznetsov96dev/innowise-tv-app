import { MoviesCategoryModel } from '../../../../shared/interfaces/movies-category.model';
import { VideoWripperModel } from '../../../../shared/interfaces/video-wripper.model';
import { VideoInfoModel } from '../../../../shared/interfaces/video-info.model';

export interface VideosStoreInterface {
  isLoading: boolean;
  videos_categories: MoviesCategoryModel[];
  videos_category_id: number;
  videos_list: VideoWripperModel | null;
  video_info: VideoInfoModel | null;
}
