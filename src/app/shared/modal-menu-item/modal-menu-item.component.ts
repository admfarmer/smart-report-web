import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/shared/alert.service';
import { MenuItemService } from 'src/app/shared/menu-item.service';

@Component({
  selector: 'app-modal-menu-item',
  templateUrl: './modal-menu-item.component.html',
  styleUrls: ['./modal-menu-item.component.scss']
})
export class ModalMenuItemComponent implements OnInit {
  @Output('onSave') onSave: EventEmitter<any> = new EventEmitter<any>();

  opened: boolean = false;
  loading: boolean = false;

  items: any = [];
  info: any = {};

  item_id: any;
  item_name: any;
  comment: any;
  item_status: any;

  constructor(
    private alertService: AlertService,
    private menuItemService: MenuItemService,

  ) { }

  ngOnInit() {
  }
  async open(info: any = null) {
    this.opened = true;
    // console.log(info);
    if (info) {
      this.item_id = info.item_id;
      this.item_name = info.item_name;
      this.comment = info.comment;
      this.item_status = info.item_status;
    } else {
      this.item_id = null;
      this.item_name = null;
      this.comment = null;
      this.item_status = 'Y';
    }
  }
  dismiss() {
    this.opened = false;
    this.item_id = null;
    this.item_name = null;
    this.comment = null;
    this.item_status = null;
  }
  async save() {
    let _info = {
      item_name: this.item_name,
      comment: this.comment,
      item_status: this.item_status || 'N'
    }
    var rs: any;

    if (this.item_id) {
      rs = await this.menuItemService.update(this.item_id, _info);
    } else {
      rs = await this.menuItemService.save(_info);
    }

    if (rs.statusCode === 200) {
      // this.modalReference.close();
      this.onSave.emit();
    } else {
      this.alertService.error(rs.message);
    }
    this.item_id = null;
    this.item_name = null;
    this.comment = null;
    this.item_status = null;
    this.opened = false;
  }
}
