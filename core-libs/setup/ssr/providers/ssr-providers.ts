/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Optional, SkipSelf, StaticProvider } from '@angular/core';
import { INITIAL_CONFIG, PlatformConfig } from '@angular/platform-server';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { SERVER_REQUEST_ORIGIN, SERVER_REQUEST_URL } from '@spartacus/core';
import { getRequestOrigin } from '../util/request-origin';
import { getRequestUrl } from '../util/request-url';

/**
 * Returns the providers used for SSR and pre-rendering processes.
 */
export function provideSsrAndPrerendering(options?: {
  /**
   * Specify a domain (origin) from which the HTTP requests are being made.
   * Should be without the trailing slash, e.g. "https://my.domain.com"
   */
  serverRequestOrigin?: string;
}): StaticProvider[] {
  return [
    {
      provide: SERVER_REQUEST_ORIGIN,
      useFactory: (serverRequestOrigin?: string): string => {
        // SSR mode
        if (serverRequestOrigin) {
          return serverRequestOrigin;
        }

        // likely prerendering mode
        if (options?.serverRequestOrigin) {
          return options.serverRequestOrigin;
        }

        throw new Error(
          `The request origin is not set. Please specify it through environment variables when initiating the process.
          
          E.g.
          > SERVER_REQUEST_ORIGIN=https://my.domain.com yarn prerender
          > SERVER_REQUEST_ORIGIN=http://localhost:4200 yarn serve:ssr
          
          
          Alternatively, you can pass it as an argument to provideSsrAndPrerendering
          function, but beware it will be used for server-side rendering as well.
          
          E.g.
          @NgModule({
            // ...
            providers: [
              provideSsrAndPrerendering({
                serverRequestOrigin: 'https://my.domain.com',
              }),
            ],
          })
          export class AppServerModule {}`
        );
      },
      deps: [[new Optional(), new SkipSelf(), SERVER_REQUEST_ORIGIN]],
    },
    {
      provide: SERVER_REQUEST_URL,
      useFactory: (
        platformConfig: PlatformConfig,
        serverRequestOrigin: string,
        serverRequestUrl?: string
      ): string => {
        // SSR mode
        if (serverRequestUrl) {
          if (options?.serverRequestOrigin) {
            return serverRequestUrl.replace(
              serverRequestOrigin,
              options.serverRequestOrigin
            );
          }

          return serverRequestUrl;
        }

        // prerendering mode (no express server)
        return serverRequestOrigin + platformConfig.url;
      },
      deps: [
        INITIAL_CONFIG,
        SERVER_REQUEST_ORIGIN,
        [new Optional(), new SkipSelf(), SERVER_REQUEST_URL],
      ],
    },
  ];
}

/**
 * Returns Spartacus providers to be passed to the Angular express engine (in SSR)
 *
 * @param options
 */
export function getServerRequestProviders(): StaticProvider[] {
  return [
    {
      provide: SERVER_REQUEST_ORIGIN,
      useFactory: getRequestOrigin,
      deps: [REQUEST],
    },
    {
      provide: SERVER_REQUEST_URL,
      useFactory: getRequestUrl,
      deps: [REQUEST],
    },
  ];
}
