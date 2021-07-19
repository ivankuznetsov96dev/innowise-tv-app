import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { concat, Observable } from 'rxjs';

import * as moment from 'moment';
import { TvshowTitleModel } from '../interfaces/tvshow-title.model';
import { TvshowWripperModel } from '../interfaces/tvshow-wripper.model';
import { VideoWripperModel } from '../interfaces/video-wripper.model';
import { VideoInfoModel } from '../interfaces/video-info.model';
import { MovieCategory, MoviesCategoryModel } from '../interfaces/movies-category.model';
import { DirectorNameAndRole, PersonInfoWrapper } from '../interfaces/person-info.model';

@Injectable({
  providedIn: 'root',
})
export class TvshowsService {
  constructor(private http: HttpClient) {}

  public getTvshowTitleInfo(id: string): Observable<TvshowTitleModel> {
    return this.http
      .get<TvshowWripperModel>(`https://api.persik.by/v2/content/tvshow?id[]=${id}`)
      .pipe(
        map((data) => {
          return data.tvshows[0];
        }),
      );
  }

  public getTvshowDeepInfo(id: string): Observable<VideoInfoModel> {
    return this.http
      .get<VideoWripperModel>(`https://api.persik.by/v2/content/video?id[]=${id}`)
      .pipe(map((data) => data.videos[0]));
  }

  public getTvScreenshot(id: string): string {
    const time = moment().unix();
    const url = `https://old.persik.by/utils/show-frame.php?c=${id}&t=${time}&tr=crop&w=400&h=200`;
    return url;
  }

  public getMoviesCategories(id: number, genres: number[]): Observable<MovieCategory[]> {
    return this.http.get<MoviesCategoryModel[]>('https://api.persik.by/v2/categories/video').pipe(
      map((data) => data.filter((obj) => obj.id === id)[0]),
      map((value: MoviesCategoryModel) => {
        if (genres.length) {
          const count = value.genres.filter((obj) => genres.includes(obj.id));
          return count;
        }
        return [
          {
            id: 0,
            name: value.name,
            name_en: '',
            is_main: false,
          },
        ];
      }),
    );
  }

  public getDirectorInfo(_id: number[], film_id: number): Observable<DirectorNameAndRole[]> {
    const id = _id;
    console.log(id, film_id);
    const queryMap = id.slice(1).map((next) => `&id[]=${next}`);
    queryMap.unshift(`id[]=${id[0]}`);
    return this.http
      .get<PersonInfoWrapper>(`https://api.persik.by/v2/content/person?${queryMap.join('')}`)
      .pipe(
        map((data) => {
          return data.persons.map((person) => {
            const count = person.participant.filter((movie) => movie.movie_id === `${film_id}`);
            return { name: person.name, role: count.map((value) => value.role)[0] };
          });
        }),
      );
  }
}
