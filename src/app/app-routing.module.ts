import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../app/home/home.component';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';

import { FriendsComponent } from './friends/friends.component';

import { HomepageComponent } from './homepage/homepage.component';
import { SearchfriendComponent } from './searchfriend/searchfriend.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {path:'managefriends',component:FriendsComponent},
    {path:'homepage',component:HomepageComponent}, 
    {path:'searchfriend/:name',component:SearchfriendComponent},
    {path:'userProfile',component:UserProfileComponent},
    {path:'home',component:HomeComponent},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);