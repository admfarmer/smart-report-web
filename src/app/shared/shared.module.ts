import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService } from 'src/app/shared/alert.service'
import { AuthGuardService } from 'src/app/shared/auth-guard.service'
import { LoginService } from 'src/app/shared/login.service'
import { UserService } from 'src/app/shared/user.service'
import { QueryItemsService } from 'src/app/shared/query-items.service';
import { ModalQueryViewComponent } from './modal-query-view/modal-query-view.component'
import { ClarityModule } from "@clr/angular";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ModalQueryItemComponent } from './modal-query-item/modal-query-item.component';
import { ModalMenuItemComponent } from './modal-menu-item/modal-menu-item.component';
import { ModalAddUserComponent } from './modal-add-user/modal-add-user.component';

@NgModule({
  declarations: [
    ModalQueryViewComponent,
    ModalQueryItemComponent,
    ModalMenuItemComponent,
    ModalAddUserComponent
  ],
  imports: [
    CommonModule,
    ClarityModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule
  ],
  exports: [
    ModalQueryViewComponent,
    ModalQueryItemComponent,
    ModalMenuItemComponent,
    ModalAddUserComponent
  ],
  providers: [
    AuthGuardService,
    LoginService,
    AlertService,
    UserService,
    QueryItemsService
  ]

})
export class SharedModule { }
