import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminloginserviceService } from '../adminloginservice.service';
import { HttpClient } from '@angular/common/http';
import { ServerConstants } from '../Constants/ServerConstans';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent implements OnInit {
searchByBookName: string;
searchByAuthorName:string;
Servermsg : string;
  responseBookData;
  constructor(private spinner: NgxSpinnerService,private router: Router, private adminloginserviceService: AdminloginserviceService, private httpClient: HttpClient) { }

  ngOnInit() {
    
    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 10);
  }

  searchBookByName() {
    this.spinner.show();
    this.httpClient.get(ServerConstants.ServerAddress + '/book/searchBookByName?bookNamePattern='+this.searchByBookName).
    subscribe(
      (data: any) => {
        this.spinner.hide();
        this.responseBookData = data;
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

  searchBookByAuthorName() {
    this.spinner.show();
    this.httpClient.get(ServerConstants.ServerAddress + '/book/searchBookByAuthorName?authorNamePattern='+this.searchByAuthorName).
    subscribe(
      (data: any) => {
        this.spinner.hide();
        this.responseBookData = data;
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
