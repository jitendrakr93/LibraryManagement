import { Component, OnInit } from '@angular/core';
import { AdminloginserviceService } from '../../app/adminloginservice.service';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isMenuShow:boolean=false;
  constructor(private adminloginserviceService:AdminloginserviceService,private router:Router) { 
   
  }

  ngOnInit() {
 
    
  

    $(document).ready(function(){

      var userMenu = $('.header-user-dropdown .header-user-menu');
  
      userMenu.on('touchend', function(e){
    console.log("component touchred");
        userMenu.addClass('show');
  
        e.preventDefault();
        e.stopPropagation();
  
      });
  
      // This code makes the user dropdown work on mobile devices
  
      // $(document).on('touchend', function(e){
  
      //   // If the page is touched anywhere outside the user menu, close it
      //   userMenu.removeClass('show');
  
      // });
  
    });
  }

  logout(){
    this.router.navigate(['/adminlogin']);
  }

}
