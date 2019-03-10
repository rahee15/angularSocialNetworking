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
   name
  ngOnInit() {
    this.name = this.ar.queryParams.subscribe(param=>{
      this.name=param["name"];
      console.log("name is "+this.name);
      this.displayFriends(this.name);
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
  RemoveFriend(x,i,manage)
  {
    console.log("in remove friend "+x);
    manage.innerHTML="Add Friend";
  }
  AddFriend(x,i,manage)
  {
    console.log("in add friend "+x);
    manage.innerHTML="Friend Request Sent";
  }
  FriendRequestSent(x,i,manage)
  {
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

}
