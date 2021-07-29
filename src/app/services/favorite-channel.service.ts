import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {FavoriteChannelsListInterface} from "../interfaces/favorite-channels-list.interface";

@Injectable({
  providedIn: 'root',
})
export class FavoriteChannelService {
  constructor(private http: HttpClient) {}

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
}
