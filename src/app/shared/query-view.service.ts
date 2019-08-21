import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QueryViewService {

  constructor(@Inject('API_URL') private apiUrl: string, private httpClient: HttpClient) { }

  async viewReport(query_sql: any, query_params: any) {
    const _url = `${this.apiUrl}/v1/showview/query`;
    return this.httpClient.post(_url, { query_sql: query_sql, query_params: query_params }).toPromise();
  }

}
