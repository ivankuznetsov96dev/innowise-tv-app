import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CategoriesModel } from '../../interfaces/categories.model';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipsComponent implements OnInit {
  @Input() category!: CategoriesModel;

  @Output() categotyId: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {}

  public changeCategory(): void {
    this.categotyId.emit(this.category.id);
  }

  public selectedTag(): boolean {
    return this.route.snapshot.params.channelsCategoryId == this.category.id;
  }
}
