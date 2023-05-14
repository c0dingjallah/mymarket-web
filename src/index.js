import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { PostsContextProvider } from './context/postsContext'
import { AccountContextProvider } from './context/AccountContext'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <PostsContextProvider>
     <AccountContextProvider>
    <App />
    </AccountContextProvider>
    </PostsContextProvider>
  </React.StrictMode>
);

