import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';

import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

import { ProcessHttpmsgService } from './process-httpmsg.service';

import { Company } from '../shared/company';

@Injectable()
export class CompanyService {

  constructor( private http: HttpClient,
               private processHTTPMsgService: ProcessHttpmsgService ) { }

  getCompanies(name): Observable<Company[]> {
    return this.http.get<Company[]>(baseURL + name )
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

}


