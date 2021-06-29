import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChannelModel } from '../../interfaces/channel.model';

@Component({
  selector: 'app-channel-card',
  templateUrl: './channel-card.component.html',
  styleUrls: ['./channel-card.component.scss'],
})
export class ChannelCardComponent implements OnInit {
  @Input() info: ChannelModel = {};

  constructor(private router: Router) {}

  ngOnInit(): void {
    // console.log(this.info);
  }

  goToChennel(): void {
    this.router.navigate(['/channel-info', this.info.current_tvshow_id]);
  }
}
