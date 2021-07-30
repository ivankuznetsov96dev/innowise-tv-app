import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelsComponent } from './modules/channels/channels.component';
import { ChannelInfoComponent } from './modules/channel-info/channel-info.component';
import { AuthGuardService } from './shared/services/auth.guard.service';
import {FavoriteComponent} from "./modules/favorite/favorite.component";

const routes: Routes = [
  { path: '', redirectTo: 'channels', pathMatch: 'full' },
  { path: 'channels', component: ChannelsComponent },
  { path: 'channels/:channelsCategoryId', component: ChannelsComponent },
  {
    path: 'channel-info/:channelId',
    component: ChannelInfoComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'favorite',
    component: FavoriteComponent,
    canActivate: [AuthGuardService],
  },
  // {
  //   path: 'channel-info/:channelId',
  //   loadChildren: () =>
  //     import('./modules/channel-info/channel-info.module').then((mod) => mod.ChannelInfoModule),
  //   component: ChannelInfoComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
