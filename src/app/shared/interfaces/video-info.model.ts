import { DirectorNameAndRole } from './person-info.model';

export interface VideoInfoModel {
  tvshow_id?: string;
  channel_id?: number;
  title?: string;
  date?: string;
  start?: number;
  stop?: number;
  video_id: number;
  name: string;
  international_name: string;
  year: string;
  cover: string;
  art: string;
  description: string;
  category_id: number;
  genres: number[];
  countries: string[];
  ratings: {
    imdb: Rating;
    kinopoisk: Rating;
    local: Rating;
  };
  age_rating: string | null;
  director: number[];
  cast: number[];
  duration: number;
  is_series: boolean;
  in_products: {
    product_id: number;
    product_options: {
      option_id: string;
      cost: string;
      currency: string;
      term: string;
    }[];
  }[];
  is_pladform: boolean;
  episodes?: {
    type: string;
    video_id: number;
    season: string;
    episode: string;
  }[];
  personal?: DirectorNameAndRole[];
}

interface Rating {
  system_uid: number | null;
  count: number | null;
  value: number | null;
}
