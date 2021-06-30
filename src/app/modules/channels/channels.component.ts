import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChannelService } from '../../services/channel.service';
import { ChannelModel } from './interfaces/channel.model';
import { CategoriesModel } from './interfaces/categories.model';
// import { ScrollDispatcher } from '@angular/cdk/overlay';

@Component({
  selector: 'app-chanells',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss'],
})
export class ChannelsComponent implements OnInit {
  // public channelList$: Observable<ChannelModel[]>;
  public channelList: ChannelModel[] = [];

  public categoriesList: CategoriesModel[] = [
    { id: 0, is_main: true, name: 'Все каналы', name_en: 'Oll channels' },
  ];

  constructor(private getDataServ: ChannelService) {}

  ngOnInit(): void {
    // this.channelList$ = this.getDataServ.getChannelsData();
    this.getDataServ.getChannelsData().subscribe((value) => {
      this.channelList = value;
    });

    this.getDataServ.getChannelsCategories().subscribe((value) => {
      this.categoriesList.push(...value);
      console.log(this.categoriesList);
    });
  }

  // drop(event: CdkDragDrop<CategoriesModel[]>) {
  //   moveItemInArray(this.categoriesList, event.previousIndex, event.currentIndex);
  // }
}
