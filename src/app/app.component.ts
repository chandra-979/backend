import { Component } from '@angular/core'
import { AuthenticationService } from './service.service'
import { analyzeAndValidateNgModules } from '@angular/compiler'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
 
  
  constructor(private auth: AuthenticationService) {
 
  }
  loginflag=this.auth.loginflag
  
  
}