import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuardService } from '../shared/auth-guard.service';
import { HomeComponent } from 'src/app/admin/home/home.component';
import { QueryComponent } from 'src/app/admin/query/query.component';


const routes: Routes = [
  {
    path: 'admin', component: LayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'query/:menuId', component: QueryComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
