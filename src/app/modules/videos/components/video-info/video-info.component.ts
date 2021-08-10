import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { VideoInfoModel } from '../../../../shared/interfaces/video-info.model';
import {videoInfoSelector, videoStoreIsLoading} from '../../store/selectors';
import { LoginFormComponent } from '../../../../shared/components/login-form/login-form.component';
import {isLoggedInSelector} from "../../../../store/selectors";

@Component({
  selector: 'app-video-info',
  templateUrl: './video-info.component.html',
  styleUrls: ['./video-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoInfoComponent implements OnInit, OnDestroy {
  public videoInfo$!: Observable<VideoInfoModel | null>;

  public isLoading$!: Observable<boolean>;

  public isLoggedIn$!: Observable<boolean>;

  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.initializeValue();
  }

  public initializeValue(): void {
    this.videoInfo$ = this.store.pipe(select(videoInfoSelector));
    this.isLoading$ = this.store.pipe(select(videoStoreIsLoading));
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
  }

  public openLoginForm(): void {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(LoginFormComponent);
  }

  ngOnDestroy(): void {}
}
