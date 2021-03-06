import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CategoriesModel } from '../../interfaces/categories.model';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss'],
})
export class ChipsComponent implements OnInit, DoCheck {
  @Input() category!: CategoriesModel;

  @Output() selectedCategory: EventEmitter<number> = new EventEmitter<number>();

  public colorFlag!: boolean;

  constructor(private location: Location, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  public changeCategory(): void {
    this.selectedCategory.next(this.category.id);
  }

  public selectedTag(id: string): boolean {
    return parseInt(id, 10) === this.category.id;
  }

  ngDoCheck(): void {
    const count = this.route.snapshot.params.channelsCategoryId || this.route.snapshot.params.genre;
    this.colorFlag = this.selectedTag(count);
  }
}
