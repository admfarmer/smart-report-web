import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/alert.service'
import { MenuItemService } from 'src/app/shared/menu-item.service'
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styles: []
})
export class LayoutComponent implements OnInit {
  isCollapsed = true;
  fullname: string;
  userType: string;
  items: any = [];

  constructor(
    private router: Router,
    private menuItemService: MenuItemService,
    private alertService: AlertService,

  ) { }

  ngOnInit() {
    this.fullname = sessionStorage.getItem('fullname');
    this.userType = sessionStorage.getItem('userType');
    this.getMenuItem();
  }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('fullname');
    sessionStorage.removeItem('userType');
    sessionStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

  async getMenuItem() {
    try {
      const rs: any = await this.menuItemService.getMenuItem();
      if (rs.info) {
        this.items = rs.info;
        console.log(this.items);
      } else {
        this.alertService.error('เกิดข้อผิดพลาด');
      }
    } catch (error) {
      console.log(error);
      this.alertService.error();
    }
  }
  openQuery(item: any) {
    console.log(item);
    sessionStorage.setItem('menuId', item);
    // this.router.navigate([`admin/query/${item}`]);

  }
}
