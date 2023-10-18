import React, {ReactNode } from 'react'
import ReactDOM from 'react-dom/client'
import './view/style/style.scss';
import "delib-npm/dist/index.css"
import { RouterProvider } from "react-router-dom";


import { store } from './model/store'
import { Provider } from 'react-redux'
import { router } from './router';
import Main from './view/pages/main/Main';




ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)


export const install:{deferredPrompt:any}= {
  deferredPrompt:null
}

export const pageOut:{pageOut:ReactNode|null} = {pageOut:<Main />}

window.addEventListener('beforeinstallprompt', (e) => {

  e.preventDefault();
  install.deferredPrompt = e;

});
