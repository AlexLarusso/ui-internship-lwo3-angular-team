import { Injectable } from '@angular/core';
import { WebStorageService } from './web-storage.service';

@Injectable({
  providedIn: 'root'
})

export class SessionStorageService extends WebStorageService {
}
