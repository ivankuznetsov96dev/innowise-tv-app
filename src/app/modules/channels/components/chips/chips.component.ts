import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CategoriesModel } from '../../interfaces/categories.model';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss'],
})
export class ChipsComponent implements OnInit {
  @Input() category: CategoriesModel = {
    id: 0,
    is_main: true,
    name: 'Все каналы',
    name_en: 'Oll channels',
  };

  public chipPicked = false;

  public endStream$: Subject<void> = new Subject<void>();

  constructor(private location: Location, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((ev) => ev instanceof NavigationEnd),
        takeUntil(this.endStream$),
      )
      .subscribe((value) => {
        if (this.route.snapshot.params.channelsCategoryId == this.category.id) {
          this.chipPicked = true;
        } else {
          this.chipPicked = false;
        }
      });
  }

  public changeCategory(): void {
    this.router.navigate(['/channels', this.category.id]);
    // this.location.replaceState(`/channel/${this.category.id}`);
  }
}
