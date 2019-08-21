import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClarityModule } from "@clr/angular";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from "angular-6-datatable";
import { GrdFilterPipe } from '../shared/grd-filter.pipe';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from 'src/app/admin/layout/layout.component';
import { HomeComponent } from './home/home.component';
import { QueryComponent } from './query/query.component';


@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    QueryComponent,
    GrdFilterPipe
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    BrowserModule,
    ClarityModule,
    BrowserAnimationsModule,
    NgbModule,
    SharedModule,
    FormsModule,
    DataTableModule,
  ]
})
export class AdminModule { }
