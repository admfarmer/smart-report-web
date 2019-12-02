import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/shared/alert.service';
import { QueryItemsService } from 'src/app/shared/query-items.service';
import { MenuItemService } from 'src/app/shared/menu-item.service'
import { UserTypeService } from 'src/app/shared/user-type.service'

@Component({
  selector: 'app-modal-query-item',
  templateUrl: './modal-query-item.component.html',
  styleUrls: ['./modal-query-item.component.scss']
})
export class ModalQueryItemComponent implements OnInit {

  @Output('onSave') onSave: EventEmitter<any> = new EventEmitter<any>();

  opened: boolean = false;
  loading: boolean = false;

  typeitems: any = [];
  items: any = [];
  info: any = {};
  menuitems: any = [];
  query_id: any;
  item_id: any;
  query_name: any;
  query_sql: any;
  query_params: any;
  template: any;
  comment: any;
  level_id: any;

  constructor(
    private alertService: AlertService,
    private queryItemsService: QueryItemsService,
    private menuItemService: MenuItemService,
    private userTypeService: UserTypeService,

  ) { }

  ngOnInit() {
    this.getMenuItem();
    this.getTypeInfo();
  }
  async open(info: any = null) {
    this.opened = true;
    // console.log(info);
    if (info) {
      this.query_id = info.query_id;
      this.item_id = info.item_id;
      this.query_name = info.query_name;
      this.query_sql = info.query_sql;
      this.query_params = info.query_params;
      this.template = info.template;
      this.comment = info.comment;
      this.level_id = info.level_id;
    } else {
      this.query_id = null;
      this.item_id = null;
      this.query_name = null;
      this.query_sql = null;
      this.query_params = null;
      this.template = null;
      this.comment = null;
      this.level_id = null;
    }
  }
  dismiss() {
    this.opened = false;
    this.query_id = null;
    this.item_id = null;
    this.query_name = null;
    this.query_sql = null;
    this.query_params = null;
    this.template = null;
    this.comment = null;
    this.level_id = null;
  }
  async save() {
    let _info = {
      item_id: this.item_id,
      query_name: this.query_name,
      query_sql: this.query_sql,
      query_params: this.query_params,
      template: this.template,
      comment: this.comment,
      level_id: this.level_id
    }
    var rs: any;
    console.log('query_id : ', this.query_id);

    if (this.query_id) {
      rs = await this.queryItemsService.update(this.item_id, _info);
    } else {
      console.log('Save :', _info);
      rs = await this.queryItemsService.save(_info);
    }

    if (rs.statusCode === 200) {
      // this.modalReference.close();
      this.onSave.emit();
    } else {
      this.alertService.error(rs.message);
    }
    this.query_id = null;
    this.item_id = null;
    this.query_name = null;
    this.query_sql = null;
    this.query_params = null;
    this.template = null;
    this.comment = null;
    this.level_id = null;
    this.opened = false;

  }
  async getMenuItem() {
    try {
      const rs: any = await this.menuItemService.getMenuItem();
      if (rs.info) {
        this.menuitems = rs.info;
        // console.log(this.items);
      } else {
        this.alertService.error('เกิดข้อผิดพลาด');
      }
    } catch (error) {
      console.log(error);
      this.alertService.error();
    }
  }
  async getTypeInfo() {
    try {
      const rs: any = await this.userTypeService.getInfo();
      if (rs.info) {
        this.typeitems = rs.info;
        // console.log(this.typeitems);
      } else {
        this.alertService.error('เกิดข้อผิดพลาด');
      }
    } catch (error) {
      console.log(error);
      this.alertService.error();
    }
  }

}
