import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Saving_format } from './utility/types';

@Injectable({
  providedIn: 'root',
})
export class DataManagerService {
  constructor(private http: HttpClient) {}

  getHistory(): Observable<Object> {
    return this.http.get(
      'https://218.selfip.net/apps/QrJqXryMg7/collections/history/documents/?format=json'
    );
  }

  PostHitory(saving_data: Saving_format): Observable<Object> {
    return this.http.post(
      'https://218.selfip.net/apps/QrJqXryMg7/collections/history/documents/',
      { key: saving_data.id, data: saving_data }
    );
  }

  DeleteHistory(saving_data: Saving_format): Observable<Object> {
    return this.http.delete(
      `https://218.selfip.net/apps/QrJqXryMg7/collections/history/documents/${saving_data.id}/`
    );
  }
}
