import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  
  {path:'login', component:LoginComponent},
 
  {path:'register', component:RegisterComponent},

  {path:'profile',component:ProfileComponent},
  { 
    path: 'reload',
    redirectTo: 'profile'
  },
  {
    path:'forgotpassword',
    component:ForgotpasswordComponent
    
  },
  {
    path:'reset/:token',
    component:ResetpasswordComponent
  
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
