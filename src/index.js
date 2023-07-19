import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import M from 'materialize-css'
import 'materialize-css/dist/css/materialize.min.css'
import { Provider } from 'react-redux';
import likeReducer from './components/favourite/handleFavourite'
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    favourite: likeReducer,
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <BrowserRouter>
    
   <Provider store={store}>
    <App />
    </Provider>
    
    </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();
