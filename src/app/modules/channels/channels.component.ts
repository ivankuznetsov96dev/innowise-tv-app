import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Location } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { ChannelService } from '../../services/channel.service';
import { ChannelModel } from './interfaces/channel.model';
import { CategoriesModel } from './interfaces/categories.model';
// import { ScrollDispatcher } from '@angular/cdk/overlay';

@Component({
  selector: 'app-chanells',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss'],
})
export class ChannelsComponent implements OnInit, OnDestroy {
  // public channelList$: Observable<ChannelModel[]>;
  public channelList: ChannelModel[] = [];

  public filtredChannelList: ChannelModel[] = [];

  public categoriesList: CategoriesModel[] = [
    { id: 0, is_main: true, name: 'Все каналы', name_en: 'Oll channels' },
  ];

  private endStream$: Subject<void> = new Subject<void>();

  // public checkedChip: number | string;

  constructor(
    private getDataServ: ChannelService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // this.channelList$ = this.getDataServ.getChannelsData();

    // this.router.events
    //   .pipe(
    //     filter((ev) => ev instanceof NavigationEnd),
    //     takeUntil(this.endStream$),
    //   )
    //   .subscribe((value) => {
    //     this.channelSort();
    //   });
    this.getDataServ.getNvigationEndObs(this.endStream$).subscribe((value) => {
      this.channelSort();
    });

    this.getDataServ.getChannelsCategories().subscribe((value) => {
      this.categoriesList.push(...value);
      console.log(this.categoriesList);
    });

    this.getDataServ.getChannelsData().subscribe((value) => {
      this.channelList = value;
      this.channelSort();
    });
  }

  public channelSort(): void {
    const channelsCategoryId = this.route.snapshot.params.channelsCategoryId - 0;
    if (channelsCategoryId === 0) {
      this.filtredChannelList = this.channelList;
      return;
    }
    this.filtredChannelList = this.channelList.filter((element) =>
      element.genres?.some((id) => channelsCategoryId === id),
    );
    console.log(this.filtredChannelList);
  }

  // public trackFunction(index, item): string {
  //   return item.id;
  // }

  ngOnDestroy(): void {
    this.endStream$.next();
  }
}
