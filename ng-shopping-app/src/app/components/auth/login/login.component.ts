import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(
    private auth: AuthService,
    private router: Router
    ) { }

  errorMessage = ''

  loginForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])
  })
  

  onSubmit() {
    if(this.loginForm.status === 'VALID'){
      this.auth.login(this.loginForm.value).subscribe((results) => {
        console.log(results);
        this.router.navigate(["/admin"])
    })
  }
}

  ngOnInit(): void {
  }

}
