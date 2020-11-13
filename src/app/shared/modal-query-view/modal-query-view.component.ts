import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { QueryViewService } from 'src/app/shared/query-view.service';
import { AlertService } from 'src/app/shared/alert.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import * as _ from 'lodash';

@Component({
  selector: 'app-modal-query-view',
  templateUrl: './modal-query-view.component.html',
  styleUrls: ['./modal-query-view.component.scss']
})
export class ModalQueryViewComponent implements OnInit {

  @Output('onSave') onSave: EventEmitter<any> = new EventEmitter<any>();
  itemmenu: any = [];
  fieldDatas: any = [];
  items: any = [];
  tableDatas: any = [];
  info: any = {};
  opened: boolean = false;
  loading: boolean = false;

  sql: any;
  params: any;
  subitems: any;
  param_xx: any = '';
  param_x: any = [];
  param: any = [];

  title_name: any;
  comment: any;
  template: any;


  constructor(
    private alertService: AlertService,
    private queryViewService: QueryViewService,
  ) { }

  ngOnInit() {
  }

  async open(info: any = null) {
    this.opened = true;
    // console.log(info);

    this.sql = info.query_sql
    this.params = info.query_params
    this.title_name = info.query_name
    this.comment = info.comment
    this.template = info.template
    if (this.params) {
      this.param_xx = this.params.split(",");
      if (this.param_xx == '') {
        this.param_xx = null;
      }
      // console.log(this.param_xx);
    } else {
      this.gitShowView();
    }
  }
  dismiss() {
    this.fieldDatas = [null];
    this.tableDatas = [null];

    this.sql = '';
    this.params = ''
    this.param_xx = ''
    this.param_x = [];
    this.param = [];
    this.itemmenu = [];
    this.items = [];
    this.fieldDatas = [];
    this.tableDatas = [];
    this.opened = false;
    this.loading = false;
  }

  KeyParam(xx, input, idx) {
    // let param: any;
    let name: any = xx;
    let data: any = input.value;
    let _info = { name, data }
    // this.param.push(_info)
    this.param[idx] = { name, data };
    // console.log(this.param);
  }

  async gitShowView() {

    this.loading = true;

    let i: any;
    let x: any;
    let xx: any;
    console.log(this.param);


    for (i = 0; i < this.param.length; i++) {
      x = this.param[i].name;
      xx = this.param[i].data;
      this.param_x[i] = xx;
    }
    this.params = this.param_x;
    console.log(this.params);


    try {
      // this.itemmenu = [null];
      // this.items = [null];

      const rs: any = await this.queryViewService.viewReport(this.sql, this.params);
      if (rs.info) {
        let _info = rs.info;
        // console.log(_info);
        this.fieldDatas = [null];
        this.tableDatas = [null];

        const xx = _info[0].length
        const _datafield = [];
        if (_info[1][0] != null) {
          this.items = _info[0]; // ตอนรับ ก็ต้องมารับค่า rows แบบนี้
          this.itemmenu = _info[1];
        } else if (_info[0][3] != null) {
          this.items = _info[0][3]; // ตอนรับ ก็ต้องมารับค่า rows แบบ ตัวแปร 1 แยกออกหลายจุด
          this.itemmenu = _info[1][3];
        } else {
          this.items = _info[0][2]; // ตอนรับ ก็ต้องมารับค่า rows แบบ ตัวแปร 1 แยกออกหลายจุด
          this.itemmenu = _info[1][2];
        }
        _.forEach(this.itemmenu, (v, k) => {  // ดึงข้อมูล colums ไปเก็บไว้ที่ _datafield
          _datafield.push(v.name);
        })
        this.items.forEach(v => {   // ดึงข้อมูล roows ไปเก็บไว้ที่ _data
          let _data = [];
          _.forEach(v, x => {
            _data.push(x);
          });
          this.tableDatas.push(_data);  // ส่งค่า _data ไปเก็บใน this.tableDatas เพื่อไปแสดงหน้า thml
        });
        this.fieldDatas = _datafield;  // ส่งค่า _datafield ไปเก็บใน 

        // console.log('tableDatas', this.tableDatas);
        // console.log('fieldDatas', this.fieldDatas);
        this.loading = false;

      } else {
        console.log("เกิดข้อผิดพลาด");
        this.loading = false;
        this.fieldDatas = [null];
        this.tableDatas = [null];
        // this.alertService.error('เกิดข้อผิดพลาด');
        let n = 1;
        for (n = 0; n < 1; n++) {
          this.gitShowView()
        }
      }
    } catch (error) {
      console.log(error);
      this.loading = false;
      this.fieldDatas = [null];
      this.tableDatas = [null];
      // this.alertService.error();
    }

  }
  exportToExcel() {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      useBom: true,
      headers: [this.fieldDatas]
    };
    new ngxCsv(this.items, this.title_name, options);
  }

}
