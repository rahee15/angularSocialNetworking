import { Component, OnInit } from '@angular/core';
import { TrialService } from '../trial.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
 
  constructor(private TrialService:TrialService,private route:Router,private ar:ActivatedRoute) {
 
   }
   temp2=[]
   temp1=[]
   temp3=[]
   temp4=[]
   name
  ngOnInit() {
    // this.name = this.ar.queryParams.subscribe(param=>{
    //   this.name=param["name"];
    //   console.log("name is "+this.name);
    //   this.displayFriends(this.name);
    //})
    this.name=JSON.parse(sessionStorage.getItem('current'));
    this.displayFriends(this.name.username);
    this.displayFriendRequests(this.name.username);
    
  }
  displayFriends(name)
  {
    this.TrialService.getFriend(name).subscribe(data=>{
      if(data)
        {
          this.temp1=data;
          for(var i in data)
          {
            let value1=data[i].toString();
            let value2=JSON.parse(value1);
            
            this.temp2.push(value2);
            console.log("name is in friends component "+value2.name);
          }
         // console.log("this is trial2 "+(data+" hello "));
          //console.log("this is trial3 "+JSON.parse(this.temp1.toString()));
        }
 
    })
  }
  displayFriendRequests(name)
  {
    console.log("display friend request");
    this.TrialService.getFriendRequest(name).subscribe(data=>{
      if(data)
        {
          this.temp3=data;
          for(var i in data)
          {
            let value1=data[i].toString();
            let value2=JSON.parse(value1);
            
            this.temp4.push(value2);
            console.log("friend request "+value2.name);
          }
         // console.log("this is trial2 "+(data+" hello "));
          //console.log("this is trial3 "+JSON.parse(this.temp1.toString()));
        }
 
    })
  }
  RemoveFriend(x,i,manage)
  {
    console.log("in remove friend "+x);
    this.TrialService.removeFriend(JSON.parse(sessionStorage.getItem('current')).username,x).subscribe(data=>{
      console.log(data);
    })
    manage.innerHTML="Add Friend";
  }
  AddFriend(x,i,manage)
  {
    this.TrialService.sendFriendRequest(JSON.parse(sessionStorage.getItem('current')).username,x).subscribe(data=>{
      console.log(data);
    })
    console.log("in add friend "+x);
    manage.innerHTML="Friend Request Sent";
  }
  FriendRequestSent(x,i,manage)
  {
    this.TrialService.removeFriendRequest(JSON.parse(sessionStorage.getItem('current')).username,x).subscribe(data=>{
      console.log(data);
    })
    console.log("in friend request sent "+x);
    manage.innerHTML="Add Friend";
  }
  managefriend(x,i:Number)
  {
    x=x.slice(1,-1);
    console.log("going to manage x "+x);
    console.log(document.getElementById("name"+i));
    var manage=document.getElementById("name"+i);
    if(manage.innerHTML=="Remove Friend")
    {
      this.RemoveFriend(x,i,manage);
    }
    else if(manage.innerHTML=="Add Friend")
    {
      this.AddFriend(x,i,manage);
    }
    else if(manage.innerHTML=="Friend Request Sent")
    {
      this.FriendRequestSent(x,i,manage);
    }
  }
  AcceptFriendRequest(x,i:Number)
  {
    x=x.slice(1,-1);
    console.log(document.getElementById("name"+i));
    var manage=document.getElementById("name"+i);
    this.TrialService.acceptFriendRequest(JSON.parse(sessionStorage.getItem('current')).username,x).subscribe(data=>{
      console.log(data);
    })
    manage.innerHTML="Friends";
  }

}
