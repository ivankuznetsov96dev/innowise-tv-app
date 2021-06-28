import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {from, Observable} from "rxjs";
import { map, take, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})

export class GetchannelsService {
  constructor(
    private http: HttpClient,
  ) {
  }

  getChannelsData(): Observable<any> {
    return from(
      this.http.get('https://api.persik.by/v2/content/channels')
        .pipe(
          take(1)
        )
    );
  }
}
