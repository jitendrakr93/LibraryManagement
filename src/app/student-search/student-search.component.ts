import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminloginserviceService } from '../adminloginservice.service';
import { HttpClient } from '@angular/common/http';
import { ServerConstants } from '../Constants/ServerConstans';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-student-search',
  templateUrl: './student-search.component.html',
  styleUrls: ['./student-search.component.css']
})
export class StudentSearchComponent implements OnInit {
  searchByName: string;
  searchByUsn: string;
  Servermsg : string;
  responseSTudentData;
  constructor(private spinner: NgxSpinnerService,private router: Router, private adminloginserviceService: AdminloginserviceService, private httpClient: HttpClient) { }

  ngOnInit() {
    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 10);

  }
  searchStudentByName() {
    this.spinner.show();
    this.httpClient.get(ServerConstants.ServerAddress + '/student/searchStudentByName?namePattern='+this.searchByName).
    subscribe(
      (data: any) => {
        this.spinner.hide();
        this.responseSTudentData = data;
        console.log(JSON.stringify(data));
      },error => {
        setTimeout(() => {
          this.Servermsg="Server Error";
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
      },
    )

  }

  searchStudentByUSN() {
    this.spinner.show();
    this.httpClient.get(ServerConstants.ServerAddress + '/student/searchStudentByUSN?usn='+this.searchByUsn).
    subscribe(
      (data: any) => {
        this.spinner.hide();
        this.responseSTudentData = data;
        console.log(JSON.stringify(data));
      },error => {
        setTimeout(() => {
          this.Servermsg="Server Error";
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
      },
    )
  }
}
