import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FavoriteComponent } from './favorite.component';
import { ChannelCardModule } from '../../shared/components/channel-card/channel-card.module';

@NgModule({
  declarations: [FavoriteComponent],
  imports: [CommonModule, ChannelCardModule, MatProgressSpinnerModule],
})
export class FavoriteModule {}
