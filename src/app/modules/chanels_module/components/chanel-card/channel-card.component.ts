import {Component, Input, OnInit} from "@angular/core";
import {ChannelModel} from "../../interfaces/channel.model";

@Component({
  selector: 'app-channel-card',
  templateUrl: './channel-card.component.html',
  styleUrls: ['./channel-card.component.scss']
})

export class ChannelCardComponent implements OnInit {

  @Input() info: ChannelModel = {};

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.info);
  }

}
