export interface VideoInfoModel {
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
    imdb: number | null;
    kinopoisk: number | null;
    local: {
      system_uid: number | null;
      count: number | null;
      value: number | null;
    };
  };
  age_rating: number | null;
  director: any[];
  cast: any[];
  duration: number;
  is_series: boolean;
  in_products: any[];
  is_pladform: boolean;
  tvshow_id?: string;
}
