import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/shared/alert.service'
import { MenuItemService } from 'src/app/shared/menu-item.service'
import { ModalMenuItemComponent } from 'src/app/shared/modal-menu-item/modal-menu-item.component'
@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {
  @ViewChild('mdlMenitems', { static: true }) private mdlMenitems: ModalMenuItemComponent;

  items: any = [];
  info: any = {};
  item_id: any;
  constructor(
    private alertService: AlertService,
    private menuItemService: MenuItemService,
  ) { }

  ngOnInit() {
    this.getInfo();
  }
  openRegister() {
    this.item_id = null;
    this.mdlMenitems.open();
  }

  openEdit(item: any) {
    // console.log(item);
    this.mdlMenitems.open(item);

  }
  onSave(event: any) {
    this.alertService.success();
    this.getInfo();
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
