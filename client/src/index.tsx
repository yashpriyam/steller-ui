import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import "./styles/index.scss"
import "./locales/locale.ts"
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import {apolloClient} from "./graphql/apolloClient/apolloClient";
import store from './redux/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </ApolloProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
