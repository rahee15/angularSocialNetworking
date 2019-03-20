import { Component, OnInit } from '@angular/core';
import { TrialService } from '../trial.service';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-searchfriend',
  templateUrl: './searchfriend.component.html',
  styleUrls: ['./searchfriend.component.css']
})
export class SearchfriendComponent implements OnInit {
  temp1=[];
  temp2=[];
  value3="";
  firstParam="";
  friendstatus;
  constructor(private TrialService:TrialService,private route:Router,private ar:ActivatedRoute) {
     
     
   }
   
  ngOnInit() {
    var session=sessionStorage.getItem('current');
    if(session==null)
    {
      this.route.navigate(['/login']);
      return;
    }
  
    this.ar.params.subscribe(val=>{
      this.temp1=[];
      this.temp2=[];
      this.value3="";
      this.firstParam = this.ar.snapshot.paramMap.get('name');
    console.log("search friend component is called"); 
    console.log("parameter is "+this.firstParam.toString());
    this.value3=this.firstParam.toString();
    this.TrialService.getPostFriend(this.firstParam,JSON.parse(sessionStorage.getItem('current')).username).subscribe(data=>{
      if(data)
        {
          this.temp1=data;
          for(var i in data)
          {
            let value1=data[i].toString();
            let value2=JSON.parse(value1);
            
            this.temp2.push(value2);
            this.friendstatus=value2.friendstatus;
            console.log("name is "+value2.nooflikes);
          }
         // console.log("this is trial2 "+(data+" hello "));
          //console.log("this is trial3 "+JSON.parse(this.temp1.toString()));
        }

     })
    
  
    })
    
    console.log("constructor of search friend is called");
  }
  public addLike(ob1)
  {
    if(ob1.likestatus=="TRUE")
    {
      console.log("like status is true in if");
      var x=this.temp2.find(function(o1){
        if(o1==ob1)
        {
          o1.likestatus="FALSE";
          var xx=parseInt(o1.nooflikes);
          xx--;
          o1.nooflikes=xx.toString();
          return true;
        }
      });
      console.log(x);
      this.TrialService.removeLike(JSON.parse(sessionStorage.getItem('current')).username,ob1.id).subscribe(data=>{
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
          var xx=parseInt(o1.nooflikes);
          xx++;
          o1.nooflikes=xx.toString();
          return true;
        }
      });
      console.log(x);
      this.TrialService.addLike(JSON.parse(sessionStorage.getItem('current')).username,ob1.id).subscribe(data=>{
        if(data)
          {
            console.log(data);
          }
   
      })
    }
  }
  AddFriend(x,manage)
  {
    this.TrialService.sendFriendRequest(JSON.parse(sessionStorage.getItem('current')).username,x).subscribe(data=>{
      console.log(data);
    })
    console.log("in add friend "+x);
    manage.innerHTML="Friend Request Sent";
    this.friendstatus="TRUE";
  }
  }
    
 