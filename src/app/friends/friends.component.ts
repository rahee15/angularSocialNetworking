import { Component, OnInit } from '@angular/core';
import { TrialService } from '../trial.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  constructor(private TrialService:TrialService) {
 
   }
   temp2=[]
   temp1=[]
  ngOnInit() {
    this.TrialService.getFriend("rahi").subscribe(data=>{
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
