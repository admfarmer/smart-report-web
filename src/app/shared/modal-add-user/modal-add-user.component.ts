import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/shared/alert.service';
import { UserService } from 'src/app/shared/user.service';
import { UserTypeService } from 'src/app/shared/user-type.service'

@Component({
  selector: 'app-modal-add-user',
  templateUrl: './modal-add-user.component.html',
  styleUrls: ['./modal-add-user.component.scss']
})
export class ModalAddUserComponent implements OnInit {
  @Output('onSave') onSave: EventEmitter<any> = new EventEmitter<any>();

  opened: boolean = false;
  loading: boolean = false;

  typeitems: any = [];
  items: any = [];
  info: any = {};

  user_id: any;
  cid: any;
  fullname: any;
  username: any;
  password: any;
  is_accept: any;
  level_id: any;
  query_group: any;
  user_type: any;

  constructor(
    private alertService: AlertService,
    private userService: UserService,
    private userTypeService: UserTypeService,
  ) { }

  ngOnInit() {
    this.getTypeInfo();

  }

  async open(info: any = null) {
    this.opened = true;
    // console.log(info);
    if (info) {
      this.user_id = info.user_id;
      this.cid = info.cid;
      this.fullname = info.fullname;
      this.username = info.username;
      this.is_accept = info.is_accept || 'N';
      this.level_id = info.level_id;
      this.user_type = info.user_type;
    } else {
      this.user_id = null;
      this.cid = null;
      this.fullname = null;
      this.username = null;
      this.password = null;
      this.level_id = '2';
      this.user_type = 'MEMBER';
      this.is_accept = 'Y';

    }
  }
  dismiss() {
    this.opened = false;
    this.user_id = null;
    this.cid = null;
    this.fullname = null;
    this.username = null;
    this.password = null;
    this.is_accept = null;
    this.level_id = null;
    this.user_type = null;
  }
  async save() {
    if (this.username && this.fullname) {
      try {
        const data: any = {
          username: this.username,
          cid: this.cid,
          fullname: this.fullname,
          level_id: this.level_id,
          user_type: this.user_type,
          is_accept: this.is_accept || 'N'
        };

        var isError = false;

        if (!this.user_id) {
          if (!this.password) {
            isError = true;
          } else {
            isError = false;
          }
        }

        data.password = this.password;

        var rs: any;

        if (!isError) {
          if (this.user_id) {
            rs = await this.userService.update(this.user_id, data);
          } else {
            rs = await this.userService.save(data);
          }

          if (rs.statusCode === 200) {
            // this.modalReference.close();
            this.onSave.emit();
          } else {
            this.alertService.error(rs.message);
          }
        } else {
          this.alertService.error('กรุณากรอกรหัสผ่าน')
        }
      } catch (error) {
        console.log(error);
        this.alertService.error('เกิดข้อผิดพลาด');
      }
    } else {
      this.alertService.error('กรุณาระบุชื่อ');
    }
    this.user_id = null;
    this.cid = null;
    this.fullname = null;
    this.username = null;
    this.password = null;
    this.is_accept = null;
    this.level_id = null;
    this.user_type = null;
    this.opened = false;
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
