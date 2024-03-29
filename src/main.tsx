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
import { ErrorBoundary } from './components/error/boundary/Error.tsx';
import Login from './pages/login/Login.tsx';
import User from './pages/user/User.tsx';
import { sentry_host } from './service/hosts.ts';

use(initReactI18next).init(i18nInitConfig);
i18n.languages = ['en', 'de'];

Sentry.init({
  dsn: sentry_host,
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
    element: (
      <Suspense fallback={<>loading</>}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '/user/:userId',
    element: (
      <Suspense fallback={<>loading</>}>
        <User />
      </Suspense>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary message="Something not working">
      <RouterProvider router={route} />
    </ErrorBoundary>
  </React.StrictMode>,
);
