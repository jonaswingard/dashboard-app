import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { IPocket } from '../components/pocket/pocket';

@Injectable()
export class PocketService {
  private options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });
  private itemsUrl = '/api/pocket?limit=5';
  private archiveItemUrl = '/api/pocket/archive';
  private addTagUrl = '/api/pocket/tag';
  private itemLimit = 5;

  constructor(private http: Http) {
    this.itemsUrl = '/assets/pocket-items.json';
  }

  get(): Observable<IPocket[]> {
    return this.http.get(this.itemsUrl)
      .map(response => <IPocket[]>response.json())
      // .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);
  }

  archive(id): Observable<IPocket[]> {
    return this.http.post(this.archiveItemUrl, { id, limit: this.itemLimit }, this.options)
      .map(response => <IPocket[]>response.json())
      .do(data => console.log(data))
      .catch(this.handleError);
  }

  addTag(id, tag): Observable<IPocket[]> {
    const item = {
      resolved_title: 'bar'
    } as IPocket;

    return Observable.create(observer => {
      observer.next([item]);
      observer.complete();
    });

    // return this.http.post(this.addTagUrl, { id, tag, limit: this.itemLimit }, this.options)
    //   .map(response => <IPocket[]>response.json())
    //   .do(data => console.log(data))
    //   .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
