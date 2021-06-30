import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';
import { ChannelModel } from '../modules/channels/interfaces/channel.model';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  constructor(private http: HttpClient) {}

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
}
