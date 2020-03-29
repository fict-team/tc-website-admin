import { Provider } from "react-redux";
import App from 'next/app';
import { initializeStore, initialState as _initialState } from '../../core/store';

export default (Component, { ssr = true } = {}) => {
  const WithRedux = ({ initialReduxState, ...props }) => {
    const store = getStore(initialReduxState)
    return (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );
  }

  if (process.env.NODE_ENV !== 'production') {
    const isAppHoc = Component === App || Component.prototype instanceof App;

    if (isAppHoc) {
      throw new Error('The withRedux HOC only works with PageComponents');
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    const displayName = Component.displayName || Component.name || 'Component';

    WithRedux.displayName = `Redux(${displayName})`;
  }

  if (ssr || Component.getInitialProps) {
    WithRedux.getInitialProps = async (context) => {
      const reduxStore = getStore();
      context.reduxStore = reduxStore;

      const pageProps = typeof Component.getInitialProps === 'function' ? await Component.getInitialProps(context) : {};
      return {
        ...pageProps,
        initialReduxState: reduxStore.getState(),
      };
    }
  }

  return WithRedux;
};

let reduxStore;
const getStore = (initialState = _initialState) => {
  if (typeof window === 'undefined') {
    return initializeStore(initialState);
  }

  if (!reduxStore) {
    reduxStore = initializeStore(initialState);
  }

  return reduxStore;
};
