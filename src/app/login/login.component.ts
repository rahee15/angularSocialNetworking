﻿import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import {  AuthenticationService } from '../_services';

@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
       // private alertService: AlertService
       ) {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['/home'] || '/';
    }
    temp1=[];
    temp2=[];

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .subscribe(
                data => {
                   // sessionStorage.setItem('current',JSON.stringify(param2.Username));
                   
           console.log(data.toString());
           let value1=data.toString();
           var xx=JSON.stringify(data);
            console.log("xx is"+ xx);
            if(data.loginStatus)
            {
                sessionStorage.setItem('current',JSON.stringify(data));
                console.log(data.username);
                this.router.navigate(["/home"]);
            }
            else
            {
                console.log("Incorrect");
            }
         
                });
    }
}
