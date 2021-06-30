import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, Subject } from 'rxjs';
import { filter, map, take, takeUntil, tap } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { ChannelModel } from '../modules/channels/interfaces/channel.model';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  constructor(private http: HttpClient, private router: Router) {}

  getChannelsData(): Observable<Array<ChannelModel>> {
    return this.http.get<{ channels: Array<{}> }>('https://api.persik.by/v2/content/channels').pipe(
      map((data) => {
        return data.channels;
      }),
    );
  }

  getChannel(id: string): Observable<{}[]> {
    return this.http.get<{ channels: Array<{}> }>('https://api.persik.by/v2/content/channels').pipe(
      map((data) => {
        return data.channels.filter((obj: ChannelModel) => obj.current_tvshow_id === id);
      }),
    );
  }

  getChannelsCategories(): Observable<any> {
    return this.http.get('https://api.persik.by/v2/categories/channel');
  }

  getNvigationEndObs(endStream: Subject<void>): Observable<{}> {
    return this.router.events.pipe(
      filter((ev) => ev instanceof NavigationEnd),
      takeUntil(endStream),
    );
  }
}
