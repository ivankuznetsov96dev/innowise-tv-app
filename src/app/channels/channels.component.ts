import {Component, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {GetchannelsService} from "../services/getchannels.service";
import {ChannelModel} from "../interfaces/channel.model";


@Component({
  selector: 'app-chanells',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})

export class ChannelsComponent implements OnInit {

  public test: ChannelModel[] = [];

  constructor(
    private http: GetchannelsService,
  ) {}

  ngOnInit(): void {
    this.http.getChannelsData().subscribe(value => {
        const count = value
        this.test = count["channels"];
    })
  }
}
