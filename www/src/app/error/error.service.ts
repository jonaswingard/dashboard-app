import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export class ErrorService {
  static handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
