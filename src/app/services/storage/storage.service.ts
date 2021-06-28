import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {ChannelsModule} from "../../modules/channels.module";
import {ChannelModel} from "../../modules/chanels_module/interfaces/channel.model";


@Injectable({
  providedIn: 'root'
})

export class StorageService {
  // public channelInfo$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private _channelInfo: ChannelModel = {};

  public set channelInfo(_channelInfo: ChannelModel) {
    this._channelInfo = _channelInfo;
    // this.channelInfo$.next(_channelInfo);
  }

  public get channelInfo(): any {
    return this._channelInfo;
  }
}
