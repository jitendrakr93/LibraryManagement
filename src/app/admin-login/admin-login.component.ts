import { Component, OnInit } from '@angular/core';
import { SuperAdmin } from '../AdminLoginVo/SuperAdmin';
import { Router } from '@angular/router';
import { AdminloginserviceService } from '../adminloginservice.service';
import { HttpClient } from '@angular/common/http';
import { ServerConstants } from '../Constants/ServerConstans';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  adminCredential = new SuperAdmin();
  msg: string = "";
  loginData;
  Servermsg: string;

  constructor(private spinner: NgxSpinnerService, private router: Router, private adminloginserviceService: AdminloginserviceService, private httpClient: HttpClient) { }

  ngOnInit() {
    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 10);
  }


  submitLoginDetails() {
    this.spinner.show();
    this.httpClient.post(ServerConstants.ServerAddress + '/superadmin/superadminlogin', this.adminCredential).
      subscribe(
        (data: any) => {
          this.spinner.hide();
          this.loginData = data;
          this.adminloginserviceService.adminLoginData = this.loginData;
          console.log(JSON.stringify(data));
          if (this.loginData.statusCode == 200) {
            this.adminloginserviceService.isValidLogin = true;
            this.router.navigate(['/header']);
          } else {
            this.msg = "*Please Enter valid credential";
          }

        },
        error => {
          setTimeout(() => {
            this.Servermsg="Server Error";
            /** spinner ends after 5 seconds */
            this.spinner.hide();
          }, 1000);
        },
      )

  }
}
