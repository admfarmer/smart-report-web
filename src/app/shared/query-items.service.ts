import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QueryItemsService {
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


  async getInfo() {
    const _url = `${this.apiUrl}/v1/query/info`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  async getSelect(menuId: any, levelId: any) {
    const _url = `${this.apiUrl}/v1/query/select/${menuId}/${levelId}`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  async save(data: object) {
    const _url = `${this.apiUrl}/v1/query`;
    return this.httpClient.post(_url, data, this.httpOptions).toPromise();
  }

  async update(query_id: any, data: object) {
    const _url = `${this.apiUrl}/v1/query/${query_id}`;
    return this.httpClient.put(_url, data, this.httpOptions).toPromise();
  }

  async remove(query_id: any) {
    const _url = `${this.apiUrl}/v1/query/${query_id}`;
    return this.httpClient.delete(_url, this.httpOptions).toPromise();
  }


}
