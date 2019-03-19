import { Component, OnInit } from '@angular/core';
import { TrialService } from '../trial.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  friend:string;
  name:string;
  constructor(private TrialService:TrialService,private router:Router) {
    
   } 
temp1=[];
temp2=[];
  ngOnInit() {
    this.name=JSON.parse(sessionStorage.getItem('current')).username;
  }
  search():void
  {
    let value3="";
    console.log(this.friend);
    this.TrialService.searchfriend(this.friend).subscribe(data=>{
      if(data)
        {
          this.temp1=data;
          console.log(this.temp1);
          for(var i in data)
          {
            let value1=data[i].toString();
            value3=value1.toString();
            console.log("name is "+value1.toString());
          }
         
        }
        
        this.router.navigate(["/searchfriend",value3.toString()]);
    })
  }
  logout()
  {
    sessionStorage.removeItem("current");
    this.router.navigate(['/login']);
  }
  

}
