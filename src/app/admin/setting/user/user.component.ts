import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/shared/alert.service'
import { UserService } from 'src/app/shared/user.service'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  items: any = [];
  info: any = {};

  constructor(
    private alertService: AlertService,
    private userService: UserService,
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
      const rs: any = await this.userService.list();
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
