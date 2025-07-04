import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { App } from './app/app';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding, withHashLocation } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(withFetch()),
    provideAnimations(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withHashLocation()  
    )
  ]
}).catch(err => console.error(err));
