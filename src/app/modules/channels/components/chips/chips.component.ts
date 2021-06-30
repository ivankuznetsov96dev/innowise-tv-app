import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private location: Location, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {}

  public changeCategory(id: number): void {
    this.router.navigate(['/channels', this.category.id]);
  }
}
