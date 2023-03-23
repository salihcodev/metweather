import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './common/style/index.sass';

import { BrowserRouter as Router } from 'react-router-dom';
import AppProvider from './common/context/app-context';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      <Router>
        <App />
      </Router>
    </AppProvider>
  </React.StrictMode>
);
