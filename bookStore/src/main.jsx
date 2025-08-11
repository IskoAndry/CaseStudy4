import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
import './index.scss';


const initializeApp = async () => {
  const { setAuthHeader } = await import('./utils/auth');
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (user?.token) {
    setAuthHeader(user.token);
  }

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
};

initializeApp();