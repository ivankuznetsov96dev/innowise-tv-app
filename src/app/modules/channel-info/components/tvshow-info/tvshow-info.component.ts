import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { TvshowsService } from '../../../../services/tvshows.service';

@Component({
  selector: 'app-tvshow-info',
  templateUrl: './tvshow-info.component.html',
  styleUrls: ['./tvshow-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TvshowInfoComponent implements OnInit {
  @Input() tvTitleId!: string;

  @Output() selectedCloseBtn: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private tvserv: TvshowsService) {}

  ngOnInit(): void {}

  public pressedCloseBtn(): void {
    this.selectedCloseBtn.next(false);
  }
}
