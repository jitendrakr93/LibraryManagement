import { Component } from '@angular/core';
import { AdminloginserviceService } from './adminloginservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  constructor(private adminloginserviceService:AdminloginserviceService,private router:Router){
    if(this.adminloginserviceService.isValidLogin==false)
    {console.log("false");
       window.localStorage.clear();
      this.router.navigateByUrl("/");
  }
  }
}
