import { Component, OnInit } from '@angular/core';
import { TrialService } from '../trial.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  name;
  temp1=[];
  temp2=[];
  
  constructor(private route:Router,private TrialService:TrialService) { 
    this.name=JSON.parse(sessionStorage.getItem('current')); 
  }

  ngOnInit() {
    var session=sessionStorage.getItem('current');
    if(session==null)
    {
      this.route.navigate(['/login']);
      return;
    }
  
    console.log("ng on init is called ");

    this.TrialService.userProfile(JSON.parse(sessionStorage.getItem('current')).username).subscribe(data=>{
      if(data)
        {
          this.temp1=data;
          for(var i in data)
          {
            let value1=data[i].toString();
            let value2=JSON.parse(value1);
            this.temp2.push(value2);
            console.log("value 2 is "+value2.id);
           // console.log("name is "+value2.imageUrl);
          }
         // console.log("this is trial2 "+(data+" hello "));
          //console.log("this is trial3 "+JSON.parse(this.temp1.toString()));
        }
 
    })  
  }
  delete(id:Number)
  {
    console.log("id to be deleted is "+id);
    this.TrialService.deletePost(id).subscribe(data=>{
      //console.log("response is "+JSON.parse(data).response);
      var index=0;
      console.log("id is "+id);
      console.log("temp2 is "+this.temp2);
      for(var i=0;i<this.temp2.length;i++)
      {
          console.log("value is "+this.temp2[i].id)
          if(this.temp2[i].id==id)
          {
           this.temp2.splice(index,1);
           console.log("in if");
            break;
          }
          index++;
      }
      window.alert("post deleted");
    })
  }

}
