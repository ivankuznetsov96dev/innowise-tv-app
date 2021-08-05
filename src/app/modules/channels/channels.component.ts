import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { ChannelService } from '../../shared/services/channel.service';
import { ChannelModel } from '../../shared/interfaces/channel.model';
import { CategoriesModel } from '../../shared/interfaces/categories.model';
import { changeChannelCategoryAction } from '../../store/actions/change-channel-category.action';
import { filteredChannelsList, isChannelsLoadingSelector } from '../../store/selectors';

@Component({
  selector: 'app-chanells',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChannelsComponent implements OnInit {
  public categoriesList$!: Observable<CategoriesModel[]>;

  public isChannelsLoading$!: Observable<boolean>;

  public filteredChannelList$!: Observable<ChannelModel[]>;

  constructor(
    private getDataServ: ChannelService,
    private router: Router,
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef,
    private store: Store,
  ) {
    if (this.router.url === '/channels') {
      this.router.navigate(['channels', 0]);
    }
  }

  ngOnInit(): void {
    this.store.dispatch(
      changeChannelCategoryAction({ id: parseInt(this.route.snapshot.params.channelsCategoryId) }),
    );
    this.filteredChannelList$ = this.store.pipe(select(filteredChannelsList));
    this.isChannelsLoading$ = this.store.pipe(select(isChannelsLoadingSelector));
    this.categoriesList$ = this.getDataServ.getChannelsCategories();
  }

  public changeCategory(event: number): void {
    this.store.dispatch(changeChannelCategoryAction({ id: event }));
    this.router.navigate(['/channels', event]);
  }
}
