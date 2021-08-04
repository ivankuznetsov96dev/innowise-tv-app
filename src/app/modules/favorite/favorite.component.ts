import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FavoriteChannelService } from '../../shared/services/favorite-channel.service';
import { ChannelModel } from '../../shared/interfaces/channel.model';
import { filteredFavoriteChannelsList, isLoadingSelector } from '../../store/selectors';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteComponent implements OnInit {
  public channelList!: ChannelModel[];

  public isDataLoading = true;

  public isDataEmpty = false;

  constructor(
    private store: Store,
    private favorite: FavoriteChannelService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.store.pipe(select(filteredFavoriteChannelsList)).subscribe((value) => {
      this.isDataEmpty = !value.length;
      this.isDataLoading = !value.length;
      this.channelList = value;
      this.cd.detectChanges();
    });
  }
}
