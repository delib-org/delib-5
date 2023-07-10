import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import './view/style/style.scss';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Start from './view/pages/start/Start';
import { listeToAuth } from './functions/db/auth';
import App from './view/pages/home/App';
import Main from './view/pages/main/Main';
import SetStatement from './view/features/statement/SetStatement';

import { store } from './model/store'
import { Provider } from 'react-redux'
import Statement from './view/pages/statement/Statement';



listeToAuth

const router = createBrowserRouter([
  {
    path: "/",
    element: <Start />,
    errorElement: <div>Not Found</div>
  },
  {
    path: "/home",
    element: <App />,
    children: [
      {
        path: "",
        element: <Main />
      },
      {
        path: "addStatment",
        element: <SetStatement />
      },
      {
        path:"statement/:statementId",
        element:<Statement />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
   <Provider store={store}>
      <RouterProvider router={router} />
      </Provider>
  </React.StrictMode>,
)
