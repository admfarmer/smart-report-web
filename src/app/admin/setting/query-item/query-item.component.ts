import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/shared/alert.service'
import { QueryItemsService } from 'src/app/shared/query-items.service'

@Component({
  selector: 'app-query-item',
  templateUrl: './query-item.component.html',
  styleUrls: ['./query-item.component.scss']
})
export class QueryItemComponent implements OnInit {
  items: any = [];
  info: any = {};

  constructor(
    private alertService: AlertService,
    private queryItemsService: QueryItemsService,
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
