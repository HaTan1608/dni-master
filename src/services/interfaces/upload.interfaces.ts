import { IRootState } from "./root.interfaces";

export interface IUploadState {
  stateUploadImagesProduct: IRootState;
  stateUploadMetaImageProduct: IRootState;
  stateUploadThumbnailImageProduct: IRootState;
  stateUploadMetaImageCategory: IRootState;
  stateUploadIconCategory: IRootState;
  stateUploadFilesCDN: IRootState;
}
