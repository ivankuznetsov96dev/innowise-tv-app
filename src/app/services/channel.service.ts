import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChannelModel } from '../modules/channels/interfaces/channel.model';
import { CategoriesModel } from '../modules/channels/interfaces/categories.model';
import {TvshowModel} from "../modules/channels/interfaces/tvshow.model";

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  constructor(private http: HttpClient) {}

  public getChannelsData(): Observable<Array<ChannelModel>> {
    return this.http.get<{ channels: Array<{}> }>('https://api.persik.by/v2/content/channels').pipe(
      map((data) => {
        return data.channels;
      }),
    );
  }

  public getChannelInfo(id: number): Observable<ChannelModel> {
    return this.http
      .get<{ channels: Array<{}> }>(`https://api.persik.by/v2/content/channel?id[]=${id}`)
      .pipe(
        map((data) => {
          return data.channels[0];
        }),
      );
  }

  public getChannelsCategories(): Observable<CategoriesModel[]> {
    const allGenresCategory = { id: 0, is_main: true, name: 'Все каналы', name_en: 'All channels' };
    return this.http
      .get('https://api.persik.by/v2/categories/channel')
      .pipe(map((data: any) => [allGenresCategory, ...data]));
  }

  public getTvShows(channelId: number, date_start: string, date_end: string): Observable<TvshowModel[]> {
    return this.http
      .get<{tvshows: {items: TvshowModel[]}}>(
        `https://api.persik.by/v2/epg/tvshows?channels[]=${channelId}&from=${date_start}&to=${date_end}`,
      )
      .pipe(
        map((data) => data.tvshows.items)
      );
  }
}
