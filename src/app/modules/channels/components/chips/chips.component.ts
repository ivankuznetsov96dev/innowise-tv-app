import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CategoriesModel } from '../../interfaces/categories.model';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss'],
})
export class ChipsComponent implements OnInit {
  @Input() category!: CategoriesModel;

  @Output() selectedCategory: EventEmitter<number> = new EventEmitter<number>();

  public colorFlag!: boolean;

  constructor(private location: Location, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.colorFlag = this.selectedTag();
  }

  public changeCategory(): void {
    this.selectedCategory.emit(this.category.id);
  }

  public selectedTag(): boolean {
    return this.route.snapshot.params.channelsCategoryId == this.category.id;
  }
}