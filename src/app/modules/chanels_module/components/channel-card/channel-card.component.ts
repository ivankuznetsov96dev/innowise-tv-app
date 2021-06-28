import {Component, Input, OnInit} from "@angular/core";
import {ChannelModel} from "../../interfaces/channel.model";
import {Router} from "@angular/router";
import {StorageService} from "../../../../services/storage/storage.service";

@Component({
  selector: 'app-channel-card',
  templateUrl: './channel-card.component.html',
  styleUrls: ['./channel-card.component.scss']
})

export class ChannelCardComponent implements OnInit {

  @Input() info: ChannelModel = {};

  constructor(
    private router: Router,
    private storage: StorageService,
  ) {
  }

  ngOnInit(): void {
    // console.log(this.info);
  }

  goToChennel(): void {
    this.storage.channelInfo = this.info;
    this.router.navigate(['/channel-info']);
  }
}
