import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/shared/alert.service'
import { MenuItemService } from 'src/app/shared/menu-item.service'

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {
  items: any = [];
  info: any = {};

  constructor(
    private alertService: AlertService,
    private menuItemService: MenuItemService,
  ) { }

  ngOnInit() {
    this.getInfo();
  }
  openEdit(item: any) {
    console.log(item);
    // this.mdlQuery.open(item);

  }
  onSave(event: any) {
    // this.alertService.success();
  }

  async getInfo() {
    try {
      const rs: any = await this.menuItemService.getMenuItem();
      if (rs.info) {
        this.items = rs.info;
        // console.log(this.items);
      } else {
        this.alertService.error('เกิดข้อผิดพลาด');
      }
    } catch (error) {
      console.log(error);
      this.alertService.error();
    }
  }
}
