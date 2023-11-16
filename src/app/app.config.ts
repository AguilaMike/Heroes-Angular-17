import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(),
    provideRouter(routes, withViewTransitions()),
  ]
};
