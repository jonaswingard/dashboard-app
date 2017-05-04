import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PocketService {
  private apiUrl = '/api/pocket?limit=5';

  constructor(private http: Http) { }

  // gör om från promise till observable

  get() {
    return this.http.get(this.apiUrl)
      .toPromise()
      .then(response => {
        return response.json().list
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
