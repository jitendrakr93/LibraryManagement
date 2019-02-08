import { Component, OnInit } from '@angular/core';
import { Student } from '../StudentVo/Student';
import { HttpClient } from '@angular/common/http';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { ServerConstants } from '../Constants/ServerConstans';
import { AdminloginserviceService } from '../adminloginservice.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.css']
})
export class StudentRegistrationComponent implements OnInit {
  student = new Student();
  msg:string="";
  registrationData;
  Servermsg:string;
  repassword:string;
  constructor(private spinner: NgxSpinnerService,private router: Router,private adminLoginService: AdminloginserviceService, private httpClient: HttpClient) { }

  ngOnInit() {
    this.student.superAdminId=this.adminLoginService.adminLoginData.superAdminId;
    
    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 10);
  }
  registerStudent() {
    this.spinner.show();
    this.student.superAdminId=this.adminLoginService.adminLoginData.superAdminId;
    this.httpClient.post(ServerConstants.ServerAddress + '/student/studentregistration', this.student).
      subscribe(
        (data: any) => {
          this.spinner.hide();
          this.registrationData = data;
          console.log(JSON.stringify(data));
          if (this.registrationData.statusCode == 200) {
            this.msg="Student Registered Successfully";
            this.student = new Student();
            this.repassword="";
            }else{
              this.msg=this.registrationData.statusMessage;
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
