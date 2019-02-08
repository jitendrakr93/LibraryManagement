import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { HeaderComponent } from './header/header.component';
import { AdminRegistrationComponent } from './admin-registration/admin-registration.component';
import { StudentRegistrationComponent } from './student-registration/student-registration.component';
import { BookEntryComponent } from './book-entry/book-entry.component';
import { StudentSearchComponent } from './student-search/student-search.component';
import { BookSearchComponent } from './book-search/book-search.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminloginserviceService } from './adminloginservice.service';
import { InterceptorModule } from './interceptor.module';
import { NgxSpinnerModule } from 'ngx-spinner';

const appRoutes: Routes = [
 
  { path: '', component: AdminLoginComponent },
  { path: 'searchbook', component: BookSearchComponent },
  { path: 'adminregistration', component: AdminRegistrationComponent },
  { path: 'studentregistration', component: StudentRegistrationComponent },
  { path: 'bookentry', component: BookEntryComponent },
  { path: 'studentsearch', component: StudentSearchComponent },
  {
    path: 'header', component: HeaderComponent
  },
  {
    path:'adminlogin',component:AdminLoginComponent
  },
  { path: '**', component: AdminLoginComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    HeaderComponent,
    AdminRegistrationComponent,
    StudentRegistrationComponent,
    BookEntryComponent,
    StudentSearchComponent,
    BookSearchComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    InterceptorModule,
    NgxSpinnerModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AdminloginserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
