import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

const chatUrl = environment.chatUrl;

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

if (chatUrl) {
  const chatik = document.createElement('iframe');

  chatik.setAttribute('src', chatUrl);
  chatik.setAttribute('chat-opened', 'false');
  document.body.appendChild(chatik);

  window.addEventListener('message', (message) => {
    if (message.origin === chatUrl) {
      chatik.setAttribute('chat-opened', message.data.chatOpened);
    }
  });
}
