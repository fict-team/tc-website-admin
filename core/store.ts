import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import { IUser } from './authorization';
import reducers from '../reducers';

export default interface IState {
  user?: IUser;
  accessToken?: string;
  refreshToken?: string;
};

export const initialState: IState = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

const reducer = (state = initialState, action) => {
  const reduce = reducers[action.type];
  return reduce ? reduce(state, action) : state;
};

export const initializeStore = (preloadedState = initialState) => {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware()),
  );
};
