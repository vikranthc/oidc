import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'ngOidc';

  constructor(private router: Router, private authService: AuthService){
    if(window.location.hash){
      console.log("This is  callback");

      const data = localStorage.getItem('redirect1');
        if (data != null) {
          this.authService.completeAuthentication();
          this.router.navigate([JSON.parse(data)]);
        }
    }
  }
}
