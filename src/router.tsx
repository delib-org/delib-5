import { createBrowserRouter } from "react-router-dom";
// import {  lazy, Suspense } from 'react';

import Start from './view/pages/start/Start';
import App from './view/pages/home/App';
// import Main from './view/pages/main/Main';
// import SetStatement from './view/features/statement/SetStatement';
// import Statement from './view/pages/statement/Statement';
import All from './view/pages/all/All';
import ErrorPage from './view/pages/error/ErrorPage';
import PageTransition from "./view/components/pageTransition/PageTransition";

import Main from "./view/pages/main/Main";
import Statement from "./view/pages/statement/Statement";
import SetStatement from "./view/pages/statement/components/set/SetStatement";
import { ReactNode } from "react";


// // const App = lazy(() => import('./view/pages/home/App'));
// const Main = lazy(() => import('./view/pages/main/Main'));
// const Statement = lazy(() => import('./view/pages/statement/Statement'));
// // const All = lazy(() => import('./view/pages/all/All'));
// const SetStatement = lazy(() => import('./view/pages/statement/components/set/SetStatement'));

// const SuspenseFallback = () => {
//     return (
//         <div className="loader-container">
//             <div className="loader"></div>
//         </div>
//     )
// }

// export const SuspenseComp = ({ chlildren }: any) => {
//     return (
//         <Suspense fallback={<SuspenseFallback />}>
//             {chlildren}
//         </Suspense>
//     )
// }

//keep prevoius page in memory
export const pageOut:{pageOut:ReactNode|null} = {
    pageOut: null
}

function setPageOut(page: ReactNode) {
    pageOut.pageOut = page;
}



export const router = createBrowserRouter([
    {
        path: "/",
        element: <All />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <Start />,
                errorElement: <ErrorPage />
            },
            {
                path: "home",
                element: <App />,
                errorElement: <ErrorPage />,
                children: [
                    {
                        path: "",
                        element: <Main />,
                        errorElement: <ErrorPage />,
                    },
                    {
                        path: "addStatment",
                        element: <SetStatement /> ,
                        errorElement: <ErrorPage />,
                    },
                    {
                        path: "updateStatement/:statementId",
                        element:<SetStatement />,
                        errorElement: <ErrorPage />,
                    },
                    {
                        path: "statement-t/:statementId",
                        element:<PageTransition pageIn={<Statement />}/>,
                        errorElement: <ErrorPage />,
                    },
                    {
                        path: "statement/:statementId",
                        element:<Statement />,
                        errorElement: <ErrorPage />,
                        children: [
                            {
                                path: ":page",
                                element: <Statement />,
                                children: [
                                    {
                                        path: ":sort",
                                        element: <Statement />
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }

]);