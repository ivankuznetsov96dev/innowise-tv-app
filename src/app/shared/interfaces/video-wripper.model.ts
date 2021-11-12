import { VideoInfoModel } from './video-info.model';

export interface VideoWripperModel {
  total?: number;
  videos: VideoInfoModel[];
}
