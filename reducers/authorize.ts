import IState from "../core/store";
import { decodeToken } from "../core/api";

export default (state: IState, { accessToken, refreshToken }) => {
  return {
    ...state,
    user: decodeToken(accessToken),
    accessToken,
    refreshToken,
  };
};
