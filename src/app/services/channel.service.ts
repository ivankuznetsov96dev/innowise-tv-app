import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChannelModel } from '../modules/channels/interfaces/channel.model';
import { CategoriesModel } from '../modules/channels/interfaces/categories.model';

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

  public getChannelInfo(): Observable<ChannelModel> {
    return this.http
      .get<{ channels: Array<{}> }>('https://api.persik.by/v2/content/channel?id[]=383')
      .pipe(
        map((data) => {
          return data.channels[0];
        }),
      );
  }

  // public getChannel(id: string): Observable<{}[]> {
  //   return this.http
  //     .get<{ channels: ChannelModel[] }>('https://api.persik.by/v2/content/channels')
  //     .pipe(
  //       map((data) => {
  //         return data.channels.filter((obj: ChannelModel) => obj.current_tvshow_id === id);
  //       }),
  //     );
  // }

  public getChannelsCategories(): Observable<CategoriesModel[]> {
    // return this.http
    //   .get('https://api.persik.by/v2/categories/channel')
    //   .pipe(switchMap((data) => [this.modifyCategoryArray(data)]));
    const allGenresCategory = { id: 0, is_main: true, name: 'Все каналы', name_en: 'All channels' };
    return this.http
      .get('https://api.persik.by/v2/categories/channel')
      .pipe(map((data: any) => [allGenresCategory, ...data]));
  }

  // private modifyCategoryArray(data: any) {
  //   data.unshift({ id: 0, is_main: true, name: 'Все каналы', name_en: 'All channels' });
  //   return data;
  // }

  // getNvigationEndObs(endStream: Subject<void>): Observable<{}> {
  //   return this.router.events.pipe(
  //     filter((ev) => ev instanceof NavigationEnd),
  //     takeUntil(endStream),
  //   );
  // }
}
