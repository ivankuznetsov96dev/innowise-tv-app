import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { ChannelService } from '../../shared/services/channel.service';
import { ChannelModel } from '../../shared/interfaces/channel.model';
import {CategoriesModel} from "../../shared/interfaces/categories.model";

@Component({
  selector: 'app-chanells',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChannelsComponent implements OnInit, OnDestroy {
  public channelList$!: Observable<ChannelModel[]>;

  public channelList!: ChannelModel[];

  public channelsCategoryId!: number;

  public filtredChannelList!: ChannelModel[] | null;

  // public categoriesList$!: Observable<ChannelModel[]>;
  public categoriesList$!: Observable<CategoriesModel[]>;

  private endStream$: Subject<void> = new Subject<void>();

  constructor(
    private getDataServ: ChannelService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {
    if (this.router.url === '/channels') {
      this.router.navigate(['channels', 0]);
    }
  }

  ngOnInit(): void {
    this.categoriesList$ = this.getDataServ.getChannelsCategories();
    console.log(this.route.snapshot.params);
    this.channelList$ = this.getDataServ.getChannelsData();
    this.getDataServ.getChannelsData().subscribe((value) => {
      this.channelList = value;
      this.checkedCategoryAndStartSort();
      this.urlListener();
    });
  }

  public urlListener(): void {
    this.route.params.pipe(takeUntil(this.endStream$)).subscribe((value) => {
      this.channelsCategoryId = parseInt(value.channelsCategoryId);
      this.checkedCategoryAndStartSort();
    });
  }

  public checkedCategoryAndStartSort(): void {
    if (this.channelsCategoryId === 0) {
      this.filtredChannelList = this.channelList;
      this.cdr.detectChanges();
    } else {
      this.channelSort();
    }
  }

  public channelSort(): void {
    this.filtredChannelList = this.channelList.filter((element) =>
      element.genres?.some((id) => this.channelsCategoryId === id),
    );

    if (this.filtredChannelList.length === 0) {
      this.filtredChannelList = null;
    }
    this.cdr.detectChanges();
  }

  public changeCategory(event: number): void {
    // console.log('Category ID: ', event);
    this.router.navigate(['/channels', event]);
  }

  ngOnDestroy(): void {
    this.endStream$.next();
  }
}
