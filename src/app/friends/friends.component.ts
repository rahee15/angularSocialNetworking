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
   index=0;
   temp2=[]
   temp1=[]
   temp3=[]
   temp4=[]
   temp5=[]
   temp6=[]
   name
  ngOnInit() {
    // this.name = this.ar.queryParams.subscribe(param=>{
    //   this.name=param["name"];
    //   console.log("name is "+this.name);
    //   this.displayFriends(this.name);
    //})
    var session=sessionStorage.getItem('current');
    if(session==null)
    {
      this.route.navigate(['/login']);
      return;
    }
    this.name=JSON.parse(sessionStorage.getItem('current'));
    this.displayFriends(this.name.username);
    this.displayFriendRequests(this.name.username);
    this.displayFriendRequestsSent(this.name.username);
    
  }
  inc(index)
  {
    index++;
    this.index=index;
  }
  displayFriendRequestsSent(name)
  {
    this.TrialService.getFriendRequestsSent(name).subscribe(data=>{
      if(data)
        {
          this.temp5=data;
          for(var i in data)
          {
            let value1=data[i].toString();
            let value2=JSON.parse(value1);
            
            this.temp6.push(value2);
            console.log("name is in friends component "+value2.name);
          }
         // console.log("this is trial2 "+(data+" hello "));
          //console.log("this is trial3 "+JSON.parse(this.temp1.toString()));
        }
 
    })
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
  RemoveFriend(x,manage)
  {
    console.log("in remove friend "+x);
    this.TrialService.removeFriend(JSON.parse(sessionStorage.getItem('current')).username,x).subscribe(data=>{
      console.log(data);
    })
    manage.innerHTML="Add Friend";
  }
  AddFriend(x,manage)
  {
    this.TrialService.sendFriendRequest(JSON.parse(sessionStorage.getItem('current')).username,x).subscribe(data=>{
      console.log(data);
    })
    console.log("in add friend "+x);
    manage.innerHTML="Friend Request Sent";
  }
  FriendRequestSent(x,manage)
  {
    this.TrialService.removeFriendRequest(JSON.parse(sessionStorage.getItem('current')).username,x).subscribe(data=>{
      console.log(data);
    })
    console.log("in friend request sent "+x);
    manage.innerHTML="Add Friend";
  }
  AcceptFriendRequest(x,manage)
  {
    //x=x.slice(1,-1);

    this.TrialService.acceptFriendRequest(JSON.parse(sessionStorage.getItem('current')).username,x).subscribe(data=>{
      console.log(data);
    })
    manage.innerHTML="Remove Friend";
  }

  managefriend(x)
  {
    
    x=x.slice(1,-1);
    console.log("going to manage x "+x);
    
    var manage=document.getElementById(x);
    console.log("manage.inner html "+manage.innerHTML);
    if(manage.innerHTML=="Remove Friend")
    {
      this.RemoveFriend(x,manage);
    }
    else if(manage.innerHTML=="Accept Friend Request")
    {
      this.AcceptFriendRequest(x,manage);
    }
    else if(manage.innerHTML=="Add Friend")
    {
      this.AddFriend(x,manage);
    }
    else if(manage.innerHTML=="Friend Request Sent")
    {
      this.FriendRequestSent(x,manage);
    }
  }



}
