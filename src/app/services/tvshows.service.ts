import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TvshowTitleModel } from '../interfaces/tvshow-title.model';
import { TvshowWripperModel } from '../interfaces/tvshow-wripper.model';
import { VideoWripperModel } from '../interfaces/video-wripper.model';
import {VideoInfoModel} from "../interfaces/video-info.model";

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
}
