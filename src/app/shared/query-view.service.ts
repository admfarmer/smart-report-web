import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QueryViewService {
  token: any;
  httpOptions: any;

  constructor(@Inject('API_URL') private apiUrl: string, private httpClient: HttpClient) {
    this.token = sessionStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    };
  }

  async viewReport(query_sql: any, query_params: any) {
    const _url = `${this.apiUrl}/v1/showview/query`;
    return this.httpClient.post(_url, { query_sql: query_sql, query_params: query_params }, this.httpOptions).toPromise();
  }

}
