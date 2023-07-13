import { IActionResponse, ICatchError, IRootResponse, IStateResponse } from '../interfaces/root.interfaces';

export const actionSuccess = (type: string, res: IRootResponse) => {
  const result: IStateResponse = {
      data: res.data,
      message: res.message,
      success: res.statusCode === 200 ? true : false,
    };
  const action: IActionResponse = {
    type,
    response: result
  }
  return action;
}

export const actionFailure = (type: string, err: ICatchError) => {
  const result: IStateResponse = {
    message: err.message,
    success: false,
  };
  const action: IActionResponse = {
    type,
    response: result
  }
  return action;
}