import globalTypes from "./types/global.types";
import { IAction } from "../interfaces/root.interfaces";

// export const changeTheme = (theme: IThemeName) => ({
//   type: globalTypes.CHANGE_THEME,
//   payload: theme,
// });

export const otherAction = (params: any): IAction => ({
  type: globalTypes.CHANGE_THEME,
  payload: { params },
});

export const putSignIn = (data: any): IAction => ({
  type: globalTypes.START_PUT_SIGN_IN_APP,
  payload: { data },
});

