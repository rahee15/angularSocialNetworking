import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing } from '../app/app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card'; 
import {MatSidenavModule} from '@angular/material/sidenav'; 
import {MatInputModule} from '@angular/material/input';
import { HomeComponent } from './home/home.component'; 
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AuthenticationService, UserService } from './_services';
import { fakeBackendProvider } from './_helpers';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { NavbarComponent } from './navbar/navbar.component';
import { FileSelectDirective } from 'ng2-file-upload';
import { CommonModule } from "@angular/common";
import { StripdoublequotesPipe } from './stripdoublequotes.pipe';
import { FriendsComponent } from './friends/friends.component';
import { RouterModule,Routes} from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import {MatIconModule} from '@angular/material/icon'; 
import{ FormsModule} from '@angular/forms';
import { SearchfriendComponent } from './searchfriend/searchfriend.component';
import { ConvertStringtoBoolPipe } from './convert-stringto-bool.pipe'
@NgModule({
  declarations: [
    FileSelectDirective,
    
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    StripdoublequotesPipe,
    FriendsComponent,
    HomepageComponent,
    SearchfriendComponent,
    ConvertStringtoBoolPipe,
  


  ],
  imports: [
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    routing,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing,
    MatCardModule,
    MatSidenavModule,
    MatInputModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatInputModule,
    MatCardModule,
    CommonModule,
    MatFormFieldModule,
    MatIconModule
  ],
  providers: [
    AuthGuard,
   // AlertService,
    AuthenticationService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
],
  bootstrap: [AppComponent]
})
export class AppModule { }
