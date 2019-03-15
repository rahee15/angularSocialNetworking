import { Component, OnInit } from '@angular/core';
import { TrialService } from '../trial.service';
import { User } from '../_models';
import { UserService } from '../_services';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { map, finalize } from 'rxjs/operators';

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
  name: any;
  x: any
  title = 'microblog';
  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
    

  temp1=[];
  temp2=[];
  constructor(private TrialService:TrialService,private userService: UserService,private afStorage: AngularFireStorage,private _sanitizer: DomSanitizer) { 
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
            console.log("name is "+value2.imageUrl);
          }
         // console.log("this is trial2 "+(data+" hello "));
          //console.log("this is trial3 "+JSON.parse(this.temp1.toString()));
        }
 
    })  
  }
  fileName;
  saveFile(event)
  {
    this.fileName=event.target.files[0];
  }
  upload(post,title) {
    //first upload the image url and then upload the details of the post to neo4j

    const id = Math.random().toString(36).substring(2);
     this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(this.fileName);
    this.task.snapshotChanges().pipe(
      finalize(() => this.ref.getDownloadURL().subscribe(imageUrl=>this.callOnCompletion(imageUrl,post,title) )))
    .subscribe();
  }
  callOnCompletion(imageUrl,post,title)
  {
    console.log("image url is "+imageUrl);
    console.log("post is "+post);
    var name=JSON.parse(sessionStorage.getItem('current')).firstName;
    this.TrialService.createPost(name,post,imageUrl,title).subscribe(data=>
      {
        console.log(data.toString());
        alert("Posted Succesfully ");
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
  getBackgroundImage(image)
  {
    
    return this._sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }


}
