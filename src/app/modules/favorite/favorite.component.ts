import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FavoriteChannelService } from '../../shared/services/favorite-channel.service';
import { ChannelModel } from '../../shared/interfaces/channel.model';
import { ChannelService } from '../../shared/services/channel.service';

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
    this.favorite.getFilteredFavoriteChannelsCard().subscribe((value) => {
      this.channelList = value;
      this.isDataLoading = false;
      this.isDataEmpty = !value.length;
      this.cd.detectChanges();
    });
  }
}
