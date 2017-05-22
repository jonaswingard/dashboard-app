import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';

import { ErrorService } from '../error/error.service';
import { IPocket } from './pocket';

@Injectable()
export class PocketService {
  private httpOptions = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });
  private itemsUrl = '/api/pocket?limit=5';
  private itemLimit = 5;

  constructor(private http: Http) {
    this.itemsUrl = '/assets/mock-data/pocket-items.json';
  }

  get(): Observable<IPocket[]> {
    return this.http.get(this.itemsUrl)
      .map(response => response.json())
      .do(data => {
        return data.map(item => {
          item.hostname = new URL(item.given_url).hostname.replace('www.', '');
          return item;
        });
      })
      .catch(ErrorService.handleError);
  }

  archive(id): Observable<IPocket[]> {
    return this.http.post('/api/pocket/archive', { id, limit: this.itemLimit }, this.httpOptions)
      .flatMap(() => this.get())
      .catch(ErrorService.handleError);
  }

  delete(id): Observable<IPocket[]> {
    return this.http.post('/api/pocket/delete', { id, limit: this.itemLimit }, this.httpOptions)
      .flatMap(() => this.get())
      .catch(ErrorService.handleError);
  }

  addTag(id, tag): Observable<IPocket[]> {
    return this.http.post('/api/pocket/tag', { id, tag, limit: this.itemLimit }, this.httpOptions)
      .flatMap(() => this.get())
      .catch(ErrorService.handleError);
  }

  removeTag(id, tag): Observable<IPocket[]> {
    return this.http.post('/api/pocket/tag', { id, tag, removeTag: true, limit: this.itemLimit }, this.httpOptions)
      .flatMap(() => this.get())
      .catch(ErrorService.handleError);
  }

}
