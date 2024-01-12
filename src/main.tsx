import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Sentry from '@sentry/react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import App from './App.tsx';
import './theme.css';
import i18nInitConfig from './i18n/config.ts';

i18n.use(initReactI18next).init(i18nInitConfig);
i18n.languages = ['en', 'de'];

Sentry.init({
  dsn: 'https://7d15d5b90bd47b59161e91dc5dbd086d@o4506560139296768.ingest.sentry.io/4506560141000704',
  integrations: [
    new Sentry.BrowserTracing({
      tracePropagationTargets: ['localhost', /^https:\/\/freshcells-jhserodio-challenge\.surge\.io/],
    }),
    new Sentry.Replay({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
