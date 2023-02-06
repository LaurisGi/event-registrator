import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AttendeesContextProvider } from './context/AtendeesContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <AttendeesContextProvider>
        <App />
      </AttendeesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

