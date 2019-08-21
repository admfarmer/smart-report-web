import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {

  constructor(@Inject('API_URL') private apiUrl: string, private httpClient: HttpClient) { }

  async getMenuItem() {
    const _url = `${this.apiUrl}/v1/menuitem/info`;
    return this.httpClient.get(_url).toPromise();
  }


}
