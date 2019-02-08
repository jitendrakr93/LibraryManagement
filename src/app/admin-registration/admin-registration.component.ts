import { Component, OnInit } from '@angular/core';
import { SubAdmin } from '../SubAdminVo/SubAdmin';
import { HttpClient } from '@angular/common/http';
import { ServerConstants } from '../Constants/ServerConstans';
import { AdminloginserviceService } from '../adminloginservice.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-admin-registration',
  templateUrl: './admin-registration.component.html',
  styleUrls: ['./admin-registration.component.css']
})
export class AdminRegistrationComponent implements OnInit {
 subAdmin = new SubAdmin();
 msg:string="";
 confirmPassword:string;
 registerdSubAdmin;
 Servermsg: string;
  constructor(private spinner: NgxSpinnerService,private router: Router,private adminloginserviceService: AdminloginserviceService, private httpClient: HttpClient) { }

  ngOnInit() {
    this.subAdmin.superAdminId=this.adminloginserviceService.adminLoginData.superAdminId;;
    
    /** spinner starts on init */
    this.spinner.show();
 
    setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
    }, 10);
  }
  
  registerSubAdmin(){
    this.spinner.show();
    this.subAdmin.superAdminId=this.adminloginserviceService.adminLoginData.superAdminId;
    this.httpClient.post(ServerConstants.ServerAddress + '/subadmin/subadminregister', this.subAdmin).
      subscribe(
        (data: any) => {
          this.spinner.hide();
          this.registerdSubAdmin = data;
          console.log(JSON.stringify(data));
          this.registerdSubAdmin = data;
         
            this.msg=this.registerdSubAdmin.statusMessage;
            if(this.registerdSubAdmin.statusCode == 200){
              this.subAdmin=new SubAdmin();
              this.confirmPassword="";
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

  cancel(){
    this.router.navigate(['/header']);
  }
}
