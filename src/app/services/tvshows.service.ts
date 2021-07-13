import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { TvshowTitleModel } from '../interfaces/tvshow-title.model';
import { TvshowWripperModel } from '../interfaces/tvshow-wripper.model';
import { VideoWripperModel } from '../interfaces/video-wripper.model';
import { VideoInfoModel } from '../interfaces/video-info.model';

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

  // add "cross-domain CORS" chrome plagin
  public getTvScreenshot(id: string): string {
    const time = moment().unix();
    // const countTime =
    //   moment.unix(time) < moment.unix(unixStopFilm)
    //     ? moment.unix(time)
    //     : moment.unix(unixStartFilm);
    // console.log(moment(countTime).toDate());
    const url = `https://old.persik.by/utils/show-frame.php?c=${id}&t=${time}&tr=crop&w=400&h=200`;
    return url;
  }
}
