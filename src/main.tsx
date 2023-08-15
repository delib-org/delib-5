import React from 'react'
import ReactDOM from 'react-dom/client'
import './view/style/style.scss';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Start from './view/pages/start/Start';
import App from './view/pages/home/App';
import Main from './view/pages/main/Main';
import SetStatement from './view/features/statement/SetStatement';

import { store } from './model/store'
import { Provider } from 'react-redux'
import Statement from './view/pages/statement/Statement';
import All from './view/pages/all/All';
import ErrorPage from './view/pages/error/ErrorPage';




const router = createBrowserRouter([
  {
    path: "/",
    element: <All />,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "",
        element: <Start />,
        errorElement: <ErrorPage/>
      },
      {
        path: "home",
        element: <App />,
        errorElement: <ErrorPage/>,
        children: [
          {
            path: "",
            element: <Main />,
            errorElement: <ErrorPage/>,
          },
          {
            path: "addStatment",
            element: <SetStatement />,
            errorElement: <ErrorPage/>,
          },
          {
            path: "statement/:statementId",
            element: <Statement />,
            errorElement: <ErrorPage/>,
            children:[
              {
                path: ":page",
                element: <Statement />
              }
            ]
          }
        ]
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
