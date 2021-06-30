import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelsComponent } from './modules/channels/channels.component';
import { ChannelInfoComponent } from './modules/channelInfo/channel-info.component';

const routes: Routes = [
  { path: '', redirectTo: '/channels/0', pathMatch: 'full' },
  { path: 'channels', redirectTo: '/channels/0', pathMatch: 'full' },
  { path: 'channels/:channelsCategoryId', component: ChannelsComponent },
  { path: 'channel-info/:channelId', component: ChannelInfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
