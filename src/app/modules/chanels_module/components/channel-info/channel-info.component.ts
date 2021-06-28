import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {ChannelModel} from "../../interfaces/channel.model";
import {StorageService} from "../../../../services/storage/storage.service";
import {FormGroup, FormControl} from '@angular/forms';


@Component({
  selector: 'app-chennel-info',
  templateUrl: './chennel-info.component.html'
})

export class ChannelInfoComponent implements OnInit {

  public channel_info: ChannelModel = {};
  public range: any;

    constructor(
    private router: Router,
    private storage: StorageService,
  ) {}

  ngOnInit(): void {
      this.channel_info = this.storage.channelInfo;


    this.range = new FormGroup({
      start: new FormControl(),
      end: new FormControl()
    });
  }

}
