import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import articleListReducer from './redux/store/articleListSlice'
import articleSlice from './redux/store/articleSlice';
import { BrowserRouter } from 'react-router-dom';
//import reducer from './redux/store/articleListSlice'
//import { createStore, applyMiddleware } from 'redux';
//import { reducerArticles } from './redux/redusers/reducerArticles';
//import reduxThunk from 'redux-thunk';


//const store = createStore(reducerArticles, applyMiddleware(reduxThunk));
const store = configureStore({

  reducer: {
    articleList: articleListReducer,
    article: articleSlice}})
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 // <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </Provider>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

