import IState from "../core/store";
import { decodeToken } from "../core/api";

export default (state: IState, { logout, accessToken, refreshToken }) => {
  if (logout) {
    return {
      ...state,
      user: null,
      accessToken: null,
      refreshToken: null,
    };
  }
  
  return {
    ...state,
    user: decodeToken(accessToken),
    accessToken,
    refreshToken,
  };
};
