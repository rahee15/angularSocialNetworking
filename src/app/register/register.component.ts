import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService } from '../_services';

@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    firstname="";
    lastname="";
    username="";
    password="";
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService,
       // private alertService: AlertService
            
       ) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }
    
    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit()
    {
        this.submitted = true;
            
        // stop here if form is invalid
        if (this.registerForm.invalid)
         {
            return;
         }
        
        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    console.log(data.toString());
                let value1=data.toString();
                 var xx=JSON.stringify(data);
             console.log("xx is"+ xx);
                if(data.loginStatus)
                {
                 console.log(data.username);
                 this.router.navigate(["/login"]);
                }
                else
                {
                 window.alert("username already exists");
                 this.loading=false;
                }
                   
                }
                );
    }
}
