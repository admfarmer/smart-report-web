import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/shared/alert.service'
import { QueryItemsService } from 'src/app/shared/query-items.service'
import { ModalQueryItemComponent } from 'src/app/shared/modal-query-item/modal-query-item.component'
@Component({
  selector: 'app-query-item',
  templateUrl: './query-item.component.html',
  styleUrls: ['./query-item.component.scss']
})
export class QueryItemComponent implements OnInit {
  @ViewChild('mdlQueryitems', { static: true }) private mdlQueryitems: ModalQueryItemComponent;

  items: any = [];
  info: any = {};
  query_id: any;
  constructor(
    private alertService: AlertService,
    private queryItemsService: QueryItemsService,
  ) { }

  ngOnInit() {
    this.getInfo();
  }

  openRegister() {
    this.query_id = null;
    this.mdlQueryitems.open();
  }

  openEdit(item: any) {
    // console.log(item);
    this.mdlQueryitems.open(item);

  }
  onSave(event: any) {
    this.alertService.success();
    this.getInfo();
  }

  async getInfo() {
    try {
      const rs: any = await this.queryItemsService.getInfo();
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
