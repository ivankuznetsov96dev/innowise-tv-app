import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { ChannelsModule } from './modules/channels/channels.module';
import { ChannelInfoModule } from './modules/channel-info/channel-info.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AuthInterceptor } from './services/auth-interceptor.service';
import { environment } from '../environments/environment';
import { reducers } from './store/reducers';
import { FavoriteChannelsListEffect } from './store/effects/favorite-channels-list.effect';
import { AddFavoriteChannelEffect } from './store/effects/add-favorite-channel.effect';
import { DeleteFavoriteChannelEffect } from './store/effects/delete-favorite-channel.effect';

@NgModule({
  declarations: [AppComponent, LoginFormComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChannelsModule,
    ChannelInfoModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    RxReactiveFormsModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('store', reducers),
    EffectsModule.forRoot([
      FavoriteChannelsListEffect,
      AddFavoriteChannelEffect,
      DeleteFavoriteChannelEffect,
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
