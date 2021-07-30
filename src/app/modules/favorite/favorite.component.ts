import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ChannelService } from '../../shared/services/channel.service';
import { FavoriteChannelService } from '../../shared/services/favorite-channel.service';
import { favoriteChannelsListSelector } from '../../store/selectors';
import { ChannelModel } from '../../shared/interfaces/channel.model';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent implements OnInit {
  public favoriteChannels$!: Observable<FavoriteChannelService>;

  public channelList$!: Observable<ChannelModel[]>;
  // public channelList!: ChannelModel[];

  constructor(private store: Store, private favorite: FavoriteChannelService) {}

  ngOnInit(): void {
    this.channelList$ = this.favorite.getFilteredFavoriteChannelsCard();
    // this.channelList$ = this.channel.getChannelsData();
    // @ts-ignore
    // this.favoriteChannels$ = this.store.pipe(select(favoriteChannelsListSelector));

    // this.channel.getChannelsData().subscribe((value) => {
    //   this.channelList
    // })
  }
}
