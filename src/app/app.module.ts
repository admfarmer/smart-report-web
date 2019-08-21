import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AdminModule } from './admin/admin.module';
import { SharedModule } from './shared/shared.module';
import { LoginModule } from './login/login.module';
import { environment } from '../environments/environment';

export function tokenGetter() {
  return sessionStorage.getItem('token');
}
export const whitelistedDomains = [new RegExp('[\s\S]*')] as RegExp[];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: whitelistedDomains,
        blacklistedRoutes: ['/login']
      }
    }),
    SharedModule,
    AdminModule,
    LoginModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: 'API_URL', useValue: environment.apiUrl },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
