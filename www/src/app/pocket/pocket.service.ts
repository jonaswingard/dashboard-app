import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { IPocket } from './pocket';

@Injectable()
export class PocketService {
  private httpOptions = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });
  private itemsUrl = '/api/pocket?limit=5';
  private itemLimit = 5;

  constructor(private http: Http) {
    // this.itemsUrl = '/assets/pocket-items.json';
  }

  get(): Observable<IPocket[]> {
    return this.http.get(this.itemsUrl)
      .map(response => <IPocket[]>response.json())
      .catch(this.handleError);
  }

  archive(id): Observable<IPocket[]> {
    return this.http.post('/api/pocket/archive', { id, limit: this.itemLimit }, this.httpOptions)
      .map(response => <IPocket[]>response.json())
      .do(data => console.log(data))
      .catch(this.handleError);
  }

  delete(id): Observable<IPocket[]> {
    return this.http.post('/api/pocket/delete', { id, limit: this.itemLimit }, this.httpOptions)
      .map(response => <IPocket[]>response.json())
      .catch(this.handleError);
  }

  addTag(id, tag): Observable<IPocket[]> {
    return this.http.post('/api/pocket/tag', { id, tag, limit: this.itemLimit }, this.httpOptions)
      .map(response => <IPocket[]>response.json())
      .catch(this.handleError);
  }

  removeTag(id, tag): Observable<IPocket[]> {
    return this.http.post('/api/pocket/tag', { id, tag, removeTag: true, limit: this.itemLimit }, this.httpOptions)
      .map(response => <IPocket[]>response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
