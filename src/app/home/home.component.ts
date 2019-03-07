import { Component, OnInit } from '@angular/core';
import { TrialService } from '../trial.service';
import { User } from '../_models';
import { UserService } from '../_services';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

const URL ="http://192.168.43.42:8081/SocialNetworking/rest/node/add";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  name:User;
  x
  title = 'microblog';
  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
    

  temp1=[];
  temp2=[];
  constructor(private TrialService:TrialService,private userService: UserService,private afStorage: AngularFireStorage) { 
    this.name=JSON.parse(sessionStorage.getItem('current')); 
   
  }

  ngOnInit() {
  
  
   // this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

    //this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      //   console.log('ImageUpload:uploaded:', item, status, response);
        // alert('File uploaded successfully');
    // };
    this.TrialService.getPost(JSON.parse(sessionStorage.getItem('current')).firstName).subscribe(data=>{
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
  }
  upload(event) {
    const id = Math.random().toString(36).substring(2);
    
    //this.id1[this.i]=id;
    
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
    //this.downloadURL = this.task.downloadURL();
    this.task.snapshotChanges().pipe(
      map(() => this.ref.getDownloadURL().subscribe(xx=>console.log(xx)) ))
    .subscribe();
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
          var xx=parseInt(o1.nooflikes);
          xx--;
          o1.nooflikes=xx.toString();
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
          var xx=parseInt(o1.nooflikes);
          xx++;
          o1.nooflikes=xx.toString();
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
