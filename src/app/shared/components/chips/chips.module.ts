import { NgModule } from '@angular/core';

import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { ChipsComponent } from './chips.component';

@NgModule({
  declarations: [ChipsComponent],
  imports: [CommonModule, MatChipsModule],
  exports: [ChipsComponent],
})
export class ChipsModule {}
