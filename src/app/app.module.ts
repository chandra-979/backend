import { BrowserModule } from '@angular/platform-browser';
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthenticationService } from './service.service';
import { ProfileComponent } from './dashboard/dashboard.component';
import {MatIconModule} from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent,

  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatCardModule,
    MatProgressBarModule,
    NgxDocViewerModule,
    
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
