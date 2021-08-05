import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, switchMap, tap } from 'rxjs/operators';
import { MovieCategory, MoviesCategoryModel } from '../interfaces/movies-category.model';
import { VideoWripperModel } from '../interfaces/video-wripper.model';

@Injectable({
  providedIn: 'root',
})
export class VideosService {
  constructor(private http: HttpClient) {}

  public getVideosCategory(): Observable<MoviesCategoryModel[]> {
    const url = 'https://api.persik.by/v2/categories/video';
    return this.http.get<MoviesCategoryModel[]>(url).pipe(
      map((data: MoviesCategoryModel[]) => {
        const allGenres = data.reduce(
          (acc: MovieCategory[], category: MoviesCategoryModel) => [...acc, ...category.genres],
          [],
        );
        const zeroCount: MoviesCategoryModel = {
          id: 0,
          name: 'Все видео',
          name_en: 'All videos',
          genres: allGenres,
        };
        return [...data, zeroCount];
      }),
    );
  }

  public getVideosContent(category_id: number, offset: number = 0): Observable<VideoWripperModel> {
    const url = 'https://api.persik.by/v2/content/videos';
    const params = new HttpParams()
      .set('category_id', category_id)
      .set('offset', offset)
      .set('detail', 1);
    return this.http.get<VideoWripperModel>(url, { params });
  }
}
