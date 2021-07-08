import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TvshowTitleModel } from '../interfaces/tvshow-title.model';
import { TvshowWripperModel } from '../interfaces/tvshow-wripper.model';

@Injectable({
  providedIn: 'root',
})
export class TvshowsService {
  constructor(private http: HttpClient) {}

  public getTvshowTitleInfo(id: string): void {
    this.http
      .get<TvshowWripperModel>(`https://api.persik.by/v2/content/tvshow?id[]=${id}`)
      .pipe(
        map((data) => {
          return data.tvshows[0];
        }),
      )
      .subscribe((value) => console.log(value));
  }

  public getTvshowDeepInfo(): void {}
}
