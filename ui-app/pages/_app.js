import 'semantic-ui-css/semantic.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'
import {SSRProvider} from "react-bootstrap";
import {wrapper} from "../store/store";
import React from 'react'
import withReduxSaga from 'next-redux-saga'

class MyApp extends React.Component {
  render() {
    const {Component, pageProps} = this.props;
    return (
      <SSRProvider>
        <Component {...pageProps} />
      </SSRProvider>
    )
  }
}

export default wrapper.withRedux(MyApp);

