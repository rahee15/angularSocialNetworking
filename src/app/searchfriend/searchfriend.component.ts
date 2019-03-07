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
  constructor(private TrialService:TrialService,private route:Router,private ar:ActivatedRoute) {
     
     ar.params.subscribe(val=>{
      this.temp1=[];
      this.temp2=[];
      this.value3="";
      this.firstParam = this.ar.snapshot.paramMap.get('name');
    console.log("search friend component is called"); 
    console.log("parameter is "+this.firstParam.toString());
    this.value3=this.firstParam.toString();
    this.TrialService.getPostFriend(this.firstParam,JSON.parse(sessionStorage.getItem('current')).firstName).subscribe(data=>{
      if(data)
        {
          this.temp1=data;
          for(var i in data)
          {
            let value1=data[i].toString();
            let value2=JSON.parse(value1);
            
            this.temp2.push(value2);
            console.log("name is "+value2.nooflikes);
          }
         // console.log("this is trial2 "+(data+" hello "));
          //console.log("this is trial3 "+JSON.parse(this.temp1.toString()));
        }

     })
    
  
    })
    
    console.log("constructor of search friend is called");
   }
   
  ngOnInit() {
    
  }
  }
    
 