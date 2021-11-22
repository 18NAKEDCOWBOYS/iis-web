import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './App';
import { UserProvider } from './userContext';
import {HashRouter} from "react-router-dom"
ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

