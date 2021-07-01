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
import { ChannelService } from '../../services/channel.service';
import { ChannelModel } from './interfaces/channel.model';

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

  public categoriesList$!: Observable<ChannelModel[]>;

  private endStream$: Subject<void> = new Subject<void>();

  constructor(
    private getDataServ: ChannelService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.categoriesList$ = this.getDataServ.getChannelsCategories();

    this.channelList$ = this.getDataServ.getChannelsData();
    this.getDataServ.getChannelsData().subscribe((value) => {
      this.channelList = value;
      this.channelSort();
      this.urlListener();
    });
  }

  public urlListener(): void {
    this.route.params.pipe(takeUntil(this.endStream$)).subscribe((value) => {
      this.channelsCategoryId = parseInt(value.channelsCategoryId);
      this.channelSort();
    });
  }

  public channelSort(): void {
    if (this.channelsCategoryId === 0) {
      this.filtredChannelList = this.channelList;
      this.cdr.detectChanges();
      return;
    }
    this.filtredChannelList = this.channelList.filter((element) =>
      element.genres?.some((id) => this.channelsCategoryId === id),
    );

    if (this.filtredChannelList.length === 0) {
      this.filtredChannelList = null;
    }
    this.cdr.detectChanges();
  }

  public getCategotyId(event: number): void {
    console.log('Category ID: ', event);
    this.router.navigate(['/channels', event]);
  }

  ngOnDestroy(): void {
    this.endStream$.next();
  }
}
