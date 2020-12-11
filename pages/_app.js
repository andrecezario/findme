import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../styles/theme';
import { store, persistor } from '../store';

export default function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Provider store={store}>
      <React.Fragment>
        <Head>
          <title>FindMe</title>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
          <link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet"/>
          <link href="https://fonts.googleapis.com/css2?family=Mulish&display=swap" rel="stylesheet"/>
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </React.Fragment>
    </Provider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
