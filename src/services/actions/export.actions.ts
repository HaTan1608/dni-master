import { IAction } from '../interfaces/root.interfaces';
import exportTypes from './types/export.types';

export const getExportTemplate = (params?: any): IAction => {
  const action: IAction = {
    type: exportTypes.START_EXPORT_TEMPLATE,
    payload: { params },
  }
  return action;
}
export const getLinkDownload = (params?: any): IAction => {
  const action: IAction = {
    type: exportTypes.START_LINK_DOWNLOAD,
    payload: { params },
  }
  return action;
}