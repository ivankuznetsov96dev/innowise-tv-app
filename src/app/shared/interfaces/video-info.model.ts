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
    imdb: {
      system_uid: number | null;
      count: number | null;
      value: number | null;
    };
    kinopoisk: {
      system_uid: number | null;
      count: number | null;
      value: number | null;
    };
    local: {
      system_uid: number | null;
      count: number | null;
      value: number | null;
    };
  };
  age_rating: string | null;
  director: number[];
  cast: number[];
  duration: number;
  is_series: boolean;
  in_products: any[];
  is_pladform: boolean;
}
