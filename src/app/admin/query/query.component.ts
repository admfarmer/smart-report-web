import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/shared/alert.service'
import { QueryItemsService } from 'src/app/shared/query-items.service'
import { ActivatedRoute, Router } from '@angular/router';
import { ModalQueryViewComponent } from 'src/app/shared/modal-query-view/modal-query-view.component'

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})
export class QueryComponent implements OnInit {

  @ViewChild('mdlQuery', { static: true }) private mdlQuery: ModalQueryViewComponent;

  items: any = [];
  info: any = {};
  menuId: number;
  levelId: any;

  constructor(
    private alertService: AlertService,
    private queryItemsService: QueryItemsService,
    private route: ActivatedRoute,

  ) {
    this.route.params.subscribe(params => {
      this.menuId = params['menuId'];
      // console.log(this.menuId);
      this.gitInfo();
    })
  }

  ngOnInit() {
    this.gitInfo();
  }

  openView(item: any) {
    // console.log(item);
    this.mdlQuery.open(item);

  }
  onSave(event: any) {
    this.alertService.success();
  }

  async gitInfo() {
    this.levelId = sessionStorage.getItem('levelId');
    // console.log(this.levelId);
    let _menuId: number = this.menuId
    try {
      if (this.menuId) {
        const rs: any = await this.queryItemsService.getSelect(_menuId, this.levelId);
        if (rs.info) {
          this.items = rs.info;
          // console.log(this.items);
        } else {
          this.alertService.error('เกิดข้อผิดพลาด');
        }
      } else {
        const rs: any = await this.queryItemsService.getInfo();
        if (rs.info) {
          this.items = rs.info;
          // console.log(this.items);
        } else {
          this.alertService.error('เกิดข้อผิดพลาด');
        }
      }
    } catch (error) {
      console.log(error);
      this.alertService.error();
    }

  }
}
