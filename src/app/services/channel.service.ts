import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, of, Subject } from 'rxjs';
import {
  concat,
  concatMap,
  delay,
  filter,
  map,
  switchMap,
  take,
  takeUntil,
  tap,
  zip,
} from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
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

  public getChannel(id: string): Observable<{}[]> {
    return this.http
      .get<{ channels: ChannelModel[] }>('https://api.persik.by/v2/content/channels')
      .pipe(
        map((data) => {
          return data.channels.filter((obj: ChannelModel) => obj.current_tvshow_id === id);
        }),
      );
  }

  public getChannelsCategories(): Observable<CategoriesModel[]> {
    return this.http
      .get('https://api.persik.by/v2/categories/channel')
      .pipe(switchMap((data) => [this.modifyCategoryArray(data)]));
  }

  private modifyCategoryArray(data: any) {
    data.unshift({ id: 0, is_main: true, name: 'Все каналы', name_en: 'All channels' });
    return data;
  }

  // getNvigationEndObs(endStream: Subject<void>): Observable<{}> {
  //   return this.router.events.pipe(
  //     filter((ev) => ev instanceof NavigationEnd),
  //     takeUntil(endStream),
  //   );
  // }
}
