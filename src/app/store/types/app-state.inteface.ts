import { StoreStateInterface } from './store-state.interface';
import { VideosStoreInterface } from '../../modules/videos/store/types/videos-store.interface';

export interface AppStateInterface {
  store: StoreStateInterface;
  videos: VideosStoreInterface;
}
