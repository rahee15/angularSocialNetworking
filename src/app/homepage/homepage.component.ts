import { Component, OnInit } from '@angular/core';
import { TrialService } from '../trial.service';
import { RouterModule, Routes } from '@angular/router';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  title = 'microblog';
  temp1=[];
  temp2=[];
  constructor(private TrialService:TrialService) { }

  ngOnInit() {
    this.TrialService.getPost("rahi").subscribe(data=>{
      if(data)
        {
          this.temp1=data;
          for(var i in data)
          {
            let value1=data[i].toString();
            let value2=JSON.parse(value1);
            
            this.temp2.push(value2);
            console.log("name is "+value2.heading);
          }
         // console.log("this is trial2 "+(data+" hello "));
          //console.log("this is trial3 "+JSON.parse(this.temp1.toString()));
        }
 
    })  
  }
  public getUser(username)
  {
    console.log("this is trial "+this.temp1);
    this.TrialService.getData(username).subscribe(data=>{
      if(data)
        {
          this.temp1=data;
          for(var i in data)
          {
            let value=data[i];
            console.log(value);
          }
         // console.log("this is trial2 "+(data+" hello "));
          //console.log("this is trial3 "+JSON.parse(this.temp1.toString()));
        }
 
    })
  }
  public getUser2(username)
  {
    console.log("this is trial "+this.temp1);
    this.TrialService.getPost(username).subscribe(data=>{
      if(data)
        {
          this.temp1=data;
          for(var i in data)
          {
            let value=data[i];
            console.log(value);
          }
         // console.log("this is trial2 "+(data+" hello "));
          //console.log("this is trial3 "+JSON.parse(this.temp1.toString()));
        }
 
    })
  }
  flag=0;
  public addLike(ob1)
  {
    if(ob1.likestatus=="TRUE")
    {
      console.log("like status is true in if");
      var x=this.temp2.find(function(o1){
        if(o1==ob1)
        {
          o1.likestatus="FALSE";
          return true;
        }
      });
      console.log(x);
      this.TrialService.removeLike("rahi",ob1.id).subscribe(data=>{
        if(data)
          {
            console.log(data);
          }
   
      })
    }
    else
    {
      console.log("likestatus is false in else");
      var x=this.temp2.find(function(o1){
        if(o1==ob1)
        {
          o1.likestatus="TRUE";
          return true;
        }
      });
      console.log(x);
      this.TrialService.addLike("rahi",ob1.id).subscribe(data=>{
        if(data)
          {
            console.log(data);
          }
   
      })
    }
  }

}
