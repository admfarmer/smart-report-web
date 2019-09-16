import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {
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


  async getMenuItem() {
    const _url = `${this.apiUrl}/v1/menuitem/select`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }
  async getMenuInfo() {
    const _url = `${this.apiUrl}/v1/menuitem/info`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  async save(data: object) {
    const _url = `${this.apiUrl}/v1/menuitem`;
    return this.httpClient.post(_url, data, this.httpOptions).toPromise();
  }

  async update(item_id: any, data: object) {
    const _url = `${this.apiUrl}/v1/menuitem/${item_id}`;
    return this.httpClient.put(_url, data, this.httpOptions).toPromise();
  }

  async remove(item_id: any) {
    const _url = `${this.apiUrl}/v1/menuitem/${item_id}`;
    return this.httpClient.delete(_url, this.httpOptions).toPromise();
  }

}
