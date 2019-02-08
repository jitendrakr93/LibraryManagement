import { Component, OnInit } from '@angular/core';
import { Book } from '../BookVo/Book';
import { HttpClient } from '@angular/common/http';
import { ServerConstants } from '../Constants/ServerConstans';
import { AdminloginserviceService } from '../adminloginservice.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-book-entry',
  templateUrl: './book-entry.component.html',
  styleUrls: ['./book-entry.component.css']
})
export class BookEntryComponent implements OnInit {
  bookEntry = new Book();
  msg: string = "";
  Servermsg: string;
  bookEntryData;
  bookCategoryList;
  selectedBook: string = "Choose Book Category Name";
  constructor(private spinner: NgxSpinnerService, private router: Router, private adminloginserviceService: AdminloginserviceService, private httpClient: HttpClient) { }

  ngOnInit() {
    /** spinner starts on init */
    this.spinner.show();
    this.getBookData();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 10);
  }
  getBookData() {
    this.httpClient.get(ServerConstants.ServerAddress + '/book/getBookCategory').
      subscribe(
        (data: any) => {
          this.spinner.hide();
          this.bookCategoryList = data;
          console.log(JSON.stringify(data));
        }
      )
  }
  selectBook(item2) {
    let item;
    this.bookCategoryList.forEach(data => {
      if (data.bookCategoryId == item2) {
        item = data;
      }
    });
    console.log(JSON.stringify(item) + "...");
    this.selectedBook = item.bookCategoryName;
    this.bookEntry.bookCategoryId = item.bookCategoryId;
    this.bookEntry.bookCategoryName = item.bookCategoryName;
  }

  storeBookDetails() {
    this.spinner.show();
    this.httpClient.post(ServerConstants.ServerAddress + '/book/addbook', this.bookEntry).
      subscribe(
        (data: any) => {
          this.spinner.hide();
          this.bookEntryData = data;
          console.log(JSON.stringify(data));
          this.getBookData();
          if (this.bookEntryData.statusCode == 200) {
            this.msg = "Book detais stored successfully";
            this.bookEntry = new Book();
          } else {
            this.msg = this.bookEntryData.statusMessage;
          }
        }, error => {
          setTimeout(() => {
            this.Servermsg = "Server Error";
            /** spinner ends after 5 seconds */
            this.spinner.hide();
          }, 1000);
        },
      )

  }

  cancel() {
    this.router.navigate(['/header']);
  }
}
