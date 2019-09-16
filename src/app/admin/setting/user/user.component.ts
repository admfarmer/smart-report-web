import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/shared/alert.service'
import { UserService } from 'src/app/shared/user.service'
import { ModalAddUserComponent } from 'src/app/shared/modal-add-user/modal-add-user.component'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @ViewChild('mdlUsers', { static: true }) private mdlUsers: ModalAddUserComponent;

  items: any = [];
  info: any = {};
  user_id: any;
  constructor(
    private alertService: AlertService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.getInfo();
  }

  openRegister() {
    this.user_id = null;
    this.mdlUsers.open();
  }

  openEdit(item: any) {
    // console.log(item);
    this.mdlUsers.open(item);

  }
  onSave(event: any) {
    this.alertService.success();
    this.getInfo();
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
