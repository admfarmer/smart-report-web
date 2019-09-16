import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuardService } from '../shared/auth-guard.service';
import { QueryComponent } from 'src/app/admin/query/query.component';
import { UserComponent } from './setting/user/user.component';
import { MenuItemComponent } from './setting/menu-item/menu-item.component';
import { QueryItemComponent } from './setting/query-item/query-item.component';


const routes: Routes = [
  {
    path: 'admin', component: LayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'query/:menuId', component: QueryComponent },
      { path: 'users', component: UserComponent },
      { path: 'menuitem', component: MenuItemComponent },
      { path: 'queryitem', component: QueryItemComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
