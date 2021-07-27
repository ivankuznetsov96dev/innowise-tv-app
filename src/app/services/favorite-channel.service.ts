import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FavoriteChannelService {
  constructor(private http: HttpClient) {}

  public postFavoriteChannel(id: number): void {
    const url = `https://api.persik.by/v2/favorite/channel`;
    const params = new HttpParams().set('id', id);
    this.http.post(url, {}, { params }).subscribe();
  }

  public deleteFavoriteChannel(id: number): void {
    const url = `https://api.persik.by/v2/favorite/channel`;
    const params = new HttpParams().set('id', id);
    this.http.delete(url, { params }).subscribe();
  }
}
