import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { FavoriteChannelsListInterface } from '../interfaces/favorite-channels-list.interface';
import { ChannelService } from './channel.service';
import { ChannelModel } from '../interfaces/channel.model';

@Injectable({
  providedIn: 'root',
})
export class FavoriteChannelService {
  constructor(private http: HttpClient, private channel: ChannelService) {}

  public postFavoriteChannel(id: number): Observable<null> {
    const url = `https://api.persik.by/v2/favorite/channel`;
    const params = new HttpParams().set('id', id);
    return this.http.post<null>(url, {}, { params });
  }

  public deleteFavoriteChannel(id: number): Observable<null> {
    const url = `https://api.persik.by/v2/favorite/channel`;
    const params = new HttpParams().set('id', id);
    return this.http.delete<any>(url, { params });
  }

  public getFavoriteChannels(): Observable<FavoriteChannelsListInterface> {
    const url = `https://api.persik.by/v2/favorite/channels`;
    return this.http.get<FavoriteChannelsListInterface>(url);
  }

  public getFilteredFavoriteChannelsCard(): Observable<ChannelModel[]> {
    return this.getFavoriteChannels().pipe(
      switchMap((data) =>
        this.channel
          .getChannelsData()
          .pipe(
            map((val) =>
              val.filter((el) => data.channels.some((id) => id.channel_id === el.channel_id)),
            ),
          ),
      ),
    );
  }
}
