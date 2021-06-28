import {Component, OnInit} from "@angular/core";
import {GetChannelsService} from "../../../../services/get-channels.service";
import {ChannelModel} from "../../interfaces/channel.model";


@Component({
  selector: 'app-chanells',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})

export class ChannelsComponent implements OnInit {

  public test: ChannelModel[] = [];

  constructor(
    private getDataServ: GetChannelsService,
  ) {}

  ngOnInit(): void {
    this.getDataServ.getChannelsData().subscribe(value => {
        const count = value
        this.test = count["channels"];
    })
  }
}
