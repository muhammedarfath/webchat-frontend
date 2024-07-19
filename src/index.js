import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { NextUIProvider } from "@nextui-org/system";
import { Provider } from 'react-redux'
import store, { persistor } from './Redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import { Toaster } from 'react-hot-toast';
import { PostProvider } from './Components/post/PostProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      {/* <React.StrictMode> */}
      <NextUIProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <PostProvider>
          <App />
        </PostProvider>
      </NextUIProvider>
      {/* </React.StrictMode> */}
    </PersistGate>
  </Provider>

);

