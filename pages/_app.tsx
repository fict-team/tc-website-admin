import i18n from '../middlewares/i18n';
import _App from 'next/app';

const App = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

App.getInitialProps = async (appContext) => {
  const appProps = await _App.getInitialProps(appContext);
  return { ...appProps };
}

export default i18n.appWithTranslation(App);
