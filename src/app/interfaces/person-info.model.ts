export interface PersonInfoModel {
  person_id: number;
  name: string;
  international_name: string;
  info: string;
  photo: string;
  participant: PersonMovieInfo[];
}

export interface PersonMovieInfo {
  movie_id: string;
  movie_name: string;
  movie_year: string;
  movie_covers: string;
  role: string;
  genres: string;
}

export interface PersonInfoWrapper {
  persons: PersonInfoModel[];
}
