import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import {LoginFormComponent} from "./components/login-form/login-form.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(private viewportScroller: ViewportScroller, private dialog: MatDialog) {}

  public goToUp(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  public openRegistrModalWindow() {
    this.dialog.open(LoginFormComponent);
  }
}
