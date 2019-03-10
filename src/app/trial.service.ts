import { Injectable } from '@angular/core';
import {HttpClient, HttpParams }from '@angular/common/http';
import { JSONP_ERR_WRONG_RESPONSE_TYPE } from '@angular/common/http/src/jsonp';

@Injectable({
  providedIn: 'root'
})
export class TrialService {

   private _getData="https://ddumicro.herokuapp.com/rest/node/add";
  private _getPost="https://ddumicro.herokuapp.com/rest/node/viewAllPost";
//    private _getPost="http://192.168.0.107:8080/SocialNetworking/rest/node/viewAllPost";

  private _getFriend="https://ddumicro.herokuapp.com/rest/node/viewAllFriends";
  private _searchFriend="https://ddumicro.herokuapp.com/rest/node/search";
  private _getPostFriend="https://ddumicro.herokuapp.com/rest/node/searchFriendPost";
 //private _getPostFriend="http://192.168.0.107:8080/SocialNetworking/rest/node/searchFriendPost";
  private _addLike="https://ddumicro.herokuapp.com/rest/node/addLike";
  private _removeLike="https://ddumicro.herokuapp.com/rest/node/removeLike";
  private _createPost="https://ddumicro.herokuapp.com/rest/node/createPost";
  //  private _removeLike="http://192.168.43.84:8080/SocialNetworking/rest/node/removeLike";

  constructor(private _http:HttpClient) { }
  getData(uname:string)
  {
    
    var param1=new HttpParams();
    param1=param1.append("name1",uname);
    //param1=param1.append("name2","hello");
    console.log("params is "+param1);
    /*
    var param1={ 
      "name1":uname
    }
    */
    //console.log("this is response "+this._http.post<any>(this._getData,{name1:uname,name2:"aditya"}));
    var param2={
      name1:uname,
      name2:"aditya"

    }
    return this._http.post<any>(this._getData,param2);
    //{name1:uname,name2:"aditya"}
  }
  getPost(uname:string)
  {
    
    var param1=new HttpParams();
    param1=param1.append("name1",uname);
    //param1=param1.append("name2","hello");
    console.log("params is "+param1);
    /*
    var param1={ 
      "name1":uname
    }
    */
    //console.log("this is response "+this._http.post<any>(this._getData,{name1:uname,name2:"aditya"}));
    var param2={
      name1:uname,
    }
    console.log("params 2 is "+param2);
    return this._http.post<any>(this._getPost,param2);
    //{name1:uname,name2:"aditya"}
  }
   getPostFriend(name1:string,name2:string)
   {
    
     var param1=new HttpParams();
     param1=param1.append("name1",name1);
     //param1=param1.append("name2","hello");
     console.log("params is "+param1);
     /*
     var param1={ 
       "name1":uname
     }
     */
     //console.log("this is response "+this._http.post<any>(this._getData,{name1:uname,name2:"aditya"}));
     var param2={
       name1:name1,
       name2:name2,
     }
     console.log("params 2 is "+param2);
     return this._http.post<any>(this._getPostFriend,param2);
     //{name1:uname,name2:"aditya"}
   }
  searchfriend(name1:string)
  {
    console.log(name);
    var param2={
      name1:name1,
    }
    console.log("params 2 is "+param2.name1);
    return this._http.post<any>(this._searchFriend,param2);

  }
  getFriend(uname:string)
  {
    
    var param1=new HttpParams();
    param1=param1.append("name1",uname);
    //param1=param1.append("name2","hello");
    console.log("params is "+param1);
    /*
    var param1={ 
      "name1":uname
    }
    */
    //console.log("this is response "+this._http.post<any>(this._getData,{name1:uname,name2:"aditya"}));
    var param2={
      name1:uname,
    }
    console.log("params 2 is "+param2);
    return this._http.post<any>(this._getFriend,param2);
    //{name1:uname,name2:"aditya"}
  }
  removeLike(uname:string,id:Number)
  {
    
    var param1=new HttpParams();
    param1=param1.append("name1",uname);
    //param1=param1.append("name2","hello");
    console.log("params is "+param1);
    /*
    var param1={ 
      "name1":uname
    }
    */
    //console.log("this is response "+this._http.post<any>(this._getData,{name1:uname,name2:"aditya"}));
    var param2={
      name1:uname,
      name2:id,
    }
    console.log("params 2 is "+param2);
    return this._http.post<any>(this._removeLike,param2);
    //{name1:uname,name2:"aditya"}
  }
  addLike(uname:string,id:Number)
  {

    var param2={
      name1:uname,
      name2:id,
    }
    console.log("params 2 is "+id.toString);
    return this._http.post<any>(this._addLike,param2);
    //{name1:uname,name2:"aditya"}
  }
  createPost(uname:string,post:string,imageUrl:string,title:string)
  {
      var param2={
        name1:uname,
        name2:post,
        name3:imageUrl,
        name4:title,
      }
      console.log("params 2 is "+param2);
      return this._http.post<any>(this._createPost,param2);
  }
}
