'use strict';

import * as Sentry from '@sentry/browser';
import {BrowserTracing} from '@sentry/tracing';

if (window.location.host === 'smysl.shop') {
  console.log(`window.location.host = ${window.location.host}`);
  console.log('sentry initializing');

  Sentry.init({
    dsn: 'https://85ce3785f8664111b2e07cb226f52fd0@o55232.ingest.sentry.io/6547492',
    integrations: [new BrowserTracing()],
  });
}

// check Sentry version: find SDK_VERSION in this file catalog/view/javascript/error-logging/sentry.js
// myUndefinedFunction();
