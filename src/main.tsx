import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import * as Sentry from '@sentry/react';
import { HttpClient } from '@sentry/integrations';
import i18n, { use } from 'i18next';
import { initReactI18next } from 'react-i18next';
import i18nInitConfig from './i18n/config.ts';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from 'react-router-dom';

import './theme.css';
import ErrorBoundary from './components/error/Error.tsx';
import Login from './pages/login/Login.tsx';
import User from './pages/user/User.tsx';

use(initReactI18next).init(i18nInitConfig);
i18n.languages = ['en', 'de'];

Sentry.init({
  dsn: import.meta.env.SENTRY_DSN,
  integrations: [
    new Sentry.BrowserTracing({
      tracePropagationTargets: [
        'localhost',
        /^https:\/\/freshcells-jhserodio-challenge\.surge\.sh/,
      ],
      routingInstrumentation: Sentry.reactRouterV6Instrumentation(
        React.useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes,
      ),
    }),
    new Sentry.Replay({
      maskAllText: false,
      blockAllMedia: false,
    }),
    new HttpClient(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

const sentryCreateBrowserRouter = Sentry.wrapCreateBrowserRouter(createBrowserRouter);

export const route = sentryCreateBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorBoundary message="login page not working" />,
    element: (
      <Suspense fallback={<>loading</>}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '/user/:userId',
    errorElement: <ErrorBoundary message="user page not working" />,
    element: (
      <Suspense fallback={<>loading</>}>
        <User />
      </Suspense>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={route} />
  </React.StrictMode>,
);
