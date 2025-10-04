import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []), // keep existing providers
    provideHttpClient()             // 👈 add HttpClient globally
  ]
})
.catch((err) => console.error(err));
