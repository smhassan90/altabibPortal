"use client";
import { store,persistor  } from './store'
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";

export function Providers({ children }) {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    </>
  );
}
