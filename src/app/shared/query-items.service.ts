import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QueryItemsService {

  constructor(@Inject('API_URL') private apiUrl: string, private httpClient: HttpClient) { }

  async getInfo() {
    const _url = `${this.apiUrl}/v1/query/info`;
    return this.httpClient.get(_url).toPromise();
  }

  async getSelect(menuId: any, levelId: any) {
    const _url = `${this.apiUrl}/v1/query/select/${menuId}/${levelId}`;
    return this.httpClient.get(_url).toPromise();
  }

}
