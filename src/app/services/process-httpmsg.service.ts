import { Injectable } from '@angular/core';
import {_throw} from 'rxjs/observable/throw';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ProcessHttpmsgService {

  constructor() { }

  public handleError(error: HttpErrorResponse | any) {
    let errMsg: string;

    if (error.error instanceof ErrorEvent) {
      errMsg = error.error.message;
    } else {
      errMsg = `${error.status} - ${error.statusText || ''} ${error.error}`;
    }

    return _throw(errMsg);
  }

}
