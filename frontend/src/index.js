import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AttendeesContextProvider } from './context/AtendeesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AttendeesContextProvider>
      <App />
    </AttendeesContextProvider>
  </React.StrictMode>
);

